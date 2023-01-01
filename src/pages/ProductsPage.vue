<template>
  <LoadingPage v-if="loading" />
  <LayoutVue v-else>
    <!-- <HeroBanner /> -->
    <!-- Category container -->
    <div class="main-container">
      <div class="text-center mt-14">
        <h2 class="text-4xl font-extrabold leading-tight text-my-blue">
          Categories
        </h2>
        <p class="text-my-gray">Filter Products By Your Choice</p>
      </div>

      <div>
        <!-- Categories -->
        <div class="grid grid-cols-3 text-center gap-2 px-4 mt-8 md:gap-4 md:px-16 lg:px-32">
          <span @click="$store.dispatch('productsCategory', 'smartphones')"
            class="category__item">SmartPhones</span>
          <span @click="$store.dispatch('productsCategory', 'laptops')"
            class=" category__item">Laptops</span>
          <span @click="$store.dispatch('productsCategory', 'fragrances')"
            class=" category__item">Fragrances</span>
          <span @click="$store.dispatch('productsCategory', 'skincare')"
            class=" category__item">Skincare</span>
          <span @click="$store.dispatch('productsCategory', 'groceries')"
            class="category__item">Groceries</span>
          <span @click="$store.dispatch('productsCategory', 'home-decoration')"
            class="category__item">Decoration</span>
        </div>

        <!-- Products -->
        <ProductList />
      </div>
    </div>
    <FooterBanner />
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/LayoutVue.vue";
// import HeroBanner from "@/components/HeroBanner.vue";
import FooterBanner from "@/components/FooterBanner.vue";
import ProductList from "@/components/ProductList.vue";
import LoadingPage from "./LoadingPage.vue";
export default {
  components: {
    LayoutVue,
    // HeroBanner,
    FooterBanner,
    ProductList,
    LoadingPage

  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1150);
  }

};
</script>
