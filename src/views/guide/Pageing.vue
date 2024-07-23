<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/table')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li>API 요청사항 - 리스트 전체 개수, 버튼 클릭 시 마다 가져올 리스트 개수</li>
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
            sampleCodeJS: `<ul class="pagination">
    <li class="page-item first" @click="onChangedPage(1, true)"><button type="button" class="page-link"><span class="offscreen">맨처음</span></button></li>
    <li class="page-item prev"><button type="button" class="page-link" @click="onChangedPage((state.currentPageNo-1), true)"><span class="offscreen">이전</span></button></li>
    <li class="page-item active"><button type="button" class="page-link" @click="onChangedPage(클릭한 페이지 번호, true)">1</button></li>
    .
    .
    .
    <li class="page-item next"><button type="button" class="page-link" @click="onChangedPage((state.currentPageNo+1), true)"><span class="offscreen">다음</span></button></li>
    <li class="page-item last"><button type="button" class="page-link" @click="onChangedPage((state.pageCount), true)"><span class="offscreen">맨마직막</span></button></li>
</ul>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.pagination { display: flex; align-items: center; margin-top: 20px; justify-content: center; }
.page-item + .page-item { margin-left: 6px; }
.page-item .page-link { min-width: 26px; height: 26px; line-height: 22px; padding: 0 8px; font-size: 12px; color: #767676; }
.page-item.active .page-link { border-color: var(--point-txt-color); background-color: var(--point-txt-color); font-weight: bold; color: #fff; border-radius: 50%; }
.page-item.first .page-link { 
  border: none; 
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' 
  fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath 
  d='M18.0002 16.728L13.2722 12L18.0002 7.272L16.7282 6L10.7282 12L16.7282 18L18.0002 16.728Z' fill='%23D2D2D2'/%3E%3Cpath 
  d='M13.0002 16.728L8.27224 12L13.0002 7.272L11.7282 6L5.72825 12L11.7282 18L13.0002 16.728Z' fill='%23D2D2D2'/%3E%3C/svg%3E"); } 
.page-item.prev .page-link {
  border: none;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' 
  xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.0001 16.7272L11.2721 11.9992L16.0001 7.27121L14.7281 5.99921L8.72808 11.9992L14.7281 17.9992L16.0001 16.7272Z' 
  fill='%23D2D2D2'/%3E%3C/svg%3E");
}
.page-item.next .page-link {
  border: none;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' 
  xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.00043 7.27278L12.7284 12.0008L8.00043 16.7288L9.27243 18.0008L15.2724 12.0008L9.27243 6.00078L8.00043 7.27278Z' 
  fill='%23D2D2D2'/%3E%3C/svg%3E");
}
.page-item.last .page-link {
  border: none;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' 
  xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.00024 7.272L10.7282 12L6.00024 16.728L7.27224 18L13.2722 12L7.27224 6L6.00024 7.272Z' 
  fill='%23D2D2D2'/%3E%3Cpath d='M11.0002 7.272L15.7282 12L11.0002 16.728L12.2722 18L18.2722 12L12.2722 6L11.0002 7.272Z' fill='%23D2D2D2'/%3E%3C/svg%3E");
}`
        },
        {
            title: 'JS',
            sampleCodeJS: `const props = defineProps(
    {
        itemCount: 전체 리스트 개수((Number)),
        cntPerPage: 리스트 요청시 마다 가져올 리스트 개수(Number),
        currentPage: 클릭 한 페이징 번호(Number)
    });
// 컴포넌트로 사용시 emit으로 현재 페이지 번호 전달
const emit = defineEmits(['changedPage']);
const state = reactive({
    countArrary: computed(() => getCounterView()), // paging view
    currentPageNo: computed(() => props.currentPage),
    itemCount: 0,
    pageCount: computed(() => {
        let cnt = parseInt('' + (props.itemCount - 1) / props.cntPerPage) + 1;
        return cnt;
    })
});
const getCounterView = () => {
    let first = 1;
    let last = props.currentPage;
    let gap = 0;
    let viewCouter = [];
    console.log('page cal > ', state.pageCount, props.currentPage);
    if (state.pageCount < 11) {
        first = 1;
        last = state.pageCount;
    } else {
        gap = (props.currentPage < 5) ? 5 - props.currentPage :
            (props.currentPage + 5 > state.pageCount) ? props.currentPage + 5 - state.pageCount : 0;
        first = (props.currentPage < 5) ? 1 : props.currentPage - 4 - gap;
        last =  (props.currentPage + 5 > state.pageCount) ? state.pageCount : props.currentPage + 5 + gap;
    }
    console.log(first, last);
    for (let i = first; i <= last; i++) {
        viewCouter.push(i);
    }
    return viewCouter;
};

const onChangedPage = (pageNo, eventFlag) => {
    if (pageNo <= 0) return;
    if (pageNo > state.pageCount) return;
    if (eventFlag) {
        // 컴포넌트로 사용시 emit으로 현재 페이지 번호 전달
        emit('changedPage', pageNo);
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

