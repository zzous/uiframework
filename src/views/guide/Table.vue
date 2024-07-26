<template>
  <div class="guidecontent">
    <div class="guidetitle">{{ title }}</div>
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
    <div class="example">
      <DataTable />
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
import { reactive } from 'vue';
import DataTable from '@/components/DataTable.vue';
const props = defineProps({ title: String });
const state = reactive({
  className: '',
  codeSample: [
    {
      title: 'Pages',
      sampleCodeJS: `<template>
  <DataTable
    class="row-pointer"                       // class style 지정
    :headers="headers"                        // table header 설정
    :datas="datas"                            // row data list
    :search="search"
    :options="options"
    show-select
    :single="single"
    :selected-items="checkedUserList"
    item-value="uuid"
    :set-total="setTotal"
    :v-model="checkedUserList"
    @get-checkedbox-item="onCheckedBoxItem"
  />
</template>

// script
import DataTable from '@/components/DataTable.vue';
`
    },
    {
      title: 'DataTable.vue',
      sampleCodeJS: `<v-data-table
  ref="spDataTableRef"
  class="sp-data-table"                         // class style 지정
  :custom-filter="customFilter"                 // 미사용
  :custom-key-filter="customKeyFilter"          // 미사용
  :expanded="expanded"                          // toggle 확장
  :expand-on-click="expandOnClick"              // 확장 event
  :filter-keys="filterKeys"                     // 미사용
  :filter-mode="filterMode"                     // 미사용
  :fixed-footer="fixedFooter"                   // 미사용
  :fixed-header="fixedHeader"                   // header 고정
  :group-by="groupBy"                           // 미사용
  :item-key="optionsProp['item-key']"           // 미사용
  :headers="headers"                            // header 설정
  :height="height"                              // 높이 고정 ( default: auto )
  :hide-no-data="hideNoData"                    // 미사용
  :item-children="itemChildren"                 // 미사용
  :item-props="itemProps"                       // 미사용
  :items="filterDatas"                          // ?
  :item-title="itemTitle"                       // ?
  :item-value="itemValue"                       // ?
  :model-value="modelValue"                     // ?
  :multi-sort="multiSort"                       // 미사용
  :must-sort="mustSort"                         // 미사용
  :no-data-text="noDataText"                    // no - data - text
  :no-filter="noFilter"                         // 미사용
  :page="lazyPage"                              // page
  :return-object="returnObject"                 // 미사용
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
>`
    }
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

