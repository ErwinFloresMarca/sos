<template>
  <div class="card-entidad">
    <div class="entidad-header" @click="tootgleShow">
      <strong>PASO {{ position }}:</strong> {{ entidad.nombre }}
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
      <div class="col-12 flex flex-wrap justify-content-between">
        <ion-button class="w-full" color="dark">
          <ion-icon :icon="navigateCircleOutline"></ion-icon> Ubicación
        </ion-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonButton } from '@ionic/vue';
import { EntidadType } from '@/api/types';
import { PropType, ref } from 'vue';
import { callOutline, navigateCircleOutline } from 'ionicons/icons';

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
  cursor: pointer;
  background-color: rgb(180, 248, 255);
  padding: 5px;
}
</style>
