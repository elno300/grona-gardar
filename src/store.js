import { defineStore } from "pinia";
import { watch } from "vue";

/*======================*/
/*===== CART PINIA =====*/
/*======================*/

// Store for managing products
export const useProductStore = defineStore('product', {
    state: () => ({
        // Retrieve products from local storage or initialize an empty array
        products: JSON.parse(localStorage.getItem("products")) || [],
    }),
    actions: {
        // Define actions to manipulate products
        async addProduct(pId) {

            try {

                //Fetch data from JSON-file
                const response = await fetch('/src/database.json');
                const data = await response.json();

                //Match incoming product ID width ID in JSON
                const product = data.products.find(item => item.id === pId);

                //If product-id does not exist in JSON-file
                if (!product) {
                    throw new Error("Product not found");
                }

                console.log("All products:", data)
                console.log("chosen product:", product)
                //Product object that is to be pushed into Pinia cart
                const newProduct = {
                    pId: product.id,
                    pName: product.product_name,
                    pType: product.product_type,
                    pImage: product.product_image,
                    pPrice: product.price,
                    pQuantity: 1,
                }

                //Index from product with same id, if it exists in Pinia Cart
                const existingProductIndex = this.products.findIndex(item => item.pId === pId);

                //If product exists update its quantity according to its index
                if (existingProductIndex !== -1) {
                    // If product already exists, update its quantity
                    this.products[existingProductIndex].pQuantity++;
                    console.log("Product quantity updated:", this.products[existingProductIndex]);
                }
                //If product does not exist in the Pinia cart
                else {
                    // Add the new product to the products array in frist empty slot
                    this.products.push(newProduct);
                    console.log("Yay, just added new product: ", this.products);
                }

                console.log("Currently in cart: ", this.products)

            }
            catch (error) {
                console.error("Error adding product:", error);
            }


        },
        // Other product-related actions
    },
    // Define getters and mutations as needed


});


/*==========================*/
/*===== ACCOUNTS PINIA =====*/
/*==========================*/

// Store for managing accounts
export const useAccountStore = defineStore('account', {
    state: () => ({
        accounts: []
    }),
    actions: {
        // Define actions to manipulate accounts
        addAccount(account) {
            this.accounts.push(account);
        },
        // Other account-related actions
    },
    // Define getters and mutations as needed
});
