<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/formradio')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li>단일 사용시  <strong class="tagstyle">&lt;span class="radio" &gt;, &lt; span class="checkbox"&gt;</strong> 클래스 추가 하여 버튼 형태로 변경 가능</li>
                <li>일반 형태와 버튼, 탭버튼으로 사용 가능 부모 태그 &lt;span class="checkbox-group" &gt;, &lt;span class="radio-group" &gt;추가 후  <strong class="tagstyle">btn-group, type2</strong> 클래스 추가 하여 버튼 형태로 변경 가능</li>
                <li>스위치 형태로 사용시 <strong class="tagstyle">&lt;div class="switch" &gt;</strong> 태그 추가 후 사용</li>
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
//단일사용
<span class="checkbox"><input type="checkbox" id="input11" name="checkgroup"><label for="input11">버튼명</label></span>
//버튼 형태로 사용
<div class="checkbox-group btn-group">
    <span class="checkbox"><input type="checkbox" id="input11" name="checkgroup"><label for="input11">버튼명</label></span>
    <span class="checkbox"><input type="checkbox" id="input12" name="checkgroup"><label for="input12">버튼명</label></span>
    <span class="checkbox"><input type="checkbox" id="input13" name="checkgroup"><label for="input13">버튼명</label></span>
</div>
//스위치 형태로 사용
<div class="switch"><input type="checkbox" id="switch"><label for="switch">선택</label></div>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.radio-group.btn-group, .checkbox-group.btn-group { display: flex; }
.radio-group.btn-group .radio, .checkbox-group.btn-group .checkbox { display: block; }
.radio-group.btn-group .radio+.radio, .checkbox-group.btn-group .checkbox+.checkbox { margin-left: 6px; }
.radio-group.btn-group .radio input[type="radio"]+label,
.checkbox-group.btn-group .checkbox input[type="checkbox"]+label{ display: block; height: 28px; line-height: 28px; padding: 0 8px; border: 1px solid #d2d2d2; background-color: #fff; font-size: 12px; font-weight: 400; color: #767676; border-radius: 3px; }
.radio-group.btn-group .radio input[type="radio"]:checked+label, .checkbox-group.btn-group .checkbox input[type="checkbox"]:checked+label { border-color: var(--point-txt-color); background-color: var(--point-txt-color); font-weight: bold; color: #fff; }
.radio-group.btn-group .radio input[type="radio"]:hover+label, .checkbox-group.btn-group .checkbox input[type="checkbox"]:hover+label  { background-color: #f2f2f2; }
.radio-group.btn-group .radio input[type="radio"]:checked:hover+label, .checkbox-group.btn-group .checkbox input[type="checkbox"]:checked:hover+label { background-color: #1B75BB;border-color:#1B75BB }
.radio-group.btn-group .radio input[type="radio"]:checked+label, .checkbox-group.btn-group .checkbox input[type="checkbox"]:checked+label { border-color: var(--point-txt-color); background-color: var(--point-txt-color); font-weight: bold; color: #fff; }
.radio-group.btn-group .radio input[type="radio"]:disabled+label, .checkbox-group.btn-group .checkbox input[type="checkbox"]:disabled+label { border-color: #ebebeb; color: #a8a8a8; }
.radio-group.btn-group .radio input[type="radio"]+label::before,
.radio-group.btn-group .radio input[type="radio"]+label::after,
.checkbox-group.btn-group .checkbox input[type="checkbox"]+label::before,
.checkbox-group.btn-group .checkbox input[type="checkbox"]+label::after{ display: none; }

.radio-group.btn-group.type2 .radio+.radio, .checkbox-group.btn-group.type2{ display: inline-flex;}
.radio-group.btn-group.type2 .radio+.radio, .checkbox-group.btn-group.type2 .checkbox+.checkbox { margin-left: 0px; }
.radio-group.btn-group.type2 .radio input[type="radio"]+label,
.checkbox-group.btn-group.type2 .checkbox input[type="checkbox"]+label{ display: block; height: 24px; line-height: 24px; padding: 0 8px; border:none; border-radius: 0px; border:solid 1px #eee; }
.radio-group.btn-group.type2 .radio:nth-of-type(1) input[type="radio"]+label, .checkbox-group.btn-group.type2 .checkbox:nth-of-type(1) input[type="checkbox"]+label{border-radius: 4px 0 0 4px;}
.radio-group.btn-group.type2 .radio:nth-last-of-type(1) input[type="radio"]+label,
.checkbox-group.btn-group.type2 .checkbox:nth-last-of-type(1) input[type="checkbox"]+label{border-radius: 0 4px 4px 0;}

.radio-group.btn-group.type2 .radio input[type="radio"]:hover+label, .checkbox-group.btn-group.type2 .checkbox input[type="checkbox"]:hover+label  {  background-color: #EFF5FA;border-color:var(--point-txt-color); color:var(--point-txt-color) }
.radio-group.btn-group.type2 .radio input[type="radio"]:checked:hover+label, .checkbox-group.btn-group.type2 .checkbox input[type="checkbox"]:checked:hover+label { background-color: #EFF5FA;border-color:#1B75BB }
.radio-group.btn-group.type2 .radio input[type="radio"]:checked+label, .checkbox-group.btn-group.type2 .checkbox input[type="checkbox"]:checked+label {  border-color: var(--point-txt-color); background-color:#EFF5FA;  color: var(--point-txt-color); }
.radio-group.btn-group.type2 .radio input[type="radio"]:disabled+label, .checkbox-group.btn-group.type2 .checkbox input[type="checkbox"]:disabled+label { border-color: #ebebeb; color: #a8a8a8; }
.radio-group.btn-group.type2 .radio input[type="radio"]+label::before,
.radio-group.btn-group.type2 .radio input[type="radio"]+label::after,
.checkbox-group.btn-group.type2 .checkbox input[type="checkbox"]+label::before,
.checkbox-group.btn-group.type2 .checkbox input[type="checkbox"]+label::after{ display: none; }


.switch input[type="radio"]+label::before, .switch input[type="checkbox"]+label::before{width:33px; height:17px; border-radius:30px;background-color: #999; border:none; background-image: none; }
.switch input[type="radio"]+label::after, .switch input[type="checkbox"]+label::after{content:''; position: absolute; top: 4px; left: 18px; width: 11px; height: 11px; background: #fff; border-radius:50%; transition: .3s;}
.switch input[type="radio"]+label, .switch input[type="checkbox"]+label{display: inline-block; position: relative;  line-height: 18px; padding-left: 38px; cursor: pointer; }
.switch input[type="radio"]:checked+label::after, .switch input[type="checkbox"]:checked+label::after{left:4px}
.switch input[type="radio"]+label:checked:before, .switch input[type="checkbox"]:checked+label::before{background-color: var(--point-txt-color);}
`
        }
//         {
//             title: 'JS',
//             sampleCodeJS: `// 오픈 이벤트
// const openAcc = (event) => {
//     const parEle = event.target.parentElement;
//     if (parEle.classList.contains('open')) {
//         parEle.classList.remove('open');
//     } else {
//         parEle.classList.add('open');
//     }
// };`  
//   },
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

