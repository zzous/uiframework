<template>
    <Modal v-if="state.isShow" @click="dimClose">
        <div :class="['ui-alert', state.className]">
            <div class="ui-alert-wrap">
                <div class="modal-header">
                    <button type="button" class="ui-alert-close" @click="closeModal">
                        <span class="offscreen">창닫기</span>
                    </button>
                </div>
                <div class="ui-alert-body">
                    <p class="ui-alert-msg">{{ state.message }}</p>
                </div>
                <div class="ui-alert-footer">
                    <template v-if="state.type === 'modalsimple'">
                        <div class="btn-bottom-set flex justify-center">
                            <button type="button" @click="closeModal('close')" class="btn btn-alert"
                                v-if="state.buttonText.cancel">
                                {{ state.buttonText.cancel }}
                            </button>
                            <button type="button" @click="closeModal('ok')" class="btn btn-alert"
                                v-if="state.buttonText.ok">
                                {{ state.buttonText.ok }}
                            </button>

                        </div>
                    </template>
                    <template v-if="state.type === 'modalconfirm'">
                        <div class="btn-bottom-set flex justify-center">
                            <button type="button" @click="closeModal('cancel')" class="btn btn-alert"
                                v-if="state.buttonText.cancel">
                                {{ state.buttonText.cancel }}
                            </button>
                            <button type="button" @click="closeModal('confirm')" class="btn btn-alert"
                                v-if="state.buttonText.confirm">
                                {{ state.buttonText.confirm }}
                            </button>
                        </div>
                    </template>
                    <template v-if="state.type === 'modalalert'">
                        <div class="btn-bottom-set flex justify-center">
                            <button type="button" @click="closeModal('ok')" class="btn btn-alert"
                                v-if="state.buttonText.ok">
                                {{ state.buttonText.ok }}
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </Modal>
</template>
<script setup>
import { onMounted, onUnmounted, reactive } from 'vue';

onMounted(() => {
  emitter.$on('modalsimple', (v, passedPromise) => {
    openModal('modalsimple', v, passedPromise);
  });
  emitter.$on('modalalert', (v, passedPromise) => {
    openModal('modalalert', v, passedPromise);
  });
  emitter.$on('modalconfirm', (v, passedPromise) => {
    openModal('modalconfirm', v, passedPromise);
  });
});
onUnmounted(() => {
  emitter.$off('modalsimple');
  emitter.$off('modalalert');
  emitter.$off('modalconfirm');
});
  
const state = reactive({
  type: null,
  isShow: false,
  closeButtonHide: false,
  types: '',
  title: '',
  message: '',
  html: '',
  buttonText: {
    ok: null,
    cancel: null,
    confirm: null,
    close: null
  },
  className: '',
  passedPromise: {
    resolve: null,
    reject: null
  }
});
const openModal = (type, v, passedPromise) => {
  state.type = type;
  state.isShow = true;
  state.passedPromise = passedPromise;
  switch (typeof v) {
    case 'object':
      state.title = v.title || '';
      state.message = v.message || '';
      state.html = v.html || '';
      state.closeButtonHide = v.closeButtonHide;
      state.className = v.className;
      state.buttonText = {
        ...v.buttonText
      };
      break;
    case 'string':
      state.message = v;
      break;
  }
};
const closeModal = (type) => {
  state.isShow = false;
  state.title = '';
  state.message = '';
  state.html = '';
  state.closeButtonHide = false;
  state.buttonText = {};
  switch (type) {
    case 'ok':
      return state.passedPromise.resolve('ok');
    case 'close':
      return state.passedPromise.reject('close');
    case 'confirm':
      return state.passedPromise.resolve('confirm');
    case 'cancel':
      return state.passedPromise.reject('cancel');
    case 'itself':
      return state.passedPromise.reject('itself');
  }
};
const dimClose = () => {
  state.isShow = false;
};
</script>