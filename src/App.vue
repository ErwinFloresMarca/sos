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
        <ion-list>
          <ion-item>Preguntas frecuentes</ion-item>
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

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'App',
});
</script>

<script setup lang="ts">
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
} from '@ionic/vue';
import AuthMenu from './components/menu/AuthMenu.vue';

const route = useRoute();
</script>
