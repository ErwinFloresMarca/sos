<template>
  <ion-page>
    <form-linea-modal ref="formLineaModalRef" tipo="EMERGENCIA" @save="onSaveLinea"></form-linea-modal>
    <ion-content color="themel" class="ion-padding">
      <div class="header-linea-emergencia">
        <h2 class="text-center">Lineas de emergencia</h2>
        <div class="text-center">
          <img class="w-9" src="/images/linea-de-emergencia.png" />
        </div>
        <p class="text-center">
          El Servicio Departamental de Salud prevé que el Centro de Coordinación de Emergencias tenga un número gratuito
          para que la ciudadanía llame en cuanto requiera auxilio y asistencia de emergencia en algún puntos del
          Departamento.
        </p>
      </div>
      <card-linea-emergencia v-for="linea in lineasDeEmergencia" :key="linea.id" :linea="linea"></card-linea-emergencia>

      <ion-button v-if="auth.isAdmin()" class="w-full" color="success" @click="onNew">
        <ion-icon :icon="addOutline"></ion-icon> NUEVO LINEA DE EMERGENCIA
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { Linea } from '@/api/types';
import useResourceComposable from '@/composables/resource.composable';
import useAuth from '@/store/auth';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { addOutline } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import CardLineaEmergencia from './lineas/CardLineaEmergencia.vue';
import FormLineaModal from './lineas/FormLineaModal.vue';

const auth = useAuth();
const {
  lista: lineasDeEmergencia,
  create,
  getLista,
  paginate,
  where,
  include,
} = useResourceComposable<Linea>('lineas');
paginate.value = false;
onMounted(() => {
  include.value = undefined;
  where.value = { tipo: { like: 'EMERGENCIA' } };
  getLista();
});

const formLineaModalRef = ref();

function onNew() {
  formLineaModalRef.value?.open();
}

function onSaveLinea(data: Linea) {
  if (!data.id) {
    create(data)
      .then((resp) => {
        console.log('linea creada exitosamente.');
        getLista();
        formLineaModalRef.value?.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<script lang="ts">
export default {
  name: 'LineasDeEmergencia',
};
</script>

<style scoped>
.header-linea-emergencia {
  border-bottom: 2px solid #00000044;
  margin-bottom: 10px;
}
</style>
