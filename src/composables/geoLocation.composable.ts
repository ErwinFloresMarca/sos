import { ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
import useRastreoApi from '@/api/modules/rastreo.api';
import usePositionApi from '@/api/modules/position.api';
import useAuth from '@/store/auth';
import { Position, Rastreo } from '@/api/types';

export function useGeoLocation() {
  const REFRESH_POSITION_TIME = ref(3000);
  const auth = useAuth();
  const currentPosition = ref({
    lat: -19.047235212124747,
    lng: -65.2578569410145,
  });

  const mapKey = ref(1);

  const isActiveGeoLocation = ref(false);

  const intervalGL = ref();

  const rastreoApi = useRastreoApi();

  const positionApi = usePositionApi();

  const rastreo = ref<Rastreo>();

  const registerPositions = ref<Array<Position>>([]);

  const registerPosition = (lat: number, lng: number) => {
    positionApi
      .create({
        rastreoId: rastreo.value?.id,
        position: `${lat},${lng}`,
      })
      .then(({ data }: { data: Position }) => {
        registerPositions.value.unshift(data);
      });
  };

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    currentPosition.value = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
    registerPosition(coordinates.coords.latitude, coordinates.coords.longitude);
    mapKey.value = parseInt(`${Math.random() * 1000}`);
  };

  const startGeoLocation = () => {
    rastreoApi
      .create({
        usuarioId: auth.user?.id,
      })
      .then(({ data }: { data: Rastreo }) => {
        registerPositions.value = [];
        rastreo.value = data;
        isActiveGeoLocation.value = true;
        intervalGL.value = setInterval(() => {
          getCurrentPosition();
        }, REFRESH_POSITION_TIME.value);
      });
  };

  const stopGeoLocation = () => {
    isActiveGeoLocation.value = false;
    clearInterval(intervalGL.value);
  };

  return {
    currentPosition,
    mapKey,
    REFRESH_POSITION_TIME,
    isActiveGeoLocation,
    rastreo,
    registerPositions,
    auth,
    startGeoLocation,
    getCurrentPosition,
    stopGeoLocation,
  };
}
