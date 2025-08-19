import { Skeletor } from 'vue-skeletor';
import 'vue-skeletor/dist/vue-skeletor.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("Skeleton", Skeletor)
})