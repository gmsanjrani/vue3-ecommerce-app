<template>
  <ShoppingCart v-if="$store.state.cart" />
  <header class=" ">
    <nav class="nav__logo">
      <router-link to="/">
        <div class="w-28 md:w-40 lg:w-52 mb-3 cursor-pointer">
          <img
            src="../assets/assets/pf-logo.png"
            class="w-full"
            alt="No Image"
          />
        </div>
      </router-link>
      <div class="input__container">
        <label for="search"></label>
        <input
          class="nav__input"
          type="search"
          name="search"
          id="search"
          placeholder="Search Products"
          v-model.lazy="search"
        />
        <i
          @click="$store.dispatch('searchProducts', search)"
          class="fas fa-search cursor-pointer rounded-2xl p-1"
        ></i>
      </div>
      <div class="flex gap-4">
        <router-link
          to="/"
          class="text-xs md:text-sm underline underline-offset-4 decoration-2 text-my-red cursor-pointer"
        >
          HOME
        </router-link>

        <router-link to="/products" class="nav__products">PRODUCTS</router-link>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <span class="hidden sm:block text-xs md:text-sm">{{
            userDetails.username
          }}</span>
          <div class="relative">
            <img
              :src="userDetails.image"
              alt=""
              class="rounded-full h-6 w-6 md:w-8 md:h-8 shadow-inner cursor-pointer"
              @click="show"
            />
            <span v-if="logoutBtn" @click="logout" class="logout__btn">
              Logout
            </span>
          </div>
        </div>
        <button type="button">
          <i
            class="fas fa-cart-plus text-lg lg:text-2xl cursor-pointer relative"
            @click="$store.commit('showCart')"
          >
            <span class="nav__card__count">
              {{ $store.state.cartData.totalQuantity }}
            </span>
          </i>
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import ShoppingCart from "./ShoppingCart.vue";
export default {
  components: {
    ShoppingCart,
  },
  data() {
    return {
      userDetails: null,
      logoutBtn: false,
      search: "",
    };
  },
  methods: {
    show() {
      this.logoutBtn = !this.logoutBtn;
    },

    logout() {
      localStorage.removeItem("userData");
      this.$router.push("/login");
    },
  },

  beforeMount() {
    const user = JSON.parse(localStorage.getItem("userData"));
    this.userDetails = user;
  },
};
</script>
