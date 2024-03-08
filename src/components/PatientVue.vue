<script setup>
    import { onMounted, ref } from 'vue';
    import navVue from './navVue.vue';
    import api from '../services/api.service';
    import apiPost from '../services/post.service'
    import { useRoute } from 'vue-router';
import TheModal from './TheModal.vue';
import { formatDate } from '@/composables/format';


    
    const { params } = useRoute();
    const patientId = params.id;

    const showModalVisit= ref(false);
    const showModalTreatment= ref(false);
    const showModalDocument= ref(false);
    const patient = ref(null);
    const patientTemplate = ref({
        data: null
    });

    onMounted(async () => {
    try {
        const fetchedPatient = await api.patientInfo(patientId);
        patient.value = fetchedPatient.data; 
        patientTemplate.value.data = {...fetchedPatient.data.attributes,  documents:fetchedPatient.data.attributes.documents.data?.map(p=> p.id) || [], visits:fetchedPatient.data.attributes.visits.data?.map(p=> p.id) || []};
        console.log('patientTemplate', patientTemplate.value)
        console.log('patient', patient.value);
    } catch (error) {
        console.error('Error fetching patient info:', error);
    }
    });


    const columns = ref([
        {
            "name": "gender",
            "label": "Genre"
        },
        {
            "name": "height",
            "label": "Taille"
        },
        {
            "name": "weight",
            "label": "Poids"
        },
        {
            "name": "social_number",
            "label": "Numéro Sécu"
        },
        {
            "name": "bloodgroup",
            "label": "Groupe Sanguin"
        },
        
    ]);

        const file=ref(null);

        function handleFileChange(event) {
            if (event.target.files.length > 0) {
                file.value = event.target.files[0]; 
                console.log(file.value);
            }
        }

        function handleFileSubmit(){
            console.log('showModalDocument', showModalDocument.value);
            apiPost.postDocument(file.value)
            .then((response) => {
                console.log(response)
                showModalDocument.value = false; // Fermer la modal après la soumission
                patientTemplate.value.data.documents.push(response[0].id);
                apiPost.ModifierPatient(patient.value.id, patientTemplate.value)
           
            })
            .catch(error => {
                console.error('Erreur lors de la soumission du document:', error);
            });
        }

        const treatment = ref({
            id: 0,
            drug: null,
            repeats: null,
            days: null
        })

        function handleTreatmentSubmit(){
        const newTreatment = {...treatment.value}
        patientTemplate.value.data.treatments.push(newTreatment)
        apiPost.ModifierPatient(patient.value.id, patientTemplate.value)
    }

   
</script>


<template>
    <div class="body">
        <navVue />
        <main class="dashboard flex" v-if="patient">
            <section class="personnalsInfo ">
                <article class="informations">
                    <h1 class="text-lg text-center font-bold">{{patient.attributes.firstname + ' ' + patient.attributes.lastname}}</h1>
                    <div class="flex gap-5">
                        <div >
                           
                            <div v-for="column in columns" :key="column">
                                <p>   {{ column.label }}</p>
                             
                            </div>
                            
                        </div>
                        <div>
                            <p>{{ patient.attributes.gender }}</p>
                            <p>{{ patient.attributes.height }}</p>
                            <p>{{ patient.attributes.weight }}</p>
                            <p>{{ patient.attributes.social_number }}</p>
                            <p>{{ patient.attributes.bloodgroup }}</p>
                        </div>
                    </div>
                </article>

                <article class="notes px-7 py-4">
                    <h2 class="text-lg text-left font-bold mx-4">Notes</h2>
                    <p class="notes__content my-3">
                        {{patient.attributes.notes===null ? 'Aucune note entregistrée' : patient.attributes.notes}}
                    
                    </p>
                </article>
            </section>

            <section class="archives">
                <ul class="flex gap-5 ">
                    <button class="archives__link" >Créer un rendez-vous</button>
                    <button class="archives__link" @click="showModalTreatment=true">Ajouter un traitement</button>
                    <button class="archives__link" @click="showModalDocument=true">Ajouter un document</button>
                    <RouterLink :to="{ name:'editPatient' , params :{id:patientId}}"><button class="archives__link">Modifier</button></RouterLink>
                    
                </ul>
                <table class="table-auto min-w-full text-left text-sm font-light mt-12">
                    <caption class="text-left text-lg font-bold border-b dark:border-neutral-500 py-3">Documents</caption>
                    <thead>
                        <tr class="border-b dark:border-neutral-500">
                            <th>Nom</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody v-if="patient?.attributes?.documents?.data?.length > 0">
                        <tr v-for="document in patient.attributes.documents.data" :key="document" class="border-b dark:border-neutral-500">
                            <td class="py-2"> {{ document.attributes.name }} </td>
                            <td class="py-2">{{ document.attributes.mime.split('/')[1] }}</td>
                            <td class="py-2"> {{ formatDate(document.attributes.createdAt) }} </td>
                            <td class="py-2"> <a :href= "`http://localhost:1337${document.attributes.url}`" target="_blank"  download="document.pdf"><img src="../assets/images/download.svg" alt="voir plus" ></a></td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <td colspan="3">Aucun Document pour l'instant</td>
                    </tbody>
                </table>

                <table class="table-auto min-w-full text-left text-sm font-light mt-12">
                    <caption class="text-left text-lg font-bold border-b dark:border-neutral-500 py-3">Traitements</caption>
                    <thead>
                        <tr class="border-b dark:border-neutral-500">
                            <th>Médicament</th>
                            <th>Répétition</th>
                            <th>Durée</th>
                        </tr>
                    </thead>
                    <tbody v-if="patient?.attributes?.treatments?.length > 0">
                        <tr class="border-b dark:border-neutral-500" v-for="treatment in patient.attributes.treatments" :key="treatment">
                            <td>{{ treatment.drug }}</td>
                            <td>{{ treatment.repeats }}</td>
                            <td>{{ treatment.days }}</td>
                        </tr>
                    </tbody>
                    <tbody v-else class="flex justify-center items-center text-center">
                        <td colspan="3" class="flex justify-center items-center text-center">Aucun traitement pour l'instant</td>
                    </tbody>
                </table>

                <table class="table-auto min-w-full text-left text-sm font-light mt-12">
                    <caption class="text-left text-lg font-bold border-b dark:border-neutral-500 py-3">Rendez-vous</caption>
                    <thead >
                        <tr class="border-b dark:border-neutral-500">
                            <th>Date</th>
                            <th>Notes</th>
                            <th>Lieu</th>
                        </tr>
                    </thead>
                    <tbody v-if="patient?.attributes?.visits?.data?.length > 0">
                        <tr class="border-b dark:border-neutral-500" v-for="visit in patient.attributes.visits.data" :key="visit" >
                            <td>{{ formatDate(visit.attributes.date) }}</td>
                            <td>{{ visit.attributes.note }}</td>
                            <td >
                                <img src="../assets/images/home_alt.svg" v-if="visit.attributes.at_home"/>
                                <img v-else src="../assets//images/health.png"/>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <td colspan="3" class="flex justify-center items-center">Aucun rendez-vous pour l'instant</td>
                    </tbody>
                </table>
            </section>
            <TheModal :showModal="showModalDocument" @close="showModalDocument = false">
                <template #header>
                    Ajout d'un document
                </template>
                <template #body>
                    <form action="">
                          <input type="file" placeholder="Ajoutez un fichier" require @change="handleFileChange"/>
                    </form>
                  
                </template>
                <template #footer>
                    <button class="px-3 py-2 bg-slate-600 text-white" @click="showModalDocument=false">Annuler</button>
                    <button class="px-3 py-2 bg-slate-600 text-white" @click="handleFileSubmit">Ajouter</button>
                </template>
            </TheModal>

            <TheModal :showModal="showModalTreatment" @close="showModalTreatment = false">
                <template #header>
                    Ajouter un traitement
                </template>
                <template #body>
                    <form action="" class="form flex-col gap-5">
                        <div>
                            <label for="medicament" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Médicament</label>
                            <select name="medicament" v-model="treatment.drug" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Choisir</option>
                                    <option value="Paracetamol">Paracetamol</option>
                                    <option value="Spasfon">Spasfon</option>
                                    <option value="Efferalgan">Efferalgan</option>
                                    <option value="Toplexil">Toplexil</option>
                                    <option value="Magne B6">Magne B6</option>
                            </select>
                        </div><br>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Répétition</label>
                            <select name="repetition" v-model="treatment.repeats" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Choisir</option>
                                    <option value="Matin">Matin</option>
                                    <option value="Midi">Midi</option>
                                    <option value="soir">Soir</option>
                            </select>
                        </div><br>

                        <div>
                            <label for="jours" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jours</label>
                            <input type="number" v-model="treatment.days" min="0" name="jour"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>

                          
                    </form>
                  
                </template>
                <template #footer>
                    <button class="px-3 py-2 bg-slate-600 text-white" @click="showModalTreatment=false">Annuler</button>
                    <button class="px-3 py-2 bg-slate-600 text-white" @click="handleTreatmentSubmit">Ajouter</button>
                </template>
            </TheModal>
        </main>
    </div>
</template>