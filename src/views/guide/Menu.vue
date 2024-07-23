<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/section')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li>3Depth기준</li>
                <li>메뉴 활성화 기준은 라우터 정보가 아닌 Dom 기준</li>
                <li>메뉴 활성화 클래스는 <strong class="tagstyle">&lt;li&gt;</strong> 태그에 지정 </li>
                <li>메뉴 Depth별로 클래스 지정<strong class="tagstyle">(.depth1, depth2, depth3)</strong></li>
                <li>메뉴의 하위메뉴가 있는 경우<strong class="tagstyle">.depth</strong> 클래스 지정</li>
                <li>현재 페이지인 경우 <strong class="tagstyle">.thispage</strong> 클래스 지정</li>
                <li>초기 접속시 메뉴 활성화는  <strong class="tagstyle">Mounted</strong>훅에서 <strong class="tagstyle">thisPageCheck()</strong> 함수 호출</li>
                <li><strong class="tagstyle">watch</strong>에서 라우터 변경 감지 하여  <strong class="tagstyle">thisPageCheck()</strong>  함수 호출 </li>
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
<div class="lnb-menu-list">
    <ul>
        <!-- 1depth -->
        <li v-for="(item, index) in state.menuList" :key="index" :class="['depth1',{depth:item.depth.length > 0}, {thispage:item.pagelink === state.thisPage}]">
            <button type="button" class="menutext" @click="menuClick(item.pagelink,'depth1', index)">
                <em class="text">{{ item.menu }}</em>
            </button>
            <ul v-if="item.depth.length > 0">
                <!-- 2depth -->
                <li v-for="(depth, idx) in item.depth" :key="idx" :class="['depth2', {depth:depth.depth.length > 0}, {thispage:depth.pagelink === state.thisPage}]">
                    <button type="button" class="menutext" @click="menuClick(depth.pagelink,'depth2', index, idx)">
                        <em class="text">{{ depth.menu }}</em>
                    </button>
                    <ul v-if="depth.depth.length > 0"  >
                        <!-- 3depth -->
                        <li v-for="(sub, i) in depth.depth" :key="i" :class="['depth3', {thispage:sub.pagelink === state.thisPage}]">
                            <button class="menutext" @click="menuClick(sub.pagelink,'depth3', index, idx, i)">
                                <em  class="text"> {{ sub.menu }}</em>
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.lnb-menu-list .menutext > .text{position: relative; z-index:2;display:block;}
.lnb-menu-list .menutext{display:block; position: relative; cursor: pointer; width:100%; text-align: left;}
.lnb-menu-list > ul{margin-top:20px;}
.lnb-menu-list > ul > li ul{height:0; transition: padding-top .3s; margin:0; background:#fff;}
.lnb-menu-list > ul > li ul li{display: none;}
.lnb-menu-list > ul > li > .menutext{padding:20px; font-size:15px; font-weight:700;}
.lnb-menu-list li > .menutext:after,.lnb-menu-list li > .menutext:before{display: block; content:''}
.lnb-menu-list li > .menutext:before{width:0%; height:100%; background:#ccc;position:absolute; right:0px; top:0px; transition: width .3s; z-index: 1; }
.lnb-menu-list li.active > .menutext:before, .lnb-menu-list li.thispage > .menutext:before{width:100%;}
.lnb-menu-list li > .menutext:hover:before{width:100%;}
.lnb-menu-list li.depth2{margin-top:5px;}
.lnb-menu-list li.depth1.depth > .menutext:after, .lnb-menu-list li.depth2.depth > .menutext:after{width:15px; height:15px;position:absolute; right:30px; top:20px; background: url('/images/icon-arrow-down.svg') no-repeat 0 0/100%;z-index:2;}


/* depth2 */
.lnb-menu-list li.depth2 .menutext{font-size:13px; padding:5px;}
.lnb-menu-list li.depth2.depth > .menutext:after{width:10px; height:10px; top:8px; right:13px}
.lnb-menu-list li.depth2 .menutext:before{border-radius:35px;}
.lnb-menu-list li.depth2 .menutext .text{padding-left:15px;}
.lnb-menu-list li.depth3 .menutext .text:after{content:''; display: block; width:3px; height:3px; border-radius:50%; background:#666; position: absolute; left:5px; top:8px;}

/* depth3 */
.lnb-menu-list li.depth3{margin-top:2px}
.lnb-menu-list li.depth3 > .menutext{font-size:13px; padding:0 5px;}
.lnb-menu-list li.depth3 .menutext{padding-top:0px}
.lnb-menu-list li.depth3 .menutext:hover:before,.lnb-menu-list li.depth3.active .menutext:before, .lnb-menu-list li.depth3.thispage .menutext:before{display: none;}
.lnb-menu-list li.depth3 .menutext em{color:#000}
.lnb-menu-list li.depth3 .menutext em:after{content:''; display: block; width:3px; height:1px; border-radius:0; background:#666; position: absolute; left:5px; top:8px;}
.lnb-menu-list li.depth3.active .menutext em,.lnb-menu-list li.depth3.thispage .menutext em{color:var(--point-txt-color)}
.lnb-menu-list li.depth3.active .menutext em:after, .lnb-menu-list li.depth3.thispage .menutext em:after{background:var(--point-txt-color)}

/* active */
.lnb-menu-list  li.active > ul, .lnb-menu-list  li.thispage > ul{height: auto;}
.lnb-menu-list  li.depth1.active > ul, .lnb-menu-list  li.depth1.thispage > ul{margin: 0px 15px;padding: 10px;}
.lnb-menu-list  li.depth2.active > ul, .lnb-menu-list  li.depth2.thispage > ul{margin: 0px;padding:5px;}
.lnb-menu-list  li.depth3.active > ul, .lnb-menu-list  li.depth3.thispage > ul{margin: 0px;padding:5px;}
.lnb-menu-list  li.depth.active > ul > li, .lnb-menu-list  li.depth.thispage> ul > li{display: block;}



.menuTop .lnb-menu-list > ul{margin-top:0; display:flex;}
.menuTop .lnb-menu-list > ul > li > ul{display: none;}
.menuTop .lnb-menu-list > ul > li{flex:1 1 auto; position: relative; }
.menuTop .lnb-menu-list > ul > li > .menutext {padding:20px 0 13px 0 }
.menuTop .lnb-menu-list > ul > li .menutext:before{display: none;}
.menuTop .lnb-menu-list li.depth1 > ul {position: absolute;margin: 0; height:auto; width:100%; padding-left:0}
.menuTop .lnb-menu-list{position: relative;}
.menuTop .lnb-menu-list:hover::after{content:""; display:block; width:100%; height:200px; position: absolute; left:0;top:50px; background: rgba(0,0,0,.5);}
.menuTop .lnb-menu-list:hover > ul > li > ul{display:block;}`
        },
        {
            title: 'DATA',
            sampleCodeJS: `
menuList: [
    {menu: 'menu1', pagelink: '/section', depth: [] },
    {menu: 'menu2',
        pagelink: '',
        depth: [
            {
                menu: 'menu2-1',
                pagelink: '/tab',
                depth: []
            },
            {
                menu: 'menu2-2',
                pagelink: '',
                depth: [
                    {menu: 'menu2-2-1', pagelink: '/table', depth: [] },
                    {menu: 'menu2-2-2', pagelink: '', depth: [] }
                ]
            }
        ]
    },
    {menu: 'menu3',
        pagelink: '',
        depth: [
            {
                menu: 'menu3-1',
                pagelink: '',
                depth: [
                    {menu: 'menu3-1-1', pagelink: '', depth: [] },
                    {menu: 'menu3-1-2', pagelink: '', depth: [] }
                ]
            },
            {
                menu: 'menu3-2',
                pagelink: '',
                depth: []
            }
        ]
    }
]`
        },
        {
            title: 'JS',
            sampleCodeJS: `
// 메뉴 클릭시 active
const menuClick = (url, depthType, depth1, depth2, depth3) => {
    const menuItemsDepth1 = document.querySelectorAll('.lnb-menu-list li.depth1');
    const menuItemsDepth2 = document.querySelectorAll('.lnb-menu-list li.depth2');
    const menuItemsDepth3 = document.querySelectorAll('.lnb-menu-list li.depth3');
    // depth1 비활성화
    if (depthType === 'depth1') {
        menuItemsDepth1.forEach((item, index) => {
            if (index !== depth1) {
                item.classList.remove('active');
            }
        });
    }
    // depth2 비활성화
    if (depthType === 'depth2') {
        menuItemsDepth2.forEach((item, index) => {
            if (index !== depth2) { item.classList.remove('active'); }
        });
    }
    // depth3 비활성화
    if (depthType === 'depth3') {
        menuItemsDepth3.forEach((item, index) => {
            item.classList.remove('active');
        });
    }
    // active
    const clickedSpan = event.target;
    const parentLi = clickedSpan.closest('li');
    parentLi.classList.add('active');
    //페이지 이동
    if (url !== '') {
        goToPage(url);
    }
};


// 해당 페이지 active
const thisPageCheck = () => {
    const menuItems = document.querySelectorAll('.lnb-menu-list li');
    menuItems.forEach(item => {
        if (item.classList.contains('thispage')) {
            if (item.classList.contains('depth3')) {
                item.parentNode.parentNode.classList.add('thispage');
                item.parentNode.parentNode.parentNode.parentNode.classList.add('thispage');
            } else if (item.classList.contains('depth2')) {
                item.parentNode.parentNode.classList.add('thispage');
            }
        }
    });
};

onMounted(() => {
    // 현재 메뉴 active
    state.thisPage = route.path;
    nextTick(() => {
        thisPageCheck();
    });
});
watch(route, () => {
    // 메뉴 변경 감지
    const menuItems = document.querySelectorAll('.lnb-menu-list li.thispage');
    menuItems.forEach(item => { item.classList.remove('thispage', 'active'); });
    state.thisPage = route.path;
    nextTick(() => {
        thisPageCheck();
    });
    
});`
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

