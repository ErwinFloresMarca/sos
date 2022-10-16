import { defineStore } from 'pinia';
import useAuthApi from '@/api/modules/auth';
import useUserApi from '@/api/modules/usuario';
import router from '@/router';
import { Usuario } from '@/api/types';
import { ApiRol } from '@/types';

interface Auth {
  dark: boolean;
}
export const DARK_MODE_STORE_KEY = 'dark_mode_store';
const useAuth = defineStore({
  // id de estado
  id: DARK_MODE_STORE_KEY,
  state: (): Auth => {
    return {
      dark: false,
    };
  },
  // pinia mutations actions
  actions: {
    isDark() {
      return this.dark;
    },
  },
});

export default useAuth;
