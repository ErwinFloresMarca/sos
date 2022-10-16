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
        <ion-title class="text-center">{{ data.id ? 'EDITAR' : 'NUEVO' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button color="danger" @click="cancel()">
            <ion-icon slot="start" :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label for="Imagen" position="stacked">Imagen</ion-label>
        <FileUpload
          mode="basic"
          name="file[]"
          :url="fileApi.createUrl()"
          accept="image/*"
          :maxFileSize="1000000"
          :auto="true"
          chooseLabel="Browse"
          @upload="onUploadImage"
        />
      </ion-item>
      <ion-item>
        <ion-label for="titulo" position="floating">Título</ion-label>
        <ion-input v-model="data.titulo" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label for="descripcion" position="stacked">Descripción</ion-label>
        <Editor class="mt-2" v-model="data.descripcion"></Editor>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { Violencia } from '@/api/types';
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';
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
import useFileApi from '@/api/modules/file';

const data = ref<Partial<Violencia>>({});

const emit = defineEmits(['cancel', 'save']);
const isOpen = ref(false);

const fileApi = useFileApi();

const onUploadImage = (resp: any) => {
  JSON.parse(resp.xhr.response);
};

function onSave() {
  emit('save', { ...data.value });
}

function cancel() {
  emit('cancel');
  close();
}

function open(v?: Violencia) {
  if (v) {
    data.value = v;
  }
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
  name: 'FormViolenciaModal',
};
</script>

<style scoped></style>
