<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="themem">
        <ion-buttons slot="start">
          <ion-menu-button v-if="showBtnMenu"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-back-button v-if="showBtnBack" default-href="/app"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content color="themel" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar color="themem">
          <ion-title size="large">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <slot></slot>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonMenuButton,
} from '@ionic/vue';

export default defineComponent({
  name: 'BaseIonicPage',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton, IonMenuButton },
  props: {
    title: {
      type: String,
      required: true,
    },
    showBtnMenu: {
      type: Boolean,
      default: false,
    },
    showBtnBack: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
