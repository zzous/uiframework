<template>
    <div class="pageView">
        <div class="guideTitle">DatePicker - 선택버튼 함께사용</div>
        <DatePicker ref="datepicker" :dayOpionType=state.dayOpionType  @selectDay ="selectDay"/>
        <div class="guideTitle">DatePicker - DatePicker만사용</div>
        <DatePicker ref="datepicker" :dayOpionType=state.dayOpionType :optionsType="false" @selectDay ="selectDay" />
        <div class="guideTitle">DatePicker - single</div>
        <DatePicker ref="datepicker" :optionsType="false"  :singleType="true" @selectDay ="selectDay"/>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import DatePicker from '@/components/DatePicker.vue';
import { useCommFunc } from '@/core/helper/common.js';
const {  dayJS } = useCommFunc();
const state = reactive({
    dateFormat: 'yyyy-MM-dd',
    /**
        * @type-1 { 1년:year, 6개월:month6, 1개월:month, 1주일:week, 당일:day }
        * 일주일/당일 옵션 없음
    */
    dayOpionType: 'month'
});
const datepicker = ref(null);
const  selectDay = (fromDay, toDay) => {
    console.log(dayJS(fromDay).format('YYYY-MM-DD'), dayJS(toDay).format('YYYY-MM-DD'));
};


</script>