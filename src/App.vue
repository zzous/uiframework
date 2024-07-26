<template>
  <div class="wrap">
    <RouterView />
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>


<style lang="scss">
@import './src/styles/common';
@import './src/styles/component';

@import '@/styles/fonts/MaterialIcons.css';
@import '@/styles/fonts/materialdesignicons.css';
@import '@/styles/fonts/MaterialIcons_outlined.css';
@import '@/styles/fonts/MaterialIconsRound.css';
</style>