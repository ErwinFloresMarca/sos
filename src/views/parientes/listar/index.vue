<template>
  <ion-page>
    <ion-content color="themel" v-if="auth.user" class="ion-padding">
      <FormParienteModal
        ref="formParienteModalRef"
        :usuario-id="auth.user?.id"
        @save="onSavePariente"
      ></FormParienteModal>
      <div class="">
        <template v-for="parent in parientes" :key="parent.id">
          <card-usuario v-if="auth.user?.id === parent.usuarioId" :usuario="parent.parent">
            <template #body>
              <div class="w-full flex flex-wrap justify-content-between align-items-center">
                <span>{{ parent.parentType }}</span>
                <ion-button color="secondary" size="small" shape="round" @click="onRastreo(parent.parentId)">
                  <ion-icon :icon="mapOutline"></ion-icon>
                </ion-button>
                <ion-button color="danger" size="small" shape="round" @click="onDelete(parent.id)">
                  <ion-icon :icon="trashOutline"></ion-icon>
                </ion-button>
              </div>
            </template>
          </card-usuario>
          <card-usuario v-else :usuario="parent.usuario">
            <template #body>
              <div class="w-full flex flex-wrap justify-content-between align-items-center">
                <span>SU {{ parent.parentType }}</span>
                <ion-button color="secondary" size="small" shape="round" @click="onRastreo(parent.usuarioId)">
                  <ion-icon :icon="mapOutline"></ion-icon>
                </ion-button>
                <ion-button color="danger" size="small" shape="round" @click="onDelete(parent.id)">
                  <ion-icon :icon="trashOutline"></ion-icon>
                </ion-button>
              </div>
            </template>
          </card-usuario>
        </template>
        <ion-button class="w-full" color="success" @click="onAdd">
          <ion-icon class="mr-3" :icon="addOutline"></ion-icon>
          Agregar
        </ion-button>
        <ion-button class="w-full" color="light" @click="getParientes">
          <ion-icon class="mr-3" :icon="reloadOutline"></ion-icon>
          Recargar
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
import { IonContent, IonPage, IonButton, IonIcon, alertController } from '@ionic/vue';
import { Pariente } from '@/api/types';
import { onMounted, ref } from 'vue';
import useParienteApi from '@/api/modules/pariente.api';
import CardUsuario from '@/components/usuario/CardUsuario.vue';
import { addOutline, mapOutline, reloadOutline, trashOutline } from 'ionicons/icons';
import useAuth from '@/store/auth';
import router from '@/router';
import { showToast } from '@/helpers/toast.helper';
import FormParienteModal from './components/FormParienteModal.vue';

const parientes = ref<Array<Pariente>>([]);
const loading = ref(false);
const auth = useAuth();
const parienteApi = useParienteApi();

const formParienteModalRef = ref();

const getParientes = () => {
  loading.value = true;
  parienteApi
    .list({
      filter: {
        where: {
          or: [{ usuarioId: auth.user?.id }, { parentId: auth.user?.id }],
        },
        include: ['parent', 'usuario'],
      },
    })
    .then(({ data }: { data: Pariente[] }) => {
      loading.value = false;
      parientes.value = data;
    });
};

const onAdd = () => {
  if (formParienteModalRef.value) formParienteModalRef.value.open();
};

const onRastreo = (userId: number) => {
  router.push({
    name: 'ParienteRastreo',
    params: {
      id: `${userId}`,
    },
  });
};

const onDelete = async (parentescoId: number) => {
  const alert = await alertController.create({
    header: 'Alerta',
    subHeader: 'Esta seguro de eliminar el pariente?',
    message: 'El usuario ya no tendrá acceso a su información de ubicación!',
    buttons: [
      {
        text: 'Aceptar',
        cssClass: 'ion-color ion-color-success',
        handler: () => {
          parienteApi.remove(parentescoId).then(() => {
            showToast({
              message: 'Pariente eliminado exitosamente!',
              closable: true,
              duration: 3000,
              type: 'success',
            });
            getParientes();
          });
        },
      },
      { text: 'Cancelar', role: 'reject', cssClass: 'ion-color ion-color-danger button button-solid' },
    ],
  });

  await alert.present();
};

const onSavePariente = (parent: Partial<Pariente>) => {
  parienteApi.create(parent).then(() => {
    getParientes();
    showToast({
      message: 'Pariente registrado exitosamente!',
      closable: true,
      duration: 3000,
      type: 'success',
    });
    formParienteModalRef.value.close();
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
