<template>
    <div class="guidecontent">
        <div class="guidetitle">{{ title }}
            <button type="button" class="btn-sample" @click="goToPage('/table')">샘플페이지 보기</button>
        </div>
        <div class="guidememo">
            <div class="memotitle">기본사용</div>
            <ul class="memo-list">
                <li></li>
                <!-- <li>Aggrid 사용</li>
                <li>부모 태그<strong class="tagstyle">&lt;div class="tbl-wrap"&gt;</strong> 안에<strong class="tagstyle">&lt;AgGridVue&gt;</strong> 컴포넌트로 처리</li>
                <li>테이블 상단 버튼이나 검색 추가 시<strong class="tagstyle">&lt;div class="table-util flex space-between"&gt;</strong> 태그 사용하여 작성함</li>
                <li>테이블  컬럼의 별도 처리는 슬롯을 사용하지 않고 aggrid에서 제공하는<strong class="tagstyle">cellRenderer</strong>함수로 처리</li>
                <li>페이징 처리는 Aggrid를 사용하지 않고 HTML태그와 스크립트로 별도 사용</li>
                <li>CSS는 Aggrid제공하는 CSS(현재 페이지 기준:<strong class="tagstyle">aggrid.css, aggrid_theme_alpine.css</strong>) +<strong class="tagstyle">&lt;div class="tbl-wrap"&gt;</strong> 태그 기준으로 CSS 재정의하여 사용 </li>
                <li> (옵션참고: <a href="https://www.ag-grid.com/vue-data-grid/getting-started/" target="_blank" class="link">https://www.ag-grid.com/vue-data-grid/getting-started/</a>)</li> -->
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
<v-data-table
    ref="spDataTableRef"
    class="sp-data-table"
    :custom-filter="customFilter"
    :custom-key-filter="customKeyFilter"
    :expanded="expanded"
    :expand-on-click="expandOnClick"
    :filter-keys="filterKeys"
    :filter-mode="filterMode"
    :fixed-footer="fixedFooter"
    :fixed-header="fixedHeader"
    :group-by="groupBy"
    :item-key="optionsProp['item-key']"
    :headers="headers"
    :height="height"
    :hide-no-data="hideNoData"
    :item-children="itemChildren"
    :item-props="itemProps"
    :items="filterDatas"
    :item-title="itemTitle"
    :item-value="itemValue"
    :model-value="modelValue"
    :multi-sort="multiSort"
    :must-sort="mustSort"
    :no-data-text="noDataText"
    :no-filter="noFilter"
    :page="lazyPage"
    :return-object="returnObject"
    :search="search"
    :show-expand="showExpand"
    :show-select="optionsProp['show-select']"
    :select-strategy="selectStrategy"
    :sort-by="sortBy"
    :width="width"
    :header-props="{ sortIcon: null }"
    :items-per-page="itemsPerPage"
    v-model="changeSelected"
    :class="{
      'hide-footer': hideFooter,
      'fixed-table': fixedTable,
    }"
    @update:sortBy="updateSortBy"
  >
`
        },
//         {
//             title: 'CSS',
//             sampleCodeJS: `.tbl-wrap .table-util { margin-bottom: 10px; }
// .tbl-wrap .ag-header-container { width: 100% !important; }
// .tbl-wrap .ag-center-cols-container { width: 100% !important; }
// .tbl-wrap .ag-root-wrapper { border: none; }
// .tbl-wrap .ag-header { border-top: 2px solid #000000; border-bottom: none; background-color: #F7F9FA; border-radius: 2px 2px 0 0; overflow: hidden; }
// .tbl-wrap .ag-row { border-top: 1px solid #ebebeb; border-bottom: none; }
// .tbl-wrap .ag-paging-panel { border-top-color: #ddd; }
// .tbl-wrap .ag-header-cell-text { font-size: 12px; font-weight: bold; color: #222; }
// .tbl-wrap .ag-body { border-bottom: 1px solid #ddd; }
// .tbl-wrap .ag-cell { font-size: 12px; color: #333; }
// .tbl-wrap .ag-cell a { display: inline-block; text-decoration: underline; }
// .tbl-wrap .ag-cell .btn { display: inline-block; margin-top: 6px; }
// .tbl-wrap .ag-checkbox-input-wrapper { width: 16px; height: 16px; }
// .tbl-wrap .ag-checkbox-input-wrapper::after { content: ''; width: 16px; height: 16px; border: 1px solid #999; background-color: #fff; border-radius: 3px; }
// .tbl-wrap .ag-checkbox-input-wrapper.ag-checked::after { border-color: #; background-color: #5142b2; background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='nond' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 7.85455L6.85714 10.4L12 4.8' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E"); background-position: 50% 50%; }
// .tbl-wrap [data-zoom=zoom1] .ag-header-cell-text, .tbl-wrap [data-zoom=zoom1] .ag-cell { font-size: 9px; }
// .tbl-wrap [data-zoom=zoom2] .ag-header-cell-text, .tbl-wrap [data-zoom=zoom2] .ag-cell { font-size: 10px; }
// .tbl-wrap [data-zoom=zoom3] .ag-header-cell-text, .tbl-wrap [data-zoom=zoom3] .ag-cell { font-size: 11px; }
// .tbl-wrap [data-zoom=zoom1] .ag-cell { line-height: 2; }
// .tbl-wrap [data-zoom=zoom2] .ag-cell { line-height: 2.2; } 
// .tbl-wrap [data-zoom=zoom3] .ag-cell { line-height: 2.4; } `
//         },
        {
            title: 'JS',
            sampleCodeJS: `const state = reactive({
    caseType: false,
    className: '',
    value: [
        { headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 30 }, // 체크박스
        { headerName: '이름',  field: 'name', valueGetter: 'node.rowIndex + 1', maxWidth: 70 },
        { headerName: '클라우드타입',  field: 'cloudtype', flex: 1},
        { headerName: '가용스토리지',
            field: 'ablestorage',
            maxWidth: 220,
            cellRenderer: (params) => {
                //태그 추가 및 이벤트 처리 
                const tagString = '<div class="barChart" id="ablestorage-'(params.node.rowIndex)'"><em class="bar" style="width:(30)%"></em></div> <em class="datarate">)(30)%</em>';
                const tagTarget = document.createElement('div');
                tagTarget.classList.add('barbox');
                tagTarget.innerHTML = tagString;
                return tagTarget;
            }
        },
        { headerName: '사용여부',
            field: 'usetype',
            flex: 1,
            maxWidth: 220,
            cellRenderer: (params) => {
                //태그 추가 및 이벤트 처리 
                const tagString = '<div class="switch"><input type="checkbox" id="usetype-'(params.node.rowIndex)'" /><label for="usetype-(params.node.rowIndex)">미사용</label></div>';
                const tagTarget = document.createElement('div');
                tagTarget.classList.add('checkbox');
                tagTarget.innerHTML = tagString;
                const buttonEventTarget = tagTarget.querySelector('#usetype-(params.node.rowIndex)');
                buttonEventTarget.addEventListener('change', (event) => {
                    const label = tagTarget.querySelector('#usetype-'(params.node.rowIndex)').parentNode.children[1];
                    if (event.target.checked) {
                        label.innerHTML = '사용';
                    } else {
                        label.innerHTML = '미사용';
                    }
                });
                return tagTarget;
            }
        },
        { headerName: '동기화 일시',  field: 'synch', flex: 1 }
    ],
    rowData: [
        {
            name: 'DATASTORE1',
            cloudtype: '가동중',
            ablestorage: '',
            usetype: '',
            synch: '2023.04.12 13:22:14'
        },
    ],
    defaultColDef: {
        sortable: false,
        filter: false,
        resizable: false,
        headerClass: 'centered',
        cellClass: 'centered',
        flex: 1
    },`
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

