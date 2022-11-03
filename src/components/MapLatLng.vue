<template>
  <div ref="mapRoot" class="map-container">
    <div class="layout" v-if="noEdit">
      <span>Solo vista</span>
    </div>
  </div>
</template>

<script>
import 'ol/ol.css';
import View from 'ol/View';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Modify } from 'ol/interaction';
import { fromLonLat, toLonLat } from 'ol/proj';
import { defaults as defaultsInteractions } from 'ol/interaction';
import axios from 'axios';
import { Attribution, FullScreen, defaults as defaultControls } from 'ol/control';
import { ref, watch } from 'vue';
export default {
  name: 'MapLatLng',
  props: {
    modelValue: Object,
    noEdit: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const olMap = ref();
    const pointLayer = ref();
    const mapRoot = ref();

    watch(
      () => props.modelValue,
      (newCoords) => {
        setCoordinates(newCoords, false);
      },
    );

    watch(mapRoot, (current) => {
      if (current) {
        initMap();
      }
    });

    const setCoordinates = (newCords, updateVal = true) => {
      const feature = pointLayer.value.getSource().getFeatures()[0];
      const coords = fromLonLat([newCords.lng, newCords.lat]);
      feature.getGeometry().setCoordinates(coords);
      animateNewCoord();
      if (updateVal) {
        updateModelValue();
      }
    };

    const updateModelValue = () => {
      const feature = pointLayer.value.getSource().getFeatures()[0];
      const coords = toLonLat(feature.getGeometry().getCoordinates());
      //actualiza el model-value
      const lat = coords[1];
      const lng = coords[0];
      const current = { lat, lng, registrar: props.modelValue.registrar };
      emit('update:modelValue', current);
    };

    const animateNewCoord = () => {
      const view = olMap.value.getView();
      const marker = pointLayer.value;
      const source = marker.getSource();
      const feature = source.getFeatures()[0];
      if (feature) {
        const extent = source.getExtent();
        const oldZoom = view.getZoom();
        const oldCenter = view.getCenter();
        view.fit(extent, { maxZoom: 17 });
        const newZoom = view.getZoom();
        const newCenter = view.getCenter();
        view.setCenter(oldCenter);
        view.setZoom(oldZoom);
        view.animate({ center: newCenter, duration: 500 });
        view.animate({ zoom: newZoom, duration: 500 });
      }
    };

    const initMap = () => {
      //Atributtions
      const attributions = '<span>&copy; free map</span> ';

      // Init variables
      const cord = fromLonLat([props.modelValue.lng, props.modelValue.lat]);
      //Init Point layer
      pointLayer.value = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new Point(cord),
            }),
          ],
        }),
        style: new Style({
          image: new Icon({
            anchor: [0.5, 82],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: '/images/gmap/gmap03.png',
          }),
        }),
      });
      //Init map
      olMap.value = new Map({
        target: mapRoot.value,
        interactions: defaultsInteractions({ doubleClickZoom: false }),
        controls: defaultControls({ attribution: false })
          .extend([new FullScreen({ tipLabel: 'Pantalla completa' })])
          .extend([
            new Attribution({
              collapsible: false,
            }),
          ]),
        layers: [
          new TileLayer({
            source: new OSM({ attributions: attributions }),
          }),
          pointLayer.value,
        ],
        view: new View({
          center: [0, 0],
          zoom: 15.5,
        }),
      });

      olMap.value.on('dblclick', (evt) => {
        const aux = toLonLat([evt.coordinate[0], evt.coordinate[1]]);
        const coord = { lng: aux[0], lat: aux[1] };
        setCoordinates(coord);
      });

      //Agrega que se pueda modificar de lugar el icono
      const modify = new Modify({
        hitDetection: pointLayer.value,
        source: pointLayer.value.getSource(),
      });

      modify.on('modifyend', updateCoords);
      olMap.value.addInteraction(modify);
      // coordenadas de la ciudad por defecto
      olMap.value.getView().setCenter(cord);
    };

    const searchAddress = async (query) => {
      const address = await axios.get(location.protocol + '//nominatim.openstreetmap.org/search?', {
        params: {
          //query
          q: query,
          limit: 1,
          format: 'json',
        },
      });
      if (address.data.length === 1) {
        const lat = parseFloat(address.data[0].lat);
        const lng = parseFloat(address.data[0].lon);
        const coord = { lng, lat };
        setCoordinates(coord);
        return address.data[0];
      }
      return address.data;
    };

    const updateCoords = () => {
      updateModelValue();
      animateNewCoord();
    };

    return {
      olMap,
      pointLayer,
      mapRoot,
      searchAddress,
      updateCoords,
    };
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.layout {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #d6d6d633;
  height: 100%;
  z-index: 2;
  background-size: 100% 100%;
  opacity: 0.9;
}
.layout span {
  margin: 0 auto;
  font-size: 30px;
  text-align: center;
  display: block;
  color: #fff6;
  text-transform: uppercase;
  text-shadow: 2px 2px 2px #000;
  font-weight: 600;
  z-index: 3;
  top: 30px;
  position: absolute;
  left: 0;
  width: 100%;
}
</style>
<style>
.ol-control button {
  background-color: #f47521;
}
.ol-control button:hover {
  background-color: #ca5c12;
}
.ol-control button:focus {
  background-color: #ca5c12;
}
</style>
