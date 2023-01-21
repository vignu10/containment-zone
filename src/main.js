import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import BaseButton from "./UI/BaseButton.vue";
import BaseHeader from "./UI/BaseHeader.vue";
import BaseFooter from "./UI/BaseFooter.vue";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Notifications from "vue-notification";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import velocity from "velocity-animate";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSbMHI9m4ZfpCzmBd-FbQDtJ3XtwNfuNU",
  authDomain: "containment-zone-82c2d.firebaseapp.com",
  projectId: "containment-zone-82c2d",
  storageBucket: "containment-zone-82c2d.appspot.com",
  messagingSenderId: "1071700823306",
  appId: "1:1071700823306:web:396f7cd96269d2755a7ef3",
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
Vue.component("base-button", BaseButton);
Vue.component("base-header", BaseHeader);
Vue.component("base-footer", BaseFooter);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
