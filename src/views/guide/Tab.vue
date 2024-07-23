<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/tab')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li>tabindex가 필요한 경우 <strong class="tagstyle">&lt;div class="tabcontent"&gt;</strong>태그에 추가하여 사용</li>
                <li>현재 탭 활성화 처리 <strong class="tagstyle">active</strong> 클래스 추가 하여 처리</li>
                <li>탭 콘텐츠 영역을 주소 처리 할 경우 라우터 path에 query로 처리함 (하단 참고)</li>
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
<div class="tabswrap">
    <!-- 탭버튼 -->
    <div class="tablist" role="tablist" >
        <ul>
            <li v-for="(item, index) in state.tabLists" :key="index" :class="{active:index === state.tabNum}">
                <button type="button" class="btn-tab" @click="onClickTab(index)" >{{ item.tablabel }}</button>
                <span class="ani" :style="left:"155*(state.tabNum)px"></span>
            </li>
        </ul>
        <div class="tabdec">텍스트 추가 영역</div>
    </div>
    <!-- 탭컨텐츠 -->
    <div class="tabconts">
        <template  v-for="(item, index) in state.tabLists.length" :key="index">
            <div class="tabcontent" v-show="state.tabNum === index"  role="tabpanel">
                <div :class="['tabpanel',{view:0 === index}]">
                    {{탭 (index+1) 영역}}
                </div>
            </div>
        </template>
    </div>
</div>
`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.tablist{width:100%;border-bottom:solid 1px #ddd; position: relative; }
.tablist .tabdec{position:absolute; right:0; top:0;}
.tablist ul{display: flex;; position: relative;}
.tablist .btn-tab{min-width:155px; height:40px; line-height:38px; text-align:center; border:solid 1px #ddd; border-bottom:none; background:#F7F9FA; font-size:14px; color:#999;}
.tablist .btn-tab + .btn-tab{border-left:none}
.tablist .active .btn-tab{background:#fff; color:#1D94E5; font-weight:700}
.tablist .ani{display:block; width:155px;height:2px; background:#1D94E5;position: absolute; left:0; top:0px;transition: left .3s;}
.tabcontent .tabpanel{padding:0; opacity:0; transition: all .2s;}
.tabcontent .tabpanel.view{padding:10px 0 0 0; opacity:1;}`
        },
        {
            title: 'DATA',
            sampleCodeJS: `
const state = reactive({
    tabNum: 0,  // 현재 탭 
    // 탭 리스트
    tabLists: [
        {tablabel: 'tab1'},
        {tablabel: 'tab2'},
        {tablabel: 'tab3'},
        {tablabel: 'tab4'},
        {tablabel: 'tab5'}
    ]
});
`
        },
        {
            title: 'JS',
            sampleCodeJS: `
// 탭 클릭 이벤트
const onClickTab = (index) => {
    const tablists = document.querySelectorAll('.tabcontent');
    // 탭 Active 처리
    state.tabNum = index;
    // 탭콘텐츠 모션 처리
    tablists.forEach((item, index) => {
        item.children[0].classList.remove('view');
    });
    setTimeout(() => {
        tablists[index].children[0].classList.add('view');
    }, 400);
    // 탭콘텐츠 url 처리
    const tabUrl = '/tab?tabid='+index;
    goToPage(tabUrl);
};
// 탬 초기 설정
onMounted(() => {
    Object.keys(route.query).length === 0 ? state.tabNum = 0 : state.tabNum = Number(route.query.tabid);
});
`
        },
        {
            title: 'ROUTER',
            sampleCodeJS: `
const withPrefix = (prefix, routes) => routes.map(route => {
    route.path = prefix + route.path;
    return route;
});

//라우터 path
...withPrefix('/tab', [
    {
        path: '/',
        name: 'TabPage',
        component: () => import('@/views/sample/TabPage.vue')
    },
    {
        name: 'TabPage_sub',
        path: '/:tabid',
        component: () => import('@/views/sample/TabPage.vue')
    }
]),
`
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

