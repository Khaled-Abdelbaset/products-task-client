<template>
  <div id="Furniture" class="my-3">
    <div class=" mb-3" v-for="(input, index) in inputs" :key="index">
      <label :for="input.id">{{ input.label }}</label>
      <input :id="input.id" v-model="input.value" class="form-control" min="0" step="0.01" :placeholder="input.placeholder" @input="setDescription">
    </div>
    <p class="text-center text-capitalize fw-bold">please, provide dimensions of the furniture</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputs: [
        {id: "height", label: "Height (CM)", placeholder: "Height" },
        {id: "width", label: "Width (CM)", placeholder: "Width" },
        {id: "length", label: "Length (CM)", placeholder: "Length"}
      ],
      description: '',
      error: true,
    };
  },
  methods: {
    setDescription() {
      if (this.inputs.every(input => input.value)) {
        const description = this.inputs.map(input => input.value).join('x');
        this.$emit('description', description+" CM");
      } else {
        this.$emit('description', '');
      }
    },
  },
};
</script>

<style>
</style>
