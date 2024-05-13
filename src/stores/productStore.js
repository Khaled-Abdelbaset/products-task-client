import { defineStore } from "pinia";
import router from "@/router"

export const useProductStore = defineStore("products", {
  state: () => ({
    baseURL: "http://localhost", // Base URL for API requests
  }),
  actions: {
    // Action to fetch all products
    async getAllProducts() {
      try {
        const response = await fetch(`${this.baseURL}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          switch(response.status) {
            case 404:
              router.push({ path: "/404" });
              break;
            default:
              const message = await response.json();
              throw new Error("server responded with an error: " + message.error_message);
          }
          return;
        }
        const products = await response.json();
        return products.all_products;
      } catch (error) {
        router.push({ path: "/servererror" });
      }
    },

    // Action to add a new product
    async addProduct(info) {
      // Check for form validity
      if (!info.name || !info.sku || !info.price || !info.description || !info.productType === 'Type Switcher') {
        return "Please, submit required data";
      }
      // Prepare data for submission
      const data = {
        name: info.name,
        sku: info.sku,
        price: info.price,
        type: info.productType,
        description: info.description,
      };
      // Attempt to submit data
      try {
        const response = await fetch(`${this.baseURL}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
        // Handle response
        if (!response.ok) {
          switch(response.status) {
            case 400:
              return "Please, provide the data of indicated type";
            case 409:
              return "duplicated value, SKU must has unique value";
            case 404:
              router.push({ path: "/404" });
              break;
            default:
              const message = await response.json();
              throw new Error("server responded with an error: " + message.error_message);
          }
        }
        router.push({ name: "productsList" });
      } catch (error) {
        router.push({ path: "/servererror" });
      }
    },

    // Action to delete selected products
    async deleteProducts(deletedProductsIDs) {
      if(!Object.entries(deletedProductsIDs).length) {
        return false;
      }
      try {
        const response = await fetch(`${this.baseURL}/products`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(deletedProductsIDs),
        });
        if (!response.ok) {
          const message = await response.json();
          throw new Error("server responded with an error: " + message.error_message);
        }
        return true;
      } catch(error) {
        router.push({ path: "/servererror" });
      }
    }
  }
});
