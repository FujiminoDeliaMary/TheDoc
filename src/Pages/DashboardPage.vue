<script setup>
    import navVue from '@/components/navVue.vue';

    import api from '../services/api.service';
import { ref } from 'vue';

    const columns = ref([
    {
        "name": "name",
        "label": "Nom"
    },
    {
        "name":"createdAt",
        "label": "Compagnie"
    },
    {
        "name":"isActive",
        "label":  "Active"
    }
])
    
    const data = await api.patientsList();
    console.log(data);
</script>

<template>
    <div class="body">
  
        <navVue />
        <main class="dashboard">
            <h2 className="dashboard__title">
                Dashboard
            </h2>
            <section class="visits">
                <article class="visits__list">
                    <p class="visits__number bg-dark">3 Rendez-vous aujourd'hui</p>
                    <div class="visit">
                        <p class="visit__hour">9:00</p>
                        <div class="visit__info">
                            <p class="visit__name">BRYANT Jean-Jacques</p>
                            <p class="visit__dayinfo">Consultation vidéo</p>
                        </div>
                    </div>
                    <div class="visit">
                        <p class="visit__hour">9:00</p>
                        <div class="visit__info">
                            <p class="visit__name">BRYANT Jean-Jacques</p>
                            <p class="visit__dayinfo">Consultation vidéo</p>
                        </div>
                    </div>
                    <div class="visit">
                        <p class="visit__hour">9:00</p>
                        <div class="visit__info">
                            <p class="visit__name">BRYANT Jean-Jacques</p>
                            <p class="visit__dayinfo">Consultation vidéo</p>
                        </div>
                    </div>
                </article>
                <article class="visits__actions">
                    <p class="visits__action">Créer un patient</p>
                    <p class="visits__action">Créer un rendez-vous</p>
                </article>
            </section>

        <table class="table">
                <caption class="caption">
                    Les derniers patients
                </caption>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Date</th>
                        <th>Téléphone</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="data">

                </tbody>
            </table>
        </main>
    </div>
</template>

<style lang="scss">

$bleu-clair: #057AFF;
$gris:#E5E5E580;

.dashboard{
     
    height: 100vh;
    margin:0 2rem;
   flex-grow: 1;

}
.body{
    display: flex;
    background-color: #F5F5FA;
}

.visits{
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__actions{
        display: flex;
        flex-direction: column;
        gap:1rem;
    }

    &__action{
        background-color: $bleu-clair;
        padding: 0.3rem 8rem;
        border-radius: 5px;
        color: #FFFFFF;
        text-align: center;
    }


    &__number{
        margin-bottom:3rem;
    }

    &__list{
        background-color: #FFFFFF;
        padding: 1rem 2rem;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap:1rem;
    }

    .visit{
        display: flex;
        align-items: center;
        gap:2rem;

        &__info{
            min-width:40vw;
            display:flex ;
            justify-content: space-between;
            background-color: $gris;
            padding:0.5rem 1rem;
            border-radius: 5px;
        }
    }
}


.name{
    text-transform: uppercase;
    color:#FFFFFF;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

}

.nav{
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    flex-basis: 10%;
    flex-shrink: 0;
    flex-grow: 0; 
    padding: 2rem 0;

    &__list{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:6rem;
        height:100%;
    }

    &__setting{
        margin-top: auto;
        display: flex;
        justify-content: center;
    }
}





.dashboard{
   

   &__title{
    text-transform: uppercase;
    font-weight: 800;
    margin: 2vh 0;
    font-size:2vw;
}
   
}

</style>