<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}
      <button type="button" class="btn-sample" @click="goToPage('/section')">샘플페이지 보기</button>
    </div>
    <div class="guidememo">
      <div class="memotitle">기본사용</div>
      <ul class="memo-list">
        <li>html5 기본 태그로 사용</li>
        <li>기본 스타일은 5:5 비율 가로 2단</li>
        <li>영역 추가 시 <strong class="tagstyle">&lt;div class="sharebox" &gt;&lt;/div&gt;</strong> 추가 하여 수정</li>
        <li>왼쪽 고정시<strong class="tagstyle">&lt;div class="section-share  fixed" &gt;&lt;/div&gt;</strong> 태그에 클래스(<span class="tagstyle">.fixed</span>) 추가 하여 수정</li>
        <li>적용 클래스 확인은 샘플페이지에서 확인</li>
        <li>스타일 추가 및 변경 시 <strong class="tagstyle">&lt;div class="section-share" &gt;&lt;/div&gt;</strong> 태그에 클래스 추가 하여 스타일 재정의 </li>
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
import { defineComponent, onMounted, reactive, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
const props = defineProps({ title: String });
const { goToPage } = useCommFunc();
const state = reactive({
  className: '',
  codeSample: [
    {
      title: 'HTML',
      sampleCodeJS: `
<div class="section-share">
    <div class="sharebox">
        <div class="flex-center">영역1</div>
    </div>
    <div class="sharebox">
        <div class="flex-center">영역2</div>
    </div>
</div>
`
    },
    {
      title: 'CSS',
      sampleCodeJS: `.pageView{padding:30px;}
.section-share{display:flex; width:100%}
.section-share .sharebox{
    min-height:200px;flex:1 1 auto; border:solid 1px #ccc;background:#FAFAFA; box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.16);
    border-radius:5px;}
.section-share .sharebox + .sharebox{margin-left:10px;}
.section-share.fixed .sharebox:nth-of-type(1){flex:0 0 100px;}`
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

