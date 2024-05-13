<template>
  <!-- Form for adding a new product -->
  <section class="row g-0 justify-content-center">
    <!-- Error Message Alert -->
    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show position-absolute top-0 start-50 translate-middle-x p-2" role="alert">
      <strong class="mb-0 text-capitalize">{{ errorMessage }}</strong>
      <button type="button" class="btn-close" @click="clearErrorMessage" aria-label="Close" style="height: auto;"></button>
    </div>
    
    <form @submit.prevent="addProduct" id="product_form" class="col-10 col-md-8">
      <!-- Product SKU Input -->
      <div class="p-2">
        <label for="sku">SKU:</label>
        <input type="text" id="sku" v-model="sku" name="sku" class="form-control" placeholder="Product SKU">
      </div>
      
      <!-- Product Name Input -->
      <div class="p-2">
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" name="name" class="form-control" placeholder="Product Name">
      </div>

      <!-- Product Price Input -->
      <div class="p-2">
        <label for="price">Price ($)</label>
        <input type="number" id="price" v-model="price" name="price" min=".01" step="0.01" class="form-control" placeholder="Product Price">
      </div>

      <!-- Product Type Selector -->
      <div class="p-2">
        <select :class="{'border-danger': productType === 'Type Switcher' && formSubmitted}" class="w-75 input-group-text m-auto" id="productType" v-model="productType">
          <option selected disabled>Type Switcher</option>
          <option value="Furniture">Furniture</option>
          <option value="DVD">DVD</option>
          <option value="Book">Book</option>
        </select>
      </div>

      <!-- Dynamic Component Based on Product Type -->
      <component :is="selectedType" v-model="description" @description="getDescription"></component>
      
      <!-- Save Button -->
      <div class="text-center p-2"><button type="submit" class="btn btn-success">Save</button></div>
    </form>
  </section>
</template>

<script>
  import furnitureComponent from "../productTypes/furnitureComponent.vue"
  import bookComponent from "../productTypes/bookComponent.vue"
  import dvdComponent from "../productTypes/dvdComponent.vue"
  import { useProductStore } from "@/stores/productStore"

  export default {
    data() {
      return {
        useProductStore: useProductStore(),

        // Form fields
        name: '',
        sku: '',
        price: '',
        description: '',
        productType: 'Type Switcher',

        // Validation and submission state
        errorMessage: '',
        formSubmitted: false,
      };
    },
    components: {
      furnitureComponent,
      bookComponent,
      dvdComponent
    },
    methods: {
      // Method to add a new product
      async addProduct() {
        this.formSubmitted = true;
        const data = {
          name: this.name,
          sku: this.sku,
          price: parseFloat(this.price).toFixed(2),
          description: this.description,
          productType :this.productType, 
        };
        this.errorMessage =  await this.useProductStore.addProduct(data);
      },

      // Method to handle description updates from child component
      getDescription(description) {
        description ? this.description = description : this.description = '';
      },

      // Method to clear the error message
      clearErrorMessage() {
        this.errorMessage = '';
      },
    },
    computed: {
      // Compute the selected component based on product type
      selectedType() {
        if (this.productType === "Furniture") {
          return 'furnitureComponent';
        } else if (this.productType === "Book") {
          return 'bookComponent';
        } else if (this.productType === "DVD") {
          return 'dvdComponent';
        }
      }
    },
  }
</script>

<style>
  label {
    font-weight: bold;
    margin-bottom: .25rem;
  }
  select:focus {
    outline: none;
  }
</style>
