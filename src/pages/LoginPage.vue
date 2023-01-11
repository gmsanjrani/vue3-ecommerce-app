<template>
  <LoadingPage v-if="loading" />
  <div class="login__container" v-else>
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
      <h1 class="text-3xl font-semibold">Welcome!</h1>
      <v-form class="grid gap-6">
        <v-text-field
          v-model.lazy="formData.username"
          :rules="[rules.required, rules.min]"
          label="username"
          counter="10"
          type="text"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          v-model.lazy="formData.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="showPassword ? 'text' : 'password'"
          label="password"
          @click:append="showPassword = !showPassword"
          counter="10"
          variant="underlined"
        ></v-text-field>
        <v-btn
          type="submit"
          @click.prevent="submitLogin"
          color="red"
          class="rounded-md"
          >Login</v-btn
        >
      </v-form>
      <!-- login function -->
    </div>
  </div>
</template>

<script>
import LoadingPage from "./LoadingPage.vue";
import client from "@/lib/client";
export default {
  name: "LoginPage",
  components: {
    LoadingPage
  },
  data() {
    return {
      loading:true,
      showPassword: false,
      formData: {
        username: null,
        password: "",
      },
      // validations
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 7 || "Min 7 characters",
      },
    };
  },
  methods: {
    // Login Functionality store user data into local storage
    submitLogin() {
      try {
        client({
          method: "POST",
          url: "auth/login",
          data: {
            username: this.formData.username.trim(),
            password: this.formData.password.trim(),
          },
        }).then((response) => {
          const user = response.data;
          localStorage.setItem("userData", JSON.stringify(user));
          this.$store.commit("setLogin", true)
          this.$router.push("/");
        });
      } catch (e) {
        this.$swal("Error!", `Invalid Credentials.`, "success");
        console.log(e);
      }
    },
  },

  mounted() {
    setTimeout(() => { this.loading = false }, 1500);
  }
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
      width: 80%;
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

    .focus > label {
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

      .focus > label {
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
