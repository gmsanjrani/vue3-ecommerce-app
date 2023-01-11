<template>
  <LoadingPage v-if="loading" />

  <LayoutVue v-else>
    <div>
      <div class="mx-8 mt-2 md:mx-8 md:grid md:grid-cols-2 md:mt-11 md:gap-8">
        <div class="flex flex-col">
          <!-- product thumbnail image -->
          <div class="justify-self-center bg-my-gray-lit rounded-xl cursor-pointer">
            <img class="w-full aspect" :src="product.thumbnail" alt="noo" />
          </div>
          <!-- products images -->
          <div class="w-full grid justify-self-center grid-cols-4 gap-3 mt-6">
            <img :src="product.images[0]" alt="no"
              class="bg-my-gray-lit rounded-lg aspect-square outline outline-2 outline-my-gray-lit" />
            <img :src="product.images[1]" alt="no"
              class="bg-my-gray-lit rounded-lg aspect-square outline outline-2 outline-my-gray-lit" />
            <img :src="product.images[2]" alt="no"
              class="bg-my-gray-lit rounded-lg aspect-square outline outline-2 outline-my-gray-lit" />
            <img :src="product.images[3]" alt="no"
              class="bg-my-gray-lit rounded-lg aspect-square outline outline-2 outline-my-gray-lit" />
          </div>
        </div>

        <!-- product details container -->
        <div class="mt-10">
          <h1 class="text-4xl font-semibold text-my-blue">
            {{ product.title }}
          </h1>
          <h4 class="my-2 text-my-blue font-semibold">Details:</h4>
          <p class="font-thin mt-3">{{ product.description }}</p>
          <p class="my-6 text-my-red text-2xl font-semibold">
            ${{ product.price }}
          </p>
          <!-- increase/decrease product quantity -->
          <div class="flex gap-6 items-center">
            <h3 class="text-my-blue text-lg font-bold">Quantity:</h3>
            <p class="grid grid-cols-3 border-[1px] gap-4 place-items-center cursor-pointer">
              <!-- decrease product quantity -->
              <span class="pl-3 py-[6px] text-my-red" @click="minus"><i class="fas fa-minus"></i>
              </span>
              <span class="border-x w-12 text-center py-[6px]">{{itemData.quantity}}</span>
              <!-- increase product quantity -->
              <span class="pr-3 py-[6px] text-my-green" @click="plus"><i class="fas fa-plus"></i>
              </span>
            </p>
          </div>
          <div class="mt-10 space-x-6">
            <!-- calling vuex function for adding item to cart and pass product data -->
            <button @click="$store.commit('addToCart', itemData)" class="add__to__cart">
              Add to Cart
            </button>
            <button class="buy__now">Buy Now</button>
          </div>
          <div class="mt-4 space-x-6">
            <!-- calling vuex function for adding item to cart and pass product data -->
            <button @click="updateProduct" class="add__to__cart">
              Edit Product
            </button>
            <button @click="deleteProduct" class="buy__now">Delete it</button>
          </div>
        </div>
      </div>
      <!-- marquee container -->
      <div class="maylike-products-wrapper sm:mb-[-3rem] lg:mb-0">
        <h2>You may also like</h2>
        <div class="marquee md:my-10">
          <div class="maylike-products-container track">
            <ProductLine v-for="category in categories" :key="category.id" v-bind:product="category" />
          </div>
        </div>
      </div>
    </div>
  </LayoutVue>
</template>

<script>
import LayoutVue from "@/components/layout/LayoutVue.vue";
import ProductLine from "@/components/ProductLine";
import LoadingPage from "@/pages/LoadingPage";
import client from "@/lib/client";


export default {
  components: {
    LayoutVue,
    ProductLine,
    LoadingPage,
  },
  data() {
    return {
      product: {},
      loading: true,
      categories: [],
      itemData: {
        id: 0,
        title: "",
        price: 0,
        quantity: 0,
        total: 0,
        discountPercentage: 12.3,
        discountedPrice: 123,
      },
    };
  },
  methods: {
    // function increase product quantity
    plus() {
      this.itemData.quantity++;
      this.itemData.total += this.product.price;
    },


    // function increase product quantity
    minus() {
      if (this.itemData.quantity > 0) {
        this.itemData.quantity--;
        this.itemData.total -= this.product.price;
      }
    },


    // Function Delete a Product
    async deleteProduct() {
      await this.$swal({
        titleText: `You wanna Delete this Product: ${this.product.title}!`,
        showCancelButton: true,
        cancelButtonText: "NO",
        confirmButtonText: "YES",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal("Deleted!",`${this.product.title} has been deleted.`,"success");
          this.$store.commit("deleteProduct", this.product.id);
          this.$router.push("/products");
        }
      });
    },


    // Function Update Product Data
    async updateProduct() {
      const val = await this.$swal({
        title: "Update Product Data",
        html:
          `<input id="id" value="" type="hidden">` +
          `<input id="title" type="text" class="swal2-input" value="${this.product.title}" placeholder="Enter Title">` +
          `<input id="price" type="text" class="swal2-input" value="${this.product.price}" placeholder="Enter Price">` +
          `<input id="category" type="text" class="swal2-input" value="${this.product.category}" placeholder="Enter category">`,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Update",
        preConfirm: () => {
          return [
            document.getElementById("title").value,
            document.getElementById("price").value,
            document.getElementById("category").value,
          ];
        },
      })
      // Update data in Ui
      this.product.title = val.value[0];
      this.product.price = val.value[1];
      this.product.category = val.value[2];

      // Update data on server
      client(`products/${this.product.id}`, {
        method: "PUT",
        data: {
          title: val.value[0],
          price: val.value[1],
          category: val.value[2],
        }
      }).then(res => {
        console.log(res)
        if (res) this.$swal("Updated!",`${this.product.title} has been Updated.`,"success");
      })
    }, // End Update Function



    // function for fetch  product data on every route
    fetchProductData() {
      client
        .get(`products/${this.$route.params.id}`).then((res) => {
          if (res) {
            this.product = res.data;
            this.itemData.title = this.product.title;
            this.itemData.price = this.product.price;
            this.itemData.id = this.product.id;
            window.scrollTo(0, 0);
            client.get(`products/category/${this.product.category}`).then((res) => {
                if (res) this.categories = res.data.products;});
            this.loading = true;
            setTimeout(() => {this.loading = false;}, 1150);
          }
        });
    },
  },
  created() {
    // watching router parameter changes if params change then we fetch data again
    this.$watch(
      () => this.$route.params,
      () => this.fetchProductData(),
      { immediate: true }
    );
  },
};
</script>

<style lang="scss" scoped>
.aspect {
  aspect-ratio: 1/0.9;
}
</style>
