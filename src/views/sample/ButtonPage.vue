<template>
    <div class="pageView">
        <div class="guideTitle">form -버튼</div>
        <div class="flex">
            <button type="button" class="btn">기본 버튼</button>
            <button type="button" class="btn" disabled>기본 버튼</button>
            <button type="button" class="btn sm">기본 버튼</button>
            <button type="button" class="btn ss">기본 버튼</button>
        </div>
        <div class="flex mt-30">
            <button type="button" class="btn posi">bgcolor 버튼</button>
            <button type="button" class="btn posi" disabled>bgcolor 버튼</button>
            <button type="button" class="btn posi sm">bgcolor 버튼</button>
            <button type="button" class="btn posi ss">bgcolor 버튼</button>
        </div>
        <div class="flex mt-30">
            <button type="button" class="btn submit">submit 버튼</button>
            <button type="button" class="btn submit" disabled>submit 버튼</button>
            <button type="button" class="btn error" >error 버튼</button>
            <button type="button" class="btn error" disabled>error 버튼</button>
        </div>
        <div class="flex mt-30">
            <button type="button" class="btn btn-ss">table내  버튼</button>
            <button type="button" class="btn btn-ss"><span class="ico-search"></span>icon 버튼</button>
            <button type="button" class="btn btn-ss"><span class="ico-reload"></span>icon 버튼</button>
            <button type="button" class="btn btn-ss"><span class="ico-arrow"></span>icon 버튼</button>
            <button type="button" class="btn btn-ss"><span class="ico-add"></span>icon 버튼</button>
        </div>
        <div class="flex mt-30">
            <button type="button" class="btn btn-sm"><span class="ico-search"></span>icon 버튼</button>
            <button type="button" class="btn btn-sm"><span class="ico-plus"></span>icon 버튼</button>
            <button type="button" class="btn btn-sm"><span class="ico-minus"></span>icon 버튼</button>
            <button type="button" class="btn btn-sm"><span class="ico-all-open"></span>icon 버튼</button>
            <button type="button" class="btn btn-sm"><span class="ico-download"></span>icon 버튼</button>
            <button type="button" class="btn btn-sm"><span class="ico-fit"></span>icon 버튼</button>
        </div>
        <div class="flex mt-30">
            <button type="button" class="btn btn-sm"><span class="ico-fit full"></span>icon 버튼</button>
            <button type="button" class="btn btn-sm"><span class="ico-filter"></span>icon 버튼</button>
            <button type="button" class="btn btn-sm"><span class="ico-next"></span>icon 버튼</button>
            <button type="button" class="btn btn-sm"><span class="ico-prev"></span>icon 버튼</button>
            <button type="button" class="btn btn-sm"><span class="ico-fix"></span>icon 버튼</button>
            <button type="button" class="btn btn-sm"><span class="ico-menu"></span>icon 버튼</button>
        </div>
        <div class="guideTitle">로딩바</div>
        <div class="ui-form-loading">
            <svg class="svg-loading-spinner" viewBox="25 25 50 50">
                <circle class="svg-loading-spinner-circle" cx="50" cy="50" r="20" fill="none" stroke-width="6" stroke-miterlimit="10"/>
            </svg>
        </div>
        
    </div>
</template>