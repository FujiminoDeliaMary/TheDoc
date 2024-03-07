<script setup>
import useAuth from '@/composables/useAuth';
import { useForm } from '@/composables/useForm';
import { ref } from 'vue';

    const form = ref({
        "username": "",
        "email": "",
        "password": ""
    })

    const formValidator = ref({
        "username": "",
        "email": "",
        "password": "",
        "confirmPassword": ""
    })

    const [, formErrors, validateForm] =  useForm({
                              form: formValidator.value,
                              descriptor: {
                                  username : {
                                    type: 'string',
                                    required: true
                                  },
                                  email: [
                                  {
                                    type: 'email',
                                    message: 'Saisissez une adresse valide'
                                  },
                                  {
                                    required: true,
                                    message: 'Email requis'
                                  }
                                ],
                                
                                    password:{
                                      type:'string',
                                      required:true,
                                      message: 'Mot de passe requis'
                                    },
                                    confirmPassword: [
                                      {
                                        type: 'string',
                                        required: true,
                                        message: 'Mot de passe requis'
                                      },
                                      {
                                        validator(rule, value) {
                                          return value === formValidator.value.password
                                        },
                                        message: 'Les mots de passe ne sont pas identiques'
                                      }
                                    ]
                                
                              }}
);


    const{signUp} = useAuth(form);

   
    const handleSignUp = async() => {
        try{
            formErrors.value = {};
            validateForm();
      
            if (Object.keys(formErrors.value).length > 0) {
            console.log('Des erreurs ont été trouvées', formErrors.value);
            } else {
                for (const key in formValidator.value) {
                    if (key !== 'confirmPassword') {
                        form.value[key] = formValidator.value[key];
                    }
                }
                await signUp(form);
        }
         
        }catch(error){
            console.error(error)
        }
     
    }

</script>
<template>
     <form class="flex flex-col justify-center gap-4" method="POST" @submit.prevent="handleSignUp">
        <div class="flex flex-col justify-center">
            <label>Identifiant</label>
            <input  type="text" v-model="formValidator.username"  class="bg-transparent border border-gray-300 rounded-sm"/>
            <div >
                <span class="label-text-alt text-red-500">{{formErrors.username}}</span>
            </div>
        </div >
        <div class="flex flex-col justify-center">
            <label>Adresse Email</label>
            <input  type="text" v-model="formValidator.email" class="bg-transparent border border-gray-300 rounded-sm"/>
            <div >
                <span class="label-text-alt text-red-500">{{formErrors.email}}</span>
            </div>
        </div >

        <div class="flex flex-col justify-center">
            <label>Mot de passe</label>
            <input  type="password" v-model="formValidator.password"  class="bg-transparent border border-gray-300 rounded-sm"/>
            <div >
                <span class="label-text-alt text-red-500">{{formErrors.password}}</span>
            </div>
        </div>

        <div class="flex flex-col justify-center">
            <label>Confirmation de mot de passe</label>
            <input  type="password" v-model="formValidator.confirmPassword" class="bg-transparent border border-gray-300 rounded-sm"/>
            <div >
                <span class="label-text-alt text-red-500">{{formErrors.confirmPassword}}</span>
            </div>
        </div>

        <button type="submit" class=" rounded-sm bg-cyan-600 w-fit px-10 py-2 mx-auto rounded-s text-white">S'enregistrer</button>
    </form>
</template>