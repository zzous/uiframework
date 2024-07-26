// eslint-disable no-underscore-dangle
// eslint-disable import/no-unresolved
/**
 * 사용법 참고 URL
 * https://vee-validate.logaretm.com/v2/guide/components/validation-provider.html#manual-validation
 * https://www.npmjs.com/package/@vee-validate/rules
 * */
import { defineRule, configure } from 'vee-validate';
import i18n from '@/i18n';
import {
  checkValidate,
  checkCidrBlock,
  checkCidrRange,
  checkVpcInnerSubnet
} from '@/lib/cidrChecker';

const checkVal = [null, undefined, ''];

configure({
  generateMessage: context => {
    // console.log('validate', context, context.rule.name)
    if (context.rule.name === 'required') {
      let field = '';
      if (context.rule.params.length) {
        field = context.rule?.params[0];
      } else {
        field = context.field;
      }
      const displayField = i18n.global.t(`fields.${field}`);

      return i18n.global.t(`validation.${context.rule.name}`, {
        field: displayField
      });
    }
    return i18n.global.t(`validation.${context.rule.name}`, context.rule.params);
  }
});

// Object.keys(rules).forEach(rule => {
//   defineRule(rule, rules[rule]);
// })

defineRule('required', value => {
  return !checkVal.includes(value);
});

/**
 * <Field name="password" type="password" rules="required|minLength:8" />
 */
defineRule('minLength', (value, [limit]) => {
  // console.log(value)
  // The field is empty so it should pass
  // if (!value || !value.length) {
  //   return true
  // }
  if (!value || !value.length || value.length < limit) {
    return false;
  }
  return true;
});

/**
 * <Field name="longitude" type="number" rules="required|minMax:-180,180" />
 */
defineRule('minMax', (value, [min, max]) => {
  // The field is empty so it should pass

  if (!value || !value.length) {
    return true;
  }
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return 'This field must be numberic';
  if (numericValue < min) {
    return `This field must be greater than ${min}`;
  }
  if (numericValue > max) {
    return `This field must be less than ${max}`;
  }
  return true;
});

defineRule('validCaptcha', value => {
  return value;
});

defineRule('validIpAddr', value => {
  const pattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  if (![null, undefined].includes(value) && !pattern.test(value)) {
    return false;
  }
  return true;
});

defineRule('validCidrBlock', value => {
  return checkCidrBlock(value);
});

defineRule('validSubnetCidrRange', (value, [target, block], ctx) => {
  if (checkVal.includes(value)) return false;
  const vpcCidrBlock = block ? ctx.form[target][block] : ctx.form[target];
  if (checkVal.includes(vpcCidrBlock)) return false; // vpc가 선택되지 않은 경우 오류처리
  const blockCheck = value.split('/')[1];
  // 슬래시(/) 이후 block 값 체크해서 값이 없는 경우와 숫자가 아닌경우 오류처리
  if (checkVal.includes(blockCheck) || Number.isNaN(Number(blockCheck)))
    return false;
  if (
    checkValidate(value) &&
    checkCidrRange(value) &&
    checkVpcInnerSubnet(vpcCidrBlock, value)
  ) {
    return true;
  }
  return false;
});

defineRule('limitCidrBlock', value => {
  const splitValue = value.split('/');
  if (splitValue.length > 1) {
    const cidr = splitValue[1];
    if (cidr > 15 && cidr < 29) {
      return true;
    }
  }
  // if (![null, undefined].includes(value) && ) {
  //   return false
  // }
  return false;
});

defineRule('validResourceName', value => {
  console.log(value);
  // TODO 임시, error message 문구 수정 필요
  // 2 ~ 20 자 사이, 첫 글자는 영문만 특수문자는 -_만 입력 가능
  const pattern = /^[a-zA-Z][a-zA-Z0-9-_]{1,19}$/;
  if (!checkVal.includes(value) && !pattern.test(value)) {
    return false;
  }
  return true;
});

defineRule('validDescription', value => {
  // 255 자 이내, 영문, 숫자, 특수문자만 입력 가능
  // const pattern = /^[a-zA-Z0-9\x20-\x7E]{1,255}$/
  // 255 자 이내
  const pattern = /^.{1,255}$/;
  if (value && !pattern.test(value)) {
    // return `(${value}) 허용되지 않는 문자를 포함합니다. 255자 이내의 영문, 숫자, 특수문자만 입력 가능합니다.`
    return false;
  }
  return true;
});

// Cloud Type에 따라 필수 값 여부 체크
defineRule('vpcCheckRequired', (value, passList, ctx) => {
  console.log(passList.includes(ctx.form.cloudType));
  if (!value) {
    if (passList.includes(ctx.form.cloudType)) {
      return false;
    }
  }
  return true;
});
