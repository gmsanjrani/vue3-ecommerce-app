<template>
  <div class="cart__container">
    <div class="h-full mb-12">
      <button
        type="button"
        class="flex items-center gap-3"
        @click="$store.commit('showCart')"
      >
        <i class="fas fa-arrow-right font-bold text-lg text-my-white"></i>
        <span class="font-semibold text-lg">Close Cart</span>
        <span class="text-my-gray-lit font-semibold text-lg"></span>
      </button>

      <!-- <div class=" grid justify-center my-12">
            <AiOutlineShopping size={150} class=' w-full ' />
            <h3 class=' text-md md:text-xl font-semibold text-my-gray-lit'>Your shopping bag is empty</h3>
            <Link href="/" passHref>
              <button
                type="button"
    
                class=" mt-12 bg-my-gray-lit rounded-2xl py-3 text-md md:text-xl font-medium text-black"
              >
                Continue Shopping
              </button>
            </Link>
          </div> -->

      <div class="my-10 flex flex-col gap-7 sm:gap-8 px-6">
        <div
          v-for="(item, index) in $store.state.cartData.products"
          :key="item.id"
          class="flex gap-2 sm:gap-6 px-2 border rounded-md p-4 transition delay-200"
        >
          <div class="w-full flex flex-col gap-6 sm:gap-4">
            <div class="flex justify-between items-center">
              <h5 class="font-semibold text-sm sm:text-lg text-my-white">
                {{ item.title }}
              </h5>
              <h4 class="font-semibold">${{ item.total }}</h4>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <p
                  class="flex border-[1px] border-my-gray-lit gap-1 sm:gap-4 place-items-center cursor-pointer"
                >
                  <span
                    @click="$store.commit('minusProduct', item.id)"
                    class="pl-3 sm:py-[6px] text-my-gray-lit"
                  >
                    <i class="fas fa-minus"></i>
                  </span>
                  <span
                    class="border-x px-[12px] border-my-gray-lit sm:py-[6px]"
                    >{{ item.quantity }}</span
                  >
                  <span
                    @click="$store.commit('plusProduct', item.id)"
                    class="pr-3 sm:py-[6px]"
                    ><i class="fas fa-plus"></i
                  ></span>
                </p>
              </div>
              <button
                @click="$store.commit('removeCartItem', index)"
                type="button"
                class="text-2xl"
              >
                <i class="far fa-times-circle hover:scale-110 "></i>
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
        <div
          class="mt-12 text-center bg-my-gray-lit rounded-2xl py-3 text-xl font-medium text-black"
        >
          <button type="button" class="w-full h-full">Pay Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>
