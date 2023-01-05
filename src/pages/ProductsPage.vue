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
          <span v-for="category in $store.state.categories" :key="category"
            @click="$store.dispatch('productsCategory', category)" class="category__item">{{ category }}</span>
          <span class="category__item" @click="getAllCategoriesProducts">All</span>
        </div>
        <div class="text-4xl font-extrabold leading-tight text-my-blue mt-8 mb-4 self-center">
          Pagination & Create Product
        </div>
        <div class="flex justify-evenly">
          <div class="flex gap-1 sm:gap-2 md:gap-4 mb-12">
            <button v-for="page in $store.state.pages" @click="$store.dispatch('getProducts', page)" :key="page"
              class="pagi__btn">
              {{ page }}
            </button>
          </div>
        </div>

        <!-- Products -->
        <div class="flex flex-wrap justify-center gap-10 mb-20">
          <ProductItem v-for="product in $store.state.products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
    <FooterBanner />
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/LayoutVue.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import FooterBanner from "@/components/FooterBanner.vue";
import LoadingPage from "./LoadingPage.vue";
import ProductItem from "@/components/ProductItem.vue";
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
  methods: {

    // on press all category we set products and pages default
    getAllCategoriesProducts() {
      this.$store.dispatch("getProducts", 1);
      this.$store.state.pages = this.$store.state.tempPages
    },
    // function create product
    async createProduct() {
      const val = await this.$swal({
        title: "Update Product Data",
        html: `<input id="id" value="" type="hidden">` +
          `<input id="title" type="text" class="swal2-input" value="" placeholder="Enter Title">` +
          `<input id="description" type="text" class="swal2-input" value="" placeholder="Enter description">` +
          `<input id="price" type="text" class="swal2-input" value="" placeholder="Enter Price">` +
          `<input id="brand" type="text" class="swal2-input" value="" placeholder="Enter brand">`,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Create",
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
      fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: val.value[0],
          description: val.value[1],
          price: val.value[2],
          brand: val.value[3],
        }),
      }).then((res) => {
        if (res) {
          this.$swal(
            "Created!",
            `${val.value[0]} has been Created.`,
            "success"
          );
        }
      });
    }, // end Create product function
  },

  mounted() {
    setTimeout(() => {this.loading = false}, 1150);
  },
};
</script>
