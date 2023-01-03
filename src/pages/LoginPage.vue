<template>
  <div class="login__container">
    <div class="login__hint">
      Hint: <br />
      <p>
        Username:
        <span>kminchelle</span>
      </p>
      <p>
        Password:
        <span>0lelplR</span>
      </p>
    </div>
    <div id="login__content">
      <h1 class=" text-3xl font-semibold">Welcome!</h1>
      <form action="" method="get">
        <div class="login__input" ref="username">
          <label for="name">username</label>
          <input @focus="onFocusUsername" @blur="onBlurUsername" type="text" ref="usernameInput"
            v-model="formData.username" />
        </div>
        <div class="login__input" ref="password">
          <label for="password">password</label>
          <input @focus="onFocusPassword" @blur="onBlurPassword" type="password" ref="passwordInput"
            v-model="formData.password" />
        </div>
      </form>
      <!-- login function -->
      <button @click="submitLogin" id="login__btn">Login</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      usernameInput: false,
      passwordInput: false,
      formData: {
        username: null,
        password: "",
      },
    };
  },
  methods: {
    onFocusUsername() {
      if (this.$refs.usernameInput.focus)
        this.$refs.username.classList.add("focus");
    },
    onFocusPassword() {
      if (this.$refs.passwordInput.focus)
        this.$refs.password.classList.add("focus");
    },
    onBlurUsername() {
      if (!this.formData.username)
        this.$refs.username.classList.remove("focus");
    },
    onBlurPassword() {
      if (!this.formData.password)
        this.$refs.password.classList.remove("focus");
    },

    // Login Functionality store user data into local storage

    async submitLogin() {
      try {
        const response = await axios({
          method: "POST",
          url: "https://dummyjson.com/auth/login",
          headers: { "Content-Type": "application/json" },
          data: {
            username: this.formData.username.trim(),
            password: this.formData.password.trim(),
          },
        });
        const user = await response.data;

        if (user.token) {
          this.$store.dispatch("getCart", user.id);
          localStorage.setItem("userData", JSON.stringify(user));            
          this.$router.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/*=============================================
=            login form container            =
=============================================*/

.login__container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #dcdcdc;
  position: relative;

  .login__hint {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 333;
    padding: 1rem;
  }

  #login__content {
    width: 450px;
    padding: 50px;
    box-shadow: 0 11px 17px 5px rgba(0, 0, 0, 33%);
    border-radius: 50px;
    background-color: hsl(252, 30%, 100%);

    h1 {
      text-align: center;
      color: #f02d34;
    }

    /*----------  login input bar section  ----------*/

    .login__input {
      width: 350px;
      height: 60px;
      border-radius: 25px;
      margin: 30px 0;
      opacity: 0.5;
      transition: 200ms;
      font-weight: 600;
      position: relative;

      label {
        position: absolute;
        font-size: 17px;
        text-transform: capitalize;
        top: 20px;
        left: 45px;
        transition: 200ms;
      }

      input {
        position: absolute;
        width: 100%;
        border-radius: 25px;

        height: 100%;
        border: none;
        background: none;
        box-sizing: border-box;
        padding: 20px 45px 10px;
        font-size: 18px;
        outline: 2px solid #000;

        &:focus {
          border: none;
          outline: 2px solid #f02d34;
        }
      }

      box-icon {
        position: absolute;
        width: 26px;
        top: 17px;
        left: 10px;
      }
    }

    .focus {
      opacity: 1;
    }

    .focus>label {
      top: 2px;
      font-size: 12px;
    }

    /*----------  login input bar end here  ----------*/

    #login__btn {
      width: 350px;
      border: none;
      padding: 15px;
      color: #fff;
      background-color: #000;
      font-size: 24px;
      border-radius: 30px;
      cursor: pointer;
      background-color: #f02d34;
    }
  }

  /*=====  End of login form section  ======*/

  /*=============================================
    =            Media Query For mobiles         =
    =============================================*/

  @media screen and (max-width: 500px) {
    #login__content {
      width: 290px;

      .login__input {
        width: 190px;
        height: 35px;
        margin: 20px 0;

        label {
          top: 7px;
          left: 25px;
          font-size: 13px;
        }

        input {
          padding: 20px 25px 10px;
          font-size: 12px;
          width: 190px;
        }

        box-icon {
          width: 26px;
          top: 13px;
          left: 10px;
        }
      }

      #login__btn {
        width: 190px;
        font-size: 15px;
        height: 45px;
      }

      .focus>label {
        top: -2px;
        font-size: 10px;
      }

      .login__hint {
        font-size: 12px;
      }
    }
  }
}

/*=====  End of media query for mobile  ======*/
</style>
