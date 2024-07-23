<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/datepicker')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>vue-datepicker 사용</li>
                <li>vue-datepicker를 커스터마이징한  <strong class="tagstyle">&lt;vue-datepicker&gt;</strong>로 사용(옵션: (날짜 + 버튼), (시작일 + 종료일), (날짜 단일))</li>
                <li>날짜 표기 형식은<strong class="tagstyle">dayJS</strong>로 사용(<strong class="tagstyle">/core/helper/common.js</strong>)</li>
                <li>CSS는 vue-datepicker제공하는 CSS(현재 페이지 기준:<strong class="tagstyle">datepicker.css</strong>) + 부모 태그 기준(현재 페이지 기준:<strong class="tagstyle"><strong class="tagstyle">&lt;div class="ui-datepicker"&gt;</strong> </strong>)으로 CSS 재정의하여 사용 </li>
                <li> (옵션참고: <a href="https://vue3datepicker.com/" target="_blank" class="link">https://vue3datepicker.com/</a>)</li>
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
            sampleCodeJS:
`<!-- 
    :dayOpionType: 초기 날짜 표기 옵션(String)
    :singleType: 날짜 컴포넌트 하나만 사용(Boolean)
    :optionsType: 시작일 + 종료일 옵션 사용(Boolean)
    :selectDay:날짜 변경 이벤트(날짜 선택시 콘솔에 표기)
-->
<DatePicker :dayOpionType=state.dayOpionType  :singleType="true" :optionsType="false" @selectDay ="selectDay" />`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.dp__input_wrap::before { content: ""; position: absolute; top: 8px; left: 8px; width: 16px; height: 16px; 
background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd'
d='M5.5 3C5.22386 3 5 3.22386 5 3.5V4H4C3.44772 4 3 4.44772 3 5V6V7V12C3 12.5523 3.44772 13 4 13H12C12.5523 13 13 12.5523 13 12V7V6V5C13 4.44772 12.5523 4 12 
4H11V3.5C11 3.22386 10.7761 3 10.5 3C10.2239 3 10 3.22386 10 3.5V4H6V3.5C6 3.22386 5.77614 3 5.5 3ZM12 6V5H4V6H12ZM4 7V12H12V7H4Z' fill='%23222222'/%3E%3C/svg%3E"); } 
.dp__input_wrap svg { display: none; } 
.dp__input { height: 32px; padding: 0 0 0 28px; border-color: #d2d2d2; font-size: 12px; color: #444; }
.ui-datepicker { width: 100px; }
.ui-datepicker .dp__arrow_top { display: none; }
.ui-datepicker.ss .dp__input { height: 28px; }
.ui-datepicker.ss .dp__input_wrap::before { top: 6px; }
.ui-datepicker-range { display: flex; align-items: center; }
.ui-datepicker-range .custom-select { margin-left: 8px; }`
        },
        {
            title: 'JS',
            sampleCodeJS: `const state = reactive({
    dateFormat: 'yyyy-MM-dd',
    /**
        * @type-1 { 1년:year, 6개월:month6, 1개월:month, 1주일:week, 당일:day }
        * 일주일/당일 옵션 없음
    */
    dayOpionType: 'month'
});
const datepicker = ref(null);
const  selectDay = (fromDay, toDay) => {
    console.log(dayJS(fromDay).format('YYYY-MM-DD'), dayJS(toDay).format('YYYY-MM-DD'));
};`
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

