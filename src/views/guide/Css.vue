<template>
    <div class="guidecontent">
        <div class="guidetitle">
            {{ title }}
            <!-- <button type="button" class="btn-sample" @click="goToPage('/section')">샘플페이지 보기</button> -->
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li><strong class="tagstyle">케밥 케이스(kebab case)</strong> `my-class-name` 와 <strong class="tagstyle">BEM(BEM, Block Element Modifier)</strong> `my-class-name__type` 과 혼용하여 사용한다.</li>
                <li>일반적인 경우 케밥 케이스(kebab case) 사용</li>
                <li>SCSS 사용</li>
                <li>공통 모듈 (commponent component) 을 제외한 페이지 STYLE 은 pageName.scss || pageName.css 정의 후 작성한다. 페이지 내에 <strong class="tagstyle">&lt;style&gt; 사용 금지</strong></li>
            </ul>
        </div>
        <div class="guidememo">
            <div class="memotitle">SCSS 사용</div>
            <ul class="memo-list">
                <li>공통 컴포넌트 (common component) 를 제외한 페이지 내에 <strong class="tagstyle">&lt;style&gt; 사용 금지</strong></li>
            </ul>
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
<div class="cardwrap">
    <div class="card" style="flex-basis: 300px; min-height: 100px;">
        내용 추가
    </div>
    <div class="card" style="flex-basis: 700px; min-height: 100px;">
        내용 추가
    </div>
</div>
`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.cardwrap{display: flex; flex-wrap:wrap; position: relative; left:-20px}
.card{flex:1;flex-shrink:1; flex-basis:400px;border:solid 1px #ddd; border-radius:5px; padding:15px;margin-left:20px; margin-bottom:20px; align-items: stretch; background:#fff}`
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

