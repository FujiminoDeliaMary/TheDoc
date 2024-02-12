<script setup>
import navVue from '@/components/navVue.vue';
</script>

<template>
    <navVue />
    <main>
        <div class="options">
            <form>
                 <input type="text" placeholder="Recherche"/>
            </form>

            <div>
                <form>
                    <select>
                        <option value="date" >Date</option>
                        <option value="nom" >Nom</option>
                    </select>
                </form>

                <p>+</p>
            </div>
        </div>
        <table>
            <caption>
                Les derniers patients
            </caption>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Date</th>
                    <th>Téléphone</th>
                    <th>Notes</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </main>
      
  
</template>