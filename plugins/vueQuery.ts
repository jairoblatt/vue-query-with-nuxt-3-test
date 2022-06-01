import { VueQueryPlugin } from "vue-query";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(VueQueryPlugin);
});
