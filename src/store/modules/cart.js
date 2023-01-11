import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  state: {
    cart: false,
    login:false,
    cartData: null,
  },
  mutations: {
    // toggle button for cart open/close
    showCart(state) {
      state.cart = !state.cart;
    },
    setLogin(state, newLogin) {
      state.login = newLogin
    },
    // function fot setting cart items
    setCart(state, newCart) {
      state.cartData = newCart;
    },
    // set logged in user Data
    setUserData(state, newUser) {
      state.userData = newUser;
    },
    // set logged in user Data
    setCartData(state, newCart) {
      state.cartData = newCart;
    },
    // function remove cart item
    removeCartItem(state, index) {
      toast.success(`${state.cartData.products[index].title} is removed from Cart !`,{ timeout: 1500 });
      state.cartData.total -= state.cartData.products[index].total;
      state.cartData.totalQuantity -= state.cartData.products[index].quantity;
      state.cartData.totalProducts--;
      state.cartData.products.splice(index, 1);
      localStorage.setItem("cartData", JSON.stringify(state.cartData))
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
        localStorage.setItem("cartData", JSON.stringify(state.cartData))
      }
    },

    // function increasing cart item quantity
    incrementItemProduct(state, id) {
      state.cartData.products.map((p) => {
        if (p.id == id) {
          p.quantity++;
          p.total = p.quantity * p.price;
          state.cartData.total += p.price;
          state.cartData.totalQuantity++;
          localStorage.setItem("cartData", JSON.stringify(state.cartData))
        }
      });
    },

    // function decreasing cart item quantity
    decrementItemProduct(state, id) {
      state.cartData.products.map((p) => {
        if (p.id == id && p.quantity > 0) {
          p.quantity--;
          p.total = p.quantity * p.price;
          state.cartData.total -= p.price;
          state.cartData.totalQuantity--;
          localStorage.setItem("cartData", JSON.stringify(state.cartData))
        }
      });
    },
  },
};
