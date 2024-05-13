<template>
  <div id="Book" class="my-3">
    <div class="mb-3">
      <label for="weight">Weight (kg)</label>
      <input 
        type="number"
        id="weight"
        v-model="weight"
        class="form-control"
        min="0" step="0.01"
        placeholder="Weight"
        @input="setWeight"
      >
    </div>
    <p class="text-center text-capitalize fw-bold">please, provide weight of book</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weight: '',
      description: '',
    };
  },
  methods: {
    setWeight() {
      if (this.weight) {
        const description = this.formattedWeight(this.weight);
        this.$emit('description', description);
      } else {
        this.$emit('description', '');
      }
    },
    formattedWeight(weight) {
      return new Intl.NumberFormat('en-US', {
        style: 'unit',
        unit: 'kilogram',
        unitDisplay: 'narrow'
      }).format(weight).toUpperCase();
    },
  }
};
</script>

<style>
</style>
