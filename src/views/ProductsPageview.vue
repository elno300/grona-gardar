<script>
import SearchBar from '../components/SearchBar.vue';
import ProductCard from '../components/ProductCard.vue';

export default {
  data() {
    return {
      categoryData: { fruits: [], vegetables: [], season: [] },
    }
  },
  async created() {
    await this.getCategory(this.$route.params.category)
  },
  watch: {
    async "$route.params.category"(newId) {
      await this.getCategory(newId);
    }
  },
  methods: {
    async getCategory(currentroute) {
      try {
        const response = await fetch('/src/database.json');
        const data = await response.json();
        let findCategory;
        if (currentroute) {
          switch (currentroute) {
            case 'fruits':
              this.categoryData.vegetables = [];
              this.categoryData.season = [];
              findCategory = data.products.filter(item => item.category === "Frukt");
              this.categoryData.fruits = findCategory;
              break;
            case 'vegetables':
              this.categoryData.fruits = [];
              this.categoryData.season = [];
              findCategory = data.products.filter(item => item.category === "Grönsaker");
              this.categoryData.vegetables = findCategory;
              break;
            case 'season':
              this.categoryData.fruits = [];
              this.categoryData.vegetables = [];
              findCategory = data.products.filter(item => item.season === data.active_season);
              this.categoryData.season = findCategory
              break;
          }

        } else {
          this.categoryData.vegetables = [];
          this.categoryData.fruits = [];
          this.categoryData.season = [];

          data.products.forEach(items => {
            switch (items.category) {
              case 'Frukt':
                this.categoryData.fruits.push(items);
                break;
              case 'Grönsaker':
                this.categoryData.vegetables.push(items);
                break;
              case data.active_season:
                this.categoryData.season.push(items);
                break;
            }
            if (items.season === data.active_season) {
              this.categoryData.season.push(items);
            }
          });
        }
      } catch {

      }
    },

    //Method that forwards user to a specific product page
    onProductClick(id) {
      // Use router.push to navigate to page Search
      this.$router.push(`/product/${id}`)
    },

  },
  components: {
    SearchBar,
    ProductCard
  },
}
</script>

<template>
  <section class="container">
    <nav>
      <ul class="bread-crumb-meny">
        <li><router-link to="/">Hem</router-link> <i class="bi bi-chevron-right"></i></li>
        <li><router-link to="/products" class="active">Produkter</router-link></li>
      </ul>
    </nav>
    <!-- <SearchBar></SearchBar> -->
    <ul class="filter_categories">
      <router-link to="/products" :class="{ active: $route.path === '/products' || $route.path === '/products/' }">
        <li>Alla</li>
      </router-link>
      <router-link to="/products/fruits" :class="{ active: $route.path === '/products/fruits' }">
        <li>Frukter</li>
      </router-link>
      <router-link to="/products/vegetables" :class="{ active: $route.path === '/products/vegetables' }">
        <li>Grönsaker</li>
      </router-link>
      <router-link to="/products/season" :class="{ active: $route.path === '/products/season' }">
        <li>I säsong</li>
      </router-link>
    </ul>
    <div class="category_container">
      <section v-if="categoryData.fruits.length !== 0">
        <h2 class="category_title">Frukt</h2>
        <ul class="product_list">

          <li v-for="items in categoryData.fruits">
            <ProductCard :productid="items.id" />
          </li>

        </ul>
      </section>

      <section v-if="categoryData.vegetables.length !== 0">
        <h2 class="category_title">Grönsaker</h2>
        <ul class="product_list">
          <li v-for="items in categoryData.vegetables">
            <ProductCard :productid="items.id" />
          </li>
        </ul>
      </section>
      <section v-if="categoryData.season.length !== 0">
        <h2 class="category_title">I säsong</h2>
        <ul class="product_list">
          <li v-for="items in categoryData.season">
            <ProductCard :productid="items.id" />
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  padding-top: 0;
}

.filter_categories {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.filter_categories a {
  background-color: var(--dark-beige);
  border-radius: 19px;
  padding: 0.5rem 0.6rem;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

}

.filter_categories .active {
  background-color: var(--dusty-pink);
}

.category_container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-right: 1rem;
}

.img-wrapper {
  cursor: pointer;
}

.overlay {
  position: fixed;
  /* Sit on top of the page content */
  display: none;
  /* Hidden by default */
  width: 100%;
  /* Full width (cover the whole page) */
  height: 100%;
  /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* Black background with opacity */
  z-index: 2;
  /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer;
  /* Add a pointer on hover */
}

.product_list li {
  max-width: none !important;
  width: calc(12.5% - 1rem);
}


.category_title {
  padding: 0.3rem;
  margin-bottom: 1rem;
}


/* CSS for buttons in general */
button:hover {
  cursor: pointer;
}

/* Knapp för varukorg */


.button_cart {

  margin-left: auto;
  margin-right: 2;
}


.div_button_more_products {
  clear: both;
  display: flex;
  justify-content: flex-end;

}

.button_more_products {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  font-size: 20px;
  border: 0;
  text-align: center;
  border-radius: 50px;
  padding: 0.3rem 0.8rem;
  padding-left: 1rem;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: var(--dusty-pink);
}

.button_more_products:active {
  box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.button_more_products i {
  font-size: 30px;
  padding-left: 15px;
}

@media screen and (min-width: 700px) {
  .container {
    margin-top: 1rem;
  }

}

@media screen and (min-width: 1px) and (max-width: 515px) {
  .product_list li {
    width: calc(50% - 1rem);
  }
}

@media screen and (min-width: 515px) and (max-width: 680px) {
  .product_list li {
    width: calc(33.33% - 1rem);
  }
}

@media screen and (min-width: 680px) and (max-width: 844px) {
  .product_list li {
    width: calc(25% - 1rem);
  }
}

@media screen and (min-width: 844px) and (max-width: 1010px) {
  .product_list li {
    width: calc(20% - 1rem);
  }
}

@media screen and (min-width: 1010px) and (max-width: 1180px) {
  .product_list li {
    width: calc(16.66% - 1rem);
  }
}

@media screen and (min-width: 1180px) and (max-width: 1369px) {
  .product_list li {
    width: calc(14.28% - 1rem);
  }
}
</style>
