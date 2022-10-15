<template>
  <div>
    <LoginModal ref="loginModalRef" @login="onLogin"></LoginModal>
    <SignUpModal ref="signUpModelRef" @signup="onSigUp"></SignUpModal>
    <IonButton class="w-full" v-if="!auth.isLoggedIn" color="warning" @click="onSignIn">
      <ion-icon slot="start" :icon="personAddOutline"></ion-icon>
      REGISTRARSE
    </IonButton>
    <IonButton class="w-full" v-if="!auth.isLoggedIn" color="success" @click="onOpenLoginModal">
      <ion-icon slot="start" :icon="logInOutline"></ion-icon>
      INICIAR SESIÓN
    </IonButton>
    <UserAvatar v-else></UserAvatar>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, toastController } from '@ionic/vue';
import useAuth from '@/store/auth';
import UserAvatar from './UserAvatar.vue';
import { checkmarkOutline, closeOutline, logInOutline, personAddOutline } from 'ionicons/icons';
import LoginModal from '@/views/auth/LoginModal.vue';
import SignUpModal from '@/views/auth/SignUpModal.vue';
import { ref } from 'vue';
import { Usuario } from '@/api/types';
import useUsuarioApi from '@/api/modules/usuario';
import { showToast } from '@/helpers/toast.helper';

const usuarioApi = useUsuarioApi();
const loginModalRef = ref();
const signUpModelRef = ref();

const onSignIn = () => {
  signUpModelRef.value?.open();
};

const onOpenLoginModal = () => {
  loginModalRef.value?.open();
};

const auth = useAuth();

const onLogin = async (data: { username: string; password: string }) => {
  const logged = await auth.login(data.username, data.password);
  if (logged) {
    loginModalRef.value?.close();
  }
};

const onSigUp = async (data: Usuario & { password: string; passwordConfirm: string }) => {
  if (data.password !== data.passwordConfirm) {
    const onError = await toastController.create({
      color: 'danger',
      duration: 3000,
      message: 'La contraseñas no son iguales',
      header: 'Error!',
      icon: closeOutline,
      position: 'bottom',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
        },
      ],
    });
    onError.present();
    return;
  }
  await usuarioApi
    .create({ ...data, passwordConfirm: undefined })
    .then(async (resp) => {
      const onSuccess = await toastController.create({
        color: 'success',
        duration: 3000,
        message: 'Registrado!',
        icon: checkmarkOutline,
        position: 'bottom',
        buttons: [
          {
            text: 'X',
            role: 'cancel',
          },
        ],
      });
      onSuccess.present();
      signUpModelRef.value?.close();
      auth.login(data.usuario, data.password);
    })
    .catch(async (err) => {
      const onError = await toastController.create({
        color: 'danger',
        duration: 3000,
        message: err.error.code,
        header: 'Error!',
        icon: closeOutline,
        position: 'bottom',
        buttons: [
          {
            text: 'X',
            role: 'cancel',
          },
        ],
      });
      onError.present();
    });
};
</script>

<script lang="ts">
export default {
  name: 'AuthMenu',
};
</script>

<style scoped></style>
