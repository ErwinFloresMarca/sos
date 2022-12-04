<template>
  <ion-modal :is-open="show">
    <!-- :initial-breakpoint="0.3" :breakpoints="[0.3, 0.5]" -->
    <ion-header>
      <ion-toolbar color="themem">
        <ion-buttons slot="start">
          <ion-button color="success" @click="onSave">
            <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="text-center">{{ index ? 'EDITAR' : 'NUEVO' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button color="danger" @click="onCancel">
            <ion-icon slot="start" :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content color="themel" class="ion-padding content-container">
      <ion-item>
        <ion-label position="floating">titulo contactos:</ion-label>
        <ion-textarea v-model="value.titulo" placeholder="Titulo"></ion-textarea>
      </ion-item>
      <div class="ion-padding">
        <h5>ENTIDADES:</h5>
        <br />
        <div class="w-full">
          <CardEntidad
            v-for="(entidad, idx) in value.entidades"
            :key="`paso-${idx}`"
            :entidad="entidad"
            :position="idx + 1"
          />
          <FormEntidad ref="formEntidadRef" @save="onSaveEntidad" />
          <ion-button v-if="!formEntidadRef?.show" class="w-full" @click="formEntidadRef.open()">
            <ion-icon :icon="addOutline"></ion-icon> Agregar
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ContactoType, EntidadType } from '@/api/types';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonIcon,
  IonTextarea,
  IonContent,
  IonHeader,
  IonModal,
  IonButtons,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';
import { closeOutline, checkmarkOutline, addOutline } from 'ionicons/icons';
import { ref } from 'vue';
import CardEntidad from './CardEntidad.vue';
import FormEntidad from './FormEntidad.vue';

const emit = defineEmits(['save']);

const value = ref<Partial<ContactoType>>({});
const index = ref();
const show = ref(false);

// Entidad
const formEntidadRef = ref();

const onSaveEntidad = (entidad: EntidadType) => {
  if (value.value.entidades) {
    value.value.entidades.push(entidad);
  } else {
    value.value.entidades = [entidad];
  }
};

const onSave = () => {
  emit('save', value.value, index.value);
  close();
};

const onCancel = () => {
  close();
};

const open = (val?: ContactoType, i?: number) => {
  value.value = val || {};
  index.value = i;
  show.value = true;
};
const close = () => {
  show.value = false;
  value.value = {};
  index.value = undefined;
};

defineExpose({
  open,
  show,
  close,
});
</script>

<style scoped>
.content-container {
  height: calc(100vh - 60px);
}
</style>
