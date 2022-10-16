<template>
  <ion-page>
    <FormViolenciaModal ref="formViolenciaModelRef"></FormViolenciaModal>
    <ion-loading :is-open="loadingTV" message="Cargando..."> </ion-loading>
    <div class="home-content">
      <h2>LA VIOLENCIA</h2>
      <img class="w-9" src="/SOS.jpg" />
      <h4>TIPOS DE VIOLENCIA</h4>
      <Carousel :value="tiposDeViolencia">
        <template #item="{ data }">
          <div class="flex flex-wrap flex-column">
            <img class="w-full img-tipo-violencia" :src="data.img" alt="error" />
            <strong>{{ data.titulo }}</strong>
            <ion-button class="w-full" @click="onClickTipoViolencia(data.id)">
              <ion-icon :icon="addOutline"></ion-icon> VER MAS
            </ion-button>
          </div>
        </template>
      </Carousel>
      <ion-button v-if="auth.isAdmin()" class="w-full" color="success" @click="onNewTipoViolencia">
        <ion-icon :icon="addOutline"></ion-icon> Nuevo tipo de violencia
      </ion-button>
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
import { IonPage, IonButton, IonIcon, IonLoading } from '@ionic/vue';

// prime
import Carousel from 'primevue/carousel';

import { useRouter } from 'vue-router';
import useResourceComposable from '@/composables/resource.composable';
import { Violencia } from '@/api/types';
import { addOutline } from 'ionicons/icons';
import useAuth from '@/store/auth';
import FormViolenciaModal from './violencia/FormViolenciaModal.vue';
import { ref } from 'vue';

const { lista: tiposDeViolencia, loading: loadingTV } = useResourceComposable<Violencia>('violencias');

const router = useRouter();
const auth = useAuth();
const onClickTipoViolencia = (id: number) => {
  router.push({
    name: 'TipoViolencia',
    params: {
      id: id,
    },
  });
};

const formViolenciaModelRef = ref<typeof FormViolenciaModal>();
const onNewTipoViolencia = () => {
  formViolenciaModelRef.value?.open();
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
