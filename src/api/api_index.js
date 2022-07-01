import http from '../utils/http'
import localStorageEx from '../utils/localStorageEx.js'
import {
  baseUrl,
  appBaseUrl
} from "./api_config.js";
import {
  getTimeFormat,
  queryToBool
} from "../utils/util.js";
export const imgUrl = "https://gdxczx.yuezhengwl.com/"


/**
 * 导航
 * @param {Object} params
 */
 export function getChannel(params) {
  let url = `${baseUrl}api/Channel/getChannel`;
  return http.get(url, {
    ...params
  });
}


/**
 * 首页
 * @param {Object} params
 */
export function getIndexList(params) {
  let url = `${baseUrl}api/Index/index`;
  return http.get(url, {
    ...params
  });
}


/**
 * banner
 * @param {Object} params
 */
export function getBanner() {
  let url = `${baseUrl}api/banner/getBanner`;
  return http.get(url, {});
}


/**
 * getQrcode
 * @param {Object} params
 */
export function getQrcode() {
  let url = `${baseUrl}api/banner/getQrcode`;
  return http.get(url, {});
}