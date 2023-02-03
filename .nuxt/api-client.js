import { createInstance } from "@shopware-pwa/shopware-6-client";
import {
  useUser,
  useCart,
  useSessionContext,
  createShopware,
  ShopwareVuePlugin,
  useIntercept,
} from "@shopware-pwa/composables";
import { reactive, isVue2, Vue2 } from "vue-demi";

if (isVue2) {
  Vue2.use(ShopwareVuePlugin, {
    enableDevtools:
      process.env.ENABLE_DEVTOOLS === "true" ||
      process.env.NODE_ENV !== "production",
  });
}

const apiDefaults = JSON.parse(`{"useCms":{"limit":10,"associations":{"manufacturer":{"associations":{"media":{}}},"media":{"sort":[{"field":"position","order":"ASC","naturalSorting":false}]},"productReviews":{},"properties":{"associations":{"group":{}}}},"includes":{"cms_page_slot":["id","type","slot","blockId","config","data","backgroundMediaMode","backgroundMedia"],"cms_page_block":["slots","type","id","backgroundColor","backgroundMedia","sectionPosition"],"cms_page_section":["id","backgroundMedia","blocks","type","sizingMode"],"cms_page":["id","name","sections","type","config"],"product":["media","productReviews","name","description","ratingAverage","calculatedCheapestPrice","calculatedPrice","calculatedPrices","calculatedListingPrice","cover","parentId","id","translated","optionIds","properties","manufacturer","seoUrls","crossSellings","availableStock","customFields","stock","metaTitle","metaDescription","metaKeywords","purchaseSteps"],"product_media":["media"],"media":["thumbnails","width","height","url"],"media_thumbnail":["url","width","height","id"],"calculated_price":["unitPrice","quantity","listPrice"],"product_group_option":["id","group","translated","name"],"product_group":["id","translated","name"],"product_listing":["sorting","currentFilters","elements","page","limit","sortings","availableSortings","total","aggregations"],"property_group":["id","translated","options","name","displayType"],"property_group_option":["translated","name","id","colorHexCode","media","group"],"product_manufacturer":["translated","link","name","id"]}},"useProductListing":{"limit":10,"includes":{"product":["name","ratingAverage","calculatedCheapestPrice","calculatedPrice","calculatedPrices","calculatedListingPrice","cover","id","translated","options","seoUrls"],"product_media":["media"],"media":["thumbnails","width","height","url"],"calculated_price":["unitPrice","quantity","listPrice"],"product_group_option":["name","id","group","translated"],"product_group":["id","name","options","translated"],"property_group":["id","translated","options","name"],"property_group_option":["translated","name","id","colorHexCode","media","group"]}},"useProductReviews":{"sort":[{"field":"createdAt","order":"desc"}]},"useProductQuickSearch":{"limit":10,"includes":{"calculated_price":["unitPrice","quantity","listPrice"]}},"useListing":{"limit":10,"includes":{"product":["name","ratingAverage","calculatedPrice","calculatedPrices","calculatedListingPrice","calculatedCheapestPrice","cover","id","translated","options","seoUrls"],"product_media":["media"],"media":["thumbnails","width","height","url"],"calculated_price":["unitPrice","quantity","listPrice"],"product_group_option":["name","id","group","translated"],"product_group":["id","name","options","translated"],"property_group":["id","translated","options","name"],"property_group_option":["name","translated","id","colorHexCode","media","group"]}},"useProduct":{"associations":{"crossSellings":{"associations":{"assignedProducts":{"associations":{"product":{"associations":{"media":{},"cover":{},"seoUrls":{}}}}}}},"media":{"sort":[{"field":"position","order":"ASC","naturalSorting":false}]}},"includes":{"product":["name","ratingAverage","calculatedPrice","calculatedPrices","calculatedListingPrice","cover","id","parentId","translated","media","seoUrls","crossSellings","availableStock","customFields"],"product_media":["media"],"media":["url"],"media_thumbnail":["url","width","height","id"],"calculated_price":["unitPrice","quantity","listPrice"],"product_group_option":["name","id","group","translated"],"product_group":["id","name","translated"]}},"useNavigation":{"associations":{"media":{},"seoUrls":{}},"includes":{"category":["seoUrls","externalLink","name","id","children","translated","type","media"],"seo_url":["pathInfo","seoPathInfo"]}},"useOrderDetails":{"limit":1,"includes":{"calculated_price":["unitPrice","quantity","listPrice"]},"associations":{"lineItems":{},"addresses":{},"transactions":{"sort":"-createdAt","associations":{"paymentMethod":{}}},"deliveries":{"associations":{"shippingMethod":{}}}}},"useCustomerOrders":{"limit":10,"aggregations":[{"name":"count-id","type":"count","field":"id"}],"sort":[{"field":"createdAt","order":"desc"}],"associations":{},"includes":{"order":["id","orderNumber","amountTotal","orderDateTime","stateMachineState","translated"],"state_machine_state":["id","technicalName","name","translated"]}},"useCustomerAddresses":{"associations":{"salutation":{}},"includes":{"customer_address":["firstName","lastName","city","zipcode","country","countryId","id","phoneNumber","state","salutation","salutationId","street"],"country":["name","id","translated"],"salutation":["salutationKey","displayName","translated","id"]}},"useUser":{"associations":{"salutation":{},"addresses":{}},"includes":{"customer":["active","doubleOptInRegistration","doubleOptInConfirmDate","id","salutation","firstName","lastName","email","guest","addresses","defaultBillingAddressId","defaultShippingAddressId","orderCount"]}},"useCart":{"includes":{},"associations":{},"getProductItemsSeoUrlsData":{"includes":{"product":["id","seoUrls"],"seo_url":["seoPathInfo"]},"associations":{"seoUrls":{}}}}}`);

export default async ({ app }, inject) => {
  if (!app.$cookies) {
    throw "Error cookie-universal-nuxt module is not applied in nuxt.config.js";
  }

  /**
   * get contextToken from sessionStorage when cookie lost in redirects
   * https://github.com/vuestorefront/shopware-pwa/pull/1817
   */
  if (process.client && navigator?.userAgent.includes('WebKit')) {
    if (!app.$cookies.get("sw-context-token") && typeof sessionStorage !== "undefined") {
      app.$cookies.set(
        "sw-context-token",
        sessionStorage.getItem("sw-context-token"),
        {
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "Lax",
          path: "/",
        }
      )
    }
    sessionStorage.removeItem("sw-context-token")
  }

  function getCookiesConfig(app) {
    return {
      contextToken: app.$cookies.get("sw-context-token") || "",
      languageId: app.$cookies.get("sw-language-id") || "",
    };
  }

  const { contextToken, languageId } = getCookiesConfig(app);

  /**
   * Setup Shopware API client
   */
  const instance = createInstance({
    endpoint: "https://shoptest.bay20.in/public",
    accessToken: "SWSCEXP3OG0ZZWT2BHRZYTJNEG",
    timeout: "10000",
    auth: {
      username:
        "",
      password:
        "",
    },
    contextToken,
    languageId,
  });

  let sharedStore;
  if (process.server) {
    sharedStore = reactive({});
    app.context.ssrContext.nuxt.sharedStore = sharedStore;
  } else {
    // Client side
    sharedStore = reactive(window.__NUXT__.sharedStore || {});
  }
  /**
   * Save current contextToken when its change
   */
  instance.onConfigChange(({ config }) => {
    try {
      app.$cookies.set("sw-context-token", config.contextToken, {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "Lax",
        path: "/",
      });
      app.$cookies.set("sw-language-id", config.languageId, {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "Lax",
        path: "/",
      });
    } catch (e) {
      // Sometimes cookie is set on server after request is send, it can fail silently
    }
  });

  const shopwarePlugin = createShopware(app, {
    initialStore: sharedStore,
    shopwareDefaults: apiDefaults,
    apiInstance: instance,
  });
  inject("shopware", shopwarePlugin);
  if (isVue2) {
    app.shopware = shopwarePlugin;
  }

  const { setup } = app;
  app.setup = function (...args) {
    let result = {};
    if (setup instanceof Function) {
      result = setup(...args) || {};
    }
    if (process.client) {
      const { refreshSessionContext } = useSessionContext();
      refreshSessionContext();
      const { refreshUser } = useUser();
      refreshUser();
      const { refreshCart } = useCart();
      refreshCart();
      const { broadcast } = useIntercept();

      document.addEventListener("visibilitychange", (activeInfo) => {
        const { contextToken, languageId } = getCookiesConfig(app);
        if (document.visibilityState === "visible") {
          instance.update({ contextToken, languageId });
          refreshSessionContext();
          refreshUser();
          refreshCart();
          broadcast("tab-visible");
        }
      });
    }
    return result;
  };
};
