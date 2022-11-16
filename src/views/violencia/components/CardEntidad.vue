<template>
  <div class="card-entidad">
    <div class="entidad-header" @click="tootgleShow">
      <strong>{{ entidad.nombre }}</strong>
      <ion-icon :icon="showDescription ? removeCircleOutline : addCircleOutline"></ion-icon>
    </div>
    <div v-if="showDescription" class="entidad-content grid grid-nogutter">
      <div class="col-12 flex flex-wrap justify-content-between">
        <span>Dirección: </span><strong>{{ entidad.direccion }}</strong>
      </div>
      <div class="col-12 flex flex-wrap justify-content-between">
        <span>Teléfono: </span
        ><strong>
          <a class="ion-button ion-button-rounded" :href="`tel:${entidad.telefono}`"
            >{{ entidad.telefono }}<ion-icon :icon="callOutline"></ion-icon
          ></a>
        </strong>
      </div>
      <div v-if="entidad.ubicacion" class="col-12 flex flex-wrap justify-content-center">
        <a
          class=""
          :href="`https://www.google.com/maps/search/?api=1&query=${entidad.ubicacion.lat},${entidad.ubicacion.lng}`"
        >
          <ion-icon :icon="navigateCircleOutline"></ion-icon> Ubicación
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { EntidadType } from '@/api/types';
import { PropType, ref } from 'vue';
import { addCircleOutline, callOutline, navigateCircleOutline, removeCircleOutline } from 'ionicons/icons';

defineProps({
  entidad: {
    type: Object as PropType<EntidadType>,
    required: true,
  },
  position: {
    type: Number,
    default: undefined,
  },
});

const showDescription = ref(false);

const tootgleShow = () => {
  showDescription.value = !showDescription.value;
};
</script>

<style scoped>
.card-entidad {
  border: 3px solid rgb(150, 213, 230);
  border-radius: 5px;
}
.entidad-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  cursor: pointer;
  background-color: rgb(180, 248, 255);
  padding: 5px;
}
</style>
