<template>
  <v-dialog v-model="isOpen" max-width="400px" persistent>
    <div class="confirm__wrapper">

      <div class="confirm__content">
        {{content}}
      </div>

      <div class="confirm__footer">
        <v-btn variant="outlined" text="취소" @click="confirmStore.onCancel()" />
        <v-btn text="확인" @click="confirmStore.onConfirmClose()" />
        <slot name="footer" />
      </div>

    </div>
  </v-dialog>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import {useConfirmStore} from '@/stores/common/confirmStore.js';

const confirmStore = useConfirmStore();
const { isOpen, content } = storeToRefs(confirmStore);

const onOpen = () => { isOpen.value = true; };
const onClose = () => { isOpen.value = false; };

defineExpose({ onOpen, onClose });
</script>
<style lang="scss">
@import "@/styles/index";

.confirm__wrapper {
  border-radius: 5px;
  background-color: $strato__background__color;

  .confirm__content {
    @include flex-col-center;
    @include body-2;
    padding: 50px 30px 0 30px;
  }
  .confirm__footer {
    @include flex-row-center;
    gap: 10px;
    padding: 32px 0 50px;
  }
}
</style>
