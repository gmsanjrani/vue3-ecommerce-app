<template>
  <div>
    <router-view/>
  </div>
</template>

<script>

export default {
  beforeMount() {
    this.$store.dispatch('getProducts')
    this.$store.dispatch('getCart')
  }

};
</script>
