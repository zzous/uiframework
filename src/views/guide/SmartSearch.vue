<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}</div>
    <div class="guidememo">
      <div class="memotitle">smart search ( 테이블 검색 )</div>
      <ul class="memo-list">
        <li><strong class="tagstyle">케밥 케이스(kebab case)</strong> `my-class-name` 와 <strong class="tagstyle">BEM(BEM, Block Element Modifier)</strong> `my-class-name__type` 과 혼용하여 사용한다.</li>
        <li><strong class="tagstyle">SCSS 사용</strong></li>
        <li>공통 모듈 (commponent component) 을 제외한 페이지 STYLE 은 /styles/pages/ 폴더 내에 pageName.scss 정의 후 작성한다. 페이지 내에 <strong class="tagstyle">&lt;style&gt; 사용 금지</strong></li>
      </ul>
    </div>
    <div class="codewrap" v-for="(item, index) in state.codeSample" :key="index">
      <div :class="['codetitle', state.className]" >
        <span @click="toggleAcc(index)">{{item.title}}</span>
        <button type="button" class="btn btn-ss" @click="copyCode(item.sampleCodeJS)"> <span class="ico-menu"></span> 복사하기</button>
      </div>
      <div :class="['code', item.title]" >
  <pre>
  <code>
  {{ item.sampleCodeJS }}
  </code>
  </pre>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
const props = defineProps({ title: String });
const state = reactive({
  className: '',
  codeSample: [
    {
      title: 'smart search + table',
      sampleCodeJS: `
<template #search-area>
  <SmartSearch :items="headers" :datas="originalList" @update:search="onUpdateSmartSearch" />
</template>
<template #content>
  <v-data-table :headers="headers" :items="list" />
  <v-pagination v-model="page" :length="pageCount" />
</template>

// script
import { useListPage } from '@/composables/index.js';

const { originalList, list, page, pageCount, initializeList, onUpdateSmartSearch } = useListPage();

const getList = () => {
  initializeList(defaultData);
}

onMounted(() => {
  getList();
})
`
    }
  ]
});
const toggleAcc = (idx) => {
  const tag = document.getElementsByClassName('codewrap');
  tag[idx].classList.contains('up') ? tag[idx].classList.remove('up') : tag[idx].classList.add('up');
};
const copyCode = (code) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      alert('코드가 클립보드에 복사되었습니다.');
    })
    .catch((err) => {
      console.error('클립보드 복사 실패:', err);
      alert('클립보드 복사에 실패했습니다.');
    });
};
  
</script>
  