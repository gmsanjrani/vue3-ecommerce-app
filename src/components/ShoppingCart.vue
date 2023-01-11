<template>
  <div class="cart__container">
    <div class="h-full mb-12">
      <!-- close cart button -->
      <v-btn prepend-icon="mdi-arrow-right" variant="text" @click="cartToggle">
        Close
      </v-btn>

      <!-- cart item container -->
      <div class="my-10 flex flex-col gap-7 sm:gap-8 px-6">
        <div v-for="(item, index) in cart.products" :key="item.id"
          class="flex gap-2 sm:gap-6 p-4 border rounded-lg  transition delay-200">
          <div class="w-full flex flex-col justify-between sm:gap-4">
            <div class="flex justify-between items-center">
              <h5 class="font-semibold text-sm sm:text-lg text-my-white">
                {{ item.title }}
              </h5>
              <h4 class="font-semibold">${{ item.total }}</h4>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <p class="flex border-[1px] border-my-gray-lit gap-1 sm:gap-4 place-items-center cursor-pointer">
                  <!-- calling vuex function for increasing product quantity -->
                  <span @click="decrementItemProduct(item.id)" class="pl-3 sm:py-[6px] text-my-gray-lit">
                    <i class="fas fa-minus"></i>
                  </span>
                  <span class="border-x px-[12px] border-my-gray-lit sm:py-[6px]">{{ item.quantity }}</span>
                  <!-- calling vuex function for increasing product quantity -->
                  <span @click="incrementItemProduct(item.id)" class="pr-3 sm:py-[6px]"><i
                      class="fas fa-plus"></i></span>
                </p>
              </div>
              <!-- calling vuex function for removing item for cart -->
              <button @click="removeCartItem(index)" type="button" class="text-2xl">
                <i class="far fa-times-circle hover:scale-110"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="pb-12 px-3">
        <div class="flex justify-between">
          <h3 class="text-my-gray-lit text-xl font-semibold">Subtotal:</h3>
          <h3 class="text-xl font-medium">
            ${{ cart.total }}
          </h3>
        </div>
        <div class="mt-12 text-center bg-my-gray-lit rounded-2xl py-3 text-xl font-medium text-black">
          <!-- calling create cart function -->
          <button @click="payNow" type="button" class="w-full h-full">
            Pay Now
          </button>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import client from "../lib/client"
export default {
  computed: {
    ...mapState({
      cart: state => state.cart.cartData,
      login: state => state.cart.login
    })
  },
  methods: {
    ...mapMutations({
      cartToggle: "showCart",
      incrementItemProduct: "incrementItemProduct",
      decrementItemProduct: "decrementItemProduct",
      removeCartItem: "removeCartItem"
    }),

    // check if user is login or not if login then create a cart
    payNow() {
      if (!this.login) this.$swal("Please!", `Please login first.`, "success");
      else this.createNewCart()
    },


    // Function for creating a Cart 
    createNewCart() {
      const user = JSON.parse(localStorage.getItem("userData"));
      const productArray = [];
      // filtering product id and Quantity
      this.cart.products.map((p) => {
        const productData = { id: p.id, quantity: p.quantity, };
        productArray.push(productData);
      });
      // send data to the server
      client("carts/add", {
        method: "POST",
        data: {
          userId: user.id,
          products: productArray
        }
      })
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            this.$swal("Congratulations!", `Congratulations ${user.username} your order placed Successfully.`, "success");
            this.cartToggle()
          }
        })

    },
  },
};
</script>
