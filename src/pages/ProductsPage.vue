<template>
  <LoadingPage v-if="loading" />
  <LayoutVue v-else>
    <HeroBanner />
    <!-- Category container -->
    <div class="main-container flex flex-col items-center">
      <div class="flex items-center justify-evenly gap-5 md:gap-20 mt-14">
        <div>
          <h2 class="text-3xl md:text-4xl font-extrabold leading-tight text-my-blue">
            Categories
          </h2>
          <p class="text-my-gray">Filter Products By Your Choice</p>
        </div>
        <button @click="createProduct" class="buy__now h-12 rounded-lg">
          Create Product
        </button>
      </div>

      <div class="flex flex-col">
        <!-- Categories -->
        <div class="category__container text-center gap-2 px-4 mt-8 md:gap-4 md:px-12 lg:px-20">
          <!-- dispatch veux function filter product by category -->
          <span v-for="category in categories" :key="category" @click="productsCategory(category)"
            class="category__item">{{ category }}</span>
          <span class="category__item" @click="getAllCategoriesProducts">All</span>
        </div>
        <div class="text-4xl font-extrabold leading-tight text-my-blue mt-8 mb-4 self-center">
          Pagination & Create Product
        </div>
        <div class="flex justify-evenly">
          <div class="flex gap-1 sm:gap-2 md:gap-4 mb-12">
            <button v-for="page in pages" @click="getProducts(page)" :key="page"
              class="pagi__btn border">
              {{ page }}
            </button>
          </div>
        </div>

        <!-- Products -->
        <div class="flex flex-wrap justify-center gap-12 mb-20">
          <ProductItem v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
    <FooterBanner />
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/layout/LayoutVue.vue";
import HeroBanner from "@/components/UI/HeroBanner.vue";
import FooterBanner from "@/components/UI/FooterBanner.vue";
import LoadingPage from "./LoadingPage.vue";
import ProductItem from "@/components/ProductItem.vue";
import { mapState, mapActions } from "vuex";
import client from "@/lib/client";
export default {
  components: {
    LayoutVue,
    HeroBanner,
    FooterBanner,
    LoadingPage,
    ProductItem,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState({
      categories: state => state.products.categories,
      pages: state => state.products.pages,
      tempPages: state => state.products.tempPages,
      products: state => state.products.items,
    })
  },
  methods: {

    ...mapActions({
      getProducts: "getProducts",
      productsCategory:"productsCategory"
    }),
    // set products and pages to default
    getAllCategoriesProducts() {
      this.getProducts();
      this.$store.commit("setPages", this.tempPages)
      // this.$store.state.products.pages = this.$store.state.products.tempPages
    },
    // function create product
    async createProduct() {
      const valuesArray = await this.$swal({
        title: "Create Product Data",
        html: `<input id="id" value="" type="hidden">` +
          `<input id="title" type="text" class="swal2-input" value="" placeholder="Enter Title">` +
          `<input id="description" type="text" class="swal2-input" value="" placeholder="Enter description">` +
          `<input id="price" type="text" class="swal2-input" value="" placeholder="Enter Price">` +
          `<input id="brand" type="text" class="swal2-input" value="" placeholder="Enter brand">`,
        focusConfirm: false, showCancelButton: true, cancelButtonText: "Cancel", confirmButtonText: "Create",
        preConfirm: () => {
          return [
            document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("price").value,
            document.getElementById("brand").value,
          ];
        },
      });

      // post data on server
      client("products/add", {
        method: "POST",
        data:{
          title: valuesArray.value[0],
          description: valuesArray.value[1],
          price: valuesArray.value[2],
          brand: valuesArray.value[3],
        },
      }).then((res) => { if (res.status == 200) this.$swal("Created!", `${valuesArray.value[0]} has been Created.`, "success"); });
    }, // end Create product function
  },

  mounted() {
    setTimeout(() => { this.loading = false }, 1150);
  },
};
</script>
