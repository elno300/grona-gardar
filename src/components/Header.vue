<template>
  <header id="header">
    <div @click="exitMenu" class="overlay"></div>

    <!--Hamburger Menu Div-->
    <div class="menu-container">
      <ul>
        <li @click="onMenuClick"><router-link to="/">Hem</router-link></li>
        <li @click="onMenuClick"><router-link to="/products">Produkter</router-link></li>
        <li @click="onMenuClick"><router-link to="/about">Om oss</router-link></li>
        <li @click="onMenuClick"><router-link to="/contact">Kontakt</router-link></li>
      </ul>
    </div>

      <!--==== Login conent Container ====-->
        <!-- Send boolean isLoginClicked as a prop to Login-component -->
        <!-- Listening on the overlay-clicked event and sets isLoginClicked to false -->
        <!-- Listening on userName event and calls handleUserNameEvent-method -->
    <Login :on-login-icon-click="isLoginClicked" @userName="handleUserNameEvent" @overlay-clicked="isLoginClicked = false"></Login>
    <!--==== Login conent Container ====-->

    <!--==== Cart conent Container ====-->
    <Cart :on-cart-click="isCartClicked" @overlay-clicked="isCartClicked = false"
      @tot-items-in-cart="setTotQuantityOfItemsInCart" @tot-cost-in-cart="setTotCostOfItemsInCart"></Cart>
    <!--End of Cart Content COntainer-->

    <nav id="navBar">
      <div class="hamburger-and-links-container">
        <div class="hamburger-wrapper" @click="onMenuClick()">
          <!-- <i class="bi bi-list kajsa"></i> -->
          <div class="rectA"></div>
          <div class="rectB"></div>
          <div class="rectC"></div>
        </div>
        <div class="links-wrapper">
          <p><router-link to="/products">Produkter</router-link></p>
          <p><router-link to="/about">Om oss</router-link></p>
          <p><router-link to="/contact">Kontakt</router-link></p>
        </div>
      </div>

      <div class="logo-container">
        <router-link to="/">
          <img src="../assets/logo/logo.svg" alt="Logo">
        </router-link>
      </div>

      <div class="login-and-cart-container">

        <div class="login-and-cart-icons-wrapper">

          <div v-if="userName === 'Konto'" @click="onLoginClick" class="login-wrapper">
            <i class="bi bi-person"></i>
            <p>{{ userName }}</p>
          </div>

          <router-link v-else=" userName !== 'Konto'" to="/account" class="login-wrapper">
            <i class="bi bi-person"></i>
            <p>{{ userName }}</p>
          </router-link>

          <div @click="onCartClick" class="cart-icon-wrapper">
            <i class="bi bi-cart"></i>
            <div class="quantity-in-cart" v-if="quantityOfItemsInCart"><b>{{ quantityOfItemsInCart }}</b></div>
            <p v-html="`${quantityOfItemsInCart ? `<b>${totCostForItemsInCart}</b>` : 'Varukorg'}`"></p>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import Login from './Login.vue';
import Cart from './Cart.vue'

export default {
  components: {
    Login,
    Cart,
  },
  data() {
    return {

      isCartClicked: false,
      isLoginClicked: false,
      userName: "Konto",
      quantityOfItemsInCart: null,
      totCostForItemsInCart: null,

    }
  },
  watch:{

  },
  created() {

    this.sendUserNameToHeader()

  },
  methods: {
    //Method that expands menu and manipulates the hamburger
    onMenuClick() {
      // const header = document.getElementById("header");
      const overlay = document.querySelector(".overlay");
      const rectA = document.querySelector(".rectA")
      const rectB = document.querySelector('.rectB')
      const rectC = document.querySelector('.rectC')

      const menuContainer = document.querySelector('.menu-container')

      if (rectA.classList.contains('move-rectA-down')) {

        overlay.classList.remove("increase-blur")

        //Remove overlay styles once transition has finished
        setTimeout(function () {
          overlay.style.display = "none";
        }, 500)

        rectA.style.transition = 'top 0.5s 0.5s, transform 0.5s ease-in-out';
        rectB.style.transition = 'top 0.5s 0.5s, transform 0.5s ease-in-out';
        rectC.style.transition = 'top 0.5s 0.5s, transform 0.5s ease-in-out';

        rectA.classList.remove('rotate-rectA-rectB')
        rectB.classList.remove('rotate-rectA-rectB')
        rectC.classList.remove('rotate-rectC')

        rectA.classList.remove("move-rectA-down")
        rectC.classList.remove('move-rectC-up')

        menuContainer.classList.remove('move-menu-right')
      }

      else {

        //Show overlay
        overlay.style.display = "block";

        //Add blur to overlay div
        setTimeout(function () {
          overlay.classList.add("increase-blur")
        }, 100)

        //Set transition values
        rectA.style.transition = 'top 0.5s, transform 0.5s 0.5s ease-in-out';
        rectB.style.transition = 'top 0.5s, transform 0.5s 0.5s ease-in-out';
        rectC.style.transition = 'top 0.5s, transform 0.5s 0.5s ease-in-out';

        //Add classes to animate rectA,B and C
        rectA.classList.add("move-rectA-down")
        rectC.classList.add('move-rectC-up')
        rectA.classList.add('rotate-rectA-rectB')
        rectB.classList.add('rotate-rectA-rectB')
        rectC.classList.add('rotate-rectC')

        menuContainer.classList.add('move-menu-right')

      }
    },
    //Method that exist menu when user closes menu
    exitMenu() {
      document.querySelector(".menu-container").classList.remove("move-menu-right");
      document.querySelector(".overlay").classList.remove("increase-blur");
      this.onMenuClick();

    },
    // Method that opens the login and blurres background
    onLoginClick() {
      this.isLoginClicked = true;
    },

    //Method regulating what happens when cart icon is clicked
    onCartClick() {

      if (this.isCartClicked === false) {
        this.isCartClicked = true;
      }
      else {
        this.isCartClicked = false;
      }
    },
    handleUserNameEvent(user) {

      this.userName = user
      localStorage.setItem("userName", this.userName);

    },
    // Method that sends the user name to be visible in the header.
    sendUserNameToHeader() {

      const userNameFromStorage = localStorage.getItem("userName")

      if (!userNameFromStorage) {
        this.userName = "Konto"
      }
      else {
        this.userName = userNameFromStorage;
      }

    },

    //Update quantity of items in cart for header
    setTotQuantityOfItemsInCart(incomingQuantityOfItems) {
      this.quantityOfItemsInCart = incomingQuantityOfItems;
    },
    //Update tot. Cost of items in cart for header
    setTotCostOfItemsInCart(incomingTotCostOfItems) {
      this.totCostForItemsInCart = incomingTotCostOfItems + " kr";
    }
  }

}


</script>

<style scoped>
header {
  width: 100vw;
  background-color: var(--dark-beige);
  overflow: hidden;
  left: 0;
  top: 0;
  z-index: 20;
  position: sticky;
}

.overlay {
  display: none;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(0px);
  transition: background-color 0.75s, backdrop-filter 0.75s;
}

.increase-blur {
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(1px);
}

nav {
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 25px;
  background-color: var(--dark-beige);
}

.hamburger-and-links-container {
  width: fit-content;
  height: fit-content;
  display: flex;
}

.hamburger-wrapper {
  width: 25px;
  cursor: pointer;
  height: 14px;
  position: relative;
  z-index: 2;
}

.links-wrapper {
  height: fit-content;
  display: flex;
  flex-direction: row;
  margin-left: 5px;
  gap: 25px;
  display: none;

}

.rectA,
.rectB,
.rectC {
  background-color: var(--dark-green);
  width: 25px;
  height: 1.5px;
  border-radius: 16px;
  transition: top 0.5s, transform 0.5s 0.5s ease-in-out;
}

.rectA {
  top: 0;
  position: absolute;
}

.rectB {
  top: 7px;
  position: absolute;
}

.rectC {
  top: 14px;
  position: absolute;
}

.move-rectA-down {
  top: 7px;
}

.move-rectC-up {
  top: 7px;
}

.rotate-rectA-rectB {
  transform: rotate(45deg);
}

.rotate-rectC {
  transform: rotate(-45deg);
}

.logo-container {
  cursor: pointer;
  text-align: center;
  padding: 5px 0;
}

.logo-container img {
  width: 110px;
}

.login-and-cart-container {
  width: 25px;
}

.login-and-cart-icons-wrapper {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.bi {
  font-size: 25px;
  cursor: pointer;
}

main {
  display: flex;
  flex-direction: column;
}

.menu-container {
  background-color: var(--mid-beige);
  width: 280px;
  height: 100vh;
  z-index: 1;
  position: fixed;
  left: -300px;
  transition: left 0.75s ease-in-out;
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.4);
}

.move-menu-right {
  left: 0;
}

ul {
  margin-top: 60px;
  padding-top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

li {
  padding-top: 20px;
  margin-left: 25px;
  font-size: 30px;
}

.login-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.cart-icon-wrapper {
  cursor: pointer;
  position: relative;
}

.quantity-in-cart {
  background-color: var(--dusty-pink);
  font-size: 12px;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  position: absolute;
  left: 12px;
  top: 0;
}

.login-wrapper p {
  display: none;
}

.cart-icon-wrapper p {
  display: none;
}



@media screen and (max-width: 451px) {

  .login-wrapper p {
    display: none;
  }
}


/*===================*/
@media screen and (min-width: 451px) {

  .login-register-link-wrapper h1 {

    font-size: 20px;
  }

}

@media screen and (min-width: 700px) {
  .logo-container {
    order: 1;
    justify-content: start;
  }

  .hamburger-and-links-container {
    order: 2;
    flex-grow: 1;
  }

  .login-and-cart-container {
    width: 25px;
    order: 2;
  }

  .hamburger-wrapper {
    visibility: hidden;
  }

  .links-wrapper {
    display: flex;
  }

  .login-wrapper {
    visibility: visible;
  }

  .login-and-cart-container {
    width: 40%;
    display: flex;
    justify-content: end;
  }

  .cart-icon-wrapper {
    display: flex;
    align-items: center;
  }

  .cart-icon-wrapper p,
  .login-wrapper p {
    margin-left: 5px;
    font-size: 12px;
    display: inline-block;
  }

}


</style>
