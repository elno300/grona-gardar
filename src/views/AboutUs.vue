<script></script>

<style scoped>

.section_about {
    background-color: var(--mid-beige);
}

.block_about {
    color: var(--dark-green);
}


.block_about h1 {
    margin-top: 25px;
    padding-bottom: 1rem;
    font-size: 24px;
    font-family: Anevir Next DemiBold;
}

b{
    font-family: Anevir Next DemiBold;
}

.block_about p{
    padding: 10px 00;
    text-align: justify;
}


.about_img {
    width: 100%;
    height: 100%;
    height: fit-content;
    object-fit: cover;
}

.about_text {
    padding: 3rem 10%;
    max-width: 700px;
    margin-bottom: 25px;
}

.img-container{
    width: 100vw;
    max-height: 93vh;
    overflow: hidden;
    /* display: flex;
    justify-content: center; */
}

@media screen and (min-width:650px){

.img-container img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
}

.img-container{
    width: 100vw;
    max-height: 73vh;
    overflow: hidden;
}

.block_about{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
}

</style>

<template>
    <article>
        <section class="section_about">
            <div class="block_about">
                <div class="img-container">
                <img src="../assets/media/about-us.jpg" alt="two person in landskape" class="about_img about_img_div">
                </div>
                <div class="about_text">

                    <h1>
                        Ekologiskt och närodlat!
                    </h1>

                    <div>
                        <p>
                        Välkommen till vår ekologiska gård, där naturen och hållbarhet står i fokus. Företaget grundades år 1991 av Glenn Olsson och har sedan dess levererat närodlat och ekologiskt till sina kunder. Genom ekologisk odling och avståndstagande från kemiska ämnen skapar vi en miljö där jorden flödar av liv.
                        </p>

                        <p>
                        <b>Kretsloppsanpassning</b> är kärnan i vårat arbete, från kompostering till återvinning, minimerar vi avfall och bidrar till en hållbar cykel. Energiförbrukningen optimeras genom investeringar i effektiva system, och vi
                        prioriterar vattenbevarande metoder för att minimera påverkan på miljön.
                        </p>

                        <p>
                        Lokala samarbeten är centralt för oss för att minska vårt koldioxidavtryck. Vi är inte bara odlare; vi är förkämpar för
                        medvetenhet och utbildning. Genom att dela kunskap om ekologisk odling hoppas vi inspirera andra att välja en mer hållbar livsstil. Vår gård är en plats där varje gröda är en handling av kärlek till planeten och varje skörd ett framsteg mot en grönare framtid.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    </article>
</template>
