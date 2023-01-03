<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  // here we get products & cart data of a user
  mounted() {
    this.$store.dispatch("getProducts");
    if (!JSON.parse(localStorage.getItem("userData"))) {
      this.$router.push("/");
    } else {
      const userId = JSON.parse(localStorage.getItem("userData")).id;
      this.$store.dispatch("getCart", userId);
    }
  },
};
</script>
