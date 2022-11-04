<template>
  <ion-app>
    <ion-menu type="overlay" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>MENU</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <auth-menu> </auth-menu>
        <ion-button v-if="auth.isLogged" class="w-full" @click="$router.push({ name: 'ListParientes' })">
          <ion-icon class="mr-2" :icon="peopleCircleOutline"></ion-icon>Mis parientes</ion-button
        >
        <ion-list>
          <ion-item>Preguntas Frecuentes</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ route.meta.title }}</ion-title>
          <ion-buttons slot="end">
            <ion-item v-show="false">
              <ion-icon :icon="sunnyOutline"></ion-icon>
              <ion-toggle :checked="toggle" @ion-change="changeColorTheme"></ion-toggle>
            </ion-item>
            <ion-back-button default-href="/app"></ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-router-outlet />
      </ion-content>
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonPage,
  IonIcon,
  IonToggle,
  IonButton,
} from '@ionic/vue';
import AuthMenu from './components/menu/AuthMenu.vue';
import { peopleCircleOutline, sunnyOutline } from 'ionicons/icons';
import useAuth from './store/auth';

const toggle = ref(false);

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const auth = useAuth();

const changeColorTheme = (ev: any, d?: boolean) => {
  toggle.value = !toggle.value;
  document.body.classList.toggle('dark', d !== undefined ? d : toggle.value);
};

onMounted(() => {
  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addListener((e) => changeColorTheme(e.matches));
  changeColorTheme(undefined, prefersDark.matches);
});
const route = useRoute();
</script>

<script lang="ts">
export default {
  name: 'App',
};
</script>
