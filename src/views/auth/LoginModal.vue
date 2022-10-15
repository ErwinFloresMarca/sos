<template>
  <ion-modal :is-open="isOpen" :initial-breakpoint="0.3" :breakpoints="[0.3, 0.5]">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="success" @click="onLogin">
            <ion-icon slot="start" :icon="logInOutline"></ion-icon>
            INGRESAR
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button color="danger" @click="cancel()">CANCELAR</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label for="username" position="floating">Usuario</ion-label>
        <ion-input v-model="data.username" ref="username" type="text" placeholder="Tu usuario"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label for="password" position="floating">Contraseña</ion-label>
        <ion-input v-model="data.password" ref="password" type="password" placeholder="Tu contraseña"></ion-input>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonModal,
  IonHeader,
  IonButtons,
  IonButton,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
} from '@ionic/vue';
import { logInOutline } from 'ionicons/icons';
import { ref } from 'vue';

const data = ref<{ username?: string; password?: string }>({});

const emit = defineEmits(['cancel', 'login']);
const isOpen = ref(false);

function onLogin() {
  emit('login', { ...data.value });
}
function cancel() {
  emit('cancel');
  isOpen.value = false;
}
function open() {
  isOpen.value = true;
}

defineExpose({
  open,
});
</script>

<script lang="ts">
export default {
  name: 'LoginModal',
};
</script>

<style scoped></style>
