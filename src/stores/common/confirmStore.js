import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useConfirmStore = defineStore('confirm', () => {
    
  const isOpen = ref(false);
  const content = ref('');
  const onConfirmCloseAction = ref(() => {});
  const onCancelCloseAction = ref(() => {});
    
  const onOpen = () => { isOpen.value = true; };
  const onCancel = () => {
    onCancelCloseAction.value?.();
    isOpen.value = false;
  };
  const onConfirmClose = () => {
    onConfirmCloseAction.value?.();
    isOpen.value = false;
  };
  const initializeContent = (initialContent) => { content.value = initialContent; };
  const initializeConfirmCloseAction = (initialConfirmAction) => { onConfirmCloseAction.value = initialConfirmAction; };
  const initializeCancelCloseAction = (initialCancelAction) => { onCancelCloseAction.value = initialCancelAction; };
    
  return { isOpen, content, onOpen, onCancel, onConfirmClose, initializeContent, initializeConfirmCloseAction, initializeCancelCloseAction };
});


export const initialConfirmStore = (initialContentText = null, onConfirmCloseAction = null, onCancelCloseAction = null) => {
    
  if (initialContentText) {
    useConfirmStore()
      .initializeContent(initialContentText);
  }
  if (onConfirmCloseAction) {
    useConfirmStore()
      .initializeConfirmCloseAction(onConfirmCloseAction);
  }
  if (onCancelCloseAction) {
    useConfirmStore()
      .initializeCancelCloseAction(onCancelCloseAction);
  }
    
  return useConfirmStore();
};
