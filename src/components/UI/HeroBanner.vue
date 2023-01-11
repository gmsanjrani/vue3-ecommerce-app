<template>
  <div class="hero__container">
    <div>
      <p class="text-xl">Top Airphones</p>
      <h3 class="text-4xl font-semibold ml-3 mt-3 lg:text-5xl">Winter Sale</h3>
      <h1 class="text-my-white text-6xl mt-3 ml-0 font-semibold lg:text-9xl">
        BEST
      </h1>
      <img class="hero__image" :src="bannerImage" alt="no" />

      <div>
        <button class="mt-20 px-5 py-2 bg-my-red text-my-white font-medium text-lg rounded-2xl lg:mt-8">
          Shop Now
        </button>

        <div class="absolute bottom-[10%] right-[8%] text-right leading-8">
          <h5 class="text-my-blue font-semibold">Description</h5>
          <p class="text-my-gray">Best Headphones Available</p>
        </div>
      </div>
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
};
</script>

