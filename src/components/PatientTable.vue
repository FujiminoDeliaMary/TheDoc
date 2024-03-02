<script setup>

</script>

<template>
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
                        <RouterLink class="btn btn-primary"  :to="{ name: 'patient', params: { id:patient.id }}">
                            <td class="whitespace-wrap px-6 py-4 font-medium">
                                {{ patient.attributes.firstname + ' ' + patient.attributes.lastname }}
                            </td>
                        </RouterLink  >
                        <td class="whitespace-nowrap px-6 py-4 font-medium">{{ formatDate(patient.attributes.createdAt)  }}</td>
                        <td class="whitespace-wrap px-6 py-4 w-3/5 font-medium">{{ patient.attributes.notes }}</td>
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                            <img src="../assets/images/EyeeyeIcon.png" alt="">
                        </td> 
                    </tr>
                </tbody>
        </table>
</template>