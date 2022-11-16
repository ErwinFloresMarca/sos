<template>
  <div v-if="show">
    <ion-item>
      <ion-label position="floating">titulo paso:</ion-label>
      <ion-textarea v-model="value.titulo" placeholder="Titulo"></ion-textarea>
    </ion-item>
    <ion-item>
      <ion-label :position="'stacked'">Paso:</ion-label>
      <Editor v-model="value.descripcion" class="mt-2" placeholder="detalle de paso"></Editor>
    </ion-item>
    <div class="flex flex-wrap justify-content-between">
      <ion-button color="success" class="w-5" @click="onSave">
        <ion-icon class="mr-2" :icon="saveOutline"></ion-icon> AGREGAR
      </ion-button>
      <ion-button color="danger" class="w-5" @click="onCancel">
        <ion-icon class="mr-2" :icon="closeOutline"></ion-icon> Cancelar
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PasoType } from '@/api/types';
import { IonButton, IonItem, IonLabel, IonIcon, IonTextarea } from '@ionic/vue';
import { saveOutline, closeOutline } from 'ionicons/icons';
import Editor from 'primevue/editor';
import { ref } from 'vue';

const emit = defineEmits(['save']);

const value = ref<PasoType>({});
const index = ref();
const show = ref(false);
const onSave = () => {
  emit('save', value.value, index.value);
  close();
};

const onCancel = () => {
  close();
};

const open = (val?: PasoType, i?: number) => {
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

<style scoped></style>
