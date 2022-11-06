<template>
  <div id="wrap">
    <headerComponent />
    <Nuxt />
    <footerComponent />
  </div>
</template>
<script>
import headerComponent from '~/components/layouts/header'
import footerComponent from '~/components/layouts/footer'
export default {
  components: {
    headerComponent,
    footerComponent,
  },
}
</script>
