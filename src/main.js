import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


library.add(faAngleDoubleDown, faHandHoldingDollar, faMoneyBillWave, faCreditCard);

createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
