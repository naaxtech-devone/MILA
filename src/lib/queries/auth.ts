import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { adminGateQueryOptions } from "@/lib/queries/admin";
import { profileQueryOptions } from "@/lib/queries/profile";
import { isStyleProfileComplete } from "@/lib/style-profile/completion";

export type AuthenticatedDestination = "/admin" | "/onboarding/style-profile" | "/dashboard";

export interface AuthenticatedViewerState {
  isAdmin: boolean;
  isStyleProfileComplete: boolean;
  destination: AuthenticatedDestination;
}

export function resolveAuthenticatedDestination(input: {
  isAdmin: boolean;
  isStyleProfileComplete: boolean;
}): AuthenticatedDestination {
  if (input.isAdmin) return "/admin";
  if (!input.isStyleProfileComplete) return "/onboarding/style-profile";
  return "/dashboard";
}

/**
 * Route-loader-friendly: reuses the query cache via ensureQueryData, so a
 * component rendering after the loader doesn't re-fetch. Suspension is
 * intentionally not modeled here — _authenticated.tsx's existing
 * suspended-account gate covers every destination this function can
 * return, regardless of which one is picked.
 */
export async function loadAuthenticatedViewerState(
  queryClient: QueryClient,
  userId: string,
): Promise<AuthenticatedViewerState> {
  const [gate, profile] = await Promise.all([
    queryClient.ensureQueryData(adminGateQueryOptions()),
    queryClient.ensureQueryData(profileQueryOptions(userId)),
  ]);
  const isAdmin = !!gate?.is_admin;
  const complete = isStyleProfileComplete({
    skin_undertone: profile.skin_undertone,
    color_season: profile.color_season_base,
    body_type: profile.body_type,
    face_shape: profile.face_shape,
    hair_type: profile.hair_type,
    color_profile: profile.color_profile,
  });
  return {
    isAdmin,
    isStyleProfileComplete: complete,
    destination: resolveAuthenticatedDestination({ isAdmin, isStyleProfileComplete: complete }),
  };
}

export function useAuthenticatedViewerState(userId: string | undefined) {
  const gateQuery = useQuery({ ...adminGateQueryOptions(), enabled: !!userId });
  const profileQuery = useQuery({ ...profileQueryOptions(userId), enabled: !!userId });
  const isAdmin = !!gateQuery.data?.is_admin;
  const complete = isStyleProfileComplete(
    profileQuery.data
      ? {
          skin_undertone: profileQuery.data.skin_undertone,
          color_season: profileQuery.data.color_season_base,
          body_type: profileQuery.data.body_type,
          face_shape: profileQuery.data.face_shape,
          hair_type: profileQuery.data.hair_type,
          color_profile: profileQuery.data.color_profile,
        }
      : null,
  );
  return {
    isLoading: gateQuery.isLoading || profileQuery.isLoading,
    isAdmin,
    isStyleProfileComplete: complete,
    destination: resolveAuthenticatedDestination({ isAdmin, isStyleProfileComplete: complete }),
  };
}
