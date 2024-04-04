<script setup>

    import { ref, computed } from 'vue';
    import TabLogin from '@/components/TabLogin.vue';
    import TabSignup from '@/components/TabSignup.vue';

    const currentTab = ref ('login');

    const currentTabComponent = computed(() => {
    return currentTab.value === 'login' ? TabLogin : TabSignup;
    });

    

</script>

<template>

    <div class="flex flex-col justify-center items-center py-5">
       
            <div class="flex flex-col justify-center items-center px-32 header" >
                <img src="../assets/images/health.png" alt="" class="w-16">
                <p class="text-white text-m">LE Doc</p>
            </div>
    
        <div class="content w-96 flex flex-col justify-center items-center">
            <div class="tabs flex w-full">
                <button
                    class="tab-button px-3 py-2 basis-1/2"
                    :class="{ 'active': currentTab === 'login' }"
                    @click="currentTab = 'login'"
                >
                    Se connecter
                </button>
                <button
                    class="tab-button px-3 py-2 bg-gray basis-1/2"
                    :class="{ 'active': currentTab === 'signup' }"
                    @click="currentTab = 'signup'"
                >
                    S'inscrire
                </button>
            </div>
            <div class="tab-content bg-white w-80 my-4">
                 <component :is="currentTabComponent"></component>
            </div>
        </div>

    </div>
</template>

<style>
    .active{
        background-color: rgba(217, 217, 217, 0.75);
    }

    .header{
        background-color: rgba(32, 41, 90, 1);
        border-radius: 5px;
    }

    .content{
        margin-top:2rem;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

   
</style>