<template>
  <div
    class="product__line"
    @click="replaceRoute">
    <a>
      <div class="space-y-2 marquee__img">
        <img class="bg-my-gray-lit rounded-2xl shadow-md outline outline-2 outline-my-gray-lit" :src="product.thumbnail"
          alt="nothing" />
        <p class="text-my-blue font-semibold title">{{ myProduct.title }}</p>
        <p class="font-extrabold">${{ myProduct.price }}</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {
      myProduct: {},
    };
  },
  methods: {
    replaceRoute() {
      this.$router.replace({
        name: "product",
        params: { id: this.myProduct.id },
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.myProduct = this.product;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.title {
  max-width: 180px;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
</style>
