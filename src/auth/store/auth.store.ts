import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand'
import { loginAction } from '../actions/login.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    // Getters
    getInitialName: () => string | null;

    // Actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  // Properties
  user: null,
  token: null,
  authStatus: 'checking',

  // Getters
  getInitialName: (): string | null => {
    const user: User | null = useAuthStore.getState().user;

    if (!user) return null;

    return user.fullName.split(' ').map(name => name[0]).join('');
  },

  // Actions
  login: async(email: string, password: string) => {

    try {
        const data = await loginAction(email, password);
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token});
        return true;

    } catch (error) {
        set({ user: null, token: null});
        localStorage.removeItem('token');
        return false;
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  }
}));