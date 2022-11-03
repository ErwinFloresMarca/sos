<template>
  <ion-modal :is-open="isOpen">
    <!-- :initial-breakpoint="0.3" :breakpoints="[0.3, 0.5]" -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="success" @click="onSave">
            <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="text-center">AGREGAR</ion-title>
        <ion-buttons slot="end">
          <ion-button color="danger" @click="cancel()">
            <ion-icon slot="start" :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label for="Usuario" position="floating">Buscar Usuario</ion-label>
        <div class="search-input-group">
          <ion-input v-model="data.parentType" type="text"></ion-input>
          <ion-button> <ion-icon :icon="searchOutline"></ion-icon> </ion-button>
        </div>
      </ion-item>
      <ion-item>
        <ion-label for="titulo" position="floating">Tipo de pariente</ion-label>
        <ion-input v-model="data.parentType" type="text"></ion-input>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { Pariente } from '@/api/types';
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
import { checkmarkOutline, closeOutline, searchOutline } from 'ionicons/icons';
import { ref } from 'vue';

const props = defineProps({
  tipo: {
    type: String,
    required: true,
  },
});

const data = ref<Partial<Pariente>>({});

const emit = defineEmits(['cancel', 'save']);
const isOpen = ref(false);

function onSave() {
  emit('save', { ...data.value, tipo: props.tipo });
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
  name: 'FormParienteModal',
};
</script>

<style scoped>
.imagen-img {
  height: 100px;
}
.search-input-group {
  display: grid;
  grid-template-columns: auto 70px;
}
</style>
