<script>

export default {

    data() {
        return {

            firstName: null,
            lastName: null,
            email: null,
            address: null
        }
    },

    created() {



        this.getUserInfo()


    },
    methods: {

        getUserInfo() {
            const id = parseInt(localStorage.getItem("user_id"));


            fetch('/src/database.json')
                .then(response => response.json())
                .then(result => {
                    result.users.forEach(user => {

                        console.log(typeof (id) + "if satsen körs")
                        console.log(user.id)
                        if (user.id === id) {
                            this.firstName = user.first_name;
                            this.lastName = user.last_name;
                            this.email = user.email;
                            this.address = user.adress;
                        }
                    });

                    console.log(result.users);
                });



            // fetch('/src/database.json').then(response => response.json()).then(result => {

            //     for (const user in result.users) {
            //         console.log(typeof (id) + "if satsen körs")
            //         console.log(user.id)
            //         if (user.id === 1) {



            //             this.firstName = user.first_name;
            //             this.secondName = user.last_name;
            //             this.email = user.email;
            //             this.address = user.adress;
            //         }


            //     }
            //     console.log(result.users)
            // });


        }
    }
}


</script>

<style scoped>
article {
    padding-bottom: 3rem;
}

#editAccount {
    background-color: var(--mid-beige);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2rem;
}

#editAccount h2 {
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    padding-top: 0.8rem;
    padding-bottom: 0.5rem;
}

#hrDiv {
    padding-bottom: 1rem;
    width: 100%;
}

#editAccount_hr {
    border: 1px solid #475133;
}

#accountInfo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    width: 70%;
    max-width: 18rem;
    font-weight: bold;
    background-color: var(--dark-beige);
    border-radius: 19px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    align-items: center;
    justify-items: center;
}



#accountInfo input {
    background-color: var(--mid-beige);
    border-radius: 19px;
    padding: 0.3rem 0rem;
    text-align: center;
    color: black;
    font-size: 1rem;
}

.inputBox,
#adressDiv {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
}

#adressDiv {
    padding-bottom: 1rem;
}

#adress {
    width: 15rem;
}

#buttonsDiv {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.buttons {
    background-color: var(--mid-beige);
    border: 0;
    text-align: center;
    border-radius: 19px;
    padding: 0.3rem 0.6rem;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    font-weight: lighter;
    font-size: 0.9rem;
    width: 8rem;
}

.buttons:active {
    box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

@media screen and (min-width: 600px) {
    article {
        padding-left: 2rem;
        padding-top: 0.8rem;
    }

    #editAccount {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }

    #editAccount h2 {
        text-align: left;
        margin: 0;
        padding: 2rem 0;
        font-size: 1rem;
        padding-bottom: 1.5rem;
    }

    /*#accountInfo {
        display: flex;
        flex-direction: column;
         width: 17rem; 
    font-weight: bold;
    padding-left: 1rem;
    padding-right: 1rem;

     width: 20vh; 
    max-width: 1000px;
} */

    #accountInfo {
        width: 40vw;
        max-width: 300px;
    }


    /* #inputBoxDiv {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    } */

    label {
        font-size: 1rem;
    }

    .inputBox,
    #adressDiv {
        display: flex;
        flex-direction: column;
    }

    /* #buttonsDiv {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        padding-top: 2rem;
    } */

    .buttons {

        font-size: 0.9rem;
        color: var(--dark-green);
        justify-self: center;
        align-self: center;
    }

    #hrDiv {
        display: none;
    }
}
</style>

<template>
    <article>
        <section id="editAccount">
            <h2>Mitt konto</h2>
            <div id="hrDiv">
                <hr id="editAccount_hr">
            </div>
            <form id="accountInfo">
                <div id="inputBoxDiv">
                    <div class="inputBox">
                        <label for="fname">Förnamn</label>
                        <input type="text" id="fname" name="fname" v-model="firstName" required>
                    </div>
                    <div class="inputBox">
                        <label for="lname">Efternamn</label>
                        <input type="text" id="lname" name="lname" v-model="lastName" required>
                    </div>
                    <div class="inputBox">
                        <label for="fname">E-post</label>
                        <input type="email" id="email" name="fname" v-model="email" required>
                    </div>
                    <div id="adressDiv">
                        <label for="lname">Adress</label>
                        <input type="text" id="adress" name="lname" v-model="address" required>
                    </div>
                </div>
                <div id="buttonsDiv">
                    <button class="buttons">Ändra lösenord</button>
                    <button class="buttons">Spara ändringar</button>
                </div>
            </form>
        </section>
    </article>
</template>