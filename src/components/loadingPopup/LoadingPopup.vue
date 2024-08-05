<template>
  <v-dialog v-model="isOpen" max-width="400px" persistent no-click-animation opacity="0">
    <div class="loading-popup__wrapper">
      <h5 class="loading-popup__title">Check Loading</h5>
      <div class="loading-popup__content">
        <LoadingSvg />
      </div>
      <p class="loading-popup__text">Please wait..</p>
    </div>
  </v-dialog>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { LoadingSvg } from '@/assets/svg/index.js';
import { useLoadingStore } from '@/stores/common/loadingStore.js';

const { isOpen } = storeToRefs(useLoadingStore());
</script>
<style lang="scss">
@import "@/styles/index";

.loading-popup__wrapper {
  @include flex-col-center;
  gap: 15px;
  padding: 50px 0;
  border-radius: 5px;
  height: 190px;
  background-color: $strato__background__color;
  box-shadow: 0 24px 60px 0 #00000026;

  .loading-popup__title { @include heading-5; }
  .loading-popup__content {
    height: 50px;
    svg {
      animation: rotation 0.8s linear infinite;
    }
  }
  .loading-popup__text { @include body-2; }
}
</style>
