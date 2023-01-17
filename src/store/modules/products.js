import client from "@/lib/client";
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  state: {
    items: [],
    topRatedProducts: [],
    categories: [],
    pages: 0,
    tempPages: 0,
  },
  mutations: {
    // mutate products
    setProducts(state, newPosts) {
      state.items = newPosts;
    },
    // mutate/set  top rated products for home page
    setTopRatedProducts(state, newProducts) {
      state.topRatedProducts = newProducts;
    },

    // set pages
    setPages(state, newPages) {
      state.pages = newPages;
    },

    // set Temp Pages
    setTempPages(state, value) {
      state.tempPages = value;
    },
    // function set Categories
    setCategories(state, newCategories) {
      state.categories = newCategories;
    },
    // delete a product
    deleteProduct(state, id) {
      const newArray = state.items.filter((p) => p.id != id);
      state.items = newArray;
    },
  },
  actions: {
    // get&commit products for first page
    getProducts({ commit }, page = 1) {
      try {
        client.get(`products?limit=10&skip=${(page - 1) * 10}`).then((response) => {
            commit("setProducts", response.data.products);});
      } catch (error) {
        toast.error(error);
      }
    },

    // get&commit top rated products, categories and set pages
    getTopRatedProducts({ commit }) {
      client.get("products?limit=100").then((response) => {
        if (response.status == 200) {
          // fetching all categories
          client.get("products/categories").then((response) => {
            const categories = response.data
            categories.push("All")
              commit("setCategories", categories);
          });
          // setting pages and top rated products
          commit("setPages", Math.floor(response.data.products.length / 10));
          commit("setTempPages",Math.floor(response.data.products.length / 10));
          const topRatedProducts = response.data.products.filter((p) => p.rating > 4.8);
          commit("setTopRatedProducts", topRatedProducts);
        } else toast.error("please reload");
      });
    },

    // search product form API and set products
    searchProducts({ commit }, search) {
      client.get(`products/search?q=${search}`).then((response) => {
          if (response.data.products.length == 0)toast.warning(`No Product Found with key ${search}`, {timeout: 1500,});
          else {
            commit("setPages", Math.floor(response.data.products.length / 10));
            commit("setProducts", response.data.products);
          }
        });
    },

    // filter products by category
    productsCategory({ commit }, val) {
      if (val == "All") {
        client.get(`products?limit=10`).then(response => {
          if (response) {
            commit("setProducts", response.data.products);
            commit("setPages", 10);
          }
          })
      } else {
        client.get(`products/category/${val.trim()}`).then((response) => {
          commit("setPages", Math.floor(response.data.products.length / 10));
            commit("setProducts", response.data.products);
          });
      }
        

    },
  },
};
