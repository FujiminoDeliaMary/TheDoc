<script setup>
import { ref } from 'vue';
import useAuth from '../composables/useAuth'

    const form = ref({
        "identifier":'',
        "password":''
    })

    
const{isAuthentificated, login, logout} = useAuth(form);

const handleLogin = async() =>{
    console.log("oh");
    
    try{
       await login()
    }catch(error){
        console.error(error)
    }
}

</script>

<template>
    <form class="flex flex-col justify-center gap-4" method="POST" @submit.prevent="handleLogin">
        <div class="flex flex-col justify-center">
            <label>Identifiant</label>
            <input  type="text" v-model="form.identifier"  class="bg-transparent border border-gray-300 rounded-sm"/>
            <!-- <p class="text-red">Identifiant invalide</p> -->
        </div >
        <div class="flex flex-col justify-center">
            <label>Mot de passe</label>
            <input  type="text" v-model="form.password" class="bg-transparent border border-gray-300 rounded-sm"/>
            <!-- <p class="text-red">Mot de passe invalide</p> -->
        </div>

        <button type="submit" class=" rounded-sm bg-cyan-600">Se connecter</button>
    </form>
</template>