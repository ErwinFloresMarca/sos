<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h4>{{ tipoViolencia.titulo }}</h4>
      <img
        class="w-full img-tipo-violencia"
        :src="tipoViolencia.img"
        alt="error"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
export default {
  name: "TipoViolencia",
};
</script>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";

import { computed } from "vue";
import { useRoute } from "vue-router";

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
const tipoViolencia = computed<any>({
  get: () => {
    return (
      tiposDeViolencia.find((tp) =>
        route.params.id
          ? tp.id == parseInt(route.params.id.toString())
          : undefined
      ) || {}
    );
  },
  set: (val) => val,
});
</script>

<style scoped></style>
