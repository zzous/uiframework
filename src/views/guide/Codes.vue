<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}</div>
    <div class="guidememo">
      <div class="memotitle">Css 작성 가이드</div>
      <ul class="memo-list">
        <li><strong class="tagstyle">케밥 케이스(kebab case)</strong> `my-class-name` 와 <strong class="tagstyle">BEM(BEM, Block Element Modifier)</strong> `my-class-name__type` 과 혼용하여 사용한다.</li>
        <li><strong class="tagstyle">SCSS 사용</strong></li>
        <li>공통 모듈 (commponent component) 을 제외한 페이지 STYLE 은 /styles/pages/ 폴더 내에 pageName.scss 정의 후 작성한다. 페이지 내에 <strong class="tagstyle">&lt;style&gt; 사용 금지</strong></li>
      </ul>
    </div>

    <div class="guidememo">
      <div class="memotitle">Directory ( 폴더구조 )</div>
      <div class="codewrap">
        <div class="codetitle">
          <span>{{ state.directorySample.title }}</span>
          <v-btn type="button" class="outline--primary" size="small" @click="copyCode(state.directorySample.sampleCodeJS)">복사하기</v-btn>
        </div>
        <div class="code">
<pre>
<code>
{{ state.directorySample.sampleCodeJS }}
</code>
</pre>
        </div>
      </div>
      <!-- <div class="example">
        <div class="memotitle">api</div>
      </div>
      <div class="example">
        <div class="memotitle">assets</div>
      </div>
      <div class="example">
        <div class="memotitle">components</div>
      </div> -->
    </div>
    
  </div>
</template>
<script setup>
import { reactive } from 'vue';
const props = defineProps({ title: String });
const state = reactive({
  className: '',
  directorySample: {
    title: 'Directory',
    sampleCodeJS: `src
├─api # 
├─assets # 
├─components
│ ├─confirm
│ ├─dataTable
│ ├─formLayout
│ ├─listView
│ ├─loadingPopup
│ ├─modal
│ └─smartSearch
├─composables #
├─constant #
├─layout # 가장 큰 단위의 컴포넌트
├─plugins # 라이브러리의 설정 값들
├─router # uri와 컴포넌트를 연결
├─store # 데이터 및 API 관련 작업 전반적인 부분을 담당
│ └─user 
├─style #
├─template #  FormTemplate, ListTemplate, ModalTemplate
└─views # 실제 화면 작업이 필요한 dir 내부의 Directory는 추가될 수 있음`
  }
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
  