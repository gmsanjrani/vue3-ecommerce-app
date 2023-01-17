<template>
  <router-link :to="{ name: 'product', params: { id: product.id } }"
    class="border-2 border-my-gray-lit rounded-lg p-4 cursor-pointer transition hover:scale-110 duration-300 relative">
    <span class="absolute bg-my-red text-my-white text-xs p-2 rounded-lg">Discount <span>{{ product.discountPercentage}}%</span></span>
    <div class="flex flex-col gap-2 space-y-2">
      <img class="bg-my-gray-lit rounded-2xl thumbnail h-[250px] w-[270px]" :src="product.thumbnail" alt="nothing" />
      <div class="flex justify-between gap-4 max-w-[250px] px-2">
        <p class="text-my-blue font-semibold title">{{ product.title }}</p>
        <p class="font-extrabold">${{ product.price }}</p>
      </div>
      <div class="flex justify-between max-w-[250px] px-2">
        <p class="text-my-blue font-semibold">
          RATING
          <span class="font-bold" style="color: black">
            {{ product.rating }}</span>
        </p>
        <p class="font-medium text-my-blue">
          STOCK
          <span class="font-bold" style="color: black">{{ product.stock}}</span>
        </p>
      </div>
    </div>
  </router-link>
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
      loading: false,
    }
  }
};
</script>

<style>
.thumbnail {
  box-shadow: -15px 12px 46px 15px rgba(51, 44, 44, 0.75) inset;
  -webkit-box-shadow: -15px 12px 46px 15px rgba(51, 44, 44, 0.75) inset;
  -moz-box-shadow: -15px 12px 46px 15px rgba(51, 44, 44, 0.75) inset;
  outline: 2px solid #dcdcdc;
  /* outline-offset: 1px; */
}
</style>
