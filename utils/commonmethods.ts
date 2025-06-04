import { useUniversalStore } from "@/stores/useuniversalstore";

export function getInitials(name: string): string {
  if (typeof name !== "string" || !name.trim()) return "";

  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return initials;
}

export function updateSegmentedOption(key: string, option: string) {
  useUniversalStore.setState((state) => ({
    selectedSegmentedOption: {
      ...state.selectedSegmentedOption,
      key: option,
    },
  }));
}
