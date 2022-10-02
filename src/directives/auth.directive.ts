/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from '@/store/auth';

export default {
  beforeMount: (el: any, binding: { value: boolean }, vnode: any) => {
    const auth = useAuth();
    const validate = (isAuth: boolean) => {
      if (auth.isLoggedIn !== isAuth) {
        vnode.el.style.display = 'none';
      }
      vnode.el.style.display = 'inline';
    };
    auth.$subscribe(() => validate(binding.value));
    validate(binding.value);
  },
};
