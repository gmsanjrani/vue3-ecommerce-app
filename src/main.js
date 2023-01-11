import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "../src/assets/css/index.css";

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(VueSweetalert2)
  .use(vuetify)
  .use(Toast, { timeout: 3000, position: POSITION.TOP_CENTER })
  .mount("#app");
