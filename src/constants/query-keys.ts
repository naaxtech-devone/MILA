// Central TanStack Query keys — fetch and invalidate sites must agree on these.
export const queryKeys = {
  profile: (userId: string | undefined) => ["profile", userId] as const,
  feed: (userId: string | undefined) => ["feed", userId] as const,
  isAdmin: (userId: string | undefined) => ["isAdmin", userId] as const,
  suspended: (userId: string | undefined) => ["suspended", userId] as const,
  credits: (userId: string | undefined) => ["credits", userId] as const,
  isAdminGate: ["isAdmin:gate"] as const,
  adminUsers: ["admin:users"] as const,
  adminPosts: ["admin:posts"] as const,
};
