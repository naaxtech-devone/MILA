# Mila — Personal AI Fashion Stylist

Mila builds a user's 16-season color profile and silhouette from a portrait, then uses that
profile to generate daily outfit/hair/makeup recommendations, analyze wardrobe items, find
budget product "dupes," and run a conversational styling chat.

## Stack

- **TanStack Start** — SSR + type-safe server functions (`createServerFn`)
- **TanStack Router** — file-based routing (`src/routes/`, tree generated into `src/routeTree.gen.ts`)
- **TanStack Query** — server-state caching
- **React 19** + **TypeScript** (strict) + **Vite 7**
- **Tailwind CSS v4** + **shadcn/ui** (Radix UI primitives, Lucide icons) + **Framer Motion**
- **React Hook Form** + **Zod** — forms and validation (shared schemas client/server)
- **Supabase** — Postgres, Auth (JWT), RLS; migrations in `supabase/migrations/`,
  generated DB types in `src/integrations/supabase/types.ts`
- **Bun** — package manager / runtime

## Getting started

```bash
bun install
cp .env.example .env   # fill in Supabase + AI provider values
bun run dev            # https://localhost:8080
```

The dev server runs over HTTPS (locally-trusted mkcert cert) so camera capture works as a
secure context — including from phones on the same LAN via `https://<your-lan-ip>:8080`.

### Scripts

```bash
bun run dev       # dev server
bun run build     # production build
bun run build:dev # development-mode build
bun run preview   # preview the production build
bun run start     # run the built server (.output/server/index.mjs)
bun run lint      # eslint
bun run format    # prettier --write .
```

### Environment

See `.env.example`. Supabase needs a URL + publishable (anon) key for both the browser
(`VITE_`-prefixed) and server functions. AI features (outfit generation, clothing/outfit
analysis, personal color analysis, dupe hunting, stylist chat) require an OpenAI-compatible
chat-completions provider configured via `AI_API_KEY`, `AI_BASE_URL`, and `AI_MODEL` — any
endpoint that supports multimodal (image) input and tool calling works.

## Architecture

### Server functions are the API layer

Each backend feature is a `*.functions.ts` module under `src/lib/`:

- `generate-outfit.functions.ts` — daily look (outfit + hair + makeup); weather-aware via Open-Meteo
- `analyze-clothing.functions.ts` — wardrobe item analysis from photos
- `analyze-outfit.functions.ts` — outfit critique
- `analyzePersonalColor.functions.ts` — portrait-based 16-season color analysis
- `dupe-hunter.functions.ts` — cheaper product "dupes"
- `fix-outfit-chat.functions.ts` — conversational outfit-fixing chat
- `posts.functions.ts`, `profile.functions.ts`, `admin.functions.ts` — feed, profile, admin ops

Standard shape for a protected server function:

```ts
export const someFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => Input.parse(input)) // Zod
  .handler(async ({ data, context }) => {
    await consumeAiCredit(context.supabase, context.userId);
    // ...
  });
```

`requireSupabaseAuth` (`src/integrations/supabase/auth-middleware.ts`) verifies the bearer JWT
and injects `{ supabase, userId, claims }` into context; the injected client carries the
caller's token so RLS applies. The browser attaches the token to every serverFn RPC via the
global `attachSupabaseAuth` middleware registered in `src/start.ts`.

### AI calls

`src/lib/ai.server.ts` is a thin, provider-agnostic client for any OpenAI-compatible
chat-completions API. Model calls use structured tool/function calling (e.g. `report_daily_look`,
`report_studio_color_profile`) and multimodal image input; outputs are validated with Zod at the
server-function boundary.

The color engine is **deterministic, not LLM-generated**: the model only returns a raw "vision
read"; season palettes, hex codes, and styling copy are hydrated from the static hand-authored
dictionary in `src/lib/color-analysis/`.

### Auth & routes

Supabase Auth (email/password + Google OAuth) with client state in `src/hooks/use-auth.tsx`.
The authenticated section (`src/routes/_authenticated.tsx` and its children — dashboard, feed,
history, style-profile, admin) gates on auth at the route level; role checks live in
`src/hooks/use-is-admin.tsx`.

Roles live in `public.user_roles` (`app_role` enum: `admin` / `moderator` / `user`). Every
new signup — email/password or OAuth — gets the `user` role automatically via the
`handle_new_user()` trigger on `auth.users`. To bootstrap an admin: create the account
(Supabase Dashboard → Authentication → Add user, or the `POST /auth/v1/admin/users` API with
the service-role key — never commit the password), then in the SQL editor:

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users WHERE email = '<admin-email>'
ON CONFLICT DO NOTHING;
```

### Conventions

- Path alias `@/*` → `src/*`
- Server-only modules use the `*.server.ts` naming convention
- shadcn/ui primitives in `src/components/ui/`; feature components in
  `src/components/studio/` and `src/components/wardrobe/`
- Credit metering via `consumeAiCredit` (`src/lib/credits.server.ts`); client-safe helpers in
  `src/lib/credits.ts`. The premium/paywall gate is intentionally short-circuited for demo
  purposes (see the `TODO` there and in `src/lib/monetization.ts`).
