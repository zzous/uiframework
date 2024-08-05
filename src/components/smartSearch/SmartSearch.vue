<template>
  <div class="sp-smart-search">
    <v-autocomplete
        ref="autoComp"
        class="sp-autocomplete"
        :style="{ width: width + 'px' }"
        :label="label"
        closable-chips
        :multiple="multiple"
        :density="density"
        :variant="variant"
        :items="filterItems"
        :search="searchValue"
        :custom-filter="customFilter"
        :placeholder="placeholder"
        :menu-props="menuProps"
        hide-details
        @input="onUpdateInput"
        @update:search="updateModelValue"
        @keyup.enter.stop="onEnter"
    >
      <template v-slot:item="{ item }">
        <template v-if="item.raw.subheader">
          <v-list-subheader>{{ item.raw.subheader }}</v-list-subheader>
        </template>

        <v-list-item
            v-else
            :title="item?.props?.title"
            @click="onEnter($evnet, item?.raw.title, item?.raw.type)"
        ></v-list-item>
      </template>
      <template v-slot:append-item v-if="searchTag">
        <v-list-subheader>미지정 태그 검색</v-list-subheader>
        <v-list-item @click="onClickSearchNullTag">미지정 태그</v-list-item>
      </template>
    </v-autocomplete>
    <v-chip-group v-show="valuesItem.length">
      <v-chip
          v-for="(item, index) in valuesItem"
          :key="'smart-search__value--' + item.title + '__' + item.value"
          closable
          @click:close="onDeleteSearchItem(index)"
      ><strong>{{ item.title }}</strong> : {{ item.value }}</v-chip
      >
    </v-chip-group>
  </div>
</template>

<script>
/**
 * TODO 남은 업무
 * 1. 선택된 값 중 중복 선택 값 제거
 */
import * as _ from 'lodash-es';
import { ref, computed, reactive, toRefs } from 'vue';

export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
      description:
          'data table의 경우 header 값을 의미한다. 데이터 형태: { title: "", key: "" }, '
    },
    label: {
      type: String,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Input key:value'
    },
    values: {
      type: Array,
      default: () => {
        return [];
      }
    },
    datas: {
      type: Array,
      default: () => {
        return [];
      }
    },
    density: {
      type: String,
      default: 'default'
    },
    variant: {
      type: String,
      default: 'outlined'
    },
    width: {
      type: [Number, String],
      default: 600
    },
    searchTag: {
      type: Boolean,
      default: false,
      description:
          'tag 검색 기능을 사용할지에 대한 여부. true일 경우 datas의 모든 tag 값들을 items에 추가한다.'
    }
  },
  setup(props, { emit }) {
    const searchValue = ref('');
    const isValueSearch = ref(false);
    const isTagSearching = ref(false);

    function onClear() {
      searchValue.value = '';
      isValueSearch.value = false;
      isTagSearching.value = false;
    }

    function updateModelValue(event) {
      // console.log('updateModelValue', event)
      if (!event) {
        onClear();
      }
      searchValue.value = event;
    }

    function filterTagKeys(type) {
      // 전체 datas에서 tag의 key 값 추출
      const setFilterDatas = new Set();
      if (props.datas?.length) {
        props.datas.forEach(data => {
          // TODO 아래의 코드는 API Server의 response 객체에 따라 영향을 받을 수 있는 하드코딩이기 때문에 수정될 필요가 있음
          if (data.tagList?.length) {
            data.tagList.forEach(tagObj => {
              if (tagObj[type] !== null) {
                setFilterDatas.add(tagObj[type]);
              }
            });
          }
        });
      }
      const uniqueArr = [...setFilterDatas];
      return uniqueArr;
    }

    function filterTagValues(keyName, valueName) {
      // 전체 datas에서 tag의 key 값 추출
      const setFilterDatas = new Map();
      if (props.datas?.length) {
        props.datas.forEach(data => {
          // TODO 아래의 코드는 API Server의 response 객체에 따라 영향을 받을 수 있는 하드코딩이기 때문에 수정될 필요가 있음
          if (data.tagList?.length) {
            data.tagList.forEach(tagObj => {
              const keyData = tagObj[keyName]?.toLowerCase();
              const appendData = setFilterDatas.get(keyData) || [];
              if (tagObj[valueName] !== null) {
                appendData.push(tagObj[valueName]);
                setFilterDatas.set(keyData, appendData);
              } else {
                setFilterDatas.set(keyData, appendData);
              }
            });
          }
        });
      }
      return Object.fromEntries(setFilterDatas);
    }

    const selectedKeyItem = ref(null);
    function setOptionItemFormat(arr, type) {
      const result = [];
      // console.log(arr)
      arr.forEach(value => {
        if (Array.isArray(value)) {
          result.push({ title: value, value, type });
        } else {
          result.push({ title: value, value, type });
        }
      });
      return result;
    }
    const filterItems = computed(() => {
      let optionItems = [];

      if (isTagSearching.value) {
        const keyItem = searchValue.value.split(':')[0];
        optionItems.push({
          subheader: searchValue.value.split(':')[0],
          title: ''
        });
        const makedOptionItemObj = filterTagValues('tagKey', 'tagValue');
        optionItems = optionItems.concat(
            // TODO 아래의 코드는 API Server의 response 객체에 따라 영향을 받을 수 있는 하드코딩이기 때문에 수정될 필요가 있음
          setOptionItemFormat(makedOptionItemObj[keyItem], 'tag')
        );
        return optionItems;
      }

      if (isValueSearch.value) {
        // sub items: 선택된 key에 맞는 값을 원본 데이터에서 추출하고, items 형식으로 변형하여 return
        if (!props.datas.length) {
          return [];
        }
        const setFilterDatas = new Set();
        props.datas.forEach(item => {
          if (item[selectedKeyItem.value]) {
            setFilterDatas.add(item[selectedKeyItem.value]);
          }
        });
        const uniqueArr = [...setFilterDatas];
        optionItems.push({
          subheader: searchValue.value.split(':')[0],
          title: ''
        });
        optionItems = optionItems.concat(setOptionItemFormat(uniqueArr));

        return optionItems;
      }
      optionItems.push({ subheader: '속성', title: '' });

      // 목록 화면에 보이지 않는 속성은 표시 x
      props.items.forEach(item => {
        // title 값이 없을 경우 제외
        if (item.align !== 'd-none' && item.title) {
          optionItems.push(item);
        }
      });
      if (props.searchTag) {
        optionItems.push({ subheader: '태그', title: '' });
        // props.datas에서 태그 key 값 추출하여 목록에 추가
        optionItems = optionItems.concat(
            // TODO 아래의 코드는 API Server의 response 객체에 따라 영향을 받을 수 있는 하드코딩이기 때문에 수정될 필요가 있음
          setOptionItemFormat(filterTagKeys('tagKey'), 'tag')
        );
      }
      // console.log('filterItems', optionItems)
      return optionItems;
    });

    function customFilter(item, queryText, itemText) {
      // option items 중 text 필터링
      const searchText = queryText.toLowerCase();
      const splitSearchValue = searchText.split(':');
      let indexOfTargetText = '';
      if (splitSearchValue.length > 1) {
        indexOfTargetText = splitSearchValue[1].trim().toLowerCase();
      } else {
        indexOfTargetText = searchText.trim().toLowerCase();
      }
      if (typeof itemText?.value === typeof '') {
        return (
          itemText?.value
            ?.toLowerCase()
            .indexOf(indexOfTargetText.toLowerCase()) > -1
        );
      }
      return (
        itemText?.value?.value
          ?.toLowerCase()
          .indexOf(indexOfTargetText.toLowerCase()) > -1
      );
    }

    const { values } = toRefs(props);

    const valuesItem = reactive(values.value);

    /**
     * 입력 값 중 title에 해당하는 값 추출 후, option items 중에 글자가 포함된 가장 첫번째 단어를 선택 한다.
     * tag 검색의 경우 option items 중에 값이 없어도 입력이 된다.
     *
     * @param {*} title : 입력 값
     */
    function onFindTitle(title) {
      let findTitle = '';
      let findKey = '';
      title = title.toString().split(':')[0].trim().toLowerCase();
      const sortItems = props.items;
      _.sortBy(sortItems, 'title');
      const result = sortItems.some(item => {
        // 직접 입력(string)과 list item(ref object) 선택에 따른 분기처리
        const itemTitle =
            typeof item.title === typeof {} ? item.title.value : item.title;
        const itemKey =
            typeof item.key === typeof {} ? item.key.value : item.key;
        if (itemTitle.toLowerCase() === title) {
          findTitle = itemTitle;
          findKey = itemKey;
          return item;
        }
        if (itemTitle.toLowerCase().indexOf(title) > -1) {
          findTitle = itemTitle;
          findKey = itemKey;
          return item;
        }
        return false;
      });

      if (!result) {
        findTitle = title;
        findKey = title;
        isTagSearching.value = true;
      }
      return { result, findTitle, findKey };
    }

    function setInputKey(value) {
      const { findKey, findTitle } = onFindTitle(value);

      /*
      if (!result || type === 'tag') {
        // items 목록에 없는 값을 입력 시 return
        onClear()
        return false
      }
      */

      // 선택된 key 정보 저장
      selectedKeyItem.value = findKey;
      emit('update:key', findKey);
      searchValue.value = `${findTitle}:`;
      isValueSearch.value = true;
    }

    const menuProps = reactive({
      closeOnClick: false,
      closeOnContentClick: false
    });

    /**
     * isValueSearch: key 또는 value 중 현재 입력 중인 값이 둘 중 어떤 것에 해당하는지 체크할 수 있는 flag 값
     * searchValue: input field 내에 보여지는 값 (menu item에서 click 이벤트 발생 시 값이 undefined이며, 값은 value paramter에 담겨온다.)
     * @param {*} e Keyboard Evnet (menu item click 시 값이 없음)
     * @param {*} value menu item click 시 넘어오는 값 (input field에서 직접 입력 후 enter 이벤트 발생 시 값이 undefined)
     */
    function onEnter(e, value, type) {
      // console.log(e, value, type, searchValue.value)
      // key 또는 value 값
      let inputValue = '';

      // value 값
      const searchValueSplit = searchValue.value.split(':');
      const setValue =
          searchValueSplit.length > 1 && searchValueSplit[1].trim()
            ? searchValue.value.replace(`${searchValue.value.split(':')[0]}:`, '')
            : value?.toString().trim();
      if (!isValueSearch.value) {
        inputValue =
            searchValueSplit.length && searchValueSplit[0].trim()
              ? searchValueSplit[0]
              : value;
      } else {
        // 키보드 이벤트 시 예외처리
        inputValue = searchValueSplit.length
          ? `${searchValueSplit[0]}: ${setValue}`
          : '';
      }

      // key 값이 있을 때
      if (isValueSearch.value && setValue) {
        // key가 존재하는 값인지 확인
        const { findKey, findTitle } = onFindTitle(inputValue);

        // 선택된 key, value, title 정보 저장
        const addItem = {
          title: findTitle,
          value: setValue.trim(),
          key: findKey,
          type: isTagSearching.value ? 'tag' : null
        };
        // console.log(addItem)
        valuesItem.push(addItem);
        // 변경된 검색 데이터 목록
        emit('update:search', valuesItem);

        // 추가된 아이템 이벤트
        emit('update:target-item', addItem);

        // 이벤트 delay => 너무 빨라서 select items 목록이 안닫힘
        setTimeout(() => {
          menuProps.closeOnClick = false;
          menuProps.closeOnContentClick = false;
        }, 500);

        onClear();
        return;
      }
      // key 값 세팅
      menuProps.closeOnClick = true;
      menuProps.closeOnContentClick = true;
      if (type) {
        isTagSearching.value = true;
      }
      if (inputValue) {
        setInputKey(inputValue);
        return;
      }
      isValueSearch.value = true;
    }

    function onUpdateInput(e) {
      if (e.data === ':') {
        isValueSearch.value = true;
        onEnter();
      }
    }

    function onDeleteSearchItem(index) {
      // 삭제된 아이템 이벤트
      emit('update:target-item', valuesItem[index]);
      valuesItem.splice(index, 1);

      // 변경된 검색 데이터 목록
      emit('update:search', valuesItem);
    }

    const onClickSearchNullTag = () => {
      const addUndefinedTagItem = {
        title: '미지정 태그',
        value: null,
        key: 'undefinedTag',
        type: 'tag'
      };
      if (valuesItem.length) {
        const result = valuesItem.some(item => item.key === 'undefinedTag');
        if (result) return;
      }
      valuesItem.push(addUndefinedTagItem);
      emit('update:search', valuesItem);
    };

    const autoComp = ref(null);

    return {
      updateModelValue,
      searchValue,
      valuesItem,
      onEnter,
      isValueSearch,
      filterItems,
      customFilter,
      autoComp,
      onClear,
      onDeleteSearchItem,
      onUpdateInput,
      menuProps,
      onClickSearchNullTag
    };
  }
};
</script>

<style lang="scss">
</style>
