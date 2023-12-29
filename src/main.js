import { createApp } from 'vue';
import VueHighlightJS from 'vue3-highlightjs';
import './css/github-dark.css';
import App from './App.vue';

const app = createApp(App);

app.use(VueHighlightJS);
app.mount('#app-cases');
