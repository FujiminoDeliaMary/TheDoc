<script setup>
    import navVue from '@/components/navVue.vue';
    import { formatDate } from '@/composables/format';
    import api from '../services/api.service';
    import { onMounted, ref } from 'vue';
    import filter from '@/services/filter.service';
    const patients = ref();
    const dataOftheDay = ref();


    const lastPatients = ref();

onMounted(async () => {
    try {
      
        const data = await api.patientsList();
        dataOftheDay.value = await filter.getAllVisitsOfToday();
        const allDates = await filter.getAllDates();
        console.log(allDates)
        console.log(dataOftheDay)
        patients.value = data.data;
        lastPatients.value = await filter.getLastPatients();
        console.log('last patients', lastPatients.value)
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
                    <p class="visits__number bg-dark "> {{ dataOftheDay?.data.length }} Rendez-vous aujourd'hui</p>
                    <div class="visit " v-for="visit in dataOftheDay?.data" :key="visit">
                        <p class="visit__hour w-min">{{ new Date(visit.attributes?.date).getUTCHours() }}:00</p>
                        <div class="visit__info">
                            <p class="visit__name">{{ visit?.patient?.data?.id+ ' ' + visit?.patient?.data?.attributes.lastname}}</p>
                            <p class="visit__dayinfo">{{visit.attributes?.note}}</p>
                        </div>
                    </div>
                </article>
                <article class="visits__actions">
                    
                    <RouterLink to="/createPatient"><p class="visits__action">Créer un patient</p></RouterLink>
                    <RouterLink to="/visits"><p class="visits__action">Créer un rendez-vous</p></RouterLink>
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
                <tbody v-if="lastPatients">
                  
                    <tr v-for=" patient in lastPatients" :key="patient" class="border-b dark:border-neutral-500">
      
                        <td class="whitespace-wrap px-6 py-4 font-medium">
                            {{ patient?.attributes.patient.data.attributes.firstname + ' ' + patient?.attributes.patient.data.attributes.lastname }}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4 font-medium">{{ formatDate(patient.attributes.date)  }}</td>
                        <td class="whitespace-wrap px-6 py-4 w-3/5 font-medium">{{ patient.attributes.note }}</td>
                        <RouterLink class="btn btn-primary"  :to="{ name: 'patient', params: { id:patient.attributes.patient.data.id }}">
                            <td class="whitespace-nowrap px-6 py-4 font-medium">
                                <img src="../assets/images/EyeeyeIcon.png" alt="">
                            </td> 
                        </RouterLink  >
                    </tr>
                </tbody>

            </table>
            <div v-if="!lastPatients" class="w-full flex justify-center items-center my-28">
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



</style>