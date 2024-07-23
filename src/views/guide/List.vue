<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/list')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li>Header영역<strong class="tagstyle">&lt;div class="listheader" &gt;&lt;/div&gt;</strong>과 본문 영역<strong class="tagstyle">&lt;div class="listline" &gt;&lt;/div&gt;</strong> 나누어 사용 </li>
                <li>야이콘 영역은 <strong class="tagstyle">&lt;div class="cellIcon" &gt;&lt;/div&gt;</strong>과 40px로 고정되어 있음 </li>
                <li><strong class="tagstyle">&lt;div class="listheader" &gt;&lt;/div&gt;</strong>안의 자식 태그의 클래스는 본문 영역<strong class="tagstyle">&lt;div class="listline" &gt;&lt;/div&gt;</strong>안의 태그의 클래스와 동일하게 사용 </li>
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
            sampleCodeJS: `<div class="listbox">
    <div class="listheader">
        <div class="cellIcon"></div>
        <div class="cellTitle">게이트웨이 명</div>
        <div class="listCell">연결 API 서버</div>
        <div class="listCell">활성화 상태</div>
        <div class="listCell">생성일시</div>
        <div class="cellIcon"></div>
    </div>
    <div class="listline">
        <div class="cellIcon"><img src="/images/icon-check-point.svg" style="width:20px"/></div>
        <div class="cellTitle">API Gateway Name A</div>
        <div class="listCell">-</div>
        <div class="listCell">
            <div class="switch">
                <input type="checkbox" id="switch" />
                <label for="switch">선택</label>
            </div>
        </div>
        <div class="listCell">2023.04.12 13:22:14</div>
        <div class="cellIcon"><img src="/images/icon-check-point.svg" style="width:20px" /></div>
    </div>
</div>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.listline, .listheader { display: flex; align-items: center; width: 100%; padding: 0 40px; }
.listline { height: 60px; background:#f1f1f1 border-radius: 10px; }
.listbox .cellIcon { flex: 0 0 40px; text-align: center; display: flex; align-items: center; }
.listbox .listCell { flex: 1; text-align: center; }
.listbox .cellTitle { flex: 3; font-weight: 700; }
.listline + .listline { margin-top: 20px; }
.listheader { margin-bottom: 20px; } 
.listheader .cellIcon, .listheader .listCell, .listheader .cellTitle { font-size: 16px; font-weight: 700; text-align: center; }`
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

