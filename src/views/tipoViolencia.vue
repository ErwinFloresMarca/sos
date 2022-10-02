<template>
  <BaseIonicPage title="Tipo de violencia">
    <h4>{{tipoViolencia.titulo}}</h4>
    <img
      class="w-full img-tipo-violencia"
      :src="tipoViolencia.img"
      alt="error"
    />
  </BaseIonicPage>
</template>

<script>
export default {
  name: 'TipoViolencia'
};
</script>

<script setup>
import BaseIonicPage from '@/components/BaseIonicPage'
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const tiposDeViolencia = [
  {
    id: 1,
    img: "/imgs/violenciaFisicaSpicologica.webp",
    titulo: "VIOLENCIA FISICA Y PSICOLOGICA",
    descripcion: "texto",
    ejemplos: ["ejemplo 1", "ejemplo 2", "ejemplo 3"],
    pasos: ["paso 1", "paso 2", "paso 3"],
    contactos: [
      {
        tipos: "Lineas de emergencia",
        instituciones: [
          {
            nombre: "inst 1",
            objetivo: "Hospital",
            direccion: "direccion",
            telefono: "356413",
            ubicación: {
              lat: 0.7645,
              long: 0.7654,
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    img: "/imgs/otrasViolencias.png",
    titulo: "VIOLENCIA OTRA",
    descripcion: "texto",
    ejemplos: ["ejemplo 1", "ejemplo 2", "ejemplo 3"],
    pasos: ["paso 1", "paso 2", "paso 3"],
    contactos: [
      {
        tipos: "Lineas de emergencia",
        instituciones: [
          {
            nombre: "inst 1",
            objetivo: "Hospital",
            direccion: "direccion",
            telefono: "356413",
            ubicación: {
              lat: 0.7645,
              long: 0.7654,
            },
          },
        ],
      },
    ],
  },
];

const route = useRoute();
const tipoViolencia = computed({
  get: () => {
    return tiposDeViolencia.find((tp) => tp.id == parseInt(route.params.id)) || {};
  }
});
</script>

<style scoped></style>
