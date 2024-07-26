<template>
    <v-data-table
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
      :items-per-page="itemPerPage"
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
      v-model="changeSelected"
      :class="{
        'hide-footer': hideFooter,
        'fixed-table': fixedTable,
      }"
      hide-default-footer
      @update:sortBy="updateSortBy"
      :density="density"
    >
      <!-- DataTable 버전 이슈로 인하여 selectStrategy 값이 정상 작동하지 않아 헤더를 아래와 같이 임시로 처리합니다. -->
      <template v-slot:headers v-if="single">
        <tr>
          <th
            class="v-data-table__td v-data-table__th v-data-table-column--align-center"
          >
            <div class="v-data-table-header__content">-</div>
          </th>
          <th
            class="v-data-table__td v-data-table__th v-data-table__th--sortable v-data-table__th v-data-table__th--sortable"
            :class="[
              `v-data-table-column--align-${el.align || 'center'}`,
              `${!el.order || 'v-data-table__th--sorted'}`,
            ]"
            v-for="(el, index) in lazyHeaders"
            :key="index"
            @click="onClickSortBy(el)"
          >
            <div class="v-data-table-header__content">
              {{ el.title }}
              <i
                class="mdi v-icon notranslate v-theme--light v-icon--size-default v-data-table-header__sort-icon"
                :class="{
                  'mdi-arrow-up': el.order === 'asc' || !el.order,
                  'mdi-arrow-down': el.order === 'desc',
                }"
                aria-hidden="true"
              ></i>
            </div>
          </th>
        </tr>
      </template>
  
      <template
        v-for="(el, index) in headers"
        v-slot:[`item.${el.key}`]="{ item }"
        :key="index"
      >
        <!-- TODO 성능 이슈로 인해 option 값으로 변경 예정 -->
        <v-tooltip location="bottom" v-if="tooltip">
          <template v-slot:activator="{ props }">
            <span
              v-bind="props"
              class="d-inline-block text-truncate sp-table-column__text"
            >
              {{ item?.raw[el.key] || '-' }}
            </span>
          </template>
          <span>
            {{ item?.raw[el.key] || '-' }}
          </span>
        </v-tooltip>
        <span v-else>
          {{ item?.raw[el.key] || '-' }}
        </span>
      </template>
  
      <!-- <template v-slot:[`item.cost`]="{ item }">
        {{ item.cost.toLocaleString() + '원' }}
      </template> -->
      <template
        v-slot:[`column.data-table-select`]="{ column, selectAll }"
        v-if="hasCheckedColumnSlot"
      >
        <slot
          name="column.data-table-select"
          :column="column"
          :select-all="selectAll"
        ></slot>
      </template>
      <template
        v-slot:[`item.data-table-select`]="{ item, isSelected, toggleSelect }"
        v-if="hasCheckedItemSlot"
      >
        <slot
          name="item.data-table-select"
          :item="item"
          :is-selected="isSelected"
          :toggle-select="toggleSelect"
        ></slot>
      </template>
      <template
        v-for="(info, index) in customSlotInfo"
        v-slot:[`item.${info.slotName}`]="{ item }"
        :key="index"
      >
        <slot :name="`${info.name}_custom`" :item="item" />
      </template>
      <template v-slot:no-data>
        <tr>
          <td
            :colspan="
              optionsProp['show-select'] ? headers.length + 1 : headers.length
            "
            class="text-center no-data"
          >
            {{ noDataText }}
          </td>
        </tr>
      </template>
      <template v-slot:[`tfoot`] v-if="footers && Object.keys(footers).length">
        <tr>
          <th
            v-for="(head, hIndex) in headers"
            :key="'foot__' + hIndex"
            :width="head.width"
            :style="{ textAlign: head.align || 'start' }"
          >
            <template v-if="customSlotFooter[head.key]">
              <slot :name="`${head.key}_footer`" :props="footers"></slot>
            </template>
            <template v-else>
              {{ footers[head.key] }}
            </template>
          </th>
        </tr>
      </template>
      <template v-slot:bottom>
        <slot name="append-content"></slot>
        <div class="text-center sp-data-table-pagination mt-4" v-if="!hideFooter">
          <v-pagination
            ref="paginateRef"
            size="small"
            rounded="circle"
            active-color="#1297F2"
            variant="flat"
            :total-visible="10"
            v-model="lazyPage"
            :length="options?.pageCount || pageCount"
          ></v-pagination>
        </div>
      </template>
      <template v-slot:expanded-row="bind">
        <slot name="expanded-row" v-bind="bind"> </slot>
      </template>
    </v-data-table>
  </template>
  
<script lang="js">
import { noDataTxt } from '@/i18n/t';
  
  
  // const tag = '[dataTable]'
export default {
  props: {
    selectedItems: {
      type: Array,
      default: () => []
    },
      // search: String,
    options: {
      type: Object,
      default: () => {}
    },
    getChipColors: {
      type: Function,
      default: undefined
    },
      // onClickChips: Function,
    customSlotInfo: {
      type: Array,
      default: () => []
    },
      // customSlotInfo: Array,
    customFilter: {
      type: [Number, Boolean, Array],
      default: undefined,
      description: '항목 필터링 기능'
    },
    customKeyFilter: {
      type: Object,
      default: undefined,
      description: ''
    },
    expanded: {
      type: Array,
      default: () => [],
      description: ''
    },
    expandOnClick: {
      type: Boolean,
      default: false,
      description: ''
    },
    filterKeys: {
      type: [String, Array],
      default: undefined,
      description: ''
    },
    filterMode: {
      type: String,
      default: 'intersection',
      description: ''
    },
    fixedFooter: {
      type: Boolean,
      default: false,
      description: ''
    },
    fixedHeader: {
      type: Boolean,
      default: false,
      description: '헤더 사이즈가 고정됩니다. (deprecated)'
    },
    groupBy: {
      type: Array,
      default: () => [],
      description:
          '항목을 그룹화하는 데 사용해야 하는 항목 속성을 변경합니다. 현재 형식의 단일 그룹화만 지원합니다: group또는 [group]. 배열을 사용할 때 첫 번째 요소만 고려됩니다. .sync수정자 와 함께 사용할 수 있습니다.'
    },
    headers: {
      type: Array,
      default: () => [],
      description: '각각 헤더 열을 설명하는 개체의 배열입니다.'
    },
    height: {
      type: [String, Number],
      default: undefined,
      description: '명시적인 테이블 높이 설정'
    },
    hideNoData: {
      type: Boolean,
      default: false,
      description: ''
    },
    itemChildren: {
      type: [Boolean, String, Array, Function],
      default: 'children',
      description: ''
    },
    itemProps: {
      type: [Boolean, String, Array, Function],
      default: 'props',
      description:
          '각 항목 구성 요소에 적용될 props 개체입니다. true원본 개체를 가공되지 않는 props로 취급하고 구성 요소에 직접 전달합니다.'
    },
    datas: {
      type: Array,
      default: () => [],
      description:
          '자식 구성 요소를 자동으로 생성하는 데 사용되는 문자열 또는 객체의 배열'
    },
    itemPerPage: {
      type: [String, Number],
      default: 10,
      description:
          '페이지당 표시할 항목 수를 변경합니다. .sync 수정자와 함께 사용할 수 있습니다. 이 prop을 -1로 설정하면 페이지의 모든 항목이 표시됩니다.'
    },
    itemTitle: {
      type: [Boolean, String, Array, Function],
      default: 'title',
      description: ''
    },
    itemValue: {
      type: [Boolean, String, Array, Function],
      default: 'id',
      description: ''
    },
    modelValue: {
      type: Array,
      default: () => [],
      description:
          '구성 요소의 v-model 값입니다. 구성 요소가 다중 소품을 지원하는 경우 기본값은 빈 배열입니다.'
    },
    multiSort: {
      type: Boolean,
      default: false,
      description: 'true일 경우 여러 속성에 대해 정렬할 수 있습니다.'
    },
    mustSort: {
      type: Boolean,
      default: false,
      description:
          'true일 경우 정렬을 비활성화할 수 없으면 항상 오름차순과 내림차순 간에 전환됩니다.'
    },
    noDataText: {
      type: String,
      default: noDataTxt,
      description: '구성 요소에 항목이 제공되지 않을 때 표시되는 텍스트'
    },
    noFilter: {
      type: Boolean,
      default: false,
      description: ''
    },
    page: {
      type: [String, Number],
      default: 1,
      description: '현재 표시된 페이지 번호(인덱스 1개)'
    },
    returnObject: {
      type: Boolean,
      default: false,
      description: ''
    },
    search: {
      type: String,
      default: undefined,
      description: '항목 필터링에 사용되는 텍스트 입력'
    },
    showExpand: {
      type: Boolean,
      default: false,
      description: '기본 행에 확장 토글을 표시합니다.'
    },
    showSelect: {
      type: Boolean,
      default: false,
      description:
          '머리글과 행 모두에서 선택 확인란을 표시합니다(기본 행을 사용하는 경우).'
    },
      // sortBy: {
      //   type: Array,
      //   default: () => [],
      //   description:
      //     '정렬 순서에 사용해야 하는 항목 속성을 변경합니다. .sync수정자 와 함께 사용할 수 있습니다.',
      // },
    selectStrategy: {
      type: String,
      default: 'page'
    },
    width: {
      type: [String, Number],
      default: undefined,
      description: '구성 요소의 너비를 설정합니다.'
    },
      // custom
    single: {
      type: Boolean,
      default: false,
      description: 'select model의 데이터를 단일/다중으로 세팅합니다.'
    },
    hideFooter: {
      type: Boolean,
      default: false,
      description: 'footer hide'
    },
    footers: {
      type: Object,
      default: () => {},
      description: 'tfoot 위치에 그릴 데이터'
    },
    customSlotFooter: {
      type: Object,
      default: () => {},
      description: 'custom footer'
    },
    smartSearch: {
      type: Array,
      default: () => {
        return [];
      },
      description: 'Smart Search 검색 기능'
    },
    fixedTable: {
      type: Boolean,
      default: false
    },
    setTotal: {
      type: Function,
      default: () => {},
      description: '전체 개수 초기화(필터링 적용)'
    },
    density: {
      type: String,
      default: 'default',
      description: 'default | comfortable | compact 사이즈'
    },
    tooltip: {
      type: Boolean,
      default: false,
      description: '툴팁 사용 여부(툴팁을 사용하려면 테이블의 class가 fixed-table을 포함하고 있어야 합니다.)'
    }
  },
  data: () => ({
    selected: [],
    isOpenTooltipId: false,
    lazyPage: 1,
    tempPage: 1,
    sortBy: [],
    lazyHeaders: []
  }),
  watch: {
    page(nv) {
      this.lazyPage = nv;
    },
    lazyPage(nv) {
      this.updatePage(nv);
    },
    selectedItems(nv) {
      this.selected = nv;
    },
    filterDatas(nv) {
      this.setTotal(nv.length);
    },
    headers(nv) {
      this.lazyHeaders = nv;
    }
  },
  computed: {
      /*
          @brief 옵션 추가하고 싶다면 props로 받아서 추가하는 함수
          @date 2021/11/02
          @return
              - https://vuetifyjs.com/en/api/v-data-table/ 참고
          @param
      */
    optionsProp() {
        // console.log(tag, 'optionsProp')
      return {
          // 'hide-default-footer': this.options.hideFooter,
          // 'hide-default-header': this.options.hideHeader,
        dense: this.options?.dense,
        'disable-filtering': this.options?.disableFiltering,
        'disable-pagination': this.options?.disablePagination,
        'disable-sort': this.options?.disableSort,
        'fixed-header': this.options?.fixedHeader,
        'show-select': this.options?.showSelect,
        'item-key': this.options?.itemKey
      };
    },
    changeSelected: {
        /*
          @brief 체크박스 get 함수
          @date 2021/11/02
          @return
              - anonymous: Array(선택자 정보)
          @param
        */
      get() {
          // console.log(tag, 'changeSelected/get')
        return this.selected;
      },
        /*
          @brief 체크박스 set 함수
          @date 2021/11/02
          @return
          @param
              - item: Array(선택한 row 데이터)
        */
      set(item) {
        console.log('changeSelected/set', item);
        if (this.single && item.length) { // 단일 선택(single)인 경우
          if (this.itemPerPage === item.length && this.selected.length > 0) {
              // 단일 선택인데 이미 선택된 리스트가 한개 있고 전체 선택 셀렉트박스를 클릭한 경우 "선택된 리스트 초기화"
            this.selected = [];
            this.$emit('get-checkedbox-item', this.selected);
          }
            // 단일 선택인데 전체 선택 셀렉트박스를 클릭한 경우 "아무런 동작 안하도록"
          if (this.itemPerPage === item.length) return;
          this.selected = [item[item.length - 1]];
          this.$emit('get-checkedbox-item', this.selected);
        } else { // 단일 선택(single)이 아닌 경우 선택 리스트에 다 포함
          this.$emit('get-checkedbox-item', item);
          this.selected = item;
        }
      }
    },
    pageCount() {
      if (this.filterDatas.length > 0) {
        if (!this.options?.pageCount) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.lazyPage = this.tempPage;
        }
        return Math.ceil(this.filterDatas.length / this.itemPerPage);
      }
      if (!this.options?.pageCount) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.tempPage = this.lazyPage;
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.lazyPage = 1;
      }
      return 1;
    },
    filterDatas() {
      if (this.smartSearch.length === 0) return this.datas;
  
        // TODO Pagination 컴포넌트 사용 시 Search props와 페이지 수가 맞지 않는 오류가 있음 (해결방법: vuetify 업그레이드)
        // vuetify 업그레이드 전 임시코드
      if (this.search) {
          // 일반 검색 (no smart search)
        const keys = this.headers.map(h => h.key);
        const filteredList = this.datas.filter(data => keys.some(key => {
          if (data[key]) {
            if (typeof data[key] === typeof {} || typeof data[key] === typeof []) {
              return JSON.stringify(data[key]).indexOf(this.search) > -1;
            }
            return data[key].toString().indexOf(this.search) > -1;
          } return false;
        }));
        return filteredList;
      }
      const filteredList = this.datas.filter(data => {
          // 검색 결과는 OR 조건이기 때문에 some 함수 사용
          // TODO: 동일 key 값에 대해서는 OR 조건일 것
          // tag는 동일 값 검색
          // tag 외의 검색은 like 검색
        const isCorrect = this.smartSearch.some(
          option => {
            if (option.key === 'undefinedTag') {
              if (!data.tagList?.length) return true;
              return false;
            }
            if (!option.value) {
              return true;
            }
  
              // s: 태그 검색 영역
            if (option.type === 'tag' && data.tagList?.length) {
              const result = data.tagList.some(tagObj => {
                  // const tagObj = JSON.parse(tagStr)
                return tagObj.tagKey.toLowerCase() === option.key.toLowerCase() && tagObj.tagValue.toLowerCase() === option.value.toLowerCase();
              });
              console.log(result);
              return result;
            }
              // e: 태그 검색 영역
  
              // s: 태그 외 검색
            if (option.type !== 'tag') {
              if (typeof data[option.key] === typeof {} || typeof data[option.key] === typeof []) {
                const searchData = JSON.stringify(data[option.key]);
                  // 검색 결과는 like 검색이기 때문에 indexOf 사용
                return searchData.toLowerCase().indexOf(option.value.toLowerCase()) > -1;
              }
              return data[option.key].toLowerCase().indexOf(option.value.toLowerCase()) > -1;
            }
            return false;
              // e: 태그 외 검색
          }
        );
        return isCorrect; // 전체 조건에 맞는지 여부
      });
      return filteredList;
  
  
    },
    hasCheckedColumnSlot() {
      return !!this.$slots?.['column.data-table-select'];
    },
    hasCheckedItemSlot() {
      return !!this.$slots?.['item.data-table-select'];
    }
  },
  mounted() {
    this.selected = this.selectedItems;
    this.lazyPage = this.page;
    this.lazyHeaders = [...this.headers];
  },
  methods: {
      /*
          @brief chip 만드는 함수
          @date 2021/11/02
          @return
          @param
              - status: String(상태 값)
        */
    getChipColor(status) {
        // console.log(tag, 'getChipColor')
  
      return this.getChipColors(status);
    },
  
      // 15 글자 넘어가면 말줄임표 추가 => TODO 폭에 따라 값 변경되게 수정
    lessenText(text) {
      if (text?.length > 20) {
        text = `${text.substr(0, 18)}...`;
      }
      return text;
    },
    updatePage(e) {
      this.$emit('update:page', e);
    },
    updateSortBy(e) {
      this.sortBy = e;
      this.lazyPage = 1;
      this.$emit('update:page', 1);
    },
    onClickSortBy(el) {
        // DataTable 업데이트 이슈로 인해 아래의 코드 삽입
      if (el.order && el.order === 'asc') {
        el.order = 'desc';
        this.sortBy = [{key: el.key, order: 'desc'}];
      } else if (el.order && el.order === 'desc') {
        el.order = '';
        this.sortBy = [];
      } else {
        el.order = 'asc';
        this.sortBy = [{key: el.key, order: 'asc'}];
      }
  
      this.lazyHeaders.map(item => {
        if (item.key !== el.key) {
          item.order = null;
        }
        return item;
      });
    }
  }
};
</script>
  
  <style lang="scss">
  @import '@/styles/table.scss';
  .sp-data-table-pagination {
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #333;
  
    .v-pagination__item--is-active {
      color: white;
  
      .v-btn--disabled {
        color: white;
      }
    }
  }
  // .status-chip {
  //   color: white;
  //   width: 8rem;
  //   margin: auto 0;
  //   display: inline-block;
  // }
  // .management-chip {
  //   color: $color-info;
  //   border: 2px solid $color-info;
  //   width: 8rem;
  //   margin: auto 0;
  //   display: inline-block;
  // }
  
  .v-btn:hover > .v-btn__overlay {
    opacity: 0.1;
    background: #1297f2;
  }
  .v-btn--disabled.v-btn--variant-flat .v-btn__overlay {
    opacity: 1;
    background: transparent;
  }
  .v-pagination__item--is-active
    .v-btn--disabled.v-btn--variant-flat
    .v-btn__content {
    font-size: 12px;
    font-weight: 700;
    color: #fff;
  }
  .v-btn--disabled.v-btn--variant-flat .v-btn__content {
    font-size: 15px;
    font-weight: 700;
    color: #333;
  }
  /* 테이블 기본 설정 */
  .sp-data-table {
    .v-data-table-header__content {
      font-weight: bold;
      font-size: toRem(14);
      // text-align: center !important;
    }
    td {
      font-size: toRem(12);
    }
    .status-chip {
      color: white;
      font-weight: 300;
    }
  
    // .no-data {
    //   color: $sp-grey-400;
    // }
    .sp-data-table-column__text {
      width: inherit;
    }
  
    &.hide-footer {
      > .v-data-table-footer {
        display: none !important;
      }
    }
  }
  
  /** 테이블 말 줄임표 */
  .sp-data-table.fixed-table table {
    table-layout: fixed;
  
    td {
      span {
        max-width: 100%;
        display: inline-block;
        word-break: break-all;
      }
  
      &:has(span + i) {
        span {
          max-width: calc(100% - 30px);
        }
      }
    }
  }
  .right-move {
    position: absolute;
    right: 0;
  }
  
  // theme
  .sp-data-table.dark {
    .v-table__wrapper {
      > table {
        border-top: 1px solid #000;
        > thead > tr > th {
          color: #fff;
          background: #152647;
        }
      }
    }
  }
  </style>
  