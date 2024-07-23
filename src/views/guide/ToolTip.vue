<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/modal')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li>툴팁 버튼 태그는 <strong class="tagstyle">&lt;button type="button" class="btn-tooltip" &gt;&lt;/button&gt;</strong> 사용</li>
                <li>툴팁의 화살표는 <strong class="tagstyle">&lt;div class="toolTip" &gt;&lt;/div&gt;</strong> 태그에 클래스 추가 하여 사용 가능(.left, right, .top, .bottom)</li>
                <li>툴팁의 위치는 현재 부모 태그 기준으로 지정되어 있음</li>
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
<div class="toolTip">
    <button type="button" class="btn-tooltip">툴팁</button>
    <div class="tooltipbox left open"> <div>툴팁 내용</div></div>
</div>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `/* 툴팁 */
.toolTip { display: inline-block; } 
.tooltipbox { padding: 10px 15px; background: rgba(0, 0, 0, 0.5); color: #fff; font-size: 12px; border-radius: 3px; position: absolute; width: max-content; display: none; }
.tooltipbox.open { display: block; }
.tooltipbox:after { content: ""; display: block; position: absolute; width: 0; height: 0; border-top: 4px solid transparent; border-bottom: 4px solid transparent; border-right: 4px solid rgba(0, 0, 0, 0.5); /* 화살표 */ left: -4px; top: 14px; }
.tooltipbox.bottom:after { border-top: 4px solid transparent; border-left: 4px solid transparent; border-bottom: 4px solid rgba(0, 0, 0, 0.5); /* 화살표 */ border-right: 4px solid transparent; left: 50%; top: -8px; }
.tooltipbox.right:after { border-top: 4px solid transparent; border-left: 4px solid rgba(0, 0, 0, 0.5); /* 화살표 */ border-bottom: 4px solid transparent; border-right: 4px solid transparent; left: 100%; top: calc(50% - 4px); }
.tooltipbox.top:after { border-top: 4px solid transparent; border-left: 4px solid transparent; border-top: 4px solid rgba(0, 0, 0, 0.5); /* 화살표 */ border-bottom: 4px solid transparent; border-right: 4px solid transparent; left: 50%; top: 100%; }`
        },
        {
            title: 'JS',
            sampleCodeJS: `
//툴팁 오픈
const onClickTip = (e, type) => {
    const ele = e.target.nextSibling;
    const clientRect =   e.target.getBoundingClientRect().top -document.querySelector('.pageView').getBoundingClientRect().top ;
    const clientRectleft =   e.target.getBoundingClientRect().left - document.querySelector('.pageView').getBoundingClientRect().left;
    if (type === 'left') {
        state.offsetTop = clientRect - 10;
        state.offsetLeft = clientRectleft - 15;
    } else if (type === 'bottom') {
        state.offsetTop = clientRect + 30;
        state.offsetLeft = clientRectleft - 78;
    } else if (type === 'right') {
        state.offsetTop = clientRect - 10;
        state.offsetLeft = clientRectleft - 115;
    } else if (type === 'top') {
        state.offsetTop = clientRect - 40;
        state.offsetLeft = clientRectleft - 80;
    }
    ele.classList.contains('open') ? ele.classList.remove('open') : ele.classList.add('open');
};
//툴팁 닫기
const onCloseTip = (e) => {
    e.target.classList.remove('open');
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

