<script setup>
import navVue from '@/components/navVue.vue';
import { formatDate } from '@/composables/format';
import api from '../services/api.service';
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';



const visits = ref();
const visitsList = ref();
const search = ref('');
const sortPlace = ref('');
const filteredName = ref('');




onMounted(async () => {
    try {
    
        visitsList.value = await api.visitsList();
        visits.value = [...visitsList.value]
        console.log(visitsList.value);

        const visitsl = await api.visitsList();
        console.log('visitese',visitsl)
        

    } catch (error) {
        console.error('Erreur lors du chargement des patients:', error);
    }
});

const handleFilter = () => {

         let filteredVisits = [...visitsList.value];
        if (sortPlace.value) {
        filteredVisits = filteredVisits.filter((visit) => {
            return (sortPlace.value === 'maison') ? visit.attributes.at_home : (sortPlace.value === 'hopital') ? !visit.attributes.at_home : true;
        });
    }
        visits.value = filteredVisits;
}

const handleFilterName = () => {
    console.log(filteredName);

    let currentListwithName = [...visitsList.value]; // Il ne trouvera si par exemple on a déjà mis un filtre sur le lieu et que le client n'est pas dans ce filtre
    if (filteredName.value) {
        
        currentListwithName= currentListwithName.filter((visit) => {
            return visit.attributes.patient.data.attributes.firstname + ' ' + visit.attributes.patient.data.attributes.lastname === filteredName.value;
        })
    }

    visits.value = currentListwithName
}

watch(search, () => {
    if (search.value.trim() !== ''){
        visits.value = visitsList.value.filter((p) => {
            return  p.attributes.patient.data.attributes.firstname.toLowerCase().includes(search.value.toLowerCase())
        })
    }else{
        visits.value = [...visitsList.value]
    }
})


</script>

<template>
      <div class="body">
            <navVue />
            <main class="dashboard">
              
                <div class="options">
                    <form>
                        <input type="text" placeholder="Recherche" v-model="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </form>

                    <div class="options__right">
                        <form >
                           <select name="lieu" v-model="sortPlace" @change="handleFilter">
                                <option value="" >Lieu</option>
                                <option value="maison">Maison</option>
                                <option value="hopital">Hôpital</option>
                           </select>
                           <select name="lieu">
                                <option value="">Date</option>
                           </select>
                           <select name="lieu" v-model="filteredName" @change="handleFilterName">
                                <option value="">Nom</option>
                                <option v-for="visit in visitsList" :key="visit" :value="visit.attributes.patient.data.attributes.firstname + ' ' + visit.attributes.patient.data.attributes.lastname">
                                    {{ visit.attributes.patient.data.attributes.firstname + ' ' + visit.attributes.patient.data.attributes.lastname }}
                                </option>
                               
                           </select>
                        </form>
                        <RouterLink to="createPatient">
                            <button class="text-4xl px-2  bg-blue-500 rounded-sm">+</button>
                        </RouterLink>
                    </div>
                </div>
                <table class="table-auto min-w-full text-left text-sm font-light mt-12">
                <caption class="caption text-left text-lg capitalie font-medium whitespace-nowrap border-b dark:border-neutral-500 py-3">
                    Rendez-vous
                </caption>
                <thead>
                    <tr class="border-b dark:border-neutral-500">
                        <th scope="col" class="px-6 py-4">Nom</th>
                        <th scope="col" class="px-6 py-4">Date</th>
                        <th scope="col" class="px-6 py-4">Adresse</th>
                        <th scope="col" class="px-6 py-4">Lieu</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for=" visit in visits" :key="visit" class="border-b dark:border-neutral-500">
               
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5">{{ visit?.attributes.patient.data.attributes.firstname + ' ' + visit?.attributes.patient.data.attributes.lastname }}</td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5">{{ formatDate(visit?.attributes.updatedAt )}}</td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5" v-if="visit?.patient.data.attributes.address.street">{{ visit?.patient.data.attributes.address.street + ' ' + visit?.patient.data.attributes.address.city }}</td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5" v-else> Aucune adresse</td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5" v-if="visit?.attributes.at_home"><img src="../assets//images/home_alt.svg" alt="Icone maison"></td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5" v-else><img src="../assets//images/rural_post.svg" alt="Icone maison"></td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5">
                            <img src="../assets/images/EyeeyeIcon.png" alt="">
                        </td>
                    </tr>
                </tbody>
            </table>
            </main>
        </div>
      
</template>

<style lang="scss">

    .options{
        display: flex;
        justify-content: space-between;

        &__right{
            display: flex;
            gap:3rem;
        }
    }

</style>