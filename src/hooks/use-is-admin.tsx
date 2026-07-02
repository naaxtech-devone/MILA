import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { adminAmIAdmin } from "@/lib/admin.functions";
import { queryKeys } from "@/constants/query-keys";

export function useIsAdmin() {
  const { user } = useAuth();
  const fn = useServerFn(adminAmIAdmin);
  const { data } = useQuery({
    queryKey: queryKeys.isAdmin(user?.id),
    queryFn: () => fn(),
    enabled: !!user,
    staleTime: 5 * 60_000,
  });
  return !!data?.is_admin;
}
