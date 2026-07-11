import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { Archive, AlertCircle, Check, Download, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { HUBS } from "@/constants/climate";
import { passwordChecks } from "@/constants/password";
import { fetchDefaultHubId, localDefaultHubId, saveDefaultHubId } from "@/lib/default-hub";
import { DevelopmentBadge } from "@/components/ui/development-badge";
import { DevelopmentNotice } from "@/components/ui/development-notice";

interface StudioMembershipDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    fullName: string;
    username: string;
    season: string | null;
    faceShape: string | null;
    hairType: string | null;
  };
}

export function StudioMembershipDrawer({ isOpen, onClose, user }: StudioMembershipDrawerProps) {
  const [view, setView] = useState<
    "membership" | "preferences" | "location" | "privacy" | "security"
  >("membership");
  const { user: authUser, signOut, signingOut } = useAuth();
  const [defaultHubId, setDefaultHubId] = useState<string>(() => localDefaultHubId() ?? HUBS[0].id);

  useEffect(() => {
    // Profile is the cross-device source of truth; refresh when the drawer opens.
    if (!isOpen || !authUser) return;
    let cancelled = false;
    fetchDefaultHubId(authUser.id).then((id) => {
      if (!cancelled && id) setDefaultHubId(id);
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen, authUser]);
  const [exporting, setExporting] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const newPasswordOk = passwordChecks.every((c) => c.test(newPassword));

  async function changeEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!newEmail.trim() || newEmail === authUser?.email) return;
    setEmailSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail.trim() });
      if (error) throw error;
      toast.success("Check both your old and new inbox to confirm the email change.");
      setNewEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update email.");
    } finally {
      setEmailSubmitting(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!newPasswordOk || newPassword !== confirmPassword || !authUser?.email) return;
    setPasswordSubmitting(true);
    try {
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: authUser.email,
        password: currentPassword,
      });
      if (reauthError) throw new Error("Current password is incorrect.");
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update password.");
    } finally {
      setPasswordSubmitting(false);
    }
  }

  async function downloadData() {
    if (!authUser || exporting) return;
    setExporting(true);
    try {
      const [profile, outfits, posts, favorites] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", authUser.id).maybeSingle(),
        supabase.from("outfits").select("*").eq("user_id", authUser.id),
        supabase.from("posts").select("*").eq("user_id", authUser.id),
        supabase.from("user_favorites").select("*").eq("user_id", authUser.id),
      ]);
      const payload = {
        exportedAt: new Date().toISOString(),
        account: { id: authUser.id, email: authUser.email },
        profile: profile.data,
        outfits: outfits.data ?? [],
        posts: posts.data ?? [],
        favorites: favorites.data ?? [],
      };
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "mila-data-export.json";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  const heading = {
    membership: { title: "Your Atelier", sub: "Client Dossier & Passes" },
    preferences: { title: "Preferences", sub: "Account Configuration" },
    location: { title: "Default Location", sub: "Climate Sync Hub" },
    privacy: { title: "Privacy & Data", sub: "Your Information" },
    security: { title: "Email & Security", sub: "Login Credentials" },
  }[view];

  const missing = [
    !user.season && "Color Season",
    !user.faceShape && "Face Shape",
    !user.hairType && "Hair Type",
  ].filter(Boolean) as string[];

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-background">
        <SheetHeader className="px-6 pt-8 pb-5 border-b border-porcelain/40 flex flex-row items-end justify-between space-y-0">
          <div className="space-y-1 text-left">
            <SheetTitle className="font-serif text-2xl text-ink tracking-wide">
              {heading.title}
            </SheetTitle>
            <SheetDescription className="text-[10px] uppercase tracking-[0.25em] text-stone">
              {heading.sub}
            </SheetDescription>
          </div>

          <button
            onClick={() =>
              setView(
                view === "membership"
                  ? "preferences"
                  : view === "preferences"
                    ? "membership"
                    : "preferences",
              )
            }
            className="text-[10px] uppercase tracking-[0.15em] text-stone hover:text-ink transition-colors underline underline-offset-4 pb-1"
          >
            {view === "membership"
              ? "Settings"
              : view === "preferences"
                ? "Back to Profile"
                : "Back to Preferences"}
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          {view === "membership" ? (
            <div className="space-y-8">
              <div className="text-center space-y-1.5 pb-6 border-b border-porcelain/30">
                <p className="font-serif text-xl text-ink">{user.fullName}</p>
                <p className="text-xs text-stone">@{user.username}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone pt-2">
                  Prevailing Season:{" "}
                  <span className="text-ink font-semibold">{user.season ?? "Unset"}</span>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-[10px] uppercase tracking-[0.2em]">
                  <span
                    className={`px-2.5 py-1 rounded-full border ${user.faceShape ? "border-porcelain/60 text-ink bg-background/60" : "border-amber-400/40 text-amber-700 bg-amber-50/60"}`}
                  >
                    Face · {user.faceShape ?? "—"}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full border ${user.hairType ? "border-porcelain/60 text-ink bg-background/60" : "border-amber-400/40 text-amber-700 bg-amber-50/60"}`}
                  >
                    Hair · {user.hairType ?? "—"}
                  </span>
                </div>
                {missing.length > 0 && (
                  <Link
                    to="/style-profile"
                    onClick={onClose}
                    className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-amber-400/40 bg-amber-50/60 text-amber-800 text-[10px] uppercase tracking-[0.2em] hover:bg-amber-50 transition-colors"
                  >
                    <AlertCircle className="size-3" strokeWidth={1.6} />
                    Complete {missing.join(", ")} in the Studio
                  </Link>
                )}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-porcelain/50 bg-linear-to-br from-atelier-champagne/30 via-background to-porcelain/20 p-6 shadow-atelier-soft">
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-atelier-champagne/30 blur-3xl pointer-events-none"
                />
                <div className="relative space-y-6">
                  <div className="flex items-end justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-stone">
                      Concierge Access
                    </span>
                    <div className="text-right">
                      <div className="font-serif text-2xl text-ink leading-none">Atelier</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-stone mt-1">
                        Membership
                      </div>
                    </div>
                  </div>

                  {/*
                    IN DEVELOPMENT [membership-passes]:
                    No pass-acquisition or partner-editorial flow is wired
                    up yet — both controls are disabled so nothing fires
                    silently when clicked.
                    See /IN_DEVELOPMENT.txt.
                  */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      disabled
                      aria-describedby="membership-passes-development-message"
                      className="w-full py-3 rounded-lg bg-ink text-white text-[11px] uppercase tracking-[0.25em] font-semibold opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Acquire Passes
                      <DevelopmentBadge className="bg-white/15 text-white border-white/25" />
                    </button>

                    <button
                      type="button"
                      disabled
                      aria-describedby="membership-passes-development-message"
                      className="w-full py-3 rounded-lg border border-stone/20 bg-background/60 text-[11px] uppercase tracking-[0.25em] text-ink opacity-60 cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      <span>View Partner Editorial</span>
                      <span className="text-[9px] text-stone normal-case tracking-normal">
                        +1 Pass
                      </span>
                    </button>

                    <DevelopmentNotice
                      id="membership-passes-development-message"
                      description="Experience a brief presentation from our luxury partners to receive a complimentary styling pass. This action is not available yet."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-px rounded-xl overflow-hidden border border-porcelain/40">
                <Link
                  to="/style-profile"
                  onClick={onClose}
                  className="flex items-center justify-between px-5 py-4 bg-background hover:bg-porcelain/20 transition-colors border-b border-porcelain/30"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-ink">
                    Review Color Dossier
                  </span>
                  <span className="text-stone">→</span>
                </Link>
                <Link
                  to="/history"
                  onClick={onClose}
                  className="flex items-center justify-between px-5 py-4 bg-background hover:bg-porcelain/20 transition-colors"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-ink flex items-center gap-2">
                    <Archive className="size-3.5" strokeWidth={1.75} />
                    Outfit Archive
                  </span>
                  <span className="text-stone">→</span>
                </Link>
              </div>
            </div>
          ) : view === "preferences" ? (
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone">
                  Account details
                </p>
                <div className="rounded-xl border border-porcelain/40 overflow-hidden">
                  <button
                    onClick={() => setView("security")}
                    className="w-full flex items-center justify-between px-5 py-4 bg-background hover:bg-porcelain/20 transition-colors border-b border-porcelain/30"
                  >
                    <span className="text-sm text-ink">Email &amp; Security</span>
                    <span className="text-stone">→</span>
                  </button>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm text-ink">Membership Tier</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-stone">Free</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone">
                  Styling parameters
                </p>
                <div className="rounded-xl border border-porcelain/40 overflow-hidden divide-y divide-porcelain/30">
                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm text-ink">Climate Measurement</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-stone">
                      Celsius (°C)
                    </span>
                  </div>
                  <button
                    onClick={() => setView("location")}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-porcelain/20 transition-colors"
                  >
                    <span className="text-sm text-ink">Default Location</span>
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-stone">
                        {HUBS.find((h) => h.id === defaultHubId)?.city}
                      </span>
                      <span className="text-stone">→</span>
                    </span>
                  </button>
                  <button
                    onClick={() => setView("privacy")}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-porcelain/20 transition-colors"
                  >
                    <span className="text-sm text-ink">Privacy &amp; Data</span>
                    <span className="text-stone">→</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-porcelain/30">
                <button
                  onClick={() => signOut()}
                  disabled={signingOut}
                  className="w-full py-3 rounded-lg border border-destructive/30 text-destructive text-[11px] uppercase tracking-[0.25em] hover:bg-destructive/5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {signingOut && <Loader2 className="size-3.5 animate-spin" />}
                  {signingOut ? "Signing Out…" : "Sign Out of Studio"}
                </button>
              </div>
            </div>
          ) : view === "location" ? (
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-stone">Climate sync hub</p>
              <div className="rounded-xl border border-porcelain/40 overflow-hidden divide-y divide-porcelain/30">
                {HUBS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      setDefaultHubId(h.id);
                      void saveDefaultHubId(authUser?.id, h.id);
                      setView("preferences");
                    }}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-porcelain/20 transition-colors"
                  >
                    <span className="text-sm text-ink">{h.city}</span>
                    <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-stone">
                      {h.tagline}
                      {defaultHubId === h.id && (
                        <Check className="size-3.5 text-ink" strokeWidth={1.6} />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-stone leading-relaxed px-1">
                Your default hub sets the dashboard climate sync each time you open the studio.
              </p>
            </div>
          ) : view === "security" ? (
            <div className="space-y-8">
              <form onSubmit={changeEmail} className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone">Email address</p>
                <p className="text-xs text-stone">
                  Current: <span className="text-ink">{authUser?.email}</span>
                </p>
                <Input
                  type="email"
                  placeholder="new@email.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="h-10"
                />
                <button
                  type="submit"
                  disabled={emailSubmitting || !newEmail.trim() || newEmail === authUser?.email}
                  className="w-full py-3 rounded-lg bg-ink text-white text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-ink/90 transition-colors disabled:opacity-50"
                >
                  {emailSubmitting ? "Sending confirmation…" : "Update Email"}
                </button>
              </form>

              <form
                onSubmit={changePassword}
                className="space-y-3 pt-6 border-t border-porcelain/30"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone">
                  Change password
                </p>
                <Input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-10"
                />
                <Input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-10"
                />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10"
                />
                {newPassword && (
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                    {passwordChecks.map((c) => {
                      const ok = c.test(newPassword);
                      return (
                        <li
                          key={c.label}
                          className={`flex items-center gap-1.5 text-[11px] ${
                            ok ? "text-emerald-600" : "text-stone"
                          }`}
                        >
                          {ok ? <Check className="size-3" /> : <X className="size-3" />}
                          {c.label}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-[11px] text-destructive">Passwords don't match.</p>
                )}
                <button
                  type="submit"
                  disabled={
                    passwordSubmitting ||
                    !currentPassword ||
                    !newPasswordOk ||
                    newPassword !== confirmPassword
                  }
                  className="w-full py-3 rounded-lg bg-ink text-white text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-ink/90 transition-colors disabled:opacity-50"
                >
                  {passwordSubmitting ? "Updating…" : "Update Password"}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone">Your data</p>
                <p className="text-xs text-stone leading-relaxed">
                  Mila stores your style profile, outfit analyses, community posts, and favorites to
                  tailor your recommendations. Your data is never sold and is only used within the
                  studio.
                </p>
                <button
                  onClick={downloadData}
                  disabled={exporting}
                  className="w-full py-3 rounded-lg border border-stone/20 bg-background/60 text-[11px] uppercase tracking-[0.25em] text-ink hover:bg-accent-soft dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  {exporting ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Download className="size-3.5" strokeWidth={1.75} />
                  )}
                  <span>{exporting ? "Preparing export…" : "Download My Data"}</span>
                </button>
                <p className="text-[10px] text-stone leading-relaxed">
                  Exports your profile, outfits, posts, and favorites as JSON.
                </p>
              </div>

              <div className="pt-4 border-t border-porcelain/30 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone">
                  Account removal
                </p>
                <p className="text-[10px] text-stone leading-relaxed">
                  To permanently delete your account and all associated data, contact the concierge
                  from your registered email address.
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
