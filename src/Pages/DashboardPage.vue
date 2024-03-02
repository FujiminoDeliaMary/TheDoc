<script setup>
    import navVue from '@/components/navVue.vue';
    import { formatDate } from '@/composables/format';
    import api from '../services/api.service';
    import { onMounted, ref } from 'vue';
const patients = ref();
    

onMounted(async () => {
    try {
      
        const data = await api.patientsList();
        patients.value = data.data; 
        console.log(patients.value);
    } catch (error) {
        console.error('Erreur lors du chargement des patients:', error);
    }
});


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
                    <p class="visits__number bg-dark underline">3 Rendez-vous aujourd'hui</p>
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
                    
                    <RouterLink to="/createPatient"><p class="visits__action">Créer un patient</p></RouterLink>
                    <p class="visits__action">Créer un rendez-vous</p>
                </article>
            </section>

            <table class="table-auto min-w-full text-left text-sm font-light mt-12">
                <caption class="caption text-left text-lg capitalie font-medium whitespace-nowrap">
                    Les derniers patients
                </caption>
                <thead>
                    <tr>
                        <th scope="col" class="px-6 py-4">Nom</th>
                        <th scope="col" class="px-6 py-4">Date</th>
                        <th scope="col" class="px-6 py-4 w-1/4">Notes</th>
                        <th scope="col" class="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody >
                  
                    <tr v-for=" patient in patients" :key="patient" class="border-b dark:border-neutral-500">
      
                        <td class="whitespace-wrap px-6 py-4 font-medium">
                            {{ patient.attributes.firstname + ' ' + patient.attributes.lastname }}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4 font-medium">{{ formatDate(patient.attributes.createdAt)  }}</td>
                        <td class="whitespace-wrap px-6 py-4 w-3/5 font-medium">{{ patient.attributes.notes }}</td>
                        <RouterLink class="btn btn-primary"  :to="{ name: 'patient', params: { id:patient.id }}">
                            <td class="whitespace-nowrap px-6 py-4 font-medium">
                                <img src="../assets/images/EyeeyeIcon.png" alt="">
                            </td> 
                        </RouterLink  >
                    </tr>
                </tbody>
            </table>

            
        </main>
    </div>
</template>

<style lang="scss">



</style>