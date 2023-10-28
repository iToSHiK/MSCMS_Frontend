import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from "./pages/index/Index";
import Category from "./pages/category/Category";
import Auth from "./pages/auth/Auth";
import Callback from "./pages/auth/Callback";
import Checkout from "./pages/Checkout/Checkout";
import Page from "./pages/custom/Page";
import Profile from "./pages/profile/Profile";
import Staff from "./pages/staff/Staff";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentError from "./pages/payment/PaymentError";
import Airtel from "./pages/payment/Airtel";
import TicketsNew from "./pages/tickets/New";
import TicketsView from "./pages/tickets/View";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/category/:url',
            name: 'category',
            component: Category
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth
        },
        {
            path: '/auth/callback',
            name: 'auth.callback',
            component: Callback
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },
        {
            path: '/c/:url',
            name: 'custom',
            component: Page
        },
        {
            path: '/profile/:username?',
            name: 'profile',
            component: Profile
        },
        {
            path: '/staff',
            name: 'staff',
            component: Staff
        },
        {
            path: '/success',
            name: 'PaymentSuccess',
            component: PaymentSuccess
        },
        {
            path: '/error',
            name: 'PaymentError',
            component: PaymentError
        },
        {
            path: '/airtel',
            name: 'Airtel',
            component: Airtel
        },
        {
            path: '/tickets/new',
            name: 'TicketsNew',
            component: TicketsNew
        },
        {
            path: '/tickets/view',
            name: 'TicketsView',
            component: TicketsView
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
