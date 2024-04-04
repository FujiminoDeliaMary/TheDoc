<script setup>
import Dashboard from './Pages/DashboardPage.vue'
import NavVue from './components/navVue.vue';
</script>

<template>
  <div class="body">
    <NavVue />
    <RouterView >
      
    </RouterView>
  </div>

</template>
