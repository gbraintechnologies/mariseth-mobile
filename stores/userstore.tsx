import { user } from "@/types/user";
import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const key = process.env.EXPO_PUBLIC_LOCAL_DB_KEY;

const storage = new MMKV({
  id: "auth-storage",
  encryptionKey: key,
});

export interface userStoreProps {
  user: user | null;
  notificationEnabled: boolean;
  soundEnabled: boolean;
  notifications: any[];
  unreadNotificationCount: number;
  fcmToken: string;
}

const zustandStorage = {
  setItem: (name: string, value: string) => {
    return storage.set(name, value);
  },
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    return storage.delete(name);
  },
};
export const userStore = create(
  persist<userStoreProps>(
    (set) => ({
      user: null,
      notificationEnabled: true,
      soundEnabled: true,
      notifications: [],
      unreadNotificationCount: 0,
      fcmToken: "",
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
