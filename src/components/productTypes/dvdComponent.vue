<template>
  <div id="DVD" class="my-3">
    <div class="mb-3">
      <label for="size">Size (MB)</label>
      <input 
        type="number"
        id="size"
        v-model="size"
        class="form-control"
        min="0" step="0.01"
        placeholder="Size"
        @input="setSize"
      >
    </div>
    <p class="text-center text-capitalize fw-bold">please, provide size of DVD</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: '',
      description: '',
    };
  },
  methods: {
    setSize() {
      if(this.size) {
        this.description = this.formattedSize();
        this.$emit('description', this.description);
        this.error = false;
      } else {
        this.$emit('description', '');
      }
    },
    formattedSize() {
      return new Intl.NumberFormat('en-US', {
        style: 'unit',
        unit: 'megabyte',
        unitDisplay: 'narrow'
      }).format(this.size).toUpperCase();
    },
  },
};
</script>

<style>
</style>
