// useListPage.js
import { computed, ref } from 'vue';
import { vPaginationItemsPerPage } from '@/plugins/vuetify.js';

export default function useListPage() {
    
  const originalList = ref([]);
  const filterList = ref([]);
  const page = ref(1);
    
  const initializeList = (data) => {
        
    if (!Array.isArray(data)) { throw new Error('Data must be an array'); }
        
    originalList.value = data;
  };
    
  const onUpdateSmartSearch = (filters) => {
        
    if (!Array.isArray(filters)) { throw new Error('filters must be an array'); }
        
    filterList.value = filters;
  };
    
    // SmartSearch 필터링
  const filteredList = computed(() => {
        
    if (filterList.value.length === 0) { return originalList.value; }
        
    const sanitizedList = [];
    const uniqueItems = new Set();
        
    originalList.value.forEach(originalItem => {
      filterList.value.forEach(filterItem => {
        if (originalItem[filterItem?.key] === filterItem?.value) {
          const uniqueKey = JSON.stringify(originalItem); // 고유성을 판단하기 위한 키 생성
          if (!uniqueItems.has(uniqueKey)) {
            uniqueItems.add(uniqueKey);
            sanitizedList.push(originalItem);
          }
        }
      });
    });
        
    return sanitizedList;
  });
    
    // Pagination
  const paginatedList = computed(() => {
    const start = (page.value - 1) * vPaginationItemsPerPage;
    const end = start + vPaginationItemsPerPage;
    return filteredList.value.slice(start, end);
  });
    
  const pageCount = computed(() => {
    return Math.ceil(filteredList.value.length / vPaginationItemsPerPage);
  });
    
  return { originalList, list: paginatedList, page, pageCount, initializeList, onUpdateSmartSearch };
}
