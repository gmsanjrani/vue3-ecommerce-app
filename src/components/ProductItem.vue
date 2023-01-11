<template>
  <router-link :to="{ name: 'product', params: { id: product.id } }">
    <v-card :loading="loading" class="border-2 elevation-15" min-height="500" max-width="374">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
      </template>

      <v-img cover height="250" :src="product.thumbnail">
      <v-chip class=" bg-my-red text-my-white" label>Discount: {{ product.discountPercentage }}%</v-chip>
      </v-img>

      <v-card-item>
        <v-card-title>{{ product.title }}</v-card-title>

        <v-card-subtitle>
          <span class="mr-1">{{ product.category }}</span>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating :model-value="product.rating" color="amber" density="compact" half-increments readonly size="small"></v-rating>
          <div class="text-grey ms-4">
            {{ product.rating }} ({{ product.stock }})
          </div>
        </v-row>
        <div class="my-4 text-subtitle-1">
          $ • {{ product.price }}
        </div>
        <div> {{ product.description }} </div>
      </v-card-text>
    </v-card>
  </router-link>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },

  data() {
    return {
      loading: false,
    }
  }
};
</script>

<style>
.thumbnail {
  box-shadow: -15px 12px 46px 15px rgba(51, 44, 44, 0.75) inset;
  -webkit-box-shadow: -15px 12px 46px 15px rgba(51, 44, 44, 0.75) inset;
  -moz-box-shadow: -15px 12px 46px 15px rgba(51, 44, 44, 0.75) inset;
  outline: 2px solid #dcdcdc;
  /* outline-offset: 1px; */
}
</style>
