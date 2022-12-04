<template>
  <div v-if="show">
    <ion-item>
      <ion-label position="floating">Nombre entidad:</ion-label>
      <ion-textarea v-model="value.nombre" placeholder="Titulo"></ion-textarea>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Dirección:</ion-label>
      <ion-textarea v-model="value.direccion" placeholder="Titulo"></ion-textarea>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Teléfono:</ion-label>
      <ion-textarea v-model="value.telefono" placeholder="Titulo"></ion-textarea>
    </ion-item>
    <div class="w-full">
      <ion-label position="stacked">Ubicación:</ion-label>
      <div class="map-comtainer w-full" style="height: 300px">
        <MapLatLng :key="mapKey" v-model="currentPosition" />
      </div>
    </div>
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
import { Geolocation } from '@capacitor/geolocation';
import MapLatLng from '@/components/MapLatLng.vue';
import { EntidadType } from '@/api/types';
import { IonButton, IonItem, IonLabel, IonIcon, IonTextarea } from '@ionic/vue';
import { saveOutline, closeOutline } from 'ionicons/icons';
import { computed, ref } from 'vue';

const emit = defineEmits(['save']);

const value = ref<Partial<EntidadType>>({});
const index = ref();
const show = ref(false);
const mapKey = ref();
const onSave = () => {
  emit('save', value.value, index.value);
  close();
};

const onCancel = () => {
  close();
};

const currentPosition = computed<any>({
  get: () => {
    if (value.value.ubicacion) return value.value.ubicacion;
    else {
      return {};
    }
  },
  set: (newVal: { lat: number; lng: number }) => (value.value.ubicacion = newVal),
});

const open = async (val?: EntidadType, i?: number) => {
  value.value = val || {};
  if (!value.value.ubicacion) {
    const coordinates = await Geolocation.getCurrentPosition();
    value.value.ubicacion = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
  }
  index.value = i;
  show.value = true;
  setTimeout(() => {
    mapKey.value = `key-map_${parseInt(`${Math.random() * 1000}`)}`;
  }, 400);
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
.map-container {
  height: 300px;
  width: 100%;
}
</style>
