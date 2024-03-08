<script setup>
import navVue from '@/components/navVue.vue';

import api from '../services/api.service';
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { formatDate } from '@/composables/format';
import filter from '@/services/filter.service'

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
const bloodGroup = ref('');


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

const handleSortBloodGroup = async() =>{
    if (bloodGroup.value!== ''){
        const patientsByBloodGroup = await filter.getPatientsByBloodGroup(bloodGroup.value)
        patients.value=[...patientsByBloodGroup.data]
    }else{
        patients.value = [...patientsList.value]
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
                            <select @change="handleSortBloodGroup" v-model="bloodGroup" >
                                <option value="" >Groupe Sanguin</option>
                                <option value="A négatif">A négatif</option>
                                <option value="B négatif">B négatif</option>
                                <option value="O négatif">O négatif</option>
                                <option value="AB négatif">AB négatif</option>
                                <option value="A positif">A positif</option>
                                <option value="B positif">B négatif</option>
                                <option value="O positif">O négatif</option>
                               
                            </select>
                        </form>
                        <RouterLink to="createPatient">
                            <button class="text-4xl px-2 py-0.2 bg-blue-500 rounded-sm">+</button>
                        </RouterLink>
                    </div>
                </div>
                <table class="table-auto min-w-full text-left text-sm font-light mt-12" >
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
                <tbody v-if="patients && patients.length > 0">
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
            <div class="w-full flex justify-center items-center my-60" v-if="patients && patients.length===0">
                <p>Aucun patient enregistré pour l'instant</p>
            </div>
            <div v-if="!patients" class="w-full flex justify-center items-center my-60">
                <svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
                       
            </div>
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