<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <!-- <button type="button" class="btn-sample" @click="goToPage('/section')">샘플페이지 보기</button> -->
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li>2단 기본 메뉴(좌측 메뉴/우측 컨텐츠)</li>
                <!-- <li>레이아웃 변경시 <strong class="tagstyle">&lt;div class="layout" &gt;&lt;/div&gt;</strong> 태그에 클래스 추가 하여 스타일 재정의 하여 사용 (현재 기준  mentTop 클래스 추가시 레이아웃 구조 변경)</li> -->
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
            title: 'VIEW',
            sampleCodeJS: `
<top-drawer />
<FullMenu />
<SideDrawerMenu />
<main />
<FooterLayout />
<teleport />`
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
