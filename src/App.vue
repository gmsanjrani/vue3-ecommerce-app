<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getProducts");
    this.$store.dispatch("getCategories");
    this.$store.dispatch("getTopRatedProducts")
    if (!JSON.parse(localStorage.getItem("userData"))) this.$router.push("/login");
    else this.$store.dispatch("getCart");
  }
};
</script>
