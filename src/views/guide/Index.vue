<template>
  <div class="guidewrap">
    <div class="guidetop">STRATO GUIDE</div>
    <div class="guidecontentwrap">
      <div class="guidelnb">
        <div class="menulist">
          <ul>
            <li v-for="(item, index) in state.guideMenu" :key="index" :class="{'active':item.name === String(currentPageComponent.__name)}" @click="onChangePage(item.name, item.label)">
              <span v-html="item.label"></span>
            </li>
          </ul>
        </div>
      </div>
      <component :is="currentPageComponent" :title="state.componentsTitle"></component>
    </div>
  </div>
  <Confirm />
  <LoadingPopup/>
</template>

<script setup>
import { Confirm } from '@/components';
import LoadingPopup from '@/components/loadingPopup/LoadingPopup.vue';

import { defineComponent, onMounted, reactive, computed, getCurrentInstance, shallowRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import Css from '@/views/guide/Css.vue';
import PageLayout from '@/views/guide/PageLayout.vue';
import Buttons from '@/views/guide/Buttons.vue';
import Menu from '@/views/guide/Menu.vue';
import Section from '@/views/guide/Section.vue';
import Card from '@/views/guide/Card.vue';
import Title from '@/views/guide/Title.vue';
import Tab from '@/views/guide/Tab.vue';
import Accordion from '@/views/guide/Accordion.vue';
import FormInput from '@/views/guide/FormInput.vue';
import FormInputCheck from '@/views/guide/FormInputCheck.vue';
import Modal from '@/views/guide/Modal.vue';
import ToolTip from '@/views/guide/ToolTip.vue';
import List from '@/views/guide/List.vue';
import Components from '@/views/guide/Components.vue';
import SmartSearch from '@/views/guide/SmartSearch.vue';
import Table from '@/views/guide/Table.vue';
import Icon from '@/views/guide/Icon.vue';
import DatePicker from '@/views/guide/DatePicker.vue';
import Pageing from '@/views/guide/Pageing.vue';

import Settings from '@/views/guide/Settings.vue';
import Codes from '@/views/guide/Codes.vue';

import { useCommFunc } from '@/core/helper/common.js';

const { goToPage } = useCommFunc();
const router = useRouter();
const route = useRoute();
const state = reactive({
  guideMenu: [
    { label: '환경 설정', name: 'Settings' },
    { label: '코드 작성 가이드', name: 'Codes' },
    // { label: 'Css 가이드', name: 'Css' },
    { label: '페이지 레이아웃', name: 'PageLayout' },
    { label: '공통 컴포넌트', name: 'Components' },
    { label: 'Smart Search(테이블 검색)', name: 'SmartSearch' },
    // { label: '테이블', name: 'Table' },
    { label: '아이콘', name: 'Icon' },
    { label: '버튼', name: 'Buttons' }
    // { label: '카드', name: 'Card' },
    // { label: '메뉴', name: 'Menu' },
    // { label: '타이틀', name: 'Title' },
    // { label: '리스트', name: 'List' },
    // { label: '테이블 페이징', name: 'Pageing' },
    // { label: '탭', name: 'Tab' },
    // { label: '아코디언', name: 'Accordion' },
    // { label: '폼-input', name: 'FormInput' },
    // { label: '폼-radio,checkbox', name: 'FormInputCheck' },
    // { label: '데이터피커', name: 'DatePicker' },
    // { label: '툴팁', name: 'ToolTip' },
    // { label: '모달팝업', name: 'Modal '}
    // { label: '토스트 팝업', name: 'Toast' },
    // { label: '페이징', name: 'Pageing' },
    // { label: '데이터피커', name: 'Datepicker' }
  ],
  componentsTitle: '페이지 레이아웃'
});
const componentsMap = {
  'Settings': { component: Settings, title: '환경 설정' },
  'Codes': { component: Codes, title: '코드 작성 가이드' },
  // 'Css': { component: Css, title: 'Css 가이드' },
  'PageLayout': { component: PageLayout, title: '페이지 레이아웃' },
  'Components': { component: Components, title: '공통 컴포넌트' },
  'SmartSearch': { component: SmartSearch, title: 'smart search' },
  // 'Table': { component: Table, title: '테이블' },
  'Icon': { component: Icon, title: '아이콘' },
  'Buttons': { component: Buttons, title: '버튼' }
  // 'Menu': { component: Menu, title: '메뉴' },
  // 'Card': { component: Card, title: '카드' },
  // 'Title': { component: Title, title: '타이틀' },
  // 'List': { component: List, title: '리스트' },
  // 'Pageing': { component: Pageing, title: '테이블 페이징' },
  // 'Tab': { component: Tab, title: '탭' },
  // 'Accordion': { component: Accordion, title: '아코디언' },
  // 'FormInput': { component: FormInput, title: '폼-input' },
  // 'FormInputCheck': { component: FormInputCheck, title: '폼-radio,checkbox' },
  // 'DatePicker': { component: DatePicker, title: '데이터피커' },
  // 'Modal': { component: Modal, title: '모달팝업' },
  // 'ToolTip': { component: ToolTip, title: '툴팁' }
  // 'Toast': { component: ToolTip, title: '토스트' },
};
const currentPageComponent = shallowRef(PageLayout);
const onChangePage = async (pageName, pageTitle) => {
  const compontUrl = `/guide?guideName=${pageName}`;
  goToPage(compontUrl);
    // state.componentsTitle = pageTitle;
  const componentData = componentsMap[pageName];
  if (componentData) {
    currentPageComponent.value = componentData.component;
    state.componentsTitle = componentData.title;
  } else {
    currentPageComponent.value = null;
  }
};

// 초기 설정
onMounted(() => {
  if (route.query.guideName) {
    const guideName = route.query.guideName;
    const componentData = componentsMap[guideName];

    if (componentData) {
      currentPageComponent.value = componentData.component;
      state.componentsTitle = componentData.title;
    } else {
      currentPageComponent.value = null;
    }
  }
});
</script>

<style>
#app { font-size: 14px; }
.guidewrap{width:100%; height:100%;position: relative; font-size: 12px; }
.guidetop{width:100%; height:50px;background:#1C2536;padding:0 20px; color: #fff; font-size:20px; font-weight:700;display: flex; align-items: center; position: absolute; left:0; top:0;}
.guidecontentwrap{width:100%; height:100%; display:flex; padding-top:50px}
.guidelnb{flex:0 0 200px;position: relative;}
.guidelnb .menulist {position: relative; z-index: 3;}
.guidelnb .menulist > ul > li{ padding:15px 20px; border-bottom:solid 1px #ddd; position: relative; }
.guidelnb .menulist > ul > li > span{display: block;position: relative; z-index:2;}
.guidelnb .menulist > ul > li:after{content:""; display: block; width:15px; height:15px; position: absolute; right:20px; top:17px;background:url('/images/icon-arrow-right.svg') 0 0/100%}
.guidelnb .menulist > ul > li.active{font-weight:700;}
.guidelnb .menulist > ul > li.active:before{content:''; display:block; width:100%; height:100%;background: #ddd;position: absolute; left:0px; top:0px;}
.guidecontent{flex:1 1 auto;padding:15px 30px;overflow-y:auto}
.guidelnb:after{content:''; width:13px; height:100%; background:url('/images/footer-bg.png') repeat-y -65px; position: absolute; right:0; top:0;}
.guidetitle{color:#000; font-size:25px;font-weight:700; border-bottom:solid 1px #000; padding-bottom:10px; position: relative;}

.btn-sample{height:30px; background:#1297F2; color:var(--base-wh-color); font-size:12px; font-weight:700; border-radius:5px; line-height:28px; padding:0 15px;}
.guidetitle .btn-sample{position: absolute; right:0; top:0}

.guidememo{padding:20px;}
.guidememo .memotitle{font-size:16px; font-weight:700;  background:url('/images/icon-ribbon.svg') no-repeat left center; padding-left:20px; margin-bottom:20px}
.guidememo .example .memotitle { display: inline-block; padding: 0 20px 0 0; margin: 20px 0; font-size:15px; font-weight:700; background:url('/images/icon-arrow-right.svg') right center no-repeat }

.memo-list{margin-left:24px}
.memo-list li{position: relative; padding-left:10px; margin-top:10px;}
.memo-list li:nth-of-type(1){margin-top:0px}
.memo-list li:after{content:''; display: block; width:3px; height:3px; border-radius:50%; background:#666; position: absolute; left:0; top:7px;}

.example { padding: 20px; }

.codewrap{padding: 0 20px;}
.codetitle{font-size:16px; font-weight:700; width:100%; padding:20px 20px 20px 0; position: relative;}
.codetitle > span{font-size:16px; font-weight:700; width:calc(100% - 70px); display:block; cursor: pointer;}
.codetitle .v-btn {position: absolute; right: 0; top:17px}
.code{background: #282c34;border-radius: 6px;padding: 10px 20px; height: auto; transition: all .3s;}
code{color: #FFCB6B;;font-family: Consolas, monospace !important;}
.up.codewrap .codetitle{ background: url('/images/icon-arrow-down.svg') no-repeat 26px center; border:solid 1px; border-radius:5px;}
.up.codewrap .codetitle + .code{height:0; transition: all .3s; padding:0 20px}
.up.codewrap .codetitle + .code pre{display: none;}
.up.codewrap .codetitle .btn{display: none;}
.tagstyle{color:#F07178; font-weight:700;}
/* .code.CSS code{color:#C3E88D}
.code.HTML code{color:#F07178;} */
.code code{color:#89DDFF;}
.link{color:#006e6c; font-weight: 700;}
</style>