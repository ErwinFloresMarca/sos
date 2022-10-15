<template>
  <div>
    <LoginModal ref="loginModal" @login="onLogin"></LoginModal>
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
import { IonButton, IonIcon } from '@ionic/vue';
import useAuth from '@/store/auth';
import UserAvatar from './UserAvatar.vue';
import { logInOutline, personAddOutline } from 'ionicons/icons';
import LoginModal from '@/views/auth/LoginModal.vue';
import { ref } from 'vue';

const loginModal = ref();

const onSignIn = () => {
  console.log('on sign in');
};

const onOpenLoginModal = () => {
  loginModal.value?.open();
};

const auth = useAuth();

const onLogin = (data: { username: string; password: string }) => {
  auth.login(data.username, data.password);
};
</script>

<script lang="ts">
export default {
  name: 'AuthMenu',
};
</script>

<style scoped></style>
