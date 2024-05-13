<template>
  <header v-if="currentRoute != 'notFound'" class="row g-0 p-3 mb-3 justify-content-between align-items-center border-bottom border-2 border-black">
    <h4 class="w-50 mb-0 fw-bold">{{ routeTitles[currentRoute] }}</h4>
    <ul class="w-50 d-flex justify-content-end">
      <li v-if="currentRoute === 'productsList'"><router-link :to="{name: 'addProduct'}" class="btn btn-secondary">Add</router-link></li>
      <li v-if="currentRoute === 'addProduct'"><router-link :to="{name:'productsList'}" class="btn btn-danger">Cancel</router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      routeTitles: {
        productsList: "Product List",
        addProduct: "Product Add",
      },
    };
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped>
</style>
