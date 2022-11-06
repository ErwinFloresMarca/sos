<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/app/home">
          <ion-icon :icon="home" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/app/lineas-de-emergencia">
          <ion-icon :icon="alert" />
          <ion-label>Lineas</ion-label>
        </ion-tab-button>
        <!-- <ion-tab-button tab="tab2" href="/app/lineas-de-orientacion">
          <ion-icon :icon="alert" />
          <ion-label
            >Lineas de <br />
            orientación</ion-label
          >
        </ion-tab-button> -->
        <ion-tab-button v-if="auth.isLogged" tab="tab4" href="/app/geolocation">
          <ion-icon :icon="pin" />
          <ion-label>Ubicación</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { alert, flag, home, pin } from 'ionicons/icons';
import useAuth from '@/store/auth';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    const auth = useAuth();
    return {
      auth,
      alert,
      flag,
      home,
      pin,
    };
  },
});
</script>
