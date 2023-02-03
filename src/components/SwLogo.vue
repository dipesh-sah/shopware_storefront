<template>
  <nuxt-link :to="$routing.getUrl('/')" class="sf-header__logo" data-testid="header-logo">
    <img src="../assets/images/logo.png" alt="Logo" width="150px" height="50px">
  </nuxt-link>
</template>

<script>
export default {
  components: {},
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sf-header__logo {
  height: 2rem;
}
</style>
