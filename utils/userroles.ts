import { user } from "@/types/user";

export function isAdminUser(userData?: user | null) {
  return userData?.user_type?.toLowerCase() === "admin";
}
