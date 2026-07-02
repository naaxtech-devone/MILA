import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme, type Theme } from "@/components/theme-provider";

const NEXT: Record<Theme, Theme> = { light: "dark", dark: "system", system: "light" };

const ICONS: Record<Theme, typeof Sun> = { light: Sun, dark: Moon, system: SunMoon };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = ICONS[theme];

  return (
    <button
      type="button"
      onClick={() => setTheme(NEXT[theme])}
      aria-label={`Theme: ${theme}. Switch to ${NEXT[theme]}`}
      title={`Theme: ${theme}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-porcelain/60 bg-background/60 backdrop-blur text-ink hover:border-porcelain transition-colors"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
}
