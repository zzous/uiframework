<template>
    <div class="pageView">
        <div class="guideTitle">리스트 스타일</div>
        <div class="listbox">
            <div class="listheader">
                <div class="cellIcon"></div>
                <div class="cellTitle">게이트웨이 명</div>
                <div class="listCell">연결 API 서버</div>
                <div class="listCell">활성화 상태</div>
                <div class="listCell">생성일시</div>
                <div class="cellIcon"></div>
            </div>
            <div class="listline" v-for="(item, index) in 10" :key="index">
                <div class="cellIcon"><img src="/images/icon-check-blue.svg" /></div>
                <div class="cellTitle">API Gateway Name A</div>
                <div class="listCell">-</div>
                <div class="listCell">
                    <div class="switch">
                        <input type="checkbox" id="switch" />
                        <label for="switch">선택</label>
                    </div>
                </div>
                <div class="listCell">2023.04.12 13:22:14</div>
                <div class="cellIcon"><img src="/images/icon-check-blue.svg" /></div>
            </div>
        </div>
    </div>
</template>
