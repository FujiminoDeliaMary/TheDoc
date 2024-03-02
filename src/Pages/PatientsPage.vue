<script setup>
import navVue from '@/components/navVue.vue';

import api from '../services/api.service';
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { formatDate } from '@/composables/format';

const columns = ref([
    {
        "name": "firstname",
        "label": "Nom"
    },
    {
        "name":"createdAt",
        "label": "Date"
    },
    {
        "name":"notes",
        "label":  "Notes"
    }
])

const patientsList = ref();
const patients = ref();
const search = ref('');



onMounted(async () => {
    try {
      
        const data = await api.patientsList();
        patientsList.value = data.data; 
        patients.value = [...data.data];
       
    } catch (error) {
        console.error('Erreur lors du chargement des patients:', error);
    }
});

watch(search, () => {
    if (search.value.trim() !== ''){
        patients.value = patientsList.value.filter((p) => {
            return  p.attributes.firstname.toLowerCase().includes(search.value.toLowerCase())
        })
    }else{
        patients.value = [...patientsList.value]
    }
})

const sort = ref('date');

const handleSort = () => {

    if(sort.value === 'date'){
        patients.value = patients.value.sort((a, b) => {
        return new Date(a.attributes.createdAt) - new Date(b.attributes.createdAt);
        });
    }else {
        patients.value = patients.value.sort((a, b) => {
        return a.attributes.firstname.localeCompare(b.attributes.firstname)
        });
    }
}

const show = ref(false);
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
                            <select @change="handleSort" v-model="sort">
                                <option value="date" >Date</option>
                                <option value="nom" >Nom</option>
                            </select>
                        </form>
                        <RouterLink to="createPatient">
                            <button class="text-4xl px-2 py-0.2 bg-blue-500 rounded-sm">+</button>
                        </RouterLink>
                    </div>
                </div>
                <table class="table-auto min-w-full text-left text-sm font-light mt-12">
                <caption class="caption text-left text-lg capitalie font-medium whitespace-nowrap border-b dark:border-neutral-500 py-3">
                    Patients
                </caption>
                <thead>
                    <tr class="border-b dark:border-neutral-500">
                        <th scope="col" class="px-6 py-4">Nom</th>
                        <th scope="col" class="px-6 py-4">Date</th>
                        <th scope="col" class="px-6 py-4">Notes</th>
                        <th scope="col" class="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for=" patient in patients" :key="patient" class="border-b dark:border-neutral-500">
               
                        <td v-for="column in columns" :key="column" class="whitespace-wrap px-6 py-4 w-1/4 font-medium">
                            {{ 
                                (column.name === 'createdAt') ? formatDate(patient.attributes[column.name]) : patient.attributes[column.name] }}
                             
                        </td>
                        
                        <RouterLink  :to="{ name: 'patient', params: { id:patient.id }}">
                            <td class="whitespace-wrap px-6 py-4 font-medium w-1/5">
                                <img src="../assets/images/EyeeyeIcon.png" alt="">
                            </td>
                        
                        </RouterLink>
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