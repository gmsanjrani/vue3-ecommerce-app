<template>
  <!-- toggle cart open/close -->
  <ShoppingCart v-if="toggleCart" />
  <header class=" ">
    <nav class="nav__logo">
      <!-- route to Home Page -->
      <router-link to="/">
        <div class="w-28 md:w-40 lg:w-52 mb-3 cursor-pointer">
          <img :src="logo" class="w-full" alt="No Image" />
        </div>
      </router-link>
      <div class="input__container">
        <label for="search"></label>
        <input class="nav__input" type="search" name="search" id="search" placeholder="Search Products"
          v-model="search" />
        <!-- calling vuex function for searching products -->
        <i @click="searchProducts(search)" class="fas fa-search cursor-pointer rounded-2xl p-1"></i>
      </div>
      <div class="flex gap-4">
        <!-- routing for home & products page -->
        <router-link to="/"
          class="text-xs md:text-sm underline underline-offset-4 decoration-2 text-my-red cursor-pointer">
          HOME
        </router-link>

        <router-link to="/products" class="nav__products">PRODUCTS</router-link>
      </div>

      <!-- User Avatar image and menu dropdown -->
      <div class="flex items-center gap-4" >
        <!-- if user not login -->
        <v-btn class=" bg-my-red text-my-white" to="/login" variant="outlined" v-if="!login"> login </v-btn>
        <!-- if user login -->
        <v-menu min-width="200px" rounded v-else>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar size="40" :image="user.image">
                <span class="text-h5">user</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar :image="user.image">
                  <span class="text-h5">initials</span>
                </v-avatar>
                <h3>{{ user.username }}</h3>
                <p class="text-caption mt-1">email</p>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text" @click="logoutUser"> Logout </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>

        <button type="button">
          <!-- calling vuex toggle cart function -->
          <i class="fas fa-cart-plus text-lg lg:text-2xl cursor-pointer relative" @click="$store.commit('showCart')">
            <span class="nav__card__count">
              {{ cartData.totalQuantity ? cartData.totalQuantity: 0 }}
            </span>
          </i>
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ShoppingCart from "./ShoppingCart.vue";
export default {
  components: {
    ShoppingCart,
  },
  data() {
    return {
      logoutBtn: false,
      search: "",
      logo: require("@/assets/images/pf-logo.png"),
      user: {},
    };
  },
  methods: {
  
    // logout function
    logoutUser() {
      localStorage.removeItem("userData");
      this.$router.push("/login");
      this.$store.commit("setLogin", false)
    },

    ...mapActions({
      getProducts: "getProducts",
      getCart: "getCart",
      searchProducts: "searchProducts",
    }),
  },

  computed: {
    ...mapState({
      toggleCart: (state) => state.cart.cart,
      login: (state) => state.cart.toggleLogin,
      cartData: (state) => state.cart.cartData,
      tempPages: (state) => state.products.tempPages,
    }),
  },

  // watch for search. if empty set products to first 10 and set pages to default
  watch: {
    search(newSearch) {
      if (newSearch == "") {
        this.getProducts();
        this.$store.commit("setPages", this.tempPages);
      }
    },
  },
  mounted() {
   this.user = JSON.parse(localStorage.getItem("userData"));
  },
};
</script>
