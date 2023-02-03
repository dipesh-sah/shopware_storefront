import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2c0109c6 = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\account.vue' /* webpackChunkName: "pages/account" */))
const _47f031cc = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\account\\addresses.vue' /* webpackChunkName: "pages/account/addresses" */))
const _652e7594 = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\account\\addresses\\index.vue' /* webpackChunkName: "pages/account/addresses/index" */))
const _13166746 = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\account\\addresses\\add\\index.vue' /* webpackChunkName: "pages/account/addresses/add/index" */))
const _1a944205 = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\account\\addresses\\add\\_id.vue' /* webpackChunkName: "pages/account/addresses/add/_id" */))
const _07f1e0aa = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\account\\orders.vue' /* webpackChunkName: "pages/account/orders" */))
const _55755e77 = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\account\\orders\\index.vue' /* webpackChunkName: "pages/account/orders/index" */))
const _7632dac2 = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\account\\orders\\_id.vue' /* webpackChunkName: "pages/account/orders/_id" */))
const _09243e5a = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\account\\profile.vue' /* webpackChunkName: "pages/account/profile" */))
const _fe5157ae = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\account\\recover\\password.vue' /* webpackChunkName: "pages/account/recover/password" */))
const _6ce1b17d = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\checkout.vue' /* webpackChunkName: "pages/checkout" */))
const _84a5457c = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _4c2ee6ed = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\newsletter-subscribe.vue' /* webpackChunkName: "pages/newsletter-subscribe" */))
const _790493dd = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\order-success.vue' /* webpackChunkName: "pages/order-success" */))
const _6f2b145c = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\payment-failure.vue' /* webpackChunkName: "pages/payment-failure" */))
const _a02ec74c = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _233598d0 = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\reset-password.vue' /* webpackChunkName: "pages/reset-password" */))
const _3870649f = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\search.vue' /* webpackChunkName: "pages/search" */))
const _0413c27c = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\wishlist.vue' /* webpackChunkName: "pages/wishlist" */))
const _5afabf80 = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\registration\\confirm.vue' /* webpackChunkName: "pages/registration/confirm" */))
const _71460bb8 = () => interopDefault(import('..\\.shopware-pwa\\source\\pages\\_.vue' /* webpackChunkName: "pages/_" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/account",
    component: _2c0109c6,
    name: "account",
    children: [{
      path: "addresses",
      component: _47f031cc,
      children: [{
        path: "",
        component: _652e7594,
        name: "account-addresses"
      }, {
        path: "add",
        component: _13166746,
        name: "account-addresses-add"
      }, {
        path: "add/:id",
        component: _1a944205,
        name: "account-addresses-add-id"
      }]
    }, {
      path: "orders",
      component: _07f1e0aa,
      children: [{
        path: "",
        component: _55755e77,
        name: "account-orders"
      }, {
        path: ":id",
        component: _7632dac2,
        name: "account-orders-id"
      }]
    }, {
      path: "profile",
      component: _09243e5a,
      name: "account-profile"
    }, {
      path: "recover/password",
      component: _fe5157ae,
      name: "account-recover-password"
    }]
  }, {
    path: "/checkout",
    component: _6ce1b17d,
    name: "checkout"
  }, {
    path: "/login",
    component: _84a5457c,
    name: "login"
  }, {
    path: "/newsletter-subscribe",
    component: _4c2ee6ed,
    name: "newsletter-subscribe"
  }, {
    path: "/order-success",
    component: _790493dd,
    name: "order-success"
  }, {
    path: "/payment-failure",
    component: _6f2b145c,
    name: "payment-failure"
  }, {
    path: "/register",
    component: _a02ec74c,
    name: "register"
  }, {
    path: "/reset-password",
    component: _233598d0,
    name: "reset-password"
  }, {
    path: "/search",
    component: _3870649f,
    name: "search"
  }, {
    path: "/wishlist",
    component: _0413c27c,
    name: "wishlist"
  }, {
    path: "/registration/confirm",
    component: _5afabf80,
    name: "registration-confirm"
  }, {
    path: "/*",
    component: _71460bb8,
    name: "all"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
