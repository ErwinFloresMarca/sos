<template>
  <ion-modal :is-open="isOpen">
    <!-- :initial-breakpoint="0.3" :breakpoints="[0.3, 0.5]" -->
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="success" @click="onSave">
            <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="text-center">AGREGAR</ion-title>
        <ion-buttons slot="end">
          <ion-button color="danger" @click="cancel()">
            <ion-icon slot="start" :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="w-full">
        <ion-label for="Usuario" position="floating">Buscar Usuario</ion-label> <br />
        <div class="search-input-group">
          <ion-input v-model="searchCi" type="text" placeholder="Cédula de identidad"></ion-input>
          <ion-button v-if="!userSelected" @click="onSearchUser">
            <ion-icon :icon="searchOutline"></ion-icon>
          </ion-button>
          <ion-button v-else color="danger" @click="onClearParent">
            <ion-icon :icon="trashOutline"></ion-icon>
          </ion-button>
        </div>
        <div v-if="userSelected">
          <CardUsuario :usuario="userSelected"></CardUsuario>
        </div>
      </div>
      <ion-item>
        <ion-label for="titulo" position="floating">Tipo de pariente</ion-label>
        <ion-input v-model="data.parentType" type="text"></ion-input>
      </ion-item>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import useUsuarioApi from '@/api/modules/usuario';
import { Pariente, Usuario } from '@/api/types';
import CardUsuario from '@/components/usuario/CardUsuario.vue';
import {
  IonModal,
  IonHeader,
  IonButtons,
  IonButton,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonTitle,
} from '@ionic/vue';
import { checkmarkOutline, closeOutline, searchOutline, trashOutline } from 'ionicons/icons';
import { ref } from 'vue';

const props = defineProps({
  usuarioId: {
    type: Number,
    required: true,
  },
});

const usuarioApi = useUsuarioApi();
const userSelected = ref<Usuario>();

const searchCi = ref<string>('');

const onSearchUser = () => {
  usuarioApi
    .list({
      filter: {
        where: {
          ci: searchCi.value,
          id: { nin: [props.usuarioId] },
        },
        fields: {
          id: true,
          ci: true,
          nombres: true,
          paterno: true,
          materno: true,
          avatar: true,
        },
      },
    })
    .then(({ data: respUsers }: { data: Usuario[] }) => {
      if (respUsers[0]) {
        userSelected.value = respUsers[0];
        data.value.parentId = respUsers[0].id;
      }
    });
};

const data = ref<Partial<Pariente>>({});

const emit = defineEmits(['cancel', 'save']);
const isOpen = ref(false);

function onClearParent() {
  userSelected.value = undefined;
  data.value.parentId = undefined;
}

function onSave() {
  emit('save', { ...data.value, usuarioId: props.usuarioId });
}

function cancel() {
  emit('cancel');
  close();
}

function open() {
  userSelected.value = undefined;
  isOpen.value = true;
}

function close() {
  data.value = {};
  userSelected.value = undefined;
  isOpen.value = false;
}

defineExpose({
  open,
  close,
});
</script>

<script lang="ts">
export default {
  name: 'FormParienteModal',
};
</script>

<style scoped>
.imagen-img {
  height: 100px;
}
.search-input-group {
  display: grid;
  grid-template-columns: auto 66px;
}
</style>
