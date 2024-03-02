<script setup>
import TheModal from '@/components/TheModal.vue';
import NavVue from '@/components/navVue.vue';
import api from '../services/api.service'
import { onMounted, ref } from 'vue';

const showModalVisit = ref(false);

const patientsList = ref();
onMounted(async () => {
    try {
        const data = await api.patientsList();
        patientsList.value = data.data;
    } catch (error) {
        console.error('Erreur lors du chargement des patients:', error);
    }
});
</script>

<template>

    <div class="body">
        <NavVue />
        <main class="dashboard">
            <div>
                <input placeholder="Recherche"/>

                <div>
                    <select>
                        <option value="" selected>Lieu</option>
                        <option value="true">Maison</option>
                        <option value="false">Hôpital</option>
                    </select>

                    <select>
                        <option value="" selected>Date</option>
                        <option value="true">Maison</option>
                        <option value="false">Hôpital</option>
                    </select>

                    <select>
                        <option value="" selected>Ville</option>
                        <option value="true">Maison</option>
                        <option value="false">Hôpital</option>
                    </select>

                    <p class="text-3xl px-1 py-1" @click="showModalVisit=true">+</p>
                </div>
            </div>
        </main>
        <TheModal >
            <template #header >
                Créer un rendez-vous
            </template>
            <template #body>
                <select>
                    <option value="">Sélectionner un patient</option>
                    <option v-for="patient in patientsList" :key="patient">
                        {{ patient.attributes.firstname + ' ' + patient.attributes.lastname }}
                    </option>
                </select><br>
                <input type="date" />

                <textarea rows="10" placeholder="Saisissez une note"></textarea><br>
                <p>Lieu du rendez-vous</p>
                <div class="inline-flex gap-5">
                    <div>
                        <input type="radio" />
                        <label>Au Cabinet</label>
                    </div>
                    <div>
                        <input type="radio" />
                        <label>A domicile</label>
                    </div>
                </div>
            </template>
            <template #footer>
                <div>
                    <p @click="showModalVisit=false">Annuler</p>
                    <p class="px-1 py-1.5">Créer</p>
                </div>
            </template>
        </TheModal>
    </div>

</template>