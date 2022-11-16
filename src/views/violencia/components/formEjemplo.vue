<template>
  <div v-if="show">
    <ion-item>
      <ion-label :position="'stacked'">Ejemplo:</ion-label>
      <ion-textarea v-model="value" placeholder="ejemplo"></ion-textarea>
    </ion-item>
    <div class="flex flex-wrap justify-content-between">
      <ion-button color="success" class="w-5" @click="onSave">
        <ion-icon class="mr-2" :icon="saveOutline"></ion-icon> Guardar
      </ion-button>
      <ion-button color="danger" class="w-5" @click="onCancel">
        <ion-icon class="mr-2" :icon="closeOutline"></ion-icon> Cancelar
      </ion-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FormEjemplo',
};
</script>

<script setup lang="ts">
import { IonButton, IonItem, IonLabel, IonTextarea, IonIcon } from '@ionic/vue';
import { saveOutline, closeOutline } from 'ionicons/icons';
import { ref } from 'vue';

const emit = defineEmits(['save']);

const value = ref();
const index = ref();
const show = ref(false);
const onSave = () => {
  emit('save', value.value, index.value);
  close();
};

const onCancel = () => {
  close();
};

const open = (val?: string, i?: number) => {
  value.value = val;
  index.value = i;
  show.value = true;
};
const close = () => {
  show.value = false;
  value.value = undefined;
  index.value = undefined;
};

defineExpose({
  open,
  show,
});
</script>

<style scoped></style>
