<template>
    <div class="pageView">
        <div class="pageBgbox">
            <div class="flex" style="justify-content:flex-end">
                <button type="button" class="btn posi" @click="goToPage('/guide?guideName=Table')">가이드 페이지 </button>
            </div>
            <div class="guideTitle">테이블</div>
            <!-- 테이블 -->
            <div class="tbl-wrap">
                <div class="table-util flex space-between">
                    <div class="btn-set-m flex align-end">
                        <span class="table-total">조회결과 총 <strong>2</strong>건</span>
                        <button type="button" class="btn btn-ss">
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
                <!-- <AgGridVue :columnDefs="state.value" :rowData="state.rowData" :defaultColDef="state.defaultColDef"
                    class="ag-theme-alpine" :domLayout="'autoHeight'" rowSelection="multiple">
                </AgGridVue> -->
            </div>
            <div class="guideTitle">테이블-페이징</div>
            <div class="flex" style="justify-content:flex-end">
                <button type="button" class="btn posi" @click="goToPage('/guide?guideName=Pageing')">가이드 페이지 </button>
            </div>
            <!-- 페이징 컴포넌트 -->
            <PageNavigation :cntPerPage='pager.size' :itemCount='pager.totalCnt' :currentPage="pager.current"
              @changedPage="onChangedPage" />
        </div>
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useCommFunc } from '@/core/helper/common.js';
import DatePicker from '@/components/DatePicker.vue';
const {  dayJS, goToPage } = useCommFunc();
const state = reactive({
    caseType: false,
    className: '',
    value: [
        { headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 30 },
        { headerName: '이름',  field: 'name', valueGetter: 'node.rowIndex + 1', maxWidth: 70 },
        { headerName: '클라우드타입',  field: 'cloudtype', flex: 1},
        { headerName: '접근가능여부',  field: 'abled', flex: 1, suppressSizeToFit: true },
        { headerName: '블록타입',  field: 'block',  maxWidth: 70},
        { headerName: '데이터센터',  field: 'data', flex: 1 },
        { headerName: '존',  field: 'zone', flex: 1 },
        { headerName: '위치',  field: 'positon', flex: 1 },
        { headerName: '스토리지용량',  field: 'storage', maxWidth: 100},
        { headerName: '가용스토리지',
            field: 'ablestorage',
            maxWidth: 220,
            cellRenderer: (params) => {
                const tagString = `<div class="barChart" id="ablestorage-${params.node.rowIndex}"><em class="bar" style="width:${30}%"></em></div> <em class="datarate">${30}%</em>`;
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
                const tagString = `<div class="switch"><input type="checkbox" id="usetype-${params.node.rowIndex}" /><label for="usetype-${params.node.rowIndex}">미사용</label></div>`;
                const tagTarget = document.createElement('div');
                tagTarget.classList.add('checkbox');
                tagTarget.innerHTML = tagString;
                const buttonEventTarget = tagTarget.querySelector(`#usetype-${params.node.rowIndex}`);
                buttonEventTarget.addEventListener('change', (event) => {
                    const label = tagTarget.querySelector(`#usetype-${params.node.rowIndex}`).parentNode.children[1];
                    if (event.target.checked) {
                        console.log('텍스트 변경 처리');
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
            abled: '가능',
            block: 'SSD',
            data: 'DATACENTER NAME A',
            zone: 'Strato Internal Develo...Copy',
            positon: 'ds:///vmfs/volumes/644b6776-36b209...',
            storage: '2,408',
            ablestorage: '',
            usetype: '',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가동중',
            abled: '가능',
            block: 'SSD',
            data: 'DATACENTER NAME A',
            zone: 'Strato Internal Develo...Copy',
            positon: 'ds:///vmfs/volumes/644b6776-36b209...',
            storage: '2,408',
            ablestorage: '',
            usetype: '',
            synch: '2023.04.12 13:22:14'
        }
    ],
    defaultColDef: {
        sortable: false,
        filter: false,
        resizable: false,
        headerClass: 'centered',
        cellClass: 'centered',
        flex: 1
    },
    usetype: '미사용',
    usetypeValue: 'N'
    
});
// 페이징 처리
const pager = reactive({
    current: 1,
    size: computed(() => state.pagesize),
    offset: computed(() => (pager.current - 1) * pager.size),
    totalCnt: 10000
});
const onChangedPage = (num) => {
    console.log(num);
    pager.current = num;
    //api호출
};

</script>