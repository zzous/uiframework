<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}</div>
    <div class="guidememo">
      <div class="memotitle">Confirm</div>
      <ul class="memo-list">
        <li>import { initialConfirmStore } from '@/stores/common/confirmStore.js' // 컨펌창은 store 에서 제어</li>
        <li><strong class="tagstyle">confirmStore.onOpen()</strong> // 컨펌 open 함수</li>
        <li>
          function <strong class="tagstyle">onConfirmAction()</strong> { alert('컨펌 확인 액션'); } // 컨펌 확인 콜백 (필요시 사용)<br>
          function <strong class="tagstyle">onCancelAction()</strong> { alert('컨펌 취소 액션'); } // 컨펌 취소 콜백 (필요시 사용)
        </li>
        <!-- <li><strong class="tagstyle">케밥 케이스(kebab case)</strong> `my-class-name` 와 <strong class="tagstyle">BEM(BEM, Block Element Modifier)</strong> `my-class-name__type` 과 혼용하여 사용한다.</li>
        <li><strong class="tagstyle">SCSS 사용</strong></li>
        <li>공통 모듈 (commponent component) 을 제외한 페이지 STYLE 은 /styles/pages/ 폴더 내에 pageName.scss 정의 후 작성한다. 페이지 내에 <strong class="tagstyle">&lt;style&gt; 사용 금지</strong></li> -->
      </ul>
      <div class="example">
        <div class="memotitle">Example</div>
        <div>
          <v-btn @click="onOpenConfirm">컨펌 모달 열기</v-btn>
        </div>
      </div>
      <div class="codewrap">
        <div class="codetitle">
          <span>{{ state.confirmSample.title }}</span>
          <v-btn type="button" class="outline--primary" size="small" @click="copyCode(state.confirmSample.sampleCodeJS)">복사하기</v-btn>
        </div>
        <div class="code">
<pre>
<code>
{{ state.confirmSample.sampleCodeJS }}
</code>
</pre>
        </div>
      </div>
    </div>
    <div class="guidememo">
      <div class="memotitle">formLayout</div>
      <div class="example">
        <v-form>
          <FormRow title="기본 정보">
            <FormRowItem label="사용자 명(한글)" required>
              <v-text-field/>
            </FormRowItem>
            <FormRowItem label="사용자 명(한글)">
              <v-text-field/>
            </FormRowItem>
          </FormRow>
          <FormRow>
            <FormRowItem label="사용자 명(영문)">
              <v-text-field max-width="300px"/>
            </FormRowItem>
          </FormRow>
        </v-form>
      </div>
      <div class="codewrap">
        <div class="codetitle">
          <span>{{ state.formLayoutSample.title }}</span>
          <v-btn type="button" class="outline--primary" size="small" @click="copyCode(state.formLayoutSample.sampleCodeJS)">복사하기</v-btn>
        </div>
        <div class="code">
<pre>
<code>
{{ state.formLayoutSample.sampleCodeJS }}
</code>
</pre>
        </div>
      </div>
    </div>
    <div class="guidememo">
      <div class="memotitle">listView + smartSearch</div>
      <div class="example">
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
          <span>{{state.listViewSample.title}}</span>
          <v-btn type="button" class="outline--primary" size="small" @click="copyCode(state.listViewSample.sampleCodeJS)">복사하기</v-btn>
        </div>
        <div class="code">
<pre>
<code>
{{ state.listViewSample.sampleCodeJS }}
</code>
</pre>
        </div>
      </div>
    </div>
    <div class="guidememo">
      <div class="memotitle">loadingPopup</div>
      <div class="example">
        <v-btn @click="onLoading">on loading</v-btn>
      </div>
      <div class="codewrap">
        <div class="codetitle">
          <span>{{ state.globalLoadingSample.title }}</span>
          <v-btn type="button" class="outline--primary" size="small" @click="copyCode(state.globalLoadingSample.sampleCodeJS)"> <span class="ico-menu"></span> 복사하기</v-btn>
        </div>
        <div :class="['code', state.globalLoadingSample.title]" >
<pre>
<code>
{{ state.globalLoadingSample.sampleCodeJS }}
</code>
</pre>
        </div>
      </div>
    </div>
    <div class="guidememo">
      <div class="memotitle">modal</div>
      <div class="example">
        <v-btn @click="onOpen">모달</v-btn>
        <Modal title="인증키" :isOpen="isOpen" :onOpen="onOpen" :onClose="onClose">
          <template #content>
            <FormRow>
              <FormRowItem label="서비스 그룹">Group A</FormRowItem>
              <FormRowItem label="클라우드 타입">네이버</FormRowItem>
            </FormRow>

            <FormRow>
              <FormRowItem label="리전">아시아 태평양 (서울)</FormRowItem>
              <FormRowItem label="인증키 명">KEY-Strato-Test1</FormRowItem>
            </FormRow>

            <FormRow>
              <FormRowItem label="인증키">key-0d25873f60e152f3a59</FormRowItem>
              <FormRowItem label="인증키 타입">RSA</FormRowItem>
            </FormRow>

            <FormRow>
              <FormRowItem label="키 파일 형식">.Pem</FormRowItem>
              <FormRowItem label="소유자">7514988871854</FormRowItem>
            </FormRow>

            <FormRow>
              <FormRowItem label="인증키 상태"><v-btn variant="outlined" text="인증키 다운로드" /></FormRowItem>
            </FormRow>
          </template>
          <template #footer>
            <v-btn @click="onClose">확인</v-btn>
            <v-btn variant="outlined" @click="onClose">취소</v-btn>
          </template>
        </Modal>
      </div>
      <div class="codewrap">
        <div class="codetitle">
          <span>{{state.modalSample.title}}</span>
          <v-btn type="button" class="outline--primary" size="small" @click="copyCode(state.modalSample.sampleCodeJS)">복사하기</v-btn>
        </div>
        <div class="code">
<pre>
<code>
{{ state.modalSample.sampleCodeJS }}
</code>
</pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';

import { FormRow, FormRowItem } from '@/components/index.js';
import ListView from '@/components/listView/ListView.vue';
import SmartSearch from '@/components/smartSearch/SmartSearch.vue';
import Modal from '@/components/modal/Modal.vue';

import { useListPage } from '@/composables/index.js';
import { initialConfirmStore } from '@/stores/common/confirmStore.js';
import { loadingStore } from '@/stores/common/loadingStore.js';

const { originalList, list, page, pageCount, initializeList, onUpdateSmartSearch } = useListPage();

const props = defineProps({ title: String });
const state = reactive({
  className: '',
  confirmSample: {
    title: 'Confirm Example Code',
/**
 * @Confirm
 */
    sampleCodeJS: `///// template
<v-btn @click="onOpenConfirm">컨펌 모달 열기</v-btn>

///// script
import {initialConfirmStore} from '@/stores/common/confirmStore.js';
const deleteUserCount = ref(1);

function onOpenConfirm() {
  const confirmStore = initialConfirmStore(
  \`정말로 \${deleteUserCount.value}명의 사용자를 삭제하시겠습니까?\`,
      onConfirmAction,
      onCancelAction,
  );
  confirmStore.onOpen();
}

function onConfirmAction() {
  alert('컨펌 확인 액션');
}

function onCancelAction() {
  alert('컨펌 취소 액션');
}`
  },
/**
 * @formLayout
 */
  formLayoutSample: {
    title: 'formLayout Example Code',
    sampleCodeJS: `///// template
<v-form>
  <FormRow title="기본 정보">
    <FormRowItem label="사용자 명(한글)" required>
      <v-text-field/>
    </FormRowItem>
    <FormRowItem label="사용자 명(한글)">
      <v-text-field/>
    </FormRowItem>
  </FormRow>
  <FormRow>
    <FormRowItem label="사용자 명(영문)">
      <v-text-field max-width="300px"/>
    </FormRowItem>
  </FormRow>
</v-form>

///// script
import { FormRow, FormRowItem } from '@/components/index.js';`
  },
  listViewSample: {
    title: 'listView Example Code',
    sampleCodeJS: `///// template
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

///// script
import ListView from '@/components/listView/ListView.vue';
import SmartSearch from '@/components/smartSearch/SmartSearch.vue';

const { originalList, list, page, pageCount, initializeList, onUpdateSmartSearch } = useListPage();`
  },
  globalLoadingSample: {
    title: 'globalLoading Example Code',
    sampleCodeJS: `///// Layout.vue
<LoadingPopup/>

///// script
import { loadingStore } from '@/stores/common/loadingStore.js';

loadingStore.onLoading(); // loading on
loadingStore.offLoading(); // loading off`
  },
  modalSample: {
    title: 'modal Example Code',
    sampleCodeJS: `///// template
<v-btn @click="onOpen">모달</v-btn>
<Modal title="인증키" :isOpen="isOpen" :onOpen="onOpen" :onClose="onClose">
  <template #content>
    <FormRow>
      <FormRowItem label="서비스 그룹">Group A</FormRowItem>
      <FormRowItem label="클라우드 타입">네이버</FormRowItem>
    </FormRow>
    <FormRow>
      <FormRowItem label="인증키 상태"><v-btn variant="outlined" text="인증키 다운로드" /></FormRowItem>
    </FormRow>
  </template>
  <template #footer>
    <v-btn @click="onClose">확인</v-btn>
    <v-btn variant="outlined" @click="onClose">취소</v-btn>
  </template>
</Modal>

///// script
import Modal from '@/components/modal/Modal.vue';

const isOpen = ref(false);
const onOpen = () => { isOpen.value = true; };
const onClose = () => { isOpen.value = false; };`
  }
});

// confirm
const deleteUserCount = ref(1);
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
// modal
const isOpen = ref(false);
const onOpen = () => { isOpen.value = true; };
const onClose = () => { isOpen.value = false; };

function onOpenConfirm() {
  const confirmStore = initialConfirmStore(
    `정말로 ${deleteUserCount.value}명의 사용자를 삭제하시겠습니까?`,
    onConfirmAction,
    onCancelAction
  );

  confirmStore.onOpen();
}

function onLoading() {
  loadingStore.onLoading();
  setTimeout(() => {
    loadingStore.offLoading();
  }, (1500));
}

function onConfirmAction() {
  alert('컨펌 확인 액션');
}

function onCancelAction() {
  alert('컨펌 취소 액션');
}

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

const getList = () => {
  initializeList(defaultData);
};

onMounted(() => {
  getList();
});
</script>
  