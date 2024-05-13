<template>
  <!-- Section for displaying all products -->
  <section class="row g-0 all-products">
    <div>
      <!-- Button for mass delete -->
      <div class="text-end">
        <button 
          id="delete-product-btn"
          class="btn btn-danger"
          @click="deleteProducts()"
        >
        MASS DELETE
        </button>
      </div>

      <!-- Loading indicator -->
      <template v-if="isLoading">
        <p class="text-center p-3 my-3">Loading...</p>
      </template>

      <!-- Display products -->
      <template v-else>
        <!-- Display products if available -->
        <div v-if="allProducts.length" class="d-flex flex-wrap justify-content-center align-items-center">
          <ul v-for="product in allProducts" :key="product.id" class="col-8 col-md-5 col-lg-3 m-auto my-3 m-md-3 p-3 border border-secondary rounded">
            <!-- Checkbox for selecting product -->
            <li><input class="delete-checkbox" @change="getDeletedID(product.id)" type="checkbox"></li>
            <li>Name: {{ product.name }}</li>
            <li>SKU: {{ product.sku }}</li>
            <li>Price: {{ formattedPrice(product.price) }}</li>
            <li>{{ product.description }}</li>
          </ul>
        </div>

        <!-- Show message if no products available -->
        <div v-else>
          <p class="text-center fw-bold p-3 my-3">No Products To Show</p>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { useProductStore } from "@/stores/productStore"

export default {
  data() {
    return {
      productStore: useProductStore(),
      allProducts: [],
      deletedProductsIDs : {},
      isLoading: false,
    };
  },
  // Fetch products on component creation
  async created() {
    this.isLoading = true;
    this.allProducts = await this.productStore.getAllProducts();
    this.isLoading = false;
  },
  methods: {
    // Method to delete selected products
    async deleteProducts() {
      let result = await this.productStore.deleteProducts(this.deletedProductsIDs);
      if(!result) return;
      this.deletedProductsIDs = {};
      this.isLoading = true;
      this.allProducts = await this.productStore.getAllProducts();
      this.isLoading = false;
    },
    // Method to track selected products for deletion
    getDeletedID(id) {
      if(this.deletedProductsIDs[`id${id}`]){
        delete this.deletedProductsIDs[`id${id}`];
        return;
      }
      this.deletedProductsIDs[`id${id}`] = id;
    },
    // Method to format price using currency format
    formattedPrice(price) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price);
    },
  },
}
</script>

<style scoped>
ul {
  min-height: 180px;
}
</style>
