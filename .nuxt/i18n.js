import { useSharedState, extendScopeContext } from "@shopware-pwa/composables";
import Vue from "vue";
import VueI18n from "vue-i18n";
import { effectScope } from "vue-demi";

Vue.use(VueI18n);

export default async ({ app }, inject) => {
  const scope = effectScope();
  extendScopeContext(scope, app);

  await scope.run(async () => {
    const { sharedRef } = useSharedState();
    const currentDomainData = sharedRef("sw-current-domain");
    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    const i18n = new VueI18n({
      locale:
        currentDomainData.value?.languageLocaleCode ||
        "en-GB",
      fallbackLocale: "en-GB",
      messages: {
        //
        "de-DE": require("sw-plugins/locales/de-DE.json"),
        //
        "en-GB": require("sw-plugins/locales/en-GB.json"),
        //
        "it-IT": require("sw-plugins/locales/it-IT.json"),
        //
        "nl-NL": require("sw-plugins/locales/nl-NL.json"),
        //
        "pl-PL": require("sw-plugins/locales/pl-PL.json"),
        //
      },
    });

    app.i18n = i18n;
    inject("i18n", i18n);
  });
  scope.stop();
};
