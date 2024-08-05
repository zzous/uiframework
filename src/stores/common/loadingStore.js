import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', () => {
    
  const isOpen = ref(false);
    
  const onLoading = () => { isOpen.value = true; };
  const offLoading = () => { isOpen.value = false; };
    
  return { isOpen, onLoading, offLoading };
});


export const loadingStore = useLoadingStore();
