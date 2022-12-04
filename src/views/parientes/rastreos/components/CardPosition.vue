<template>
  <div class="m-2 card-rastreo">
    <div class="flex flex-wrap justify-content-between">
      <div class="w-fit">
        <ion-text color="themel"><strong>Posición</strong></ion-text>
      </div>
      <div class="w-fit text-right">
        <ion-text color="secondary">{{
          DateTime.fromISO(position.createdAt).toFormat('yyyy-LL-dd HH:mm:ss')
        }}</ion-text>
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Position } from '@/api/types';
import { IonText } from '@ionic/vue';
import { DateTime } from 'luxon';
import { PropType } from 'vue';

defineProps({
  position: {
    type: Object as PropType<Position>,
    required: true,
  },
});
</script>

<script lang="ts">
export default {
  name: 'CardPosition',
};
</script>

<style scoped>
.card-rastreo {
  background-color: rgba(56, 10, 46, 0.7);
  padding: 10px;
  border-radius: 10px;
}
</style>
