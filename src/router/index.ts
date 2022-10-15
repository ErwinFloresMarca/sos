import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/app',
    children: [],
  },
  {
    path: '/app',
    component: TabsPage,
    redirect: '/app/home',
    children: [
      {
        name: 'Home',
        path: 'home',
        meta: {
          title: 'SOS',
        },
        component: () => import('../views/HomePage.vue'),
      },
      {
        name: 'TipoViolencia',
        path: 'tipo-violencia/:id',
        meta: {
          title: 'Tipo de violencia',
        },
        component: () => import('../views/tipoViolencia.vue'),
      },
      {
        name: 'LineasDeOrientacion',
        path: 'lineas-de-orientacion',
        meta: {
          title: 'Lineas de orientación',
        },
        component: () => import('../views/lineasDeOrientacion.vue'),
      },
      {
        name: 'LineasDeEmergencia',
        path: 'lineas-de-emergencia',
        meta: {
          title: 'Lineas de emergencia',
        },
        component: () => import('../views/lineasDeEmergencia.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
