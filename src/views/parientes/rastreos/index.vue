<template>
  <ion-page>
    <ion-loading :is-open="loading" message="Cargando..."> </ion-loading>
    <!-- TODO: card de usuario de los rastreos -->
    <div class="m-2">
      <CardUsuario v-if="usuario" :usuario="usuario">
        <template #body>
          <div class="flex flex-wrap justify-content-between align-items-center">
            <ion-text color="medium"><strong>REGISTROS</strong></ion-text>
            <ion-button color="secondary" @click="getRastreos"><ion-icon :icon="reloadOutline"></ion-icon></ion-button>
          </div>
        </template>
      </CardUsuario>
    </div>
    <div v-if="!rastreoSelected" class="lista-rastreos">
      <CardRastreo v-for="rst in rastreos" :key="rst.id" :rastreo="rst"> </CardRastreo>
    </div>
    <div v-else class="detalle-rastreo">rastreo seleccionado</div>
  </ion-page>
</template>

<script setup lang="ts">
import useRastreoApi from '@/api/modules/rastreo.api';
import useUsuarioApi from '@/api/modules/usuario';
import { Rastreo, Usuario } from '@/api/types';
import CardUsuario from '@/components/usuario/CardUsuario.vue';
import { IonPage, IonLoading, IonButton, IonIcon, IonText } from '@ionic/vue';
import { reloadOutline } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CardRastreo from './components/CardRastreo.vue';

const usuario = ref<Usuario>();
const route = useRoute();
const router = useRouter();
const userApi = useUsuarioApi();
const rastreoApi = useRastreoApi();
const loading = ref(false);

const rastreos = ref<Rastreo[]>([]);
const rastreoSelected = ref<Rastreo>();

const getRastreos = () => {
  if (usuario.value) {
    loading.value = true;
    rastreoApi
      .list({
        filter: {
          where: {
            usuarioId: usuario.value?.id,
          },
          order: 'createdAt DESC',
          include: ['positions'],
        },
      })
      .then(({ data }: { data: Rastreo[] }) => {
        rastreos.value = data;
        loading.value = false;
      })
      .catch((err) => {
        loading.value = false;
      });
  }
};

const getUsuario = () => {
  if (route.params.id) {
    loading.value = true;
    userApi
      .getById(route.params.id.toString())
      .then(({ data }: { data: Usuario }) => {
        loading.value = false;
        usuario.value = data;
        getRastreos();
      })
      .catch((err) => {
        loading.value = false;
      });
  } else {
    router.go(-1);
  }
};

onMounted(() => {
  getUsuario();
});
</script>

<script lang="ts">
export default {
  name: 'IndexRastreo',
};
</script>

<style scoped>
.lista-rastreos {
  overflow: auto;
}
</style>
