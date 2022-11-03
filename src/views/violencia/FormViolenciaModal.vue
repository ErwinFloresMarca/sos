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
      <div class="grid grid-nogutter">
        <div class="col-6">
          <ion-label for="Imagen" position="stacked">Imagen</ion-label>
          <br />
          <br />
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
        </div>
        <div class="col-6">
          <img
            class="imagen-img"
            v-if="data.img !== undefined"
            :src="fileApi.downloadUrlById(parseInt(data.img))"
            alt="imagen"
          />
          <span v-else>sin imagen</span>
        </div>
      </div>
      <ion-item>
        <ion-label for="titulo" position="floating">Título</ion-label>
        <ion-input v-model="data.titulo" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label for="descripcion" position="stacked">Descripción</ion-label>
        <Editor class="mt-2" v-model="data.descripcion"></Editor>
      </ion-item>
      <ion-accordion-group class="mt-2">
        <ion-accordion value="first">
          <ion-item slot="header" color="light">
            <ion-label>Ejemplos</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ul>
              <li v-for="(ejem, idx) in data.ejemplos" :key="`ejemplo-${idx}`">{{ ejem }}</li>
            </ul>
            <FormEjemplo ref="formEjemploRef" @save="onSaveEjemplo" />
            <ion-button v-if="!formEjemploRef?.show" class="w-full" @click="formEjemploRef.open()">
              <ion-icon :icon="addOutline"></ion-icon> Agregar
            </ion-button>
          </div>
        </ion-accordion>
        <ion-accordion value="second">
          <ion-item slot="header" color="light">
            <ion-label>Pasos</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">Second Content</div>
        </ion-accordion>
        <ion-accordion value="third">
          <ion-item slot="header" color="light">
            <ion-label>Contactos</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">Third Content</div>
        </ion-accordion>
      </ion-accordion-group>
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
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/vue';
import { addOutline, checkmarkOutline, closeOutline } from 'ionicons/icons';
import { ref } from 'vue';
import useFileApi from '@/api/modules/file';
import FormEjemplo from './formEjemplo.vue';

const formEjemploRef = ref();

const onSaveEjemplo = (val: string, idx?: number) => {
  if (data.value.ejemplos) {
    if (idx) data.value.ejemplos[idx] = val;
    else data.value.ejemplos.push(val);
  } else {
    data.value.ejemplos = [val];
  }
};

const data = ref<Partial<Violencia>>({});

const emit = defineEmits(['cancel', 'save']);
const isOpen = ref(false);

const fileApi = useFileApi();

const onUploadImage = (resp: any) => {
  const respSend = JSON.parse(resp.xhr.response);
  if (respSend.files) {
    data.value.img = respSend.files[0].id;
  }
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
