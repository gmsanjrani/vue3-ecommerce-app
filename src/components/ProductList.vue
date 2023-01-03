<template>
  <!-- all products list -->
  <div class="flex flex-wrap justify-center gap-10 mt-8 mb-20">
    <ProductItem
      v-for="product in $store.state.products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';
export default {
    components: {
        ProductItem
    }
};
</script>

<style lang="scss" scoped></style>
