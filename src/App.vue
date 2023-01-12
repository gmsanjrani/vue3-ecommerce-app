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

    //! check if cart exist in storage then show cart data else create an empty cart
    if (JSON.parse(localStorage.getItem("cartData"))) {
      this.$store.commit("setCartData", JSON.parse(localStorage.getItem("cartData")))
    } else { // empty cart
      const cartData = {
      id: 0,
      products: [],
      total: 0,
      discountedTotal: 0,
      userId: null,
      totalProducts:0,
      totalQuantity:0,
      }
      this.$store.commit("setCartData", cartData)   // set empty cart   
    }

    // check for user login or not
    if(JSON.parse(localStorage.getItem("userData"))) this.$store.commit("setLogin", true)
  }
};
</script>