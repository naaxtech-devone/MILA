import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import {
  adminAmIAdmin,
  adminDashboardStats,
  adminListUsers,
  adminListPosts,
  adminListSupportMessages,
} from "@/lib/admin.functions";

export function adminGateQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.isAdminGate,
    queryFn: () => adminAmIAdmin(),
  });
}

export function adminDashboardQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.adminDashboard,
    queryFn: () => adminDashboardStats(),
  });
}

export function adminMembersQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.adminUsers,
    queryFn: () => adminListUsers(),
  });
}

export function adminModerationQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.adminPosts,
    queryFn: () => adminListPosts(),
  });
}

export function adminSupportQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.adminSupportMessages,
    queryFn: () => adminListSupportMessages(),
  });
}
