<template>
  <ion-page v-if="rastreo">
    <CardUsuario class="m-2" :usuario="rastreo.usuario">
      <template #body>
        <div class="flex flex-wrap justify-content-between align-items-center mt-2">
          <ion-text color="medium"><strong>POSICIONES</strong></ion-text>
        </div>
      </template>
    </CardUsuario>
    <CardRastreo :rastreo="rastreo" />
    <div v-if="positionToShow" class="map-comtainer">
      <MapLatLng :key="positionToShow.key" v-model="positionToShow" />
    </div>
    <div class="lista-posiciones">
      <CardPosition v-for="pos in positions" :key="pos.id" :position="pos">
        <template #buttons>
          <ion-button
            size="small"
            class="ml-2"
            v-if="positionSelected?.id !== pos.id"
            color="success"
            :shape="'round'"
            @click="positionSelected = pos"
          >
            <ion-icon :icon="locateOutline"></ion-icon>
          </ion-button>
          <ion-button
            size="small"
            class="ml-2"
            v-else
            color="danger"
            :shape="'round'"
            @click="positionSelected = undefined"
          >
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </template>
      </CardPosition>
    </div>
  </ion-page>
</template>

<script lang="ts">
export default {
  name: 'ViewRastreo',
};
</script>

<script setup lang="ts">
import useRastreoApi from '@/api/modules/rastreo.api';
import { Position, Rastreo } from '@/api/types';
import { IonPage, IonButton, IonIcon, IonText } from '@ionic/vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MapLatLng from '@/components/MapLatLng.vue';
import CardUsuario from '@/components/usuario/CardUsuario.vue';
import CardPosition from './components/CardPosition.vue';
import CardRastreo from './components/CardRastreo.vue';
import { closeOutline, locateOutline } from 'ionicons/icons';

const rastreoApi = useRastreoApi();
const rastreo = ref<Rastreo>();
const positions = computed<Position[]>(() => rastreo.value?.positions || []);

const route = useRoute();
const active = ref(false);

const positionSelected = ref<Position>();

const positionToShow = computed<{ lat: number; lng: number; key: number } | undefined>(() => {
  if (positionSelected.value) {
    const positionSplit = positionSelected.value.position.split(',');
    return {
      lat: Number(positionSplit[0]),
      lng: Number(positionSplit[1]),
      key: positionSelected.value.id,
    };
  } else {
    if (positions.value[0]) {
      const positionSplit = positions.value[0].position.split(',');
      return {
        lat: Number(positionSplit[0]),
        lng: Number(positionSplit[1]),
        key: positions.value[0].id,
      };
    } else return undefined;
  }
});

const timeOut = ref();

const getRastreo = () => {
  rastreoApi
    .getById(route.params.id.toString(), {
      filter: {
        include: [
          'usuario',
          {
            relation: 'positions',
            scope: {
              order: 'createdAt DESC',
            },
          },
        ],
      },
    })
    .then(({ data }: { data: Rastreo }) => {
      rastreo.value = data;
      if (rastreo.value.estado && active.value) {
        timeOut.value = setTimeout(getRastreo, 5000);
      }
    });
};

onMounted(() => {
  active.value = true;
  if (route.params.id) {
    getRastreo();
  }
});

onBeforeUnmount(() => {
  if (timeOut.value) {
    clearTimeout(timeOut.value);
  }
  active.value = false;
});
</script>

<style scoped>
.lista-posiciones {
  overflow: auto;
}

.map-container {
  height: 200px;
  padding: 10px;
}
</style>
