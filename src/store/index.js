import { createStore } from "vuex";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();
const store = createStore({
  state: {
    products: [],
    cart: false,
    cartData: null,
    userData:null,
    categories: [],
    topRatedProducts: [],
    pages: 0,
    tempPages:0
  },
  mutations: {
    // mutate products
    setProducts(state, newPosts) {
      state.products = newPosts;
    },
    // mutate/set  top rated products for home page
    setTopRatedProducts(state, newProducts) {
      state.topRatedProducts = newProducts;
    },

    // set pages 
    setPages(state, newPages) {
      state.pages = newPages
    },

    // set Temp Pages
    setTempPages(state, value) {
      state.tempPages = value
    },
    // toggle button for cart open/close
    showCart(state) {
      state.cart = !state.cart;
    },
    // function fot setting cart items
    setCart(state, newCart) {
      state.cartData = newCart;
    },
    // set logged in user Data

    setUserData(state, newUser) {
      state.userData = newUser
    },
    // function set Categories
    setCategories(state, newCategories) {
      state.categories = newCategories;
    },

    // function remove cart item
    removeCartItem(state, index) {
      toast.success(
        `${state.cartData.products[index].title} is removed from Cart !`,
        { timeout: 1500 }
      );
      state.cartData.total -= state.cartData.products[index].total;
      state.cartData.totalQuantity -= state.cartData.products[index].quantity;
      state.cartData.totalProducts--;
      state.cartData.products.splice(index, 1);
    },

    // function add an item to cart
    addToCart(state, data) {
      let x = state.cartData.products.some((p) => p.id == data.id);
      if (x) {
        toast.warning(`${data.title} is already in the Cart !`); //check item is present
      } else if (data.quantity == 0) {
        toast.error("Please Add an Item"); // check quantity we want to add
      } else {
        // add to cart
        state.cartData.products.push(data);
        toast.success(`${data.quantity} ${data.title} ${data.quantity < 2 ? "is" : "'s are"} added to the Cart !`);
        state.cartData.total += data.total;
        state.cartData.totalQuantity += data.quantity;
        state.cartData.totalProducts++;
      }
    },

    // function increasing cart item quantity
    plusProduct(state, id) {
      state.cartData.products.map((p) => {
        if (p.id == id) {
          p.quantity++;
          p.total = p.quantity * p.price;
          state.cartData.total += p.price;
          state.cartData.totalQuantity++;
        }
      });
    },

    // function decreasing cart item quantity
    minusProduct(state, id) {
      state.cartData.products.map((p) => {
        if (p.id == id && p.quantity > 0) {
          p.quantity--;
          p.total = p.quantity * p.price;
          state.cartData.total -= p.price;
          state.cartData.totalQuantity--;
        }
      });
    },

    // delete a product
    deleteProduct(state, id) {
      const newArray = state.products.filter((p) => p.id != id);
      state.products = newArray;
    },
  },
  actions: {
    // get&commit products for first page
    getProducts({ commit }, page = 1) {
      
      try {
        axios.get(`https://dummyjson.com/products?limit=10&skip=${(page-1)*10}`).then((response) => {
          commit("setProducts", response.data.products);
        });
      } catch (error) {
        toast.error(error)
      }
    },

    // get&commit top rated products and set pages
    getTopRatedProducts({ commit }) {
      axios.get("https://dummyjson.com/products?limit=100").then((response) => {
        if (response.status == 200) {
          commit("setPages", Math.floor(response.data.products.length / 10))
          commit("setTempPages", Math.floor(response.data.products.length / 10))
         const topRatedProducts = response.data.products.filter((p) => p.rating > 4.8);
         commit("setTopRatedProducts", topRatedProducts);
        }
        else toast.error("please reload")
      });
    },

    // get&commit Categories
    getCategories({ commit }) {
      try {
        axios
        .get("https://dummyjson.com/products/categories")
        .then((response) => {
          commit("setCategories", response.data);
        });
      } catch (error) {
        toast.error(error)
      }
     
    },

    // search product form API and set products
    searchProducts({ commit }, search) {
      axios
        .get(`https://dummyjson.com/products/search?q=${search}`)
        .then((response) => {
          if (response.data.products.length == 0) toast.warning(`No Product Found with key ${search}`, { timeout: 1500, });
          else {
            commit("setPages", Math.floor(response.data.products.length / 10))
            commit("setProducts", response.data.products);
          }
        });
    },

    // filter products by category
    productsCategory({ commit }, val) {
      try {
        axios
        .get(`https://dummyjson.com/products/category/${val.trim()}`)
        .then((response) => {
          commit("setPages", Math.floor(response.data.products.length / 10))
          commit("setProducts", response.data.products);
        });
      } catch (error) {
        toast.error(error)
      }

    },

    // get cart data of logged in user
    getCart({ commit }, ) {
      let user = JSON.parse(localStorage.getItem("userData"));
      commit("setUserData", user)

      try {
        axios
        .get(`https://dummyjson.com/carts/user/${user.id}`)
        .then((response) => {
          if (response) {
            commit("setCart", response.data.carts[0]);
          }
        });
      } catch (error) {
        toast.error(error)
      }
      
    },
  },
});

export default store;
