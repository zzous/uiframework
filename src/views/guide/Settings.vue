<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}</div>
    <div class="guidememo">
      <div class="memotitle">기본사용</div>
      <ul class="memo-list">
        <li><strong class="tagstyle">node 20.14.1</strong> ( 25년도 LTS 상용버전 - 현재 24.07 기준 v18 )</li>
        <li>UI Framework <strong class="tagstyle">vuetify ^3.6.14</strong></li>
        <li>상태관리 <strong class="tagstyle">pinia ^2.1.7</strong></li>
        <li>vue-router ^4.3</li>
        <li>sass ^1.77.8</li>
        <li>vue-i18n ^9</li>
        <li>dayjs ^1.11.12</li>
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
  
  