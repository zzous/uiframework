<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}</div>
    <div class="guidememo">
      <div class="memotitle">기본사용</div>
      <ul class="memo-list">
        <li>vuetify <strong class="tagstyle">v-btn</strong> 사용</li>
        <li>style 설정은 <strong class="tagstyle">class</strong>로 지정 한다. <strong class="tagstyle">( class="outline--primary" / class="outline--success" / class="outline--error" )</strong></li>
        <li>size 설정은 <strong class="tagstyle">size="large"</strong> 속성으로 한다. <strong class="tagstyle">( size="large" / size="small" )</strong></li>
        <li>default : <v-btn>Default</v-btn></li>
        <!-- <li>클래스 추가 하여 사이즈 변경 (샘플페이지 참고)</li>
        <li>클래스 <strong class="tagstyle">.sm</strong> height=30</li>
        <li>클래스 <strong class="tagstyle">.ss</strong> height=28</li>
        <li>아이콘 버튼 사용시 <strong class="tagstyle">&lt;button &gt;</strong>태그 안의 아이콘 태그 추가 하여 사용 </li>
        <li>아이콘은 단독으로도 사용 가능 </li>
        <li>아이콘은 추후 업데이트 예정</li> -->
      </ul>
    </div>
    <div class="guidememo">
      <div class="memotitle">example</div>
      <div>
        <v-btn size="large">Default</v-btn>
        <v-btn>Default</v-btn>
        <v-btn size="small">Default</v-btn>
      </div>
      <br/>
      <div>
        <v-btn class="outline--primary" size="large">Default</v-btn>
        <v-btn class="outline--primary">Default</v-btn>
        <v-btn class="outline--primary" size="small">Default</v-btn>
      </div>
      <br/>
      <div>
        <v-btn class="outline--success" size="large">Default</v-btn>
        <v-btn class="outline--success">Default</v-btn>
        <v-btn class="outline--success" size="small">Default</v-btn>
      </div>
      <br/>
      <div>
        <v-btn class="outline--error" size="large">Default</v-btn>
        <v-btn class="outline--error">Default</v-btn>
        <v-btn class="outline--error" size="small">Default</v-btn>
      </div>
      <br/>
      <div style="padding: 12px; background-color:#aaaaaa;">
        <v-btn class="point" size="large">Default</v-btn>
        <v-btn class="point">Default</v-btn>
        <v-btn class="point" size="small">Default</v-btn>
      </div>
    </div>
    <div class="codewrap">
      <div class="codetitle">
        <span>{{ state.codeSample.title }}</span>
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
</template>
<script setup>
import { reactive } from 'vue';
const props = defineProps({ title: String });
const state = reactive({
  className: '',
  codeSample: {
    title: 'v-btn example code',
    sampleCodeJS: `<div>
  <v-btn size="large">Default</v-btn>
  <v-btn>Default</v-btn>
  <v-btn size="small">Default</v-btn>
</div>
<div>
  <v-btn class="outline--primary" size="large">Default</v-btn>
  <v-btn class="outline--primary">Default</v-btn>
  <v-btn class="outline--primary" size="small">Default</v-btn>
</div>
<div>
  <v-btn class="outline--success" size="large">Default</v-btn>
  <v-btn class="outline--success">Default</v-btn>
  <v-btn class="outline--success" size="small">Default</v-btn>
</div>
<div>
  <v-btn class="outline--error" size="large">Default</v-btn>
  <v-btn class="outline--error">Default</v-btn>
  <v-btn class="outline--error" size="small">Default</v-btn>
</div>
<div>
  <v-btn class="point" size="large">Default</v-btn>
  <v-btn class="point">Default</v-btn>
  <v-btn class="point" size="small">Default</v-btn>
</div>`
  }
});
// const toggleAcc = (idx) => {
//   const tag = document.getElementsByClassName('codewrap');
//   tag[idx].classList.contains('up') ? tag[idx].classList.remove('up') : tag[idx].classList.add('up');
// };
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
