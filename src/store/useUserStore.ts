import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type UserRole = "rider" | "driver";

interface Location {
  lat: number;
  lng: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: Location;
}

interface AppState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;

  // Actions
  setLogin: (user: User, token: string) => void;
  logout: () => void;
  updateLocation: (location: Location) => void;
}

const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    user: null,
    token: localStorage.getItem("token"),
    isLoggedIn: !!localStorage.getItem("token"),

    setLogin: (user, token) => {
      localStorage.setItem("token", token);
      set({ user, token, isLoggedIn: true });
    },

    logout: () => {
      localStorage.removeItem("token");
      set({ user: null, token: null, isLoggedIn: false });
    },

    updateLocation: (location) => {
      const user = get().user;
      if (user) {
        const updatedUser = { ...user, location };
        set({ user: updatedUser });
      }
    },
  }))
);

export default useAppStore;
