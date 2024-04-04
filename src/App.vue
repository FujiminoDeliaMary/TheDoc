<script setup>
import { computed } from 'vue';
import Dashboard from './Pages/DashboardPage.vue'
import NavVue from './components/navVue.vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const showNav = computed(() => route.meta.showNav !== false);
const bodyClass = computed(() => route.meta.bodyClass || '');
</script>

<template>
  <div :class=bodyClass>
    <NavVue v-if="showNav" />
    <RouterView >
      
    </RouterView>
  </div>

</template>
