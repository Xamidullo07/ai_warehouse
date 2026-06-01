import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock foydalanuvchi bazasi (localStorage'da saqlanadi)
const getStoredUsers = (): any[] => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem('warehouse_users');
  return users ? JSON.parse(users) : [];
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const users = getStoredUsers();
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
          set({ 
            user: { id: user.id, name: user.name, email: user.email }, 
            isAuthenticated: true 
          });
          return true;
        }
        return false;
      },

      register: async (name: string, email: string, password: string) => {
        const users = getStoredUsers();
        
        // Email allaqachon mavjudligini tekshirish
        if (users.some((u: any) => u.email === email)) {
          return false; 
        }

        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password // Haqiqiy loyihada hech qachon parolni shunday saqlamang!
        };

        users.push(newUser);
        localStorage.setItem('warehouse_users', JSON.stringify(users));
        
        // Ro'yxatdan o'tgandan so'ng avtomatik kirish
        set({ 
          user: { id: newUser.id, name: newUser.name, email: newUser.email }, 
          isAuthenticated: true 
        });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', // LocalStorage kaliti
    }
  )
);