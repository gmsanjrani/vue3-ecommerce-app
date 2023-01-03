<template>
  <LoadingPage v-if="loading" />
  <LayoutVue v-else>
    <HeroBanner />
    <!-- Category container -->
    <div class="main-container flex flex-col items-center">
      <div class="mt-14">
        <h2 class="text-4xl font-extrabold leading-tight text-my-blue">
          Categories
        </h2>
        <p class="text-my-gray">Filter Products By Your Choice</p>
      </div>

      <div class="flex flex-col">
        <!-- Categories -->
        <div class="grid grid-cols-3 text-center gap-2 px-4 mt-8 md:gap-4 md:px-12 lg:px-20">
          <!-- dispatch veux function filter product by category -->
          <span @click="$store.dispatch('productsCategory', 'smartphones')" class="category__item">SmartPhones</span>
          <span @click="$store.dispatch('productsCategory', 'laptops')" class="category__item">Laptops</span>
          <span @click="$store.dispatch('productsCategory', 'fragrances')" class="category__item">Fragrances</span>
          <span @click="$store.dispatch('productsCategory', 'skincare')" class="category__item">Skincare</span>
          <span @click="$store.dispatch('productsCategory', 'groceries')" class="category__item">Groceries</span>
          <span @click="$store.dispatch('productsCategory', 'home-decoration')" class="category__item">Decoration</span>
        </div>
        <div class="text-4xl font-extrabold leading-tight text-my-blue mt-8 mb-4 self-center">
          Pagination & Create Product
        </div>
        <div class="flex justify-evenly">
          <div class="pagination mb-12">
            <button @click="pagination(0, 10)" class="pagi__btn">1</button>
            <button @click="pagination(10, 20)" class="pagi__btn">2</button>
            <button @click="pagination(20, 30)" class="pagi__btn">3</button>
          </div>
          <button @click="createProduct" class="buy__now h-14 rounded-lg">
            Create Product
          </button>
        </div>

        <!-- Products -->
        <div class="flex flex-wrap justify-center gap-10 mb-20">
          <ProductItem v-for="product in products" :key="product.id" :product="product" />
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
      addClass: false,
      products: [],
    };
  },
  methods: {
    // function for pagination
    pagination(from, to) {
      let slice = this.$store.state.products.slice(from, to);
      this.products = slice;
    },


    // function create product
    async createProduct() {
      const val = await this.$swal({
        title: "Update Product Data",
        html:
          `<input id="id" value="" type="hidden">` +
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: val.value[0],
          description: val.value[1],
          price: val.value[2],
          brand: val.value[3]
        }),
      }).then((res) => {
        if (res) {
          this.$swal(
            "Creater!",
            `${val.value[0]} has been Updated.`,
            "success"
          );
        }
      });
    }, // end Create product function
  },
  // first time pagination
  mounted() {
    this.pagination(0, 10);
    setTimeout(() => {
      this.loading = false;
    }, 1150);
  },
  updated() {
    this.pagination(0, 10);
  },
};
</script>
