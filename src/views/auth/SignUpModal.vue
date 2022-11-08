<template>
  <ion-modal :is-open="isOpen">
    <!-- :initial-breakpoint="0.3" :breakpoints="[0.3, 0.5]" -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="success" @click="onSave">
            <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
            GUARDAR
          </ion-button>
        </ion-buttons>
        <ion-title class="text-center">DATOS</ion-title>
        <ion-buttons slot="end">
          <ion-button color="danger" @click="cancel()">
            <ion-icon slot="start" :icon="closeOutline"></ion-icon>
            CANCELAR
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding form-container">
      <ion-item>
        <ion-label for="username" position="floating">Usuario</ion-label>
        <ion-input v-model="data.usuario" ref="username" type="text" placeholder="Usuario"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label for="nombres" position="floating">Nombres</ion-label>
        <ion-input v-model="data.nombres" ref="nombres" type="text" placeholder="Nombre"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label for="paterno" position="floating">Ap. paterno</ion-label>
        <ion-input v-model="data.paterno" ref="paterno" type="text" placeholder="Apellido paterno"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label for="materno" position="floating">Ap. materno</ion-label>
        <ion-input v-model="data.materno" ref="materno" type="text" placeholder="Apellido materno"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label for="celular" position="floating">Celular</ion-label>
        <ion-input v-model="data.celular" ref="celular" type="text" placeholder="Celular"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label for="ci" position="floating">Carnet de identidad</ion-label>
        <ion-input v-model="data.ci" ref="ci" type="text" placeholder="carnet de identidad"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label for="password" position="floating">Contraseña</ion-label>
        <ion-input v-model="data.password" ref="password" type="password" placeholder="contraseña"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label for="passwordConfirm" position="floating">Confirmar contraseña</ion-label>
        <ion-input
          v-model="data.passwordConfirm"
          ref="passwordConfirm"
          type="password"
          placeholder="Repita su contraseña"
        ></ion-input>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { Usuario } from '@/api/types';
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
  IonTitle,
} from '@ionic/vue';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
import { ref } from 'vue';

const data = ref<Partial<Usuario & { password: string; passwordConfirm: string }>>({});

const emit = defineEmits(['cancel', 'signup']);
const isOpen = ref(false);

function onSave() {
  emit('signup', { ...data.value });
}
function cancel() {
  emit('cancel');
  close();
}
function open() {
  isOpen.value = true;
}

function close() {
  data.value = {};
  isOpen.value = false;
}

defineExpose({
  open,
  close,
});
</script>

<script lang="ts">
export default {
  name: 'SignUpModal',
};
</script>

<style scoped>
.form-container {
  height: calc(100% - 70px);
}
</style>
