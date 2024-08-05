<template>
  <div class="form__title__container">
    <ArrowForward />
    <h3>{{ props.title }}</h3>
  </div>
</template>

<script setup>
import ArrowForward from '@/assets/svg/ArrowForward.vue';

const props = defineProps({
  title: { type: String, default: null, required: false }
});
</script>

<style lang="scss">
@import "@/styles/index";

.form__title__container {
  @include flex-row-start;
  @include sub-title-2;
  gap: 4px;
  width: 100%;
  padding-bottom: 4px;
}
</style>
