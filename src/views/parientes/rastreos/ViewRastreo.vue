<template>
  <ion-page></ion-page>
</template>

<script lang="ts">
export default {
  name: 'ViewRastreo',
};
</script>

<script setup lang="ts">
import usePositionApi from '@/api/modules/position.api';
import useRastreoApi from '@/api/modules/rastreo.api';
import { Position, Rastreo } from '@/api/types';
import { IonPage } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const rastreo = ref<Rastreo>();
const rastreoApi = useRastreoApi();

const positions = ref<Position[]>([]);
const positionApi = usePositionApi();

const route = useRoute();

const getPositions = () => {
  if (rastreo.value) {
    positionApi
      .list({
        filter: {},
      })
      .then(({ data }: { data: Position[] }) => {
        positions.value = data;
      });
  }
};

onMounted(() => {
  if (route.params.id) {
    rastreoApi
      .getById(route.params.id.toString(), {
        filter: {
          include: ['usuario'],
        },
      })
      .then(({ data }: { data: Rastreo }) => {
        rastreo.value = data;
        getPositions();
      });
  }
});
</script>

<style scoped></style>
