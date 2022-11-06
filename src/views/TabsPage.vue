<template>
  <ion-page>
    <ion-fab v-if="auth.user" class="fab-btn-not" vertical="bottom" horizontal="end">
      <ion-fab-button color="warning" @click="onPressBtnPanic">
        <ion-icon class="icon-not-btn" :icon="notificationsCircleOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-tabs>
      <ion-router-outlet> </ion-router-outlet>
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
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonFab,
  IonFabButton,
} from '@ionic/vue';
import { alert, flag, home, notificationsCircleOutline, pin } from 'ionicons/icons';
import useAuth from '@/store/auth';
import useUsuarioApi from '@/api/modules/usuario';
import { showToast } from '@/helpers/toast.helper';
import { Geolocation } from '@capacitor/geolocation';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet, IonFab, IonFabButton },
  setup() {
    const auth = useAuth();
    const usarioApi = useUsuarioApi();
    const onPressBtnPanic = async () => {
      if (auth.user) {
        const coordinates = await Geolocation.getCurrentPosition();
        usarioApi
          .panicNotif(auth.user?.id, {
            lat: coordinates.coords.latitude,
            lng: coordinates.coords.longitude,
          })
          .then(() => {
            showToast({
              message: 'Mensaje enviado!',
              closable: true,
              duration: 3000,
              type: 'success',
            });
          });
      }
    };
    return {
      auth,
      alert,
      flag,
      home,
      pin,
      notificationsCircleOutline,
      onPressBtnPanic,
    };
  },
});
</script>

<style scoped>
.fab-btn-not {
  bottom: 70px;
}
.icon-not-btn {
  font-size: 3rem !important;
}
</style>
