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
        <div class="flex flex-col justify-center items-center bg-slate-900 px-16">
            <img src="../assets/images/health.png" alt="" class="w-16">
            <p class="text-white text-m">LE Doc</p>
        </div>
    

            <div class="tabs">
                <button
                    class="tab-button px-3 py-2 bg-slate-50"
                    :class="{ 'active': currentTab === 'login' }"
                    @click="currentTab = 'login'"
                >
                    Se connecter
                </button>
                <button
                    class="tab-button px-3 py-2 bg-gray"
                    :class="{ 'active': currentTab === 'signup' }"
                    @click="currentTab = 'signup'"
                >
                    S'inscrire
                </button>
            </div>
            <div class="tab-content bg-white">
                 <component :is="currentTabComponent"></component>
            </div>
        </div>

    
</template>