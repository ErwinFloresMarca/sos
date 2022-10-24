<template>
  <div class="content-linea-emergencia flex flex-wrap justify-content-between mt-2">
    <img class="image-container" :src="rutaImg" />
    <div class="pt-1 text-center">
      <div class="number-spam">{{ linea.numero }}</div>
      <div class="title-spam">{{ linea.titulo }}</div>
    </div>
    <a class="icon-phone" :href="`tel:${linea.numero}`">
      <ion-icon color="success" :icon="callOutline"></ion-icon>
    </a>
  </div>
</template>

<script setup lang="ts">
import useFileApi from '@/api/modules/file';
import { Linea } from '@/api/types';
import { IonIcon } from '@ionic/vue';
import { callOutline } from 'ionicons/icons';
import { computed, PropType } from 'vue';

const fileApi = useFileApi();

const props = defineProps({
  linea: {
    type: Object as PropType<Linea>,
    required: true,
  },
});

const rutaImg = computed<string>({
  get: () => (props.linea.imgId ? fileApi.downloadUrlById(props.linea.imgId) : '/imgs/imagen de alerta.jpg'),
  set: (newVal) => newVal,
});
</script>

<script lang="ts">
export default {
  name: 'CardLineaEmergencia',
};
</script>

<style scoped>
.image-container {
  width: 64px;
  height: 73px;
  object-fit: cover;
  background-color: var(--ion-color-danger);
  border-radius: 10px;
}
.content-linea-emergencia {
  background-color: #00000011;
  border-radius: 15px;
  padding: 0px;
}
.number-spam {
  font-size: 2rem;
  font-weight: bold;
  padding-top: 4px;
  color: var(--ion-color-success);
}
.title-spam {
  /* font-size: 2rem; */
  font-weight: bold;
  color: orange;
}
.icon-phone {
  font-size: 3.5rem;
  background-color: var(--ion-color-danger);
  border-radius: 10px;
  padding-top: 4px;
}
</style>
