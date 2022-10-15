<template>
  <div class="flex flex-wrap flex-column align-items-center">
    <ion-avatar>
      <img alt="user" :src="userAvatar" />
    </ion-avatar>
    <span class="text-xl mt-2 font-bold">{{ nombreCompleto }}</span>
    <ion-button fill="clear" color="danger" @click="onLogOut">
      <ion-icon :icon="logOutOutline"></ion-icon> Cerrar sesión
    </ion-button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserAvatar',
};
</script>

<script setup lang="ts">
import { alertController, IonButton, IonIcon } from '@ionic/vue';
import useFileApi from '@/api/modules/file';
import useAuth from '@/store/auth';
import { IonAvatar } from '@ionic/vue';
import { computed } from 'vue';
import { logOutOutline } from 'ionicons/icons';

const auth = useAuth();
const fileApi = useFileApi();

const nombreCompleto = computed<string>({
  get: () => `${auth.user?.nombres} ${auth.user?.paterno} ${auth.user?.materno}`,
  set: (newVal) => newVal,
});
const userAvatar = computed<string>({
  get: () => (auth.user?.avatar ? fileApi.downloadUrl(auth.user?.avatar) : '/images/avatar/circle.png'),
  set: (newVal) => newVal,
});

async function onLogOut() {
  const alert = await alertController.create({
    header: '¿Esta seguro de cerrar su sesión?',
    cssClass: 'custom-alert',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'alert-btn alert-no-btn',
      },
      {
        text: 'Si',
        handler: () => {
          auth.logout();
        },
        cssClass: 'alert-btn alert-si-btn',
      },
    ],
  });
  alert.present();
}
</script>

<style>
ion-alert.custom-alert {
  --backdrop-opacity: 0.7;
  text-align: center;
}

ion-alert.custom-alert .alert-button-group {
  padding: 8px;
}
button.alert-button.alert-btn {
  width: 45%;
  border: 0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);
}
button.alert-button.alert-no-btn {
  background-color: var(--ion-color-danger);
  color: var(--ion-color-danger-contrast);
  border-bottom-left-radius: 13px;
  border-top-left-radius: 13px;
}
button.alert-button.alert-si-btn {
  background-color: var(--ion-color-success);
  color: var(--ion-color-success-contrast);
  border-bottom-right-radius: 13px;
  border-top-right-radius: 13px;
}
</style>
