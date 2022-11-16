<template>
  <div class="w-full">
    <ion-button class="w-full" color="success" @click="toggleShow">
      <div class="w-full flex flex-wrap justify-content-between">
        <span>{{ contacto.titulo }}</span> <ion-icon :icon="arrowForwardOutline"></ion-icon>
      </div>
    </ion-button>
    <ion-modal :is-open="show">
      <!-- :initial-breakpoint="0.3" :breakpoints="[0.3, 0.5]" -->
      <ion-header>
        <ion-toolbar>
          <ion-title class="text-center">Entidades</ion-title>
          <ion-buttons slot="end">
            <ion-button color="danger" @click="toggleShow">
              <ion-icon slot="start" :icon="closeOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding content-container">
        <div class="w-full">
          <CardEntidad
            v-for="(entidad, idx) in contacto.entidades"
            :key="`paso-${idx}`"
            :entidad="entidad"
            :position="idx + 1"
          />
        </div>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { ContactoType } from '@/api/types';
import { IonButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from '@ionic/vue';
import { arrowForwardOutline, closeOutline } from 'ionicons/icons';
import { PropType, ref } from 'vue';
import CardEntidad from './CardEntidad.vue';

defineProps({
  contacto: {
    type: Object as PropType<ContactoType>,
    required: true,
  },
});

const show = ref(false);

const toggleShow = () => {
  show.value = !show.value;
};
</script>

<style scoped>
.content-container {
  height: calc(100vh - 60px);
}
</style>
