<template>
  <div class="card-paso">
    <div class="paso-header" @click="tootgleShow">
      <strong>PASO {{ position }}:</strong> {{ paso.titulo }}
    </div>
    <div v-if="showDescription" class="paso-content ql-editor" v-html-safe="paso.descripcion"></div>
  </div>
</template>

<script setup lang="ts">
import { PasoType } from '@/api/types';
import { PropType, ref } from 'vue';

defineProps({
  paso: {
    type: Object as PropType<PasoType>,
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
.card-paso {
  border: 3px solid rgb(230, 211, 150);
  border-radius: 5px;
}
.paso-header {
  cursor: pointer;
  background-color: rgb(255, 242, 180);
  padding: 5px;
}
</style>
