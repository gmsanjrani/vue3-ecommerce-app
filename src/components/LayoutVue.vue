<template>
  <div>
    <NavBar />

    <main class="main-container pt-20 md:pt-28">
      <slot></slot>
    </main>
    
    <footer class="main-container">
      <FooterMain />
    </footer>
  </div>
</template>

<script>
import FooterMain from "./FooterMain.vue";
import NavBar from "./NavBar.vue";

export default {
  components: {
    FooterMain,
    NavBar,
  },
};
</script>

<style lang="scss" scoped></style>
