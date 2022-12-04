<template>
  <div class="m-2 card-rastreo">
    <div class="flex flex-wrap justify-content-between">
      <div class="w-fit">
        <ion-text color="themel"><strong>RASTREO</strong></ion-text>
      </div>
      <div class="w-fit text-right">
        <ion-text color="secondary"
          >de: {{ DateTime.fromISO(rastreo.createdAt).toFormat('yyyy-LL-dd HH:mm') }}</ion-text
        >
        <br />
        <ion-text color="warning">
          a:
          {{
            rastreo.estado ? 'en progreso' : DateTime.fromISO(rastreo.updatedAt).toFormat('yyyy-LL-dd HH:mm')
          }}</ion-text
        >
      </div>
    </div>
    <div class="w-full flex flex-wrap justify-content-between">
      <ion-badge :color="rastreo.estado ? 'success' : 'danger'">{{ rastreo.estado ? 'activo' : 'inactivo' }}</ion-badge>
      <span>
        Posiciones: <ion-badge color="secondary">{{ rastreo.positions?.length || 0 }}</ion-badge>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rastreo } from '@/api/types';
import { IonBadge, IonText } from '@ionic/vue';
import { DateTime } from 'luxon';
import { PropType } from 'vue';

defineProps({
  rastreo: {
    type: Object as PropType<Rastreo>,
    required: true,
  },
});
</script>

<script lang="ts">
export default {
  name: 'CardRastreo',
};
</script>

<style scoped>
.card-rastreo {
  background-color: rgba(var(--ion-color-themel-rgb), 0.7);
  padding: 10px;
  border-radius: 10px;
}
</style>
