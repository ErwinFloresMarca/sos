<template>
  <div v-if="usuario" class="card-user-container">
    <ion-avatar class="mr-2">
      <img alt="user" :src="userAvatar" />
    </ion-avatar>
    <div class="w-full">
      <span class="text-xl mt-2 font-bold">{{ nombreCompleto }}</span>
      <slot name="body"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserAvatar',
};
</script>

<script setup lang="ts">
import useFileApi from '@/api/modules/file';
import { IonAvatar } from '@ionic/vue';
import { computed, PropType } from 'vue';
import { Usuario } from '@/api/types';

const props = defineProps({
  usuario: {
    type: Object as PropType<Usuario>,
    default: undefined,
  },
});

const fileApi = useFileApi();

const nombreCompleto = computed<string>({
  get: () => `${props.usuario?.nombres} ${props.usuario?.paterno} ${props.usuario?.materno}`,
  set: (newVal) => newVal,
});
const userAvatar = computed<string>({
  get: () => (props.usuario?.avatar ? fileApi.downloadUrl(props.usuario?.avatar) : '/images/avatar/circle.png'),
  set: (newVal) => newVal,
});
</script>

<style>
.card-user-container {
  display: grid;
  grid-template-columns: 70px auto;
}
ion-alert.custom-alert {
  --backdrop-opacity: 0.7;
  text-align: center;
}

ion-alert.custom-alert .alert-button-group {
  padding: 8px;
}
button.alert-button.alert-btn {
  width: 45%;
  border: 0.55px solid rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.2);
}
button.alert-button.alert-no-btn {
  background-color: var(--ion-color-danger);
  color: var(--ion-color-danger-contrast);
  border-bottom-left-radius: 13px;
  border-top-left-radius: 13px;
}
button.alert-button.alert-si-btn {
  background-color: var(--ion-color-success);
  color: var(--ion-color-success-contrast);
  border-bottom-right-radius: 13px;
  border-top-right-radius: 13px;
}
</style>
