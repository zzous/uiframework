<template>
  <div class="form-row__item">
    <label for="" class="form-row__item__label">
      {{ props.label }}
      <span v-if="props.required" class="form-row__item__label__required">&nbsp;*</span>
    </label>
    <div class="form-row__item__content">
      <slot/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {type: String, default: '', required: true, description: 'label 텍스트'},
  required: {type: Boolean, default: false, required: false, description: 'label 텍스트'}
});
</script>

<style lang="scss">
@import '@/styles/index';

$strato__write-mode__height: 66px;
$strato__read-mode__height: 40px;
$strato__form-row__write-mode__label-width: 170px;
$strato__form-row__read-mode__label-width: 110px;

.v-form .form-row__item:after {
  content: '';
  position: absolute;
  top: 0;
  width: 170px;
  height: 100%;
  background-color: $strato__gray__100;
}

.form-row__item {
  @include flex-row-start;
  flex: 1 1 100%;
  height: auto;

  .form-row__item__label {
    @include flex-row-start;
    @include sub-title-3;
    flex: 1 1 $strato__form-row__read-mode__label-width;
    width: 100%;
    height: 100%;
    min-height: $strato__read-mode__height;
    padding: 5px 10px;
    z-index: 1;
  }

  .form-row__item__label__required {
    color: $strato__error__color;
  }

  .form-row__item__content {
    @include element-2;
    @include flex-row-start;
    flex: 1 1 calc(100% - $strato__form-row__read-mode__label-width);
    height: 100%;
    min-height: $strato__read-mode__height;
    padding: 5px 10px;
  }
}

.v-form .form-row__item {

  .form-row__item__label {
    min-height: $strato__write-mode__height;;
    flex: 1 1 $strato__form-row__write-mode__label-width;
    padding: 18px 20px;
  }

  .form-row__item__content {
    min-height: $strato__write-mode__height;
    flex: 1 1 calc(100% - $strato__form-row__write-mode__label-width);
    padding: 18px 20px;
  }
}
</style>
