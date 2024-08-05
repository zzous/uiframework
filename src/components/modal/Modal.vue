<template>
  <v-dialog v-model="state.isOpen" :max-width="modalSize" persistent>
     <div class="modal__wrapper">

        <div v-if="state.title" class="modal__header">
          <div class="modal__header__title">{{state.title}}</div>
          <button type="button" class="modal__header__close-button" aria-label="modal close button" @click="onClose">
            <CloseSvg color="#fff" />
          </button>
        </div>

        <div class="modal__content">
          <slot name="content" />
        </div>

        <div v-if="isFooterSlot" class="modal__footer">
          <slot name="footer" />
        </div>

      </div>
  </v-dialog>
</template>
<script setup>
import {computed, reactive, useSlots} from 'vue';
import {CloseSvg} from '@/assets/svg/index.js';

const modalSizeList = {lg: '1300px', md: '960px', sm: '650px'};

const props = defineProps({
  isOpen: {type: Boolean, default: false, required: true},
  onOpen: {type: Function, default: () => {}, required: true},
  onClose: {type: Function, default: () => {}, required: true},
  title: {type: String, default: '', required: true},
  size: {type: String, default: 'md', required: false}
});
const state = reactive({
  isOpen: computed(() => props.isOpen),
  onOpen: computed(() => props.onOpen),
  onClose: computed(() => props.onClose),
  title: computed(() => props.title),
  size: computed(() => props.size)
});

const slots = useSlots();
const isFooterSlot = !!slots.footer;

const modalSize = computed(() => {
  if (Object.keys(modalSizeList).includes(props.size)) {
    return modalSizeList[props.size];
  }
  throw Error('invalid size prop');
});
</script>
<style lang="scss">
@import "@/styles/index";

.modal__wrapper {
  border-radius: 10px;
  background-color: $strato__background__color;
  overflow: hidden;

  .modal__header {
    @include flex-row-between;
    width: 100%;
    padding: 12px 20px;
    background-color: $strato__primary__color;

    .modal__header__title {
      @include sub-title-1;
      color: #fff;
    }
    .modal__header__close-button { @include flex-col-center; }
  }

  .modal__content { padding: 30px 30px 30px 30px; }
  .modal__footer {
    @include flex-row-center;
    gap: 10px;
    padding: 20px 0 30px;
  }
}
</style>
