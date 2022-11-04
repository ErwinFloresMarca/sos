<template>
  <ion-page>
    <ion-content>
      <ion-router-outlet />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonRouterOutlet } from '@ionic/vue';
</script>

<script lang="ts">
export default {
  name: 'IndexParientes',
};
</script>
