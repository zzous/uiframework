<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="flex" style="justify-content:flex-end">
                <button type="button" class="btn posi" @click="goToPage('/guide?guideName=Modal')">가이드 페이지 </button>
            </div>
            <div class="guideTitle">alert창</div>
            <div class="flex">
                <button type="button" class="btn btn-ss" @click="modal('confirm', 'warning')">alert-warning(경고)</button>
                <button type="button" class="btn btn-ss" @click="modal('confirm', 'confirm')">alert-confirm(확인)</button>
                <button type="button" class="btn btn-ss" @click="modal('confirm', 'error')">alert-error(오류)</button>
                <button type="button" class="btn btn-ss" @click="modal('confirm')">alert-default(정보안내)</button>
            </div>
            <div class="guideTitle">팝업</div>
            <div class="flex">
                <button type="button" class="btn posi" @click="showModal">팝업오픈</button>
            </div>
            <div class="guideTitle">토스트 팝업</div>
            <div class="flex">
                <button type="button" class="btn" @click="showToast('default')">토스트-경고</button>
                <button type="button" class="btn" @click="showToast('error')">토스트-에러</button>
                <button type="button" class="btn" @click="showToast('success')">토스트-성공</button>
            </div>
            <div class="guideTitle">툴팁</div>
            <div class="flex">
                <div class="flex">
                    내용이 많은 경우 슬롯으로 처리
                    <ToolTip :toolBtn="'툴팁'">
                        <template #toolTipcon>
                            <div>가상 서버가  <br />생성되어 있는 <br /> 클라우드 서비스의 <br />기간별 평균사용 추이 입니다.</div>
                        </template>
                    </ToolTip>
                </div>
                <ToolTip :toolBtn="'툴팁'" :toolContent="'툴팁 설명입니다.'" :toolType="'top'" />
                <ToolTip :toolBtn="'툴팁'" :toolContent="'툴팁 설명입니다.'" :toolType="'bottom'" />
                <ToolTip :toolBtn="'툴팁'" :toolContent="'툴팁 설명입니다.'" :toolType="'top'" />
            </div>
        </div>
    </div>
    <DefaultModal :isShow="isShow" :modalTitle="'팝업 제목'" :buttonConfirm="'저장'" :buttonCancel="'취소'"
        @modalclose="modalControl">
        <template #modalcontent>
            <div>
                내용 추가
            </div>
        </template>
    </DefaultModal>
</template>
<script setup>
import {  reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import DefaultModal from '@/plugins/modal/modal/DefaultModal.vue';
import ToolTip from '@/components/ToolTip.vue';
import { useCommFunc } from '@/core/helper/common.js';
const {  $Modal, goToPage } = useCommFunc();
const state = reactive({
    offsetTop: null,
    offsetLeft: null
    
});
const isShow = ref(false);
const modal = (type, className) => {
    if (type === 'confirm') {
        $Modal.confirm({
            title: '타이틀이 있는 경우',
            message: '확인 취소 버튼 동시 사용/ 단일 사용 가능',
            className: className,
            //closeButtonHide: true
            buttonText: {
                confirm: '확인',
                cancel: '취소'
            }
        })
            .then(success => {
                console.log(success);
            })
            .catch(error => {
                console.log(error);
            });
    }
};
const modalControl = (type) => {
    if (type)
        switch (type) {
            case 'modalclose':
                return isShow.value = false;
            case 'modalconfirm':
                return isShow.value = false;
            case 'modalcancel':
                return isShow.value = false;
        }
    else isShow.value = false;
};
const showModal = () => {
    isShow.value = true;
};
const showToast = (type) => {
    console.log('111');
    switch (type) {
        case 'success':
            return toast('토스트 성공 메세지를 작성합니다.', 2000, 'success');
        case 'error':
            return toast('토스트 에러 메세지를 작성합니다.', 2000, 'error');
        case 'default':
            return toast('토스트 경고 메세지를 작성합니다.', 2000, 'default');
    }
    
};


</script>