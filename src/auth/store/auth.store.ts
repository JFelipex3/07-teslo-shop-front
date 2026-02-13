import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand'
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    // Getters
    getInitialName: () => string | null;
    isAdmin: () => boolean;

    // Actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    chechAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
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

  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes('admin');
  },

  // Actions
  login: async(email: string, password: string) => {

    try {
        const data = await loginAction(email, password);
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token, authStatus: 'authenticated' });
        return true;

    } catch (error) {
        set({ user: null, token: null, authStatus: 'not-authenticated' });
        localStorage.removeItem('token');
        return false;
    }
  },

  logout: () => {
    set({ user: null, token: null, authStatus: 'not-authenticated' });
    localStorage.removeItem('token');
  },

  chechAuthStatus: async() => {
    try {
        const { user, token} = await checkAuthAction();
        set({
            user: user,
            token: token,
            authStatus: 'authenticated'
        });

        return true;

    } catch (error) {
        set({
            user: undefined,
            token: undefined,
            authStatus: 'not-authenticated'
        });

        return false;
    }
  }
}));