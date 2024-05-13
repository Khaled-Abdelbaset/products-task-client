<template>
  <main class="container d-flex flex-column justify-content-between">
    <headerComponent />
    <router-view />
    <footerComponent />
  </main>
</template>

<script>
  import headerComponent from '@/components/headerComponent.vue';
  import footerComponent from '@/components/footerComponent.vue';
  export default {
    components: {
      headerComponent,
      footerComponent
    }
  }
</script>
<style scoped>
  main {
    min-height: 100vh;
  }
  section {
    flex-grow: 1;
  }
</style>
