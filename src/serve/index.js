import ajax from './ajax'

// 定义基础路径
const BASEUrl = "http://app.fowardfuture.com/ws/";

/***** 健康调查表接口 *********/
// 1,存储用户信息（POST）
export const saveInfo = (data) => ajax(BASEUrl + 'save', {
  ...data
}, 'POST');
// 2,根据身份证号反显用户信息
export const idQuery = (idcard) => ajax(BASEUrl + 'getByIdcard', {
  idcard
}, 'POST');
// 3，查询单位学校信息
export const UnitInquiry = () => ajax(BASEUrl + 'getByInfoDict', {
  code: 'company'
}, 'get');
// 4，查询小区信息
export const PlotInquiry = () => ajax(BASEUrl + 'getByXiaoquDict', {}, 'get');


