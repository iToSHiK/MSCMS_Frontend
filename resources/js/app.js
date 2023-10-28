import Vue from 'vue';
import router from './router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueCookie from 'vue-cookie';
import VueInternationalization from 'vue-i18n';
import Locale from './vue-i18n-locales.generated';

Vue.use(VueInternationalization);
Vue.use(VueAxios, axios);
Vue.use(VueCookie);

axios.defaults.baseURL = '/api';
const i18n = new VueInternationalization({
    locale: VueCookie.get('lang') || locale,
    messages: Locale,
    silentFallbackWarn: true
 });

import App from "./pages/App";


Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        el.eventSetDrag = function () {
            el.setAttribute('data-dragging', 'yes');
        }
        el.eventClearDrag = function () {
            el.removeAttribute('data-dragging');
        }
        el.eventOnClick = function (event) {
            var dragging = el.getAttribute('data-dragging');
            if (!(el == event.target || el.contains(event.target)) && !dragging) {
                vnode.context[binding.expression](event);
            }
        };
        document.addEventListener('touchstart', el.eventClearDrag);
        document.addEventListener('touchmove', el.eventSetDrag);
        document.addEventListener('click', el.eventOnClick);
        document.addEventListener('touchend', el.eventOnClick);
    }, unbind: function (el) {
        document.removeEventListener('touchstart', el.eventClearDrag);
        document.removeEventListener('touchmove', el.eventSetDrag);
        document.removeEventListener('click', el.eventOnClick);
        document.removeEventListener('touchend', el.eventOnClick);
        el.removeAttribute('data-dragging');
    },
});


const app = new Vue({
    el: '#app',
    i18n,
    data: {
        user: null,
        cart: {
            items: 0,
            price: 0,
            tax: 0,
        },
        cartItems: null,
        settings: {
            server: {
                ip: ''
            },
            header: [],
            footer: [],
            website_name: '',
            deal: [],
            content: '',
            goal: 0,
            details: 0,
            discord_url: '',
            discord_id: '',
            socials: {
                facebook: '',
                instagram: '',
                discord: '',
                twitter: ''
            },
            top: [],
            goal_sum: 0,
            is_virtual_currency: 0,
            virtual_currency: '',
            system_currency: {
                name: 'USD',
                value: 1
            },
            currency: '',
            currencies: [],
            system_language: {
                name: 'English',
                code: 'en'
            },
            languages: {
                name: 'English',
                code: 'en'
            },
        },
        currency: {
            name: 'USD',
            value: 1
        },
        language: {
            name: 'English',
            code: 'en'
        },
    },
    methods: {
        async getUser() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$cookie.get('token');
            try {
                const response = await axios.post('/user');
                this.user = response.data;

                this.getCart();
            } catch (e) {
                this.user = null;
                this.$cookie.delete('token');
            }
        },
        async getCart() {
            const response = await axios.post('/cart/get');
            this.cart = response.data.cart;
            this.cartItems = response.data.items;
        },
        async getSettings() {
            const response = await axios.post('/settings/get');
            this.settings = response.data;
            for (var i = 0; i < this.settings.currencies.length; i++) {
                if (this.settings.currencies[i].value === 1){
                    this.currency.name = this.settings.currencies[i].name;
                    this.currency.value = 1;
                    break;
                }
            }
            
            if (!this.$cookie.get('currency')){
                this.currency = this.settings.system_currency;
            } else {
                this.currency = JSON.parse(this.$cookie.get('currency'));
            }

            if (!this.$cookie.get('lang')){
                this.language = this.settings.system_language;
                this.$i18n.locale = this.language.code;
            }
        },
        showNotification(type, message) {
            toastr[type](message);
        },
        toActualCurrency(price) {
            //return (price * this.currency.value).toFixed(2);
            if (this.currency.name == this.settings.system_currency.name) return price;
            return ((price * this.currency.value)/this.settings.system_currency.value).toFixed(2);
        }
    },
    created() {
        this.getSettings();
        if (this.$cookie.get('token')) {
            this.getUser();
            this.getCart();
        }

        if (this.$cookie.get('currency'))
            this.currency = JSON.parse(this.$cookie.get('currency'));

        if (this.$cookie.get('lang')){
            this.language.code = this.$cookie.get('lang');
            this.language.name = this.$cookie.get('lang_name');
            this.$i18n.locale = this.language.code;
        }
    },
    router,
    components: {
        App
    }
});
