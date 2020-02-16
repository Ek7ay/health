import ajax from './ajax'

/***** 健康调查表接口 *********/
// 1,存储用户信息（POST）
export const saveInfo = (data) => ajax('save', {
  ...data
}, 'POST');
// 2,根据身份证号反显用户信息
export const idQuery = (idcard) => ajax('getByIdcard', {
  idcard
}, 'POST');
// 3，查询单位学校信息
export const UnitInquiry = () => ajax( 'getByInfoDict', {
  code: 'company'
}, 'get');
// 4，查询小区信息
export const PlotInquiry = () => ajax('getByXiaoquDict', {}, 'get');


