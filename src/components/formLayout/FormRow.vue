<template>
  <FormTitle v-if="props.title" :title="props.title" />
  <div class="form-row__container">
    <slot />
  </div>
</template>

<script setup>
import FormTitle from '@/components/formLayout/FormTitle.vue';

const props = defineProps({
  title: { type: String, default: null, required: false }
});
</script>

<style lang="scss">
@import '@/styles/index';

// v-form 안에 있는 경우 레이블 배경색이 존재하고 row 높이가 좀더 높음.
.v-form {

  .form__title__container + .form-row__container { border-top: 1px solid $strato__primary__color; }

  .form-row__container:first-child { border-top: 1px solid $strato__primary__color; }

  .form-row__container {
    @include flex-row-start;
    position: relative;
    width: 100%;
    border-bottom: 1px solid $strato__gray__400;
  }

  .form-row__container ~ .form__title__container { padding-top: 14px; }
  .form-row__container + .form-row__container { margin-top: 0;}
}

.form-row__container {
  @include flex-row-start;
  position: relative;
  width: 100%;
}

.form-row__container + .form-row__container { margin-top: 4px; }

</style>
