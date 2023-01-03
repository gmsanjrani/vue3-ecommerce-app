<template>
  <div class="cart__container">
    <div class="h-full mb-12">
      <!-- close cart button -->
      <button type="button" class="flex items-center gap-3" @click="$store.commit('showCart')">
        <i class="fas fa-arrow-right font-bold text-lg text-my-white"></i>
        <span class="font-semibold text-lg">Close Cart</span>
        <span class="text-my-gray-lit font-semibold text-lg"></span>
      </button>

      <!-- cart item container -->
      <div class="my-10 flex flex-col gap-7 sm:gap-8 px-6">
        <div v-for="(item, index) in $store.state.cartData.products" :key="item.id"
          class="flex gap-2 sm:gap-6 px-2 border rounded-md p-4 transition delay-200">
          <div class="w-full flex flex-col gap-6 sm:gap-4">
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
                  <span @click="$store.commit('minusProduct', item.id)" class="pl-3 sm:py-[6px] text-my-gray-lit">
                    <i class="fas fa-minus"></i>
                  </span>
                  <span class="border-x px-[12px] border-my-gray-lit sm:py-[6px]">{{ item.quantity }}</span>
                  <!-- calling vuex function for increasing product quantity -->
                  <span @click="$store.commit('plusProduct', item.id)" class="pr-3 sm:py-[6px]"><i
                      class="fas fa-plus"></i></span>
                </p>
              </div>
              <!-- calling vuex function for removing item for cart -->
              <button @click="$store.commit('removeCartItem', index)" type="button" class="text-2xl">
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
            ${{ $store.state.cartData.total }}
          </h3>
        </div>
        <div class="mt-12 text-center bg-my-gray-lit rounded-2xl py-3 text-xl font-medium text-black">
          <!-- calling create cart function -->
          <button @click="createNewCart" type="button" class="w-full h-full">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // Function for creating a Cart 
    createNewCart() {
      const user = JSON.parse(localStorage.getItem("userData"));
      const productArray = [];

      // filtering product id and Quantity
      this.$store.state.cartData.products.map((p) => {
        const productData = {
          id: p.id,
          quantity: p.quantity,
        };
        productArray.push(productData);
      });

      // send data to the server
      fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          products: productArray
        }),
      })
        .then((res) => {
          if (res) {
            this.$swal(
              "Congratulations!",
              `Congratulations ${user.username} your order placed Successfully.`,
              "success"
            );
            this.$store.state.cart = false
          }
        })

    },
  },
};
</script>
