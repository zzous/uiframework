<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/modal')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li>vueuniversalmodal 플러그인과 함께 사용 하며 vueuniversalmodal.css 필수 import하여 사용</li>
                <li>alert의 경우 <strong class="tagstyle">&lt;div class="ui-alert" &gt;&lt;/div&gt;</strong>태그에 클래스 (.warning, .confirm, .error)마다 아이콘이 다름 (샘플 페이지 참고) </li>
                <li>모달 팝업은<strong class="tagstyle">&lt;div class="ui-modal-wrap" &gt;&lt;/div&gt;</strong> 태그 사용 </li>
                
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
<!--alert-->
<div class="ui-alert warning">
    <div class="ui-alert-wrap">
        <div class="modal-header">
            <button type="button" class="ui-alert-close"><span class="offscreen">창닫기</span></button>
        </div>
        <div class="ui-alert-body">
            <p class="ui-alert-msg">확인 취소 버튼 동시 사용/ 단일 사용 가능</p>
        </div>
        <div class="ui-alert-footer">
            <div class="btn-bottom-set flex justify-center">
                <button type="button" class="btn btn-alert">취소</button>
                <button type="button" class="btn btn-alert">확인</button>
            </div>
        </div>
    </div>
</div>
<!--modal-->
<div class="ui-modal-wrap">
    <div class="ui-alert-wrap">
        <div class="ui-modal-head">
            <h5 class="ui-modal-title">팝업 제목</h5>
            <button type="button" class="ui-modal-close"><span class="offscreen">팝업닫기</span></button>
        </div>
        <div class="ui-modal-body">
            <div>모달 콘텐츠 </div>
        </div>
        <div class="ui-modal-footer">
            <div class="btn-bottom-set flex justify-center">
                <button type="button" class="btn btn-sl nega">취소</button>
                <button type="button" class="btn btn-sl posi">확인</button>
            </div>
        </div>
    </div>
</div>
`
    },
    {
      title: 'CSS',
      sampleCodeJS: `.ui-alert { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; } 
.ui-alert-wrap { position: fixed; top: 50%; left: 50%; width: 344px; min-height: 150px; padding: 32px 24px 24px; border: 1px solid #767676; background-color: #fff; border-radius: 3px; transform: translate3d(-50%, -50%, 0); }
.ui-alert-close { position: absolute; top: 16px; right: 16px; width: 20px; height: 20px; background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.5 4L4 16.5' stroke='%238C949E' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round'/%3E%3Cpath d='M4 4L16.5 16.5' stroke='%238C949E' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round'/%3E%3C/svg%3E"); }
.ui-alert-msg { position: relative; min-height: 40px; padding-left: 46px; color: #444; }
.ui-alert-msg::before { content: ''; position: absolute; top: 0; left: 0; width: 32px; height: 32px; background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='white'/%3E%3Crect x='1' y='1' width='30' height='30' rx='15' fill='%23CCCCCC'/%3E%3Crect x='14.4004' y='13.6001' width='3.2' height='9.6' rx='1.6' fill='white'/%3E%3Crect x='14.4004' y='8.80002' width='3.2' height='3.2' rx='1.6' fill='white'/%3E%3C/svg%3E"); }
.ui-alert.warning .ui-alert-msg::before { background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='white'/%3E%3Cpath d='M14.2464 2.19779L0.624139 27.0383C-0.10678 28.3712 0.857652 30 2.37776 30H29.6222C31.1423 30 32.1068 28.3712 31.3759 27.0383L17.7536 2.19779C16.9944 0.81334 15.0056 0.813339 14.2464 2.19779Z' fill='%23CCCCCC'/%3E%3Crect x='14.5' y='10' width='3' height='10' rx='1.5' fill='white'/%3E%3Crect x='14.5' y='22' width='3' height='3' rx='1.5' fill='white'/%3E%3C/svg%3E"); }
.ui-alert.confirm .ui-alert-msg::before { background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='white'/%3E%3Crect x='1' y='1' width='30' height='30' rx='15' fill='%23CCCCCC'/%3E%3Crect x='14.4004' y='21' width='3.2' height='3.2' rx='1.6' fill='white'/%3E%3Cpath d='M12 12C12 9.5 14 8 16 8C18 8 20 9 20 12C20 15 16 16 16 16V18.5' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A"); }
.ui-alert.error .ui-alert-msg::before { background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='white'/%3E%3Crect x='1' y='1' width='30' height='30' rx='15' fill='%23CCCCCC'/%3E%3Crect x='21' y='9' width='2.82841' height='16.9704' rx='1.4142' transform='rotate(45 21 9)' fill='white'/%3E%3Crect x='9' y='11' width='2.82841' height='16.9704' rx='1.4142' transform='rotate(-45 9 11)' fill='white'/%3E%3C/svg%3E"); }
.ui-alert-footer { margin-top: 24px; }
.ui-alert-footer .btn-alert { min-width: 104px; height: 30px; line-height: 30px; border: 1px solid #c0c0c0; font-size: 12px; color: #333; }
.ui-alert-footer .btn-alert:hover:not(:disabled) { background-color: #f2f2f2; color: #444; }
.btn-alert+.btn-alert { margin-left: 8px; } 
.ui-txt-guide { padding: 0 50px; } .ui-txt-guide .ui-txt-guide-head { padding: 20px; }
.ui-txt-guide .ui-txt-guide-head p { font-size: 20px; font-weight: bold; color: #222; text-align: center; } 
.ui-txt-guide .ui-txt-guide-cont { border-top: 1px solid #d2d2d2; padding: 20px; }
.ui-txt-guide .ui-txt-guide-cont p { font-size: 14px; text-align: center; }`
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

