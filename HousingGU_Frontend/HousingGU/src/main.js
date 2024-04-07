import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import "./interceptors/axios";
import router from "./router";
import Vue3Toastify from "vue3-toastify";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
app.use(Vue3Toastify, {
	autoClose: 3000,
});
app.use(pinia);
app.use(router);
app.mount("#app");
