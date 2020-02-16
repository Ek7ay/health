import ajax from './ajax'

// 1. 定义基础路径
const baseUrl = "http://39.106.33.110:7300/mock/5de0dee2994998166e562224/electricity/";
const BASEUrl = "http://app.fowardfuture.com/ws/";

/***** 登录界面接口 *********/
// 1.获取手机验证码(GET)
// Easy Mock 模拟发送验证码
export const getPhoneCaptcha = (phoneNumber) => ajax(baseUrl + 'getVerificationCode', {
  phoneNumber
});

// 2.手机验证码登录(POST)
// Easy Mock 模拟用户登录
export const phoneCaptchaLogin = (phone, captcha) => ajax(baseUrl + 'login_code', {
  phone,
  captcha
}, 'POST');

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




