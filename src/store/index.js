import { createStore } from "vuex";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();
const store = createStore({
  state: {
    products: [],
    cart: false,
    cartData: null,
  },
  mutations: {
    getProducts(state, newPosts) {
      state.products = newPosts;
    },
    showCart(state) {
      state.cart = !state.cart;
    },
    getCart(state, newCart) {
      state.cartData = newCart;
      state.cartProducts = newCart.products;
    },
    removeCartItem(state, index) {
      toast.success(`${state.cartData.products[index].title} is removed from Cart !`,{timeout:1500})
      state.cartData.total -= state.cartData.products[index].total;
      state.cartData.totalQuantity -= state.cartData.products[index].quantity;
      state.cartData.totalProducts--;
      state.cartData.products.splice(index, 1);
    },
    addToCart(state, data) {
      let x = state.cartData.products.some((p) => p.id == data.id);
      if (x) {
        toast.warning(`${data.title} is already in the Cart !`);
      } else if (data.quantity == 0) {
        toast.error("Please Add an Item");
      } else {
        state.cartData.products.push(data);
        toast.success(
          `${data.quantity} ${data.title} ${
            data.quantity < 2 ? "is" : "'s are"
          } added to the Cart !`
        );
        state.cartData.total += data.total;
        state.cartData.totalQuantity += data.quantity;
        state.cartData.totalProducts++;
      }
    },
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
  },
  actions: {
    getProducts({ commit }) {
      axios.get("https://dummyjson.com/products/").then((response) => {
        commit("getProducts", response.data.products);
      });
    },
    searchProducts({ commit }, search) {
      if (search) {
        axios
          .get(`https://dummyjson.com/products/search?q=${search}`)
          .then((response) => {
            commit("getProducts", response.data.products);
          });
        window.scrollTo(0, 500);
      } else {
        axios.get("https://dummyjson.com/products/").then((response) => {
          commit("getProducts", response.data.products);
        });
      }
    },
    productsCategory({ commit }, val) {
      axios
        .get(`https://dummyjson.com/products/category/${val.trim()}`)
        .then((response) => {
          commit("getProducts", response.data.products);
        });
    },
    getCart({ commit }) {
      let userId = JSON.parse(localStorage.getItem("userData")).id;
      axios
        .get(`https://dummyjson.com/carts/user/${userId}`)
        .then((response) => {
          commit("getCart", response.data.carts[0]);
        });
    },
  },
});

export default store;
