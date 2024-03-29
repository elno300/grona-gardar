import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue'
import AboutProductsview from './views/AboutProductsview.vue'
import ProductsPageview from './views/ProductsPageview.vue'
import AccountView from './views/AccountView.vue'
import OrderHistoryView from './views/OrderHistoryView.vue'
import EditAccountView from './views/EditAccountView.vue'
import FavoritesView from './views/FavoritesView.vue'
import LogOutView from './views/LogOutView.vue'

import SearchView from './views/SearchView.vue'
import PageNotFoundView from './views/PageNotFoundView.vue'

import AboutUs from './views/AboutUs.vue'
import Contact from './views/Contact.vue'

//Admin views
import AdminView from './views/admin/AdminView.vue'
import AdminOrders from './views/admin/AdminOrdersView.vue'
import AdminCustomers from './views/admin/AdminCustomersView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
      //Background color used by footer to match the bg of current page
      meta: { footerBackgroundColor: '#fff8ee' }
    },
    {
      path: '/about',
      component: AboutUs,
      meta: { footerBackgroundColor: '#efe9de' }
    },
    {
      path: '/contact',
      component: Contact,
      meta: { footerBackgroundColor: '#efe9de' }
    },
    {
      path: '/product/:id',
      component: AboutProductsview,
      //Background color used by footer to match the bg of current page
      meta: { footerBackgroundColor: '#efe9de' }
    },
    {
      path: '/products',
      component: ProductsPageview,
      //Background color used by footer to match the bg of current page
      meta: { footerBackgroundColor: '#efe9de' }
    },
    {
      path: '/products/:category',
      component: ProductsPageview,
      //Background color used by footer to match the bg of current page
      meta: { footerBackgroundColor: '#efe9de' }
    },
    {
      path: '/account',
      redirect: '/account/orderhistory',
      component: AccountView,
      //Background color used by footer to match the bg of current page
      meta: { footerBackgroundColor: '#efe9de' },

      children: [
        { path: 'orderhistory', component: OrderHistoryView },
        {
          path: 'editaccount',
          component: EditAccountView
        },
        {
          path: 'favorites',
          component: FavoritesView
        },
        {
          path: 'logout',
          component: LogOutView
        },
      ],
    },
    {
      path: '/admin',
      component: AdminView,
      children: [
        { path: 'orders', component: AdminOrders },
        { path: 'customers', component: AdminCustomers },
      ]
    },
    {
      path: '/search/:query',
      component: SearchView
    },
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFoundView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }; // Scroll to top when navigating to a new page
  }
});

export default router;
