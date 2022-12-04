<template>
  <ion-page>
    <ion-content color="themel" class="ion-padding">
      <div class="map-comtainer">
        <MapLatLng :key="mapKey" v-model="currentPosition" />
      </div>
      <ion-button v-if="!isActiveGeoLocation" color="success" class="w-full" @click="startGeoLocation">
        <ion-icon class="mr-3" :icon="locateOutline"></ion-icon> Iniciar Localización
      </ion-button>
      <ion-button v-else color="danger" class="w-full" @click="stopGeoLocation">
        <ion-icon class="mr-3" :icon="closeOutline"></ion-icon> Detener Localización
      </ion-button>
      <div v-if="cantPositions > 0" class="cant-positions-container">
        <span class="cant-position">{{ cantPositions }}</span>
      </div>
      <ion-accordion-group v-if="cantPositions > 0">
        <ion-accordion value="positions">
          <ion-item slot="header" color="themem">
            <ion-label>Puntos</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <div
              v-for="(rp, idx) in registerPositions"
              :key="`pos-${idx}`"
              class="flex flex-wrap justify-content-between"
            >
              <span>{{ idx + 1 }}.-</span>
              <span>{{ DateTime.fromISO(rp.createdAt).toFormat('yyyy-LL-dd HH:mm:ss') }}</span>
            </div>
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
export default {
  name: 'GeoLocation',
};
</script>

<script setup lang="ts">
import MapLatLng from '@/components/MapLatLng.vue';
import {
  IonButton,
  IonPage,
  IonContent,
  IonIcon,
  IonAccordion,
  IonItem,
  IonLabel,
  IonAccordionGroup,
} from '@ionic/vue';
import { computed, onMounted } from 'vue';
import { closeOutline, locateOutline } from 'ionicons/icons';
import { useGeoLocation } from '@/composables/geoLocation.composable';
import { DateTime } from 'luxon';

const { currentPosition, mapKey, startGeoLocation, stopGeoLocation, isActiveGeoLocation, registerPositions } =
  useGeoLocation();

const cantPositions = computed(() => registerPositions.value.length);

onMounted(() => {
  setTimeout(() => {
    mapKey.value = parseInt(`${Math.random() * 1000}`);
  }, 300);
});
</script>

<style scoped>
.map-container {
  height: 300px;
}

.cant-positions-container {
  text-align: center;
}

.cant-positions-container .cant-position {
  font-size: 1.5rem;
}
</style>
