<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/accordion')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li><strong class="tagstyle">&lt;div class="accordionBox" &gt;&lt;/div&gt;</strong>태그에 클래스 (.open) 추가 하여 동작 처리 함 </li>
                <li><strong class="tagstyle">&lt;div class="accordion_top" &gt;&lt;/div&gt;</strong> 타이틀 영역</li>
                <li>아코디언 콘텐츠 영역은 두가지 태그 필수 사용<strong class="tagstyle">&lt;div class="accordion_cons" &gt;&lt;/div&gt;, &lt;div class="acc_content" &gt;&lt;/div&gt;</strong></li>
                
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
<div class="accordionBox open">
    <div class="accordion_top">
        아코디언 타이틀
    </div>
    <div class="accordion_cons">
        <div class="acc_content">
            아코디언 콘텐츠
        </div>
    </div>
</div>
`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.accordionBox { width: 100%; height: 40px; box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.16); border-radius: 5px; } 
.accordionBox + .accordionBox { margin-top: 30px; } 
.accordionBox .accordion_top { height: 40px; padding: 10px 20px; font-size: 16px; font-weight: 700; position: relative; cursor: pointer; }
.accordionBox .accordion_top:after { content: ""; display: block; width: 20px; height: 20px; position: absolute; right: 20px; top: 10px; background: url("/images/icon-arrow-down.svg") no-repeat 0 0/100%; }
.accordionBox .accordion_cons { height: 0; padding: 0 20px; transition: all 0.3s; }
.accordionBox .acc_content { display: none; } 
.accordionBox.open { height: auto; }
.accordionBox.open .accordion_top:after { background: url("/images/icon-arrow-up.svg") no-repeat 0 0/100%; } 
.accordionBox.open .accordion_cons { height: auto; padding: 20px; border-top: solid 1px #ddd; transition: all 0.3s; }
.accordionBox.open .acc_content { display: block; }`
        },
        {
            title: 'JS',
            sampleCodeJS: `// 오픈 이벤트
const openAcc = (event) => {
    const parEle = event.target.parentElement;
    if (parEle.classList.contains('open')) {
        parEle.classList.remove('open');
    } else {
        parEle.classList.add('open');
    }
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

