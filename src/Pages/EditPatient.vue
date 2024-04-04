<script setup>
    import { onMounted, ref } from 'vue';
    import navVue from '../components/navVue.vue';
    import api from '../services/api.service';
    import apiPost from '../services/post.service'
    import { useRoute } from 'vue-router';
    import TheModal from '../components/TheModal.vue';
    import { addtreatment, addFile } from '@/composables/useAdd';
    import { formatDate } from '@/composables/format';


    const showModalVisit= ref(false);
    const showModalTreatment= ref(false);
    const showModalDocument= ref(false);


    const patient = ref(null);
    const { params } = useRoute();
    const patientId = params.id;

    const patientTemplate = ref({
            "data": {
       
            }
    });

    const treatment = ref({
        id: 0,
        drug: null,
        repeats: null,
        days: null
    });

    const documents = ref([])


    const handleTreatmentSubmit = () => {
        addtreatment(treatment, patientTemplate, patientId);
        console.log('patient', patient.value);
        console.log('patientTemplate', patientTemplate.value);
    }

    function handleFileChange(event) {
        if (event.target.files.length > 0) {
            documents.value.push(event.target.files[0]);
            console.log('doc : ', documents.value)
            console.log("taille", documents.value.length)
            console.log('showModalDocument', showModalDocument.value);
        }
    }

    const handleFileSubmit = () => {
        addFile(documents, patientTemplate, showModalDocument, patientId);
        console.log('patient', patient.value);
        console.log('patientTemplate', patientTemplate.value);
    }

onMounted(async () => {
    try {
        const fetchedPatient = await api.patientInfo(patientId);
        patient.value = fetchedPatient.data;
        patientTemplate.value.data = {...fetchedPatient.data.attributes, documents:fetchedPatient.data.attributes.documents.data?.map(p=> p.id) || [], visits:fetchedPatient.data.attributes.visits.data?.map(p=> p.id) || []};
        console.log('patient', patient.value);
        console.log('patientTemplate', patientTemplate.value);
    } catch (error) {
        console.error('Error fetching patient info:', error);
    }
    });


    const handleSubmit = () => {
        apiPost.ModifierPatient(patientId, patientTemplate.value)
        console.log(patientTemplate.value);
        console.log(Date.now())
    }


</script>


<template>
    <div >
     
        <main class="dashboard flex" v-if="patient">
            <section class="personnalsInfo">
                
                <form class="flex-inline flex-col gap-10" @submit.prevent="handleSubmit">
                    <input  v-model="patientTemplate.data.lastname" required class="block w-full p-2 rounded-lg bg-gray-50 sm:text-s dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 border border-gray-300" />
                    <br>
                    <input placeholder="Prénom du patient" v-model="patientTemplate.data.firstname" required class="block w-full p-2 rounded-lg bg-gray-50 sm:text-s dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 border border-gray-300" />
                    <br>
                    <div class="inline-flex flex-col">
                        <label>Genre</label>
                        <select v-model="patientTemplate.data.gender" placeholder="Selectionner un genre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" selected required>Selectionner un genre</option>
                            <option value="F">Femme</option>
                            <option value="M">Homme</option>
                            <option value="NA">NA</option>
                        </select>
                    </div>

                    <div class="inline-flex gap-10">
                        <div class="inline-flex flex-col">
                            <label>Taille</label>
                            <input type="number" min="0" required v-model="patientTemplate.data.height" class="block w-full p-2 rounded-lg bg-gray-50 sm:text-s dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 border border-gray-300"/>
                        </div>
                        <div>
                            <label>Poids</label>
                            <input type="number" v-model="patientTemplate.data.weight" required min="0" class="block w-full p-2 rounded-lg bg-gray-50 sm:text-s dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 border border-gray-300"/>
                        </div>
                    </div>

                    <div class="inline-flex flex-col">
                        <label>Groupe Sanguin</label>
                        <select placeholder="Groupe sanguin " v-model="patientTemplate.data.bloodgroup" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="A négatif">A négatif</option>
                            <option value="B négatif">B négatif</option>
                            <option value="O négatif">O négatif</option>
                            <option value="AB négatif">AB négatif</option>
                            <option value="A positif">A positif</option>
                            <option value="B positif">B négatif</option>
                            <option value="O positif">O négatif</option>
                        </select><br>
                    </div>
                    <div>
                        <label>Street</label>
                        <input type="text" v-model="patientTemplate.data.address.street" required class="block w-full p-2 rounded-lg bg-gray-50 sm:text-s dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 border border-gray-300"/>
                    </div>
                    <div>
                        <label>City</label>
                        <input type="text" v-model="patientTemplate.data.address.city" required class="block w-full p-2 rounded-lg bg-gray-50 sm:text-s dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 border border-gray-300"/>
                    </div>
                    <div>
                            <label>zipcode</label>
                            <input type="text" v-model="patientTemplate.data.address.zipcode" required class="block w-full p-2 rounded-lg bg-gray-50 sm:text-s dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 border border-gray-300"/>
                        </div>
                    <div>
                        <label>Saisissez le N de sécurité social</label>
                        <input type="number" v-model="patientTemplate.data.social_number" required class="block w-full p-2 rounded-lg bg-gray-50 sm:text-s dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 border border-gray-300"/>
                      
                    </div>
             
                </form>
                <div class="notes px-3 py-2">
                    <p>Notes</p>
                    <textarea id="message" rows="4" v-model="patientTemplate.data.notes" required class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Notes..."></textarea>
                </div>
            </section>
            <section class="archives">
                
                <!-- Boutons de navigation here !!!! -->
                <ul class="flex gap-5 ">

                    <button class="archives__link" @click="showModalTreatment=true">Ajouter un traitement</button>
                    <button class="archives__link" @click="showModalDocument=true">Ajouter un document</button>
                    <RouterLink :to="{ name : 'patient', params: {id: patientId}}"><button class="archives__link bg-pink-400" >Annuler</button></RouterLink>
                    <button class="archives__link bg-blue-100 " @click="handleSubmit">Enregistrer</button>
                    
                </ul>
                <table class="table-auto min-w-full text-left text-sm font-light mt-12">
                <caption class="text-left text-lg font-bold border-b dark:border-neutral-500 py-3">Documents</caption>
                <thead>
                    <tr class="border-b dark:border-neutral-500">
                        <th>Nom</th>
                        <th>Type</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody v-if="patient?.attributes?.documents?.data?.length === 0">
                        <p>Aucun Document pour le moment</p>
                    </tbody>
                    <tbody v-else>
                        <tr v-for="document in patient?.attributes?.documents?.data" :key="document">
                            <td> {{ document.attributes.name }} </td>
                            <td>{{ document.attributes.mime.split('/')[1] }}</td>
                            <td> {{ formatDate(document.attributes.updatedAt) }} </td>
                    </tr>
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
                <tbody v-if="patientTemplate.data.treatments?.length === 0">
                        <p>Aucun traitement pour le moment</p>
                    </tbody>
                    <tbody v-else>
                        <tr v-for="treatment in patientTemplate.data.treatments" :key="treatment">
                            <td>{{ treatment.drug }}</td>
                            <td>{{ treatment.repeats }}</td>
                            <td>{{ treatment.days }}</td>
                        </tr>
                    </tbody>
            </table>
            </section>
        </main>
        <TheModal :showModal="showModalDocument" @close="showModalDocument = false">
            <template #header>
                Ajout d'un document
            </template>
            <template #body>
                <form action="">
                      <input type="file" placeholder="Ajoutez un fichier" required @change="handleFileChange"/>
                </form>
              
            </template>
            <template #footer>
                <button class="px-3 py-2 bg-slate-600 text-white" @click="showModalDocument=false">Annuler</button>
                <button class="px-3 py-2 bg-slate-600 text-white" @click="handleFileSubmit" >Ajouter</button>
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
                        <label for="jours"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jours</label>
                        <input type="number" v-model="treatment.days" min="0" name="jour"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>

                      
                </form>
              
            </template>
            <template #footer>
                <button class="px-3 py-2 bg-slate-600 text-white" @click="showModalTreatment=false">Annuler</button>
                <button class="px-3 py-2 bg-slate-600 text-white" @click="handleTreatmentSubmit">Ajouter</button>
            </template>
        </TheModal>

    </div>  
</template>