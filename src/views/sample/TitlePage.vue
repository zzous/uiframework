<template>
    <div class="pageView">
        <div class="guideTitle">타이틀 레이아웃</div>
        <div class="titlebox">
            <h1 class="pagetitle">페이지 타이틀 <em class="subdec">(11)</em></h1>
            <div class="titleright flex">
                <button type="button" class="btn sm">버튼명</button>
                <button type="button" class="btn sm">버튼명</button>
            </div>
        </div>
        <div class="guideTitle">타이틀 레이아웃 - 아이콘 추가</div>
        <div class="titlebox img">
            <h1 class="pagetitle">페이지 타이틀 <em class="subdec">(11)</em></h1>
            <div class="titleright flex">
                <button type="button" class="btn sm">버튼명</button>
                <button type="button" class="btn sm">버튼명</button>
            </div>
        </div>
        <div class="guideTitle">타이틀 레이아웃 - 아이콘, 툴팁추가</div>
        <div class="titlebox img">
            <h1 class="pagetitle">
                페이지 타이틀
                <div class="toolTip">
                    <button type="button" class="btn-tooltip" @click="onClickTip($event, 'top')">버튼명</button>
                    <div class="tooltipbox top" :style="`top:${(state.offsetTop)}px; left:${(state.offsetLeft)}px`" @click="onCloseTip">툴팁 설명입니다.</div>
                </div>
            </h1>
            <div class="titleright flex">
                <button type="button" class="btn sm">버튼명</button>
                <button type="button" class="btn sm">버튼명</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
const { goToPage } = useCommFunc();
const state = reactive({
    caseType: false,
    className: '',
    offsetTop: null,
    offsetLeft: null
    
});
const onClickTip = (e, type) => {
    const ele = e.target.nextSibling;
    const clientRect =  window.pageYOffset + e.target.getBoundingClientRect().top;
    const clientRectleft =  window.pageXOffset + e.target.getBoundingClientRect().left;
    if (type === 'left') {
        state.offsetTop = clientRect - 10;
        state.offsetLeft = clientRectleft + 30;
    } else if (type === 'bottom') {
        state.offsetTop = clientRect + 30;
        state.offsetLeft = clientRectleft - 50;
    } else if (type === 'right') {
        state.offsetTop = clientRect - 10;
        state.offsetLeft = clientRectleft - 115;
    } else if (type === 'top') {
        state.offsetTop = clientRect - 40;
        state.offsetLeft = clientRectleft - 50;
    }
    ele.classList.contains('open') ? ele.classList.remove('open') : ele.classList.add('open');
};
const onCloseTip = (e) => {
    e.target.classList.remove('open');
};
</script>
<style scoped>

</style>