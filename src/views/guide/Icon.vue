<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}</div>
    <div class="guidememo">
      <div class="memotitle">기본사용</div>
      <ul class="memo-list">
        <li>html5 기본 태그로 사용</li>
        <li>Header영역<strong class="tagstyle">&lt;div class="listheader" &gt;&lt;/div&gt;</strong>과 본문 영역<strong class="tagstyle">&lt;div class="listline" &gt;&lt;/div&gt;</strong> 나누어 사용 </li>
        <li>야이콘 영역은 <strong class="tagstyle">&lt;div class="cellIcon" &gt;&lt;/div&gt;</strong>과 40px로 고정되어 있음 </li>
        <li><strong class="tagstyle">&lt;div class="listheader" &gt;&lt;/div&gt;</strong>안의 자식 태그의 클래스는 본문 영역<strong class="tagstyle">&lt;div class="listline" &gt;&lt;/div&gt;</strong>안의 태그의 클래스와 동일하게 사용 </li>
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

