<script setup>
import { ref } from 'vue';
import useAuth from '../composables/useAuth'
import { useRouter } from 'vue-router';
import { useForm } from '@/composables/useForm';

    const form = ref({
        "identifier":'',
        "password":''
    })

const router = useRouter();
const{isAuthentificated, login, logout} = useAuth(form);


const [, formErrors, validateForm] =  useForm({
                              form: form.value,
                              descriptor: {
                                  identifier : {
                                    type: 'string',
                                    required: true
                                  },
                                
                                password:{
                                    type:'string',
                                    required:true,
                                    message: 'Mot de passe requis'
                                }
                                
                              }}
);

const handleLogin = async() =>{
    console.log("oh");
    formErrors.value = {};
    validateForm();
    try{
       await login()
       if (Object.keys(formErrors.value).length > 0) {
            console.log('Des erreurs ont été trouvées', formErrors.value);
            } else {
                await login();
                if (!isAuthentificated?.value){
                    router.push({name:'dashboard'})
                    console.log(isAuthentificated.value)
                }
        }
      
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
            <div >
                <span class="label-text-alt text-red-500">{{formErrors.identifier}}</span>
            </div>
        </div >
        <div class="flex flex-col justify-center">
            <label>Mot de passe</label>
            <input  type="text" v-model="form.password" class="bg-transparent border border-gray-300 rounded-sm"/>
            <div >
                <span class="label-text-alt text-red-500">{{formErrors.password}}</span>
            </div>
        </div>

        <button type="submit" class=" rounded-sm bg-cyan-600 w-fit px-10 py-2 mx-auto rounded-s text-white">Se connecter</button>
    </form>
</template>