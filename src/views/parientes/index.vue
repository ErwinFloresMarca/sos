<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="">
        <card-usuario v-for="parent in parientes" :key="parent.id" :usuario="parent.parent">
          <div>
            <span>{{ parent.parentType }}</span>
            <ion-button color="danger"> <ion-icon :icon="trashOutline"></ion-icon> </ion-button>
          </div>
        </card-usuario>
        <ion-button class="w-full" color="success">
          <ion-icon class="mr-3" :icon="addOutline"></ion-icon>
          Agregar
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
export default {
  name: 'IndexParientes',
};
</script>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonIcon } from '@ionic/vue';
import { Pariente } from '@/api/types';
import { onMounted, ref } from 'vue';
import useParienteApi from '@/api/modules/pariente.api';
import CardUsuario from '@/components/usuario/CardUsuario.vue';
import { addOutline, trashOutline } from 'ionicons/icons';
import useAuth from '@/store/auth';
import router from '@/router';

const parientes = ref<Array<Pariente>>([]);
const loading = ref(false);
const auth = useAuth();
const parienteApi = useParienteApi();

const getParientes = () => {
  loading.value = true;
  parienteApi
    .list({
      where: {
        usuarioId: auth.user?.id,
      },
    })
    .then(({ data }: { data: Pariente[] }) => {
      loading.value = false;
      parientes.value = data;
    });
};

onMounted(() => {
  if (!auth.isLogged) {
    router.go(-1);
  }
  getParientes();
});
</script>

<style scoped></style>
