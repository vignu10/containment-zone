import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Notifications from "vue-notification";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import velocity from "velocity-animate";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANcYPKPuXRySixB5GGmH-cU3yC__xOyUY",
  authDomain: "espfinalyear.firebaseapp.com",
  projectId: "espfinalyear",
  storageBucket: "espfinalyear.appspot.com",
  messagingSenderId: "568245041452",
  appId: "1:568245041452:web:1c11b8d5b9710c4aee1489",
  measurementId: "G-23JJ9XMKCL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default { app, db };

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

Vue.use(Notifications, { velocity });
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
