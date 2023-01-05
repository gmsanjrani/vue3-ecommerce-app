<template>
  <LoadingPage v-if="loading" />
  <LayoutVue v-else>
    <HeroBanner />
    <div class="text-center mt-14">
      <h2 class="text-4xl font-extrabold leading-tight text-my-blue">
        Top Selling Product
      </h2>
      <p class="text-my-gray">Best speakers you ever use</p>
    </div>

    <!-- products list -->
    <div class="flex flex-wrap justify-center gap-10 mt-8 mb-20">
      <ProductItem
        v-for="product in $store.state.topRatedProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <div>
      <FooterBanner />
    </div>
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/LayoutVue";
import HeroBanner from "@/components/HeroBanner.vue";
import FooterBanner from "@/components/FooterBanner.vue";
import LoadingPage from "./LoadingPage.vue";
import ProductItem from "@/components/ProductItem";
export default {
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    // check if user is log in or not
    if (!JSON.parse(localStorage.getItem("userData"))) this.$router.push("/login");
    else this.$store.dispatch("getCart");
    setTimeout(() => {this.loading = false;}, 1500);
  },
  components: {
    LayoutVue,
    HeroBanner,
    FooterBanner,
    LoadingPage,
    ProductItem,
  },
};
</script>
