import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './style.css'
import 'primevue/resources/themes/lara-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
    console.error('Global error:', err);
    console.log('Vue instance:', instance);
    console.log('Error info:', info);
};

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

router.onError((err) => {
    console.error('Router error:', err);
});

app.mount('#app');