<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}</div>
    <div class="guidememo">
      <div class="memotitle">기본사용</div>
      <ul class="memo-list">
        <li>AppLayout.vue</li>
        <!-- <li>2단 기본 메뉴(좌측 메뉴/우측 컨텐츠)</li> -->
        <!-- <li>레이아웃 변경시 <strong class="tagstyle">&lt;div class="layout" &gt;&lt;/div&gt;</strong> 태그에 클래스 추가 하여 스타일 재정의 하여 사용 (현재 기준  mentTop 클래스 추가시 레이아웃 구조 변경)</li> -->
        <!-- <li>기존 대비 수정항목 : <br>
          TopDrawerMenu &gt; <strong class="tagstyle">Header</strong> <br>
        </li> -->
      </ul>
      <div class="codewrap">
        <div class="codetitle">
          <span>{{ state.layoutSample.title }}</span>
          <v-btn type="button" class="outline--primary" size="small" @click="copyCode(state.layoutSample.sampleCodeJS)">복사하기</v-btn>
        </div>
        <div class="code">
<pre>
<code>
{{ state.layoutSample.sampleCodeJS }}
</code>
</pre>
        </div>
      </div>

      <div class="example">
        <div class="memotitle">Header</div>
        <ul class="memo-list">
          <li>const companyStore = useCompanyStore(); // 회사정보</li>
          <li>const serviceGroupStore = useServiceGroup(); // 서비스그룹</li>
          <li>const projectStore = useProjectStore(); // 프로젝트정보</li>
          <li>const userStore = useUserStore(); // 개인정보</li>
        </ul>
        <div class="memotitle">Sidebar</div>
        <ul class="memo-list">
          <li>const menuList = useSidebarRoutes(); // 메뉴 목록</li>
        </ul>
        <div class="memotitle">Content</div>
        <ul class="memo-list">
          <li>router-view</li>
        </ul>
        <div class="memotitle">Confirm</div>
        <ul class="memo-list">
          <li>const confirmStore = useConfirmStore(); // 컴펌창 ( store 관리 )</li>
          <li>confirmStore.onOpen() // open</li>
          <li>confirmStore.onClose() // close</li>
          <li>const confirmStore = initialConfirmStore( <br>
            `정말로 ${deleteUserCount.value}명의 사용자를 삭제하시겠습니까?`, <br>
            onConfirmAction, <br>
            onCancelAction, <br>
            ); <br>
            <br>
            confirmStore.onOpen(); <br>
            <br>
            // 사용 페이지 내에서 컨펌 메시지 작성 후 호출
          </li>
        </ul>
        <div class="memotitle">Initializer</div>
        <ul class="memo-list">
          <li>회사정보, 권한정보 초기화</li>
          <li>const { data: companyInfo } = await readOneCompanyInfo(); <br>
            companyStore.initializeCompanyInfo(companyInfo); // 회사정보
          </li>
          <li>const { data: userRoleList } = await readListUserRole();
            userRoleStore.initializeUserRole(userRoleList); // 권한정보
          </li>
        </ul>
        <div class="memotitle">LoadingPopup</div>
        <ul class="memo-list">
          <li>global loading popup</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
const props = defineProps({ title: String });
const state = reactive({
  className: '',
  layoutSample: {
    title: 'AppLayout.vue',
    sampleCodeJS: `<template>
  <div class="strato__app">
    <Header/>
    <Sidebar/>
    <Content>
      <template #children>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </template>
    </Content>
    <Footer />
  </div>

  <Confirm />
  <Initializer />
  <LoadingPopup/>
</template>

// script
import {Header, Sidebar, Content, Footer} from '@/layout';
import {Confirm, Initializer} from '@/components';
import LoadingPopup from '@/components/loadingPopup/LoadingPopup.vue';`
  }
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
