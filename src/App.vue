<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getProducts");
    this.$store.dispatch("getTopRatedProducts")
    if (JSON.parse(localStorage.getItem("cartData"))) {
      this.$store.commit("setCartData", JSON.parse(localStorage.getItem("cartData")))
    } else {
      const cartData = {
      id: 0,
      products: [],
      total: 0,
      discountedTotal: 0,
      userId: null,
      totalProducts:0,
      totalQuantity:0,
      }
      this.$store.commit("setCartData", cartData)      
    }
    if(JSON.parse(localStorage.getItem("userData"))) this.$store.commit("setLogin", true)
  }
};
</script>