<template>
    <div class="pageView">
        <div class="cardwrap">
            <CardBox :cardWidth="590" :cardTitle="'오늘 나의 업무'" :cardSubtext="'사용자가 처리해야할 업무입니다.'" style="min-height:100px;">
                <template #cardContent>
                    <div style=" display: flex; flex-wrap: wrap;">
                        <div class="myjobinfo totolist">
                            <div class="infopar">
                                <span class="infolabel">할일</span>
                                <strong class="infovalue">36건</strong>
                                <span  class="infolabel"> / 진행중 </span>
                                <strong class="infovalue">10건</strong>
                            </div>
                            <div class="barbox"><div class="barChart" id="ablestorage-0"><em class="bar" style="width:30%; background: var(--point-green-color);"></em></div> <em class="datarate">30%</em></div>
                        </div>
                        
                        <div  class="myjobinfo orderlist">
                            <div class="infopar">
                                <span class="infolabel">결재할 업무</span>
                                <strong class="infovalue">28건</strong>
                                <span class="infolabel">/ 진행중</span>
                                <strong class="infovalue">10건</strong>
                            </div>
                            <div class="barbox"><div class="barChart" id="ablestorage-0"><em class="bar" style="width:50%"></em></div> <em class="datarate">50%</em></div>
                        </div>
                        <div class="myjobinfo mystatus">
                            <div class="infopar">
                                <span class="infolabel">나의 작업 현황</span>
                                <strong class="infovalue">28건</strong>
                            </div>
                            <div class="barbox"><div class="barChart" id="ablestorage-0"><em class="bar" style="width:30%"></em></div> <em class="datarate">30%</em></div>
                        </div>
                    </div>
                </template>
            </CardBox>
            <CardBox :cardWidth="500" :cardTitle="'나의 알림목록'"  :cardSubtext="'최근 알림 목록입니다.'">
                <template #cardContent>
                    <div class="ui-no-date"><p>알림이 없습니다.</p></div>
                </template>
            </CardBox>
            <CardBox :cardWidth="300" :cardTitle="'나의 결재 현황'" :cardSubtext="'대기중인 업무와 처리된 업무 내용입니다'">
                <template #cardContent>
                    <div style="height: calc(100% - 72px); ">
                        <BarChartHor :unit="state.unit" :chartBar="state.chartBar1" :chartId="'ChartBar2'" :chartClass="'chartNolegend'"  :chartColorType="['854cf5','189F92', 'F38C25' ]"></BarChartHor>
                    </div>
                </template>
            </CardBox>
            <CardBox :cardWidth="800" :cardTitle="'나의 할일'"  :cardSubtext="'사용자가 작업 해야할 작업 목록입니다'">
                <template #cardContent>
                    <!-- <AgGridVue :columnDefs="state.value" :rowData="state.rowData" :defaultColDef="state.defaultColDef"
                    rowSelection="multiple"
                        class="ag-theme-alpine" :domLayout="'autoHeight'">
                    </AgGridVue> -->
                </template>
            </CardBox>
            
            <CardBox :cardWidth="800" :cardTitle="'내가 요청한 결재목록'"  :cardSubtext="'사용자가 결재를 요청한 목록입니다'">
                <template #cardContent>
                    <!-- <AgGridVue :columnDefs="state.value" :rowData="state.rowData" :defaultColDef="state.defaultColDef"
                    rowSelection="multiple"
                        class="ag-theme-alpine" :domLayout="'autoHeight'">
                    </AgGridVue> -->
                </template>
            </CardBox>
            <CardBox :cardWidth="800" :cardTitle="'내가 요청받은 결재목록'" :cardSubtext="'사용자가 결재 해야할 작업 목록입니다'">
                <template #cardContent>
                    <!-- <AgGridVue :columnDefs="state.value" :rowData="state.rowData" :defaultColDef="state.defaultColDef"
                    rowSelection="multiple"
                        class="ag-theme-alpine" :domLayout="'autoHeight'">
                    </AgGridVue> -->
                </template>
            </CardBox>
        </div>
      
    </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import DatePicker from '@/components/DatePicker.vue';
import { useCommFunc } from '@/core/helper/common.js';
const {  dayJS, goToPage } = useCommFunc();
const state = reactive({
    chartBar: [
        {name: '스트라우스', rate: 2000, date: '202.06.11', time: '08:00'},
        {name: '스트라우스', rate: 1500, date: '202.06.11', time: '08:00'},
        {name: '가나다서비스', rate: 35000, date: '202.06.11', time: '08:00'},
        {name: 'LGCCC', rate: 4000, date: '202.06.11', time: '08:00'},
        {name: 'STS', rate: 1000, date: '202.06.11', time: '08:00'},
        {name: 'BCE', rate: 6000, date: '202.06.11', time: '08:00'},
        {name: 'BCE', rate: 8900, date: '202.06.11', time: '08:00'},
        {name: 'BCE', rate: 5500, date: '202.06.11', time: '08:00'},
        {name: 'EFG', rate: 8000, date: '202.06.11', time: '08:00'},
        {name: 'GHI', rate: 6800, date: '202.06.11', time: '08:00'}
    ],
    chartBar1: [
        {name: '승인대기', rate: 51,  coreType: {a: '', b: ''}, date: '202.06.11', time: '08:00'},
        {name: '승인완료', rate: 26, coreType: {a: '', b: ''}, date: '202.06.11', time: '08:00'},
        {name: '반려/폐기', rate: 12, coreType: {a: '', b: ''}, date: '202.06.11', time: '08:00'}
    ],
    chartBar2: [
        {name: '블록스토리지', rate: 45, coreType: {a: '579Gib', b: '1024Gib'}, date: '202.06.11', time: '08:00'},
        {name: 'NSA 스토리지', rate: 36, coreType: {a: '579Gib', b: '1024Gib'}, date: '202.06.11', time: '08:00'},
        {name: 'NSA 스토리지', rate: 16, coreType: {a: '579Gib', b: '1024Gib'}, date: '202.06.11', time: '08:00'}
    ],
    unit: [0, 1000, 2000, 3000, 4000, 5000, 6000],
    ternent: [
        {title: '존', value: 1},
        {title: '리전', value: 1},
        {title: 'CSP', value: 1},
        {title: '클러스터', value: 1},
        {title: '호스트', value: 1},
        {title: '데이터스토어', value: 1},
        {title: '가상서버', value: 1},
        {title: 'CPU코어', value: 1},
        {title: '할당CPU', value: 1},
        {title: 'VCPU', value: 1},
        {title: '메모리', value: 1},
        {title: '할당 메모리', value: 1}
    ],
    values: [35, 20, 7, 20, 15, 40],
    colors: ['574794', '9F96BF', 'D8D4E2', '189F92', '72C6BE', 'C9E5E3'],
    
    colors1: ['F3775B', '5F9ECF'],
    colors2: ['189F92', '72C6BE', 'F3775B', 'F3AD53', 'F5E2C8'],
    donetlegend: [
        {name: '테넌트A', num: '10', rate: 35},
        {name: '테넌트B', num: '4', rate: 20},
        {name: '테넌트C', num: '2', rate: 7},
        {name: '테넌트D', num: '7', rate: 20},
        {name: '테넌트E', num: '5', rate: 15},
        {name: '테넌트F', num: '12', rate: 40}
    ],
    donetlegend1: [
        {name: '사용', num: '10', rate: 74},
        {name: '미사용', num: '4', rate: 26}
    ],
    donetlegend2: [
        {name: '리전A', num: '12', rate: 35},
        {name: '리전B', num: '7', rate: 23},
        {name: '리전C', num: '6', rate: 21},
        {name: '리전D', num: '4', rate: 14},
        {name: '리전E', num: '2', rate: 7}
    ],

    //테이블
    value: [
        { headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 30 },
        { headerName: '존',  field: 'name', valueGetter: 'node.rowIndex + 1', maxWidth: 70 },
        { headerName: '가상서버',  field: 'cloudtype', flex: 1},
        { headerName: '삭제예정일',  field: 'synch', maxWidth: 100},
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
        }
    ],
    rowData: [
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
            synch: '2023.04.12 13:22:14'
        },
        {
            name: 'DATASTORE1',
            cloudtype: '가상서버이름',
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
    }
});



</script>
<style>
.myjobinfo {border-radius:10px;  background:#3c3e4a; text-align: left; padding:40px 20px 20px 20px; margin-right:10px;flex:1}
.myjobinfo.totolist,.myjobinfo.orderlist, .myjobinfo.mystatus{background-position:20px 10px; background-repeat: no-repeat;}
.myjobinfo.totolist{background-image: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0'  fill='%23dcfc34'/%3E%3C/svg%3E");}
.myjobinfo.orderlist{background-color:var(--base-box-color);background-image: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'  fill='%23222222'/%3E%3C/svg%3E");}
.myjobinfo.mystatus{flex-basis:100%;margin-top:20px; padding-top:50px;background-color:var(--base-box-color);background-image: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'  fill='%23222222'/%3E%3C/svg%3E");}
.infopar{text-align: left; display: flex; align-items:flex-end;margin-bottom:10px}
.infopar .infolabel{font-size:15px; display: block; position: relative; top:-7px; margin-right:10px;}
.infopar .infovalue{font-size:30px; display: block; }
.myjobinfo.totolist .infolabel,
.myjobinfo.totolist .infovalue{color:var(--point-green-color);}
.infopar .infovalue + .infolabel{font-size:12px; margin:0 5px; position: relative; top:-3px}
.infopar .infovalue:nth-last-of-type(1){font-size:18px}
.myjobinfo.mystatus .infovalue{font-size:30px; }
.myjobinfo .barbox{height:auto; justify-content:flex-start;}
.myjobinfo .barChart{width: 100%; background:var(--base-wh-color)}
.myjobinfo .barChart .bar{background:var(--base-txt-color);}
.myjobinfo .datarate{font-weight: 700; font-size: 15px;}
.ui-chart{min-height:250px;}
.donut-box{display: flex; height:90%; align-items: center;justify-content: space-around;}
.donnt-regend{flex-basis:200px;; height:100%;}
.donnt-regend ul{ display: flex; height:100%; flex-direction: column; justify-content: space-evenly;}
.donnt-regend ul li{ display: flex;align-items: center; }
.donnt-regend ul li > span{flex:1;font-size:14px; text-align: right;}
.donnt-regend ul li .regend-icon{display:block; width:10px; height:10px; border-radius:50%; margin-right:5px;}
.donnt-regend ul li .regend-name{text-align: left;}
.donnt-regend ul li .regend-num{color:#666}
.donnt-regend ul li .regend-rate{color:#574794; font-weight:700;}

.ui-donut{width:200px; height:100%; position: relative;flex: 1 0 250px; max-height: 250px; max-width: 250px;}
.chart-donut{width:100%; height:100%; border-radius:50%;}
.ui-donut-in{background: #fff; position: absolute; top:50%; left:50%; width:60%; height:60%;border-radius: 50%; transform: translate(-50%, -50%);}
.ui-donut-in .in-text{display: flex; width:100%; height:100%; align-items: center; justify-content: center; flex-direction: column;}
.ui-donut-in .in-text span{color:#737373; font-size:12px;}
.ui-donut-in .in-text strong{color:#333; font-size:28px; font-weight:700;}



.cmpbox{}
.cmptitle{text-align: center; color: var(--base-txt-color); font-size:16px; font-weight:700; margin-bottom: 20px;;}
.ternentall{display:flex;flex-wrap: wrap;position: relative;left:-10px;}
.ternentall .ternent{background: #F7F9FA; padding:10px 0; display:flex; flex-direction:column; justify-content:center; align-items: center; flex-basis:155px; flex-grow: 1; flex-shrink: 1; height:70px; margin:10px 0 0 10px; border-radius:5px;}
.ternentall .ternent .ternenttit{background: #F7F9FA; padding:10px 0; display:flex;}
.ternentall .ternent .ternentvalue{font-size:18px; font-weight:700;color:#574794;}
.boxlist{height: 90%; display: flex; flex-direction: column; justify-content: space-evenly;}
.boxlist .boxitem{width:100%; height:70px; border-radius:5px; padding:0 30px; display:flex; justify-content: space-between; align-items: center;}
.boxlist .boxitem span{font-size:16px;}
.boxlist .boxitem strong{font-size:28px; text-decoration: underline;color:#574794;}
.boxlist .boxitem.confirm{background: rgba(24, 159, 146, 0.05);}
.boxlist .boxitem.error{background: rgba(247, 249, 250, 1);}

.boxlist.same{flex-wrap:wrap;flex-direction: row;}
.boxlist.same .boxitem{width:48%; height:48%;}
.boxlist.row{flex-direction: row; flex-wrap:wrap;justify-content: flex-start;}
.boxlist.row .boxitem{width:calc(20% - 10px);height:120px;flex-direction:column;padding:10px 0 26px 0;margin:0 10px 10px 0; flex-grow:0;}
.boxlist.row .boxitem strong{font-size:36px;text-decoration:none;}


.layoutpage{flex-basis: 300px;flex:1}
</style>