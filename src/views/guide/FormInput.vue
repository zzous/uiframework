<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/forminput')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li>부모 태그 필수 사용(<strong class="tagstyle">&lt;div class="formInputbox" &gt;&lt;/div&gt;</strong>) </li>
                <li>디자인 변경 및 태그 확장성이 용이 하도록 <strong class="tagstyle">&lt;label&gt;,&lt;input&gt;</strong>태그 영역 분리 하여 사용</li>
                <li>error메세지 처리는 <strong class="tagstyle">&lt;div class="errormessage"&gt;,&lt;/div&gt;</strong>태그추가 하여 처리함</li>
                <li>파일 업로드<strong class="tagstyle">&lt;input type="file"&gt;</strong> 태그를 사용하고 CSS로 변형하여 디자인 변경</li>
                <li>업로드된 파일 리스트는 <strong class="tagstyle">&lt;div class="upload-file-box"&gt;</strong> 태그에 처리함(샘플 페이지 참고)</li>
                <li>부모 태그에 클래스 처리 하여 아이콘, 테이블 형태로 변경 가능(샘플 페이지 참고)</li>
                
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
<div class="formInputbox">
    <div class="labelbox">
        <label for="input1">텍스트 입력</label>
    </div>
    <div class="inputbox text">
        <input type="text" placeholder="텍스트를 입력하세요" id="input1">
        <div class="errormessage">error message</div>
    </div>
</div>
//파일 업로드 버튼
<div class="btn-file">
    <input type="file" id="upload-file" hidden="">
    <label class="btn-up" for="upload-file">파일첨부</label>
</div>
//파일 업로드 리스트 
<div class="upload-file-box">
    <div class="upload-file-head flex space-between">
        <button type="button" class="del-all"><span class="offscreen">전체파일삭제</span></button>
        <span class="name">파일명</span><span class="volume">용량</span>
    </div>
    <div class="upload-file-list"><div class="nonefile">등록된 파일이 없습니다.</div></div>
</div>
`
        },
        {
            title: 'CSS',
            sampleCodeJS: `inputbox{position: relative;}
.inputbox.text input[type="text"]{width:100%;height: 30px;padding: 6px 10px;border-radius: 5px;border:solid 1px #ddd; line-height:28px}
.inputbox.text input[type="text"]:disabled{background: #F7F9FA;}
.inputbox.text input[type="text"]:hover, .inputbox.text input[type="text"]:focus{border-color:var(--point-txt-color)}
.inputbox.text.icon:after{content:''; display:block;width:20px; height:20px; position: absolute; left:3px; top:5px;
background:url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none'
 xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.9165 11.6666H12.2581L12.0248 11.4416C13.0248 10.275 13.5415 8.68331 13.2581 6.99164C12.8665 4.67497 10.9331 2.82497 8.59979 2.54164C5.07479 2.10831 2.10812 5.07497 2.54146 8.59997C2.82479 10.9333 4.67479 12.8666 6.99146 13.2583C8.68312 13.5416 10.2748 13.025 11.4415 12.025L11.6665 12.2583V12.9166L15.2081 16.4583C15.5498 16.8 16.1081 16.8 16.4498 16.4583C16.7915 16.1166 16.7915 15.5583 16.4498 15.2166L12.9165 11.6666ZM7.91646 11.6666C5.84146 11.6666 4.16646 9.99164 4.16646 7.91664C4.16646 5.84164 5.84146 4.16664 7.91646 4.16664C9.99146 4.16664 11.6665 5.84164 11.6665 7.91664C11.6665 9.99164 9.99146 11.6666 7.91646 11.6666Z' fill='%23444444'/%3E%3C/svg%3E") no-repeat}
.inputbox.text.icon input{padding-left:23px}
.formInputbox .labelbox{font-size:12px; margin-bottom:5px;}
.formInputbox.error .inputbox.text input[type="text"]{border-color:var(--error-color)}
.formInputbox .errormessage{color:var(--error-color); font-size:12px; padding-left:16px; margin-top:7px;background: url('/images/error_outline.svg') no-repeat left center; display: none;}
.formInputbox.error .errormessage{display:block}
.formInputbox.labelleft{display:flex;align-items: center;}
.formInputbox.labelleft .labelbox{flex:0 0 130px; font-size:14px;}
.formInputbox.labelleft.bg{height:100%;}
.formInputbox.labelleft.bg .labelbox{background:#eee; margin-bottom:0; align-self: stretch; display: flex; align-items: center; justify-content: center; padding:10px 0;}
.formInputbox.labelleft.bg .inputbox.text{width:100%;padding:10px 20px 10px 15px}
.formtable .formtable-col{border:solid 1px #ddd}
.formtable.half {display: flex; }
.formtable.half .formtable-col{flex:1 1 auto}
.formtable.half .formtable-col:nth-of-type(odd){border-right:none}

/** input file **/
.btn-file { display: inline-block; }
.btn-file label { display: block; height: 28px; line-height: 28px; padding: 0 8px; border: 1px solid var(--base-bd-color); background-color: #fff; font-size: 12px; color: #464646; border-radius: 3px; cursor: pointer; }
.btn-file label:hover,
.btn-file label:focus { background-color: #f2f2f2;}
.upload-file-box .nonefile{padding:6px 10px;font-size:12px; font-size: 12px; color: #767676;}
.upload-file-box { width: 578px; margin-top: 10px; border: 1px solid var(--base-bd-color); border-radius: 3px; }
.upload-file-box .upload-file-head { position: relative; padding: 6px 10px 6px 32px; border-bottom: 1px solid var(--base-bd-color); font-size: 12px; color: #767676; }
.upload-file-box .upload-file-head .del-all { position: absolute; top: 7px; left: 10px; width: 12px; height: 12px; padding: 0; border: none; cursor:pointer; 
    background-color: transparent; background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' 
    xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.15035 2.85486C8.95535 2.65986 8.64035 2.65986 8.44535 2.85486L6.00035 5.29486L3.55535 2.84986C3.36035 2.65486 3.04535 2.65486 2.85035 2.84986C2.65535 3.04486 2.65535 3.35986 2.85035 3.55486L5.29535 5.99986L2.85035 8.44486C2.65535 8.63986 2.65535 8.95486 2.85035 9.14986C3.04535 9.34486 3.36035 9.34486 3.55535 9.14986L6.00035 6.70486L8.44535 9.14986C8.64035 9.34486 8.95535 9.34486 9.15035 9.14986C9.34535 8.95486 9.34535 8.63986 9.15035 8.44486L6.70535 5.99986L9.15035 3.55486C9.34035 3.36486 9.34035 3.04486 9.15035 2.85486Z' fill='%23767676'/%3E%3C/svg%3E"); background-repeat: no-repeat; }
.upload-file-box .upload-file-list .upload-file-list-item { position: relative; padding: 8px 10px 8px 32px; border: none; font-size: 12px; color: #444; }
.upload-file-box .upload-file-list .upload-file-list-item .del { position: absolute; top: 10px; left: 10px; width: 12px; height: 12px; padding: 0; border: none; background-color: transparent; background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.15035 2.85486C8.95535 2.65986 8.64035 2.65986 8.44535 2.85486L6.00035 5.29486L3.55535 2.84986C3.36035 2.65486 3.04535 2.65486 2.85035 2.84986C2.65535 3.04486 2.65535 3.35986 2.85035 3.55486L5.29535 5.99986L2.85035 8.44486C2.65535 8.63986 2.65535 8.95486 2.85035 9.14986C3.04535 9.34486 3.36035 9.34486 3.55535 9.14986L6.00035 6.70486L8.44535 9.14986C8.64035 9.34486 8.95535 9.34486 9.15035 9.14986C9.34535 8.95486 9.34535 8.63986 9.15035 8.44486L6.70535 5.99986L9.15035 3.55486C9.34035 3.36486 9.34035 3.04486 9.15035 2.85486Z' fill='%23767676'/%3E%3C/svg%3E"); background-repeat: no-repeat; }
.upload-file-box .upload-file-list .upload-file-list-item .name { display: inline-block; position: relative; padding-left: 20px; }
.upload-file-box .upload-file-list .upload-file-list-item .name::before { content: ''; position: absolute; top: 0; left: 0; width: 16px; height: 16px; 
background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath 
d='M12 13.5H4C3.72386 13.5 3.5 13.2761 3.5 13V3C3.5 2.72386 3.72386 2.5 4 2.5H8.58579C8.71839 2.5 8.84557 2.55268 8.93934 2.64645L12.3536 6.06066C12.4473 6.15443 12.5 6.2816 12.5 6.41421V13C12.5 13.2761 12.2761 13.5 12 13.5Z' stroke='%23444444'/%3E%3Cpath d='M8 2V6C8 6.55228 8.44772 7 9 7H13' stroke='%23444444'/%3E%3C/svg%3E"); }
.upload-file-box .upload-file-list .upload-file-list-item .img { display: inline-block; position: relative; width: 100px; }
.upload-file-box .upload-file-list .upload-file-list-item .img img { width: 100%; }
`
        }
//         {
//             title: 'JS',
//             sampleCodeJS: `// 오픈 이벤트
// const openAcc = (event) => {
//     const parEle = event.target.parentElement;
//     if (parEle.classList.contains('open')) {
//         parEle.classList.remove('open');
//     } else {
//         parEle.classList.add('open');
//     }
// };`  
//   },
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

