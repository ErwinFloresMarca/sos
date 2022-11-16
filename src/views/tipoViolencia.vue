<template>
  <ion-page>
    <ion-content v-if="tipoViolencia" class="ion-padding container-tipo-violencia">
      <h4>{{ tipoViolencia.titulo }}</h4>
      <img class="w-full img-tipo-violencia" :src="fileApi.downloadUrl(tipoViolencia.img)" alt="error" />
      <div class="w-full ql-editor" style="height: fit-content" v-html-safe="tipoViolencia.descripcion"></div>
      <ion-accordion-group class="mt-2">
        <ion-accordion value="first">
          <ion-item slot="header" color="light">
            <ion-label>Ejemplos</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ul>
              <li v-for="(ejem, idx) in tipoViolencia.ejemplos" :key="`ejemplo-${idx}`">{{ ejem }}</li>
            </ul>
          </div>
        </ion-accordion>
        <ion-accordion value="second">
          <ion-item slot="header" color="light">
            <ion-label>Pasos</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <CardPaso
              v-for="(paso, idx) in tipoViolencia.pasos"
              :key="`paso-${idx}`"
              :paso="paso"
              :position="idx + 1"
            />
          </div>
        </ion-accordion>
        <ion-accordion value="third">
          <ion-item slot="header" color="light">
            <ion-label>Contactos</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <CardContacto
              v-for="(contacto, idx) in tipoViolencia.contactos"
              :key="`paso-${idx}`"
              :contacto="contacto"
              :position="idx + 1"
            />
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import useFileApi from '@/api/modules/file';
import useResourceApi from '@/api/resource';
import { Violencia } from '@/api/types';
import { showToast } from '@/helpers/toast.helper';
import { IonPage, IonContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CardContacto from './violencia/components/CardContacto.vue';
import CardPaso from './violencia/components/CardPaso.vue';

const violenaciaApi = useResourceApi('violencias');

const fileApi = useFileApi();

const route = useRoute();
const router = useRouter();

const tipoViolencia = ref<Violencia>();

onMounted(() => {
  violenaciaApi
    .getById(parseInt(route.params.id.toString()))
    .then(({ data }: { data: Violencia }) => {
      tipoViolencia.value = data;
    })
    .catch(() => {
      showToast({
        message: 'Error al recuperar la información',
        closable: true,
        duration: 3000,
        type: 'danger',
      });
      router.go(-1);
    });
});
</script>

<style scoped>
.container-tipo-violencia {
  height: calc(100vh - 60px);
}
</style>
