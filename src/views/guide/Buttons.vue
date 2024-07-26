<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}</div>
    <div class="guidememo">
      <div class="memotitle">기본사용</div>
      <ul class="memo-list">
        <li>html5 기본 태그로 사용</li>
        <li>클래스 추가 하여 사이즈 변경 (샘플페이지 참고)</li>
        <li>클래스 <strong class="tagstyle">.sm</strong> height=30</li>
        <li>클래스 <strong class="tagstyle">.ss</strong> height=28</li>
        <li>아이콘 버튼 사용시 <strong class="tagstyle">&lt;button &gt;</strong>태그 안의 아이콘 태그 추가 하여 사용 </li>
        <li>아이콘은 단독으로도 사용 가능 </li>
        <li>아이콘은 추후 업데이트 예정</li>
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
      title: 'HTML',
      sampleCodeJS: `<button type="button" class="btn submit">submit 버튼</button>
<button type="button" class="btn submit" disabled>submit 버튼</button>
<button type="button" class="btn error" >error 버튼</button>
<button type="button" class="btn error" disabled>error 버튼</button>`
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
