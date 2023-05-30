import { createApp } from "vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  BiXLg,
  BiArrowRight,
  BiPinMap,
  RiDeleteBin7Line,
} from "oh-vue-icons/icons";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import "vue-toast-notification/dist/theme-sugar.css";

import App from "./App.vue";
import "./assets/style.scss";

addIcons(BiXLg, BiArrowRight, BiPinMap, RiDeleteBin7Line);

createApp(App)
  .use(VueAwesomePaginate)
  .component("v-icon", OhVueIcon)
  .mount("#app");
