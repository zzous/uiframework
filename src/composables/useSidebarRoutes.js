import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import routes from '@/router/routes/index.js';

export default function useSidebarRoutes() {
    
  const route = useRoute();
  const sidebarRoutes = ref([]);
    
  const isTwoDepthMenuActive = (routeName) => {
    return route.name ===  routeName;
  };

  const getSidebarRoutes = (routeList) => {
        
    const collectRoutes = (routeList) => {
      return routeList.reduce((acc, route) => {
                
        if (route.meta?.sidebar) {
          const routeCopy = { ...route, isOpen: isTwoDepthMenuActive(route.name) };
          if (route.children) {
            routeCopy.children = collectRoutes(route.children);
          }
          acc.push(routeCopy);
        } else if (route.children) {
          const filteredChildren = collectRoutes(route.children);
          if (filteredChildren.length > 0) {
            const routeCopy = { ...route, children: filteredChildren };
            routeCopy.isOpen = filteredChildren.some(child => child.isOpen);
                        
            acc.push(routeCopy);
          }
        }
                
        return acc;
      }, []);
    };
        
    return collectRoutes(routeList);
  };
    
  sidebarRoutes.value = getSidebarRoutes(routes);
    
  watch(route, () => {
    sidebarRoutes.value = getSidebarRoutes(routes);
  });
    
  return sidebarRoutes;
}
