<script setup>
import navVue from '@/components/navVue.vue';
import { formatDate } from '@/composables/format';
import api from '../services/api.service';
import filter from '@/services/filter.service';
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import TheModal from '@/components/TheModal.vue';
import apiPost from '@/services/post.service';


const idVisitModified = ref();
const visitById = ref();
const visits = ref();
const visitsList = ref();
const search = ref('');
const sortPlace = ref('');
const filteredName = ref('');
const visitsPatientsName = ref();
const showModalAddVisit = ref('');
const patientChosen = ref('');
const allDatesOfVisit = ref();
const selectedDate = ref('');
const visitTemplate = ref(
    {
  "data": {
    "patient": "",
    "date": "",
    "note": "",
    "at_home": ''
  }
}
)
 const handleModifyVisit = async(evt) => {
//     if (idVisitModified.value){
//     const visit = await api.getOneVisit(idVisitModified.value);
//     console.log(visit)
  
// }
        const td = evt.target.closest('td');
        console.log(td.dataset.id);
        idVisitModified.value = td.dataset.id;
        const visit = await api.getOneVisit(td.dataset.id)
        visitById.value = visit;
        console.log(visit);
        patientChosen.value= visit?.data?.attributes?.patient?.data?.attributes?.firstname + ' ' + visit?.data?.attributes?.patient?.data?.attributes?.lastname
        console.log(patientChosen);
 }



onMounted(async () => {
    try {
    
        visitsPatientsName.value= await filter.getAllNames();
        console.log(visitsPatientsName);
        allDatesOfVisit.value = await filter.getAllDates();
        console.log(allDatesOfVisit.value)
        visitsList.value = await api.visitsList();
        console.log(visitsList.value)
        visits.value = [...visitsList.value]

        // patientChosen.value = `${visitById?.data.attributes.}`
   
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
   

    let currentListwithName = [...visitsList.value]; // Il ne trouvera si par exemple on a déjà mis un filtre sur le lieu et que le client n'est pas dans ce filtre
    if (filteredName.value) {
        
        currentListwithName= currentListwithName.filter((visit) => {
            return visit.attributes.patient.data.attributes.firstname + ' ' + visit.attributes.patient.data.attributes.lastname === filteredName.value;
        })
    }

    visits.value = currentListwithName
}

const handleSelectPatient = (event) => {

    const selectedPatientId = event.target.value;
 
        const selectedPatient = visitsPatientsName?.value.data.find(patient => patient.id === parseInt(selectedPatientId, 10));
        if (selectedPatient) {
      
            patientChosen.value = `${selectedPatient.attributes.firstname} ${selectedPatient.attributes.lastname}`;
            visitTemplate.value.data.patient = selectedPatientId; 
        }else{
            patientChosen.value=''
        }
}

const handleSelectDate = () => {

    if (selectedDate.value){
        const visitsOfOneDay = visitsList?.value.filter(visit => formatDate(visit.attributes.date)===selectedDate.value);
        if (visitsOfOneDay) {
            visits.value = [...visitsOfOneDay]
        }else{
            visits.value= [];
        }
    }
   else{
        visits.value = [...visitsList.value];
    }
    console.log(visits.value)
}


const handleSubmit = () => {
    
    apiPost.postVisit(visitTemplate.value)
        .then(() => {
            alert('Rendez-vous enregistré avec succès')
        })
        .catch(() => {
            alert('Erreur lors de l\'enregistrement du rendez-vous')
        })
}

function formatedDate (dateS) {
    const date = new Date(dateS);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    console.log(year,month,day)
    return `${year}-0${month}-0${day}`;
};


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
      <div >
       
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
                           <select name="lieu" v-model="selectedDate" @change="handleSelectDate">
                                <option value="" >Date</option>
                                <option v-for="date in allDatesOfVisit?.data" :key="date">{{ formatDate(date.attributes.date) }}</option>
                           </select>
                           <select name="lieu" v-model="filteredName" @change="handleFilterName">
                                <option value="">Nom</option>
                                <option v-for="visit in visitsPatientsName?.data" :key="visit" :value="visit.attributes.firstname + ' ' + visit.attributes.lastname">
                                    {{ visit.attributes.firstname + ' ' + visit.attributes.lastname }}
                                </option>
                               
                           </select>
                        </form>
                 
                        <button class="text-4xl px-2  bg-blue-500 rounded-sm" @click="showModalAddVisit=true">+</button>
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
               
                <tbody v-if="visits?.length>0">
                    <tr v-for=" visit in visits" :key="visit" class="border-b dark:border-neutral-500">
               
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5">{{ visit?.attributes.patient.data.attributes.firstname + ' ' + visit?.attributes.patient.data.attributes.lastname }}</td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5">{{ formatDate(visit?.attributes.date )}}</td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5" v-if="visit?.patient.data.attributes.address.street">{{ visit?.patient.data.attributes.address.street + ' ' + visit?.patient.data.attributes.address.city }}</td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5" v-else> Aucune adresse</td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5" v-if="visit?.attributes.at_home"><img src="../assets//images/home_alt.svg" alt="Icone maison"></td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5" v-else><img src="../assets//images/rural_post.svg" alt="Icone maison"></td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5" @click="handleModifyVisit" :data-id="visit.id">
                            <img src="../assets/images/EyeeyeIcon.png" alt="" >
                        </td>
                        <td class="whitespace-wrap px-6 py-4 font-medium w-1/5" @click="handleClick($event)" :data-id="visit.id">
                            <img src="../assets/images/EyeeyeIcon.png" alt="">
                        </td>

                    </tr>
                </tbody>
                <tbody v-else-if="visits?.length===0">
                    Aucune visite enregistrée
                </tbody>
    
            </table>
            <div v-if="!visits" class="w-full flex justify-center items-center my-60">
                <svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
                       
            </div>
            </main>
        </div>

        <TheModal :showModal="showModalAddVisit" >
            <template #header v-if="idVisitModified">
                Modifier un rendez-vous
            </template>
            <template #header v-else>
                Ajouter un rendez-vous
            </template>
            <template #body>
                <form action="">
                    <div class="py-4">
                        <select name="" id="" @change="handleSelectPatient" required   class="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-4">
                            <option value="">Sélectionnez un patient</option>

                            <option v-for="name in visitsPatientsName?.data" :key="name.id" :value="name.id">
                                {{ name.attributes.firstname + ' ' + name.attributes.lastname }}
                            </option>
                        </select>
                        <div class="inline-flex justify-between items-center w-full" v-if="patientChosen">
                            <div class="inline-flex justify-between items-center gap-2">
                                <img src="../assets/images/user.svg" alt="user">
                                <p>{{patientChosen}}</p>
                            </div>
                            <img src="../assets/images/close.svg" alt="" @click="patientChosen=''">
                        </div>
                        <input v-if="visitById" type="date" :value="formatedDate(visitById.data.attributes.date)" @change="evt=>visitTemplate.data.date=evt.target.value" required placeholder="Selectionnez une date" class="my-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        <input v-else type="date" value="02/03/2024" @change="evt=>visitTemplate.data.date=evt.target.value" required placeholder="Selectionnez une date" class="my-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div class="notes">
                        <textarea v-if="visitById" v-model="visitById.data.attributes.note" cols="60" required  rows="10" placeholder="saisissez une note" class="w-full notes__content">
                        </textarea>
                        <textarea v-else name="" id="" cols="60" v-model="visitTemplate.data.note" required  rows="10" placeholder="saisissez une note" class="w-full notes__content">
                           
                        </textarea>
                    </div>
                
                    <div>
                        <p class="">Lieu de rendez-vous</p>
                        <div class="inline-flex gap-8">
                            <div>
                                <input type="radio"  id="home" name="place" :checked="visitById?.data.attributes.at_home===true" @click="evt=>console.log(evt.target.value)" @change="evt=>visitTemplate.data.at_home=true">
                                <label for="home">A domicile</label>
                            </div>
                    
                            <div>
                                <input type="radio"  id="hospital" name="place" :checked="visitById?.data.attributes.at_home===false" @click="evt=>console.log(evt.target.value)" @change="evt=>visitTemplate.data.at_home=false">
                                <label for="hospital">Au cabinet</label>
                            </div>
                        </div>
                
                    </div>
                </form>
            </template>
            <template #footer>
                <div class="inline-flex justify-center items-center gap-4">
                    <p @click="showModalAddVisit=false" class="cursor-pointer">Annuler</p>
                     <p class="px-3 py-2 bg-slate-600 text-white cursor-pointer" @click="handleSubmit">Créer</p>
                </div>
            </template>
        </TheModal>
      
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