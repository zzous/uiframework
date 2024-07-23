<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/button')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li>html5 기본 태그로 사용</li>
                <li>클래스 추가 하여 사이즈 변경 (샘플페이지 참고)</li>
                <li>클래스 <strong class="tagstyle">.sm</strong> height=30</li>
                <li>클래스 <strong class="tagstyle">.ss</strong> height=28</li>
                <li>아이콘 버튼 사용시 <strong class="tagstyle">&lt;button &gt;</strong>태그 안의 아이콘 태그 추가 하여 사용 </li>
                <li>아이콘은 단독으로도 사용 가능 </li>
                <li>아이콘은 추후 업데이트 예정</li>
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
            sampleCodeJS: `<button type="button" class="btn submit">submit 버튼</button>
<button type="button" class="btn submit" disabled>submit 버튼</button>
<button type="button" class="btn error" >error 버튼</button>
<button type="button" class="btn error" disabled>error 버튼</button>`
        },
        {
            title: 'CSS',
            sampleCodeJS: `.btn { display: flex; justify-content: center; align-items: center; border-width: 1px; border-style: solid; border-radius: 5px; background-color: #fff;
min-width: 130px;height:36px; line-height: 34px; padding: 0 15px; font-size:14px; border-color: var(--point-txt-color); color: var(--point-txt-color); font-weight:500;}
.btn.inline { display: inline-block; }
.btn.sm{height:30px; line-height: 28px;  padding: 0 10px;font-size:14px }
.btn.ss{height:28px; line-height: 26px;  padding: 0 10px;font-size:12px }
.btn:hover:not(:disabled) { background-color: #F0F7FF; color: var(--point-txt-color); }

.btn.submit{border-color:#00BA88; color:#00BA88}
.btn.submit:hover:not(:disabled) { background-color:#F2FFFC; color:#00BA88}
.btn.error{border-color:var(--error-color); color:var(--error-color)}
.btn.error:hover:not(:disabled) { background-color:#FFF3F3;color:var(--error-color) }
.btn:disabled { border-color: #eee; color: #ccc; }

.btn.full { width: 100%; } 
.btn.posi { border-color:var(--point-txt-color); background-color: var(--point-txt-color); color: #fff; } 
.btn.posi:hover:not(:disabled) { background-color: #1B75BB; color: #fff; border-color: #1B75BB; } 
.btn.posi:disabled { background-color: #F6F6F6; color: #ccc; border-color:#eee }


.btn-sm { min-width:30px; padding: 0px 10px; height: 30px; border-color: #ccc; font-weight: bold; font-size: 12px; color: #333; } 
.btn-sm:hover:not(:disabled) { background-color: #f2f2f2; color: #444; }
.btn-sm.active { border-color: var(--point-txt-color); background-color: var(--point-txt-color); color: #fff; }
.btn-sm.active:hover:not(:disabled) { background-color: #1B75BB; color: #fff; border-color: #1B75BB;color: #fff; }
.btn-sm+.btn-sm { margin-left: 6px !important; } 

.btn-sm [class*='ico-'].right { margin: 0 0 0 4px; }
.btn-sm [class*='ico-'].sg { margin: 0 -6px; }
.btn-sm:disabled [class*='ico-'] { opacity: 0.6; }
.btn-ss { min-width:30px; padding: 0px 10px; height: 28px; line-height:28px; border-color:  var(--base-bd-color); font-weight: 500; font-size: 12px; color: #444; border-radius:3px; }
.btn-ss:hover:not(:disabled) { background-color: #f2f2f2; color: #444; }
.btn-ss.active { border-color: var(--point-txt-color); background-color: var(--point-txt-color); color: #fff; }
.btn-ss.active:hover:not(:disabled) { background-color: #1B75BB; color: #fff; border-color: #1B75BB;color: #fff; }
.btn-ss+.btn-ss { margin-left: 6px  !important;  }
.btn-ss [class*='ico-'] { display: block; width: 12px; height: 12px; margin-right: 4px; background-size: 12px 12px; background-position: 50% 50%; }
.btn-ss [class*='ico-'].right { margin: 0 0 0 4px; }`
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
