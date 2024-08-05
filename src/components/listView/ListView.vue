<template>
  <div class="list-view__container">

    <div class="list-view__header">

      <div class="list-view__header__title">
        <ListTitleSvg/>
        <slot v-if="slot?.title" name="title"/>
        <span v-else>{{ pageTitle }}</span>
        <span v-if="props.listCount">({{ props.listCount }})</span>
      </div>

      <div v-if="slot['button-group']" class="list-view__header__button__container">
        <slot name="button-group"/>
      </div>

    </div>

    <div class="list-view__divider"/>

    <div class="list-view__content">

      <div v-if="slot['search-area']" class="list-view__content__search-area">

        <div class="list-view__content__search-area__input__wrapper">
          <slot name="search-area"/>
        </div>

        <div class="list-view__content__search-area__date">
          <p v-if="props.lastDate">마지막 업데이트 : {{ props.lastDate }}</p>
          <button type="button" @click="onRefresh"><ChangeCircleSvg/></button>
        </div>

      </div>

      <slot name="content"/>

    </div>

  </div>
</template>

<script setup>
import {useSlots, computed} from 'vue';
import {ChangeCircleSvg, ListTitleSvg} from '@/assets/svg/index.js';
import {useRoute} from 'vue-router';

const props = defineProps({
  listCount: {type: [String, Number], default: null, required: false, description: '목록 요소 개수'},
  lastDate: {type: [Date, String], default: null, required: false, description: '목록 조회 시간'}
});

const slot = useSlots();
const { meta, name } = useRoute();


const emits = defineEmits(['onRefresh']);

const pageTitle = computed(() => {
  if (meta?.title) { return meta.title; }
  return name;
});

const onRefresh = () => { emits?.('onRefresh'); };




</script>
<style lang="scss">
@import '@/styles/index';

.list-view__container {
  width: 100%;

  .list-view__header {
    @include flex-row-between;
    min-height: 46px;

    .list-view__header__title {
      @include flex-row-start;
      gap: 10px;
      @include heading-5;
    }

    .list-view__header__button__container { @include flex-row-center; gap: 10px; }
  }
  .list-view__divider {
    width: 100%; height: 1px;
    margin: 12px 0;
    background-color: $strato__gray__400;
  }

  .list-view__content__search-area {
    @include flex-row-between;
    align-items: flex-start;
    width: 100%;
    min-height: 40px;

    .list-view__content__search-area__input__wrapper {
      min-width: 650px;
    }

    .list-view__content__search-area__date {
      @include flex-row-center;
      @include element-2;
      gap: 10px;
      height: 40px;

      button { @include flex-col-center; }
    }
  }

  .list-view__content {
    @include flex-col-start; gap: 10px;
    & > div { width: 100%; }
  }
}

</style>
