<script setup>
    import { ref } from 'vue';
    import TheModal from './TheModal.vue';
     const showModalLogOut= ref(false);
     const router = useRouter();
     import useAuth from '@/composables/useAuth';
     import { useRouter } from 'vue-router';

     const {logout} = useAuth();

     const handleLogout = async() => {

        try{
            await logout();
            router.push('/')
        }catch(error){
            console.error('Erreur : ', error)
        }
     }

     const openNav = ref(false);
</script>

<template>
          <nav class="nav" @click="openNav=!openNav" :class="{'open': openNav}">
            <ul class="nav__list" >
               
                    <li>
                        <RouterLink to="/dashboard">
                            <div className="name">
                                <img src="../assets/images/health.png" alt="">
                                <h1 >ledoc</h1>
                            </div>
                        </RouterLink>
                    </li>
              
         
                    <li>
                        
                        <RouterLink  to="/dashboard" :active="isActive">
                            <div class="flex gap-2">
                                <img src="../assets/images/dashboardIcon.svg" alt=""/>
                                <p class="text-white font-bold">Dashboard</p>
                            </div>
                        </RouterLink>
                    </li>
               
           
                    <li>
                        <RouterLink  to="/patients">
                            <div class="flex gap-2">
                                <img src="../assets/images/patientsIcon.svg" alt=""/>
                                <p class="text-white font-bold">Patients</p>
                            </div>
                         </RouterLink>
                    </li>
       
              
                    <li>
                        <RouterLink to="/visits">
                            <div class="flex gap-2">
                                <img src="../assets/images/visitsIcon.svg" alt=""/>
                                <p class="text-white font-bold">Rendez-vous</p>
                            </div>
                        </RouterLink>
                    </li>
            
  
                    <li class="nav__setting">
                        <div class="flex flex-col gap-3 self-end">
                            <img src="../assets/images/paramIcon.svg" alt="Paramètres"/>
                            <img src="../assets/images/Turn off.svg" alt="Se déconnecter" @click="showModalLogOut=true">
                        </div>
                        
                    </li>
        
            </ul>
        </nav>
        <TheModal :showModal="showModalLogOut">
            <template #header>
                Déconnexion
            </template>
            <template #body>
                <p>Vous êtes surs de vouloir vous déconnecter ?</p>
            </template>
            <template #footer>
                <div class="flex gap-3 justify-center items-center">
                    <p class="cursor-pointer px-3 py-2 bg-slate-600 text-white" @click="handleLogout">Se déconnecter</p>
                    <p @click="showModalLogOut=false" class="cursor-pointer">Annuler</p>
                </div>
              
            </template>
        </TheModal>
</template>