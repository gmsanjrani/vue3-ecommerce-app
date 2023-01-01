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

    <ProductList />

    <div>
      <FooterBanner />
    </div>
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/LayoutVue";
import HeroBanner from "@/components/HeroBanner.vue";
import FooterBanner from "@/components/FooterBanner.vue";
import ProductList from "@/components/ProductList.vue";
import LoadingPage from "./LoadingPage.vue";

export default {
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    if (!JSON.parse(localStorage.getItem("userData"))) this.$router.push("/login");
    else setTimeout(() => {
      this.loading = false
    }, 1150);

  },
  components: {
    LayoutVue,
    HeroBanner,
    FooterBanner,
    ProductList,
    LoadingPage,
  },
};
</script>
