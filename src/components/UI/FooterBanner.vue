<template>
  <div class=" bg-my-red h-[600px] md:h-[580px] my-12 rounded-xl px-10 py-24 relative lg:h-[400px] lg:px-16">
    <div class=" lg:flex lg:justify-between">
      <div>
        <p class=" text-my-white ">50% OFF</p>
        <h3 class=" text-my-white text-6xl font-bold mt-4 lg:text-7xl">BEST</h3>
        <h2 class="text-my-white text-6xl font-bold lg:text-7xl">LAUGH</h2>
        <p class=" text-my-white mt-2 ml-4">01/01/2023</p>
      </div>
      <div>
        <p class=" mt-7 text-my-white ">Top Airphones</p>
        <h3 class=" my-4 text-5xl font-bold text-my-white lg:text-6xl">Winter Sale</h3>
        <p class=" text-my-white ">Best Headphones Available</p>

        <button class=" mt-8 px-5 py-2 bg-my-white text-my-red font-medium text-lg rounded-2xl">
          Shop Now
        </button>

      </div>

      <img class=" absolute top-[-7%] right-0 w-[70%] lg:w-[40%] lg:top-[-20%] lg:right-[30%]"
        :src="bannerImage" alt="nothing" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerImage: require('@/assets/images/headphone.webp')
    }
  }
}
</script>

