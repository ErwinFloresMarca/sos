<template>
  <ion-page>
    <div class="home-content">
      <h2>LA VIOLENCIA</h2>
      <img class="w-9" src="/SOS.jpg" />
      <h4>TIPOS DE VIOLENCIA</h4>
      <Carousel :value="tiposDeViolencia">
        <template #item="{ data }">
          <div class="flex flex-wrap flex-column">
            <img class="w-full img-tipo-violencia" :src="data.img" alt="error" />
            <strong>{{ data.titulo }}</strong>
            <Button
              class="p-button-warning w-full"
              icon="pi pi-plus"
              label="VER MAS"
              @click="onClickTipoViolencia(data.id)"
            />
          </div>
        </template>
      </Carousel>
      <span>LA VIOLENCIA CREA MÁS PROBLEMAS SOCIALES QUE LOS QUE RESUELVE</span>
    </div>
  </ion-page>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';

// prime
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const tiposDeViolencia = [
  {
    id: 1,
    img: '/imgs/violenciaFisicaSpicologica.webp',
    titulo: 'VIOLENCIA FISICA Y PSICOLOGICA',
    descripcion: 'texto',
    ejemplos: ['ejemplo 1', 'ejemplo 2', 'ejemplo 3'],
    pasos: ['paso 1', 'paso 2', 'paso 3'],
    contactos: [
      {
        tipos: 'Lineas de emergencia',
        instituciones: [
          {
            nombre: 'inst 1',
            objetivo: 'Hospital',
            direccion: 'direccion',
            telefono: '356413',
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
    img: '/imgs/otrasViolencias.png',
    titulo: 'VIOLENCIA OTRA',
    descripcion: 'texto',
    ejemplos: ['ejemplo 1', 'ejemplo 2', 'ejemplo 3'],
    pasos: ['paso 1', 'paso 2', 'paso 3'],
    contactos: [
      {
        tipos: 'Lineas de emergencia',
        instituciones: [
          {
            nombre: 'inst 1',
            objetivo: 'Hospital',
            direccion: 'direccion',
            telefono: '356413',
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
const router = useRouter();
const onClickTipoViolencia = (id: number) => {
  router.push({
    name: 'TipoViolencia',
    params: {
      id: id,
    },
  });
};
</script>

<style scoped>
.home-content {
  height: calc(100vh - 120px);
  text-align: center;
  width: 100%;
  padding: 10px;
  margin: 0px;
}
.img-tipo-violencia {
  border-radius: 15px;
  margin-bottom: 5px;
  height: 185px;
}
</style>
