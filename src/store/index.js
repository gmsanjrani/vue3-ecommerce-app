import { createStore } from "vuex";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();
const store = createStore({
  state: {
    products: [], 
    cart: false,
    cartData: null,
    topRatedProducts:[]
  },
  mutations: {
    // function for setting products
    setProducts(state, newPosts) {
      state.products = newPosts;
      const x = state.products.filter((p) => p.rating > 4.5);
      state.topRatedProducts = x
    },
    // toggle button for cart open/close
    showCart(state) {
      state.cart = !state.cart;
    },
    // function fot setting cart items
    setCart(state, newCart) {
      state.cartData = newCart;
      state.cartProducts = newCart.products;
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
    deleteProduct(state, id) {
      const newArray = state.products.filter((p) => p.id != id);
      state.products = newArray;
    },
  },
  actions: {
    // get products for API
    getProducts({ commit }) {
      axios.get("https://dummyjson.com/products/").then((response) => {
        commit("setProducts", response.data.products);
      });
    },
    // search product form API and set products
    searchProducts({ commit }, search) {
      if (search) {
        axios
          .get(`https://dummyjson.com/products/search?q=${search}`)
          .then((response) => {
            commit("setProducts", response.data.products);
          });
        window.scrollTo(0, 500);
      } else {
        axios.get("https://dummyjson.com/products/").then((response) => {
          commit("setProducts", response.data.products);
        });
      }
    },
    // filter products by category
    productsCategory({ commit }, val) {
      axios
        .get(`https://dummyjson.com/products/category/${val.trim()}`)
        .then((response) => {
          commit("setProducts", response.data.products);
        });
    },
    // getting cart of a logged user form API
    getCart({ commit },userId) {
        axios
        .get(`https://dummyjson.com/carts/user/${userId}`)
        .then((response) => {
          if (response) commit("setCart", response.data.carts[0]);
        });
    },

    // Function create a new Cart
  
  },
});

export default store;
