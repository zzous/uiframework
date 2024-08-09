<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}</div>
    <div class="guidememo">
      <div class="memotitle">ListView + SmartSearch + v-data-table + v-pagination</div>
      <ul class="memo-list">
        <li>ListView + SmartSearch + v-data-table + v-pagination 조합 사용</li>
        <li>일반적인 &lt;table&gt; 형태의 리스트 페이지</li>
        <!-- <li><strong class="tagstyle">케밥 케이스(kebab case)</strong> `my-class-name` 와 <strong class="tagstyle">BEM(BEM, Block Element Modifier)</strong> `my-class-name__type` 과 혼용하여 사용한다.</li>
        <li><strong class="tagstyle">SCSS 사용</strong></li>
        <li>공통 모듈 (commponent component) 을 제외한 페이지 STYLE 은 /styles/pages/ 폴더 내에 pageName.scss 정의 후 작성한다. 페이지 내에 <strong class="tagstyle">&lt;style&gt; 사용 금지</strong></li> -->
      </ul>
      <div class="example">
        <div class="memotitle">Example</div>
        <ListView list-count="10" @on-refresh="() => {}" last-date="2023-05-30 14:23:12">
          <template #button-group>
            <v-btn>저장</v-btn>
            <v-btn variant="outlined" class="btn--delete">삭제</v-btn>
          </template>
          <template #search-area>
            <SmartSearch :items="headers" :datas="originalList" @update:search="onUpdateSmartSearch" />
          </template>
          <template #content>
            <v-data-table :headers="headers" :items="list" />
            <v-pagination v-model="page" :length="pageCount" />
          </template>
        </ListView>
      </div>
      <div class="codewrap">
        <div class="codetitle">
          <span>{{state.codeSample.title}}</span>
          <v-btn type="button" class="outline--primary" size="small" @click="copyCode(state.codeSample.sampleCodeJS)">복사하기</v-btn>
        </div>
        <div class="code">
<pre>
<code>
{{ state.codeSample.sampleCodeJS }}
</code>
</pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, onMounted } from 'vue';

import ListView from '@/components/listView/ListView.vue';
import SmartSearch from '@/components/smartSearch/SmartSearch.vue';

import { useListPage } from '@/composables/index.js';
import { initialConfirmStore } from '@/stores/common/confirmStore.js';
import { loadingStore } from '@/stores/common/loadingStore.js';

const { originalList, list, page, pageCount, initializeList, onUpdateSmartSearch } = useListPage();

const props = defineProps({ title: String });
const state = reactive({
  className: '',
  codeSample: {
    title: 'smart search + table',
    sampleCodeJS: `// template
<ListView list-count="10" @on-refresh="() => {}" last-date="2023-05-30 14:23:12">
  <template #search-area>
    <SmartSearch :items="headers" :datas="originalList" @update:search="onUpdateSmartSearch" />
  </template>
  <template #content>
    <v-data-table :headers="headers" :items="list" />
    <v-pagination v-model="page" :length="pageCount" />
  </template>
</ListView>

// script
import { useListPage } from '@/composables/index.js';

const { originalList, list, page, pageCount, initializeList, onUpdateSmartSearch } = useListPage();

// table header category 설정
const headers = [
  { title: 'OS 이미지 명', key: 'osName' },
  { title: '이미지 타입 코드', key: 'imageTypeCode' },
  { title: '아키텍처', key: 'architecture' },
  { title: 'OS', key: 'os' }
];
// data list
const defaultData = [
  { osName: 'amzn2', imageTypeCode: 'ami-0', architecture: 'x86_64', os: 'Ubuntu Linux' },
  { osName: 'amzn3', imageTypeCode: 'ami-1', architecture: 'x86_64', os: 'RedHat' },
  { osName: 'amzn4', imageTypeCode: 'ami-2', architecture: 'x86_64', os: 'Windows XP' },
  { osName: 'amzn5', imageTypeCode: 'ami-3', architecture: 'arm64', os: 'CentOS' },
  { osName: 'amzn6', imageTypeCode: 'ami-4', architecture: 'x86_64', os: 'Debian' },
  { osName: 'amzn7', imageTypeCode: 'ami-5', architecture: 'arm64', os: 'Fedora' },
  { osName: 'amzn8', imageTypeCode: 'ami-6', architecture: 'x86_64', os: 'Arch Linux' },
  { osName: 'amzn9', imageTypeCode: 'ami-7', architecture: 'x86_64', os: 'openSUSE' },
  { osName: 'amzn10', imageTypeCode: 'ami-8', architecture: 'x86_64', os: 'Alpine Linux' },
  { osName: 'amzn11', imageTypeCode: 'ami-9', architecture: 'arm64', os: 'Kali Linux' },
  { osName: 'amzn12', imageTypeCode: 'ami-10', architecture: 'x86_64', os: 'Windows 10' },
  { osName: 'amzn13', imageTypeCode: 'ami-11', architecture: 'x86_64', os: 'Windows Server 2019' },
  { osName: 'amzn14', imageTypeCode: 'ami-12', architecture: 'x86_64', os: 'FreeBSD' },
  { osName: 'amzn15', imageTypeCode: 'ami-13', architecture: 'x86_64', os: 'Solaris' },
  { osName: 'amzn16', imageTypeCode: 'ami-14', architecture: 'arm64', os: 'macOS' }
];

const getList = () => {
  initializeList(defaultData);
}

onMounted(() => {
  getList();
})
`
  }
});

// listview
const headers = [
  { title: 'OS 이미지 명', key: 'osName' },
  { title: '이미지 타입 코드', key: 'imageTypeCode' },
  { title: '아키텍처', key: 'architecture' },
  { title: 'OS', key: 'os' }
];
const defaultData = [
  { osName: 'amzn2', imageTypeCode: 'ami-0', architecture: 'x86_64', os: 'Ubuntu Linux' },
  { osName: 'amzn3', imageTypeCode: 'ami-1', architecture: 'x86_64', os: 'RedHat' },
  { osName: 'amzn4', imageTypeCode: 'ami-2', architecture: 'x86_64', os: 'Windows XP' },
  { osName: 'amzn5', imageTypeCode: 'ami-3', architecture: 'arm64', os: 'CentOS' },
  { osName: 'amzn6', imageTypeCode: 'ami-4', architecture: 'x86_64', os: 'Debian' },
  { osName: 'amzn7', imageTypeCode: 'ami-5', architecture: 'arm64', os: 'Fedora' },
  { osName: 'amzn8', imageTypeCode: 'ami-6', architecture: 'x86_64', os: 'Arch Linux' },
  { osName: 'amzn9', imageTypeCode: 'ami-7', architecture: 'x86_64', os: 'openSUSE' },
  { osName: 'amzn10', imageTypeCode: 'ami-8', architecture: 'x86_64', os: 'Alpine Linux' },
  { osName: 'amzn11', imageTypeCode: 'ami-9', architecture: 'arm64', os: 'Kali Linux' },
  { osName: 'amzn12', imageTypeCode: 'ami-10', architecture: 'x86_64', os: 'Windows 10' },
  { osName: 'amzn13', imageTypeCode: 'ami-11', architecture: 'x86_64', os: 'Windows Server 2019' },
  { osName: 'amzn14', imageTypeCode: 'ami-12', architecture: 'x86_64', os: 'FreeBSD' },
  { osName: 'amzn15', imageTypeCode: 'ami-13', architecture: 'x86_64', os: 'Solaris' },
  { osName: 'amzn16', imageTypeCode: 'ami-14', architecture: 'arm64', os: 'macOS' }
];

const getList = () => {
  initializeList(defaultData);
};

onMounted(() => {
  getList();
});

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
  