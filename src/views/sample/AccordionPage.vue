<template>
    <div class="pageView">
        <div class="guideTitle">아코디언 </div>
        
        <Accordion :itemTitle="'아코디언 타이틀'" :itemContent="'아코디언 내용'" />
        <Accordion :itemTitle="'아코디언 타이틀 내용 슬롯'">
            <template #acccon>
                <div>
                    <div class="tbl-wrap">
                        <div class="table-util flex space-between">
                            <div class="btn-set-m flex">
                                <button type="button" class="btn btn-ss">버튼 1</button>
                                <button type="button" class="btn btn-ss">버튼 2</button>
                            </div>
                            <div class="btn-set-m flex align-end">
                                <span class="table-total">조회결과 총 <strong>2</strong>건</span>
                                <button type="button" class="btn btn-opt">
                                    <span class="ico-download"></span>파일다운로드
                                </button>
                                <select class="custom-select sm">
                                    <option value="10개">10개</option>
                                    <option value="20개">20개</option>
                                    <option value="30개">30개</option>
                                    <option value="40개">40개</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="switch">
                        <input type="checkbox" id="switch" />
                        <label for="switch">선택</label>
                    </div>
                </div>
            </template>
        </Accordion>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
import Accordion from '@/components/Accordion.vue';
const { goToPage } = useCommFunc();
</script>