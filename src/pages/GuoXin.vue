<template>
    <div class="guoXin" @click="identityQuery">
      <van-nav-bar title="健康登记表" :border="false"/>
      <van-cell-group>
        <van-field
          required
          :error-message="nameError"
          label="姓名"
          v-model="name"
          placeholder="请输入姓名"
        />
        <van-field
          required
          :error-message="idCardError"
          label="身份证号"
          v-model="idcard"
          placeholder="请输入身份证号"
        />
        <van-field
          readonly
          required
          clickable
          right-icon="arrow"
          label="性别"
          :value="sex"
          placeholder="请选择性别"
          @click="showPicker1 = true"
        />
        <van-popup v-model="showPicker1" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker1 = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field
          required
          :error-message="telError"
          label="联系电话"
          v-model="tel"
          placeholder="请输入电话号码"
        />
        <van-field
          readonly
          required
          clickable
          right-icon="arrow"
          label="小区"
          :value="xiaoqu"
          placeholder="请选择小区"
          @click="showPicker2 = true"
        />
        <van-popup v-model="showPicker2" position="bottom">
          <van-picker
            show-toolbar
            :columns="plot"
            @cancel="showPicker2 = false"
            @confirm="onPlot"
          />
        </van-popup>
        <van-field
          required
          :error-message="addressError"
          label="详细住址"
          v-model="address"
          placeholder="请输入详细住址"
        />
        <van-field
          readonly
          required
          clickable
          right-icon="arrow"
          label="是否发热"
          :value="isfare"
          placeholder="请选择是否发热"
          @click="showPicker3 = true"
        />
        <van-popup v-model="showPicker3" position="bottom">
          <van-picker
            show-toolbar
            :columns="heat"
            @cancel="showPicker3 = false"
            @confirm="onHeat"
          />
        </van-popup>
        <van-field
          readonly
          required
          clickable
          right-icon="arrow"
          label="是否咳嗽"
          :value="iskesou"
          placeholder="请选择是否咳嗽"
          @click="showPicker4 = true"
        />
        <van-popup v-model="showPicker4" position="bottom">
          <van-picker
            show-toolbar
            :columns="cough"
            @cancel="showPicker4 = false"
            @confirm="onCough"
          />
        </van-popup>
        <van-field
          readonly
          required
          clickable
          right-icon="arrow"
          label="是否接触"
          :value="isjiechu"
          placeholder="请选择是否接触疑似或确诊病例"
          @click="showPicker5 = true"
        />
        <van-popup v-model="showPicker5" position="bottom">
          <van-picker
            show-toolbar
            :columns="contact"
            @cancel="showPicker5 = false"
            @confirm="onContact"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          right-icon="arrow"
          label="单位/学校"
          :value="danwei"
          placeholder="请选择单位学校名称"
          @click="showPicker6 = true"
        />
        <van-popup v-model="showPicker6" position="bottom">
          <van-picker
            show-toolbar
            :columns="school"
            @cancel="showPicker6 = false"
            @confirm="onSchool"
          />
        </van-popup>
        <van-field
          label="科室/班级"
          v-model="keshi"
          placeholder="请输入科室/班级"
        />
        <van-field
          label="备注"
          v-model="remark"
          placeholder="症状/形成描述"
        />
      </van-cell-group>

      <div class="btn-box">
        <van-button
          type="primary"
          block
          @click="saveMessage"
        >提交</van-button>
      </div>

      <div class="promise">
        <van-divider>本人承诺，本表填报情况属实</van-divider>
      </div>

    </div>
</template>

<script>
    import { saveInfo, idQuery, UnitInquiry, PlotInquiry } from '../serve/index.js'

    export default {
        data () {
          return {
            name: '',                   //姓名
            idcard: '',                 //身份证
            sex: '男',                    //性别
            showPicker1: false,
            columns: ['男', '女'],
            tel: '',                  //电话
            xiaoqu: '',               //小区
            showPicker2: false,
            plot: [],
            address: '',               //详细住址
            isfare: '否',               //是否发热
            showPicker3: false,
            heat: ['是', '否'],
            iskesou: '否',              //是否咳嗽
            showPicker4: false,
            cough: ['是', '否'],
            isjiechu: '否',            //近两周是否接处疑似或确诊病例
            showPicker5: false,
            contact: ['是', '否'],
            danwei: '',               //单位学校名称
            showPicker6: false,
            school: [],
            keshi: '',                //科室班级
            remark: '',                 //备注

            idCardError: '',          //身份证号错误提示
            nameError: '',            //姓名错误提示
            telError: '',             //电话错误提示
            addressError: '',         //详细地址校验

            plotDateList: [],              //查询出来的小区信息列表
            unitDataList: [],              //查询出来的单位学校信息列表
          }
        },
        created () {
          //查询小区信息
          PlotInquiry().then( res => {
            this.plotDateList = res.data;
            let plotDate = [];
            res.data.map((item, index) => {
              plotDate.push(item.residential);
            });
            this.plot = plotDate;
          });
          //查询学校单位信息
          UnitInquiry().then( res => {
            this.unitDataList = res.data;
            let unitData = [];
            res.data.map((item, index)=> {
              unitData.push(item.name);
            });
            this.school = unitData;
          });
        },
        watch: {
          name: function (val) {
            if (val) {
              this.nameError = '';
            }
          },
          tel: function (val) {
            if ((/^1[3456789]\d{9}$/.test(val))) {
              this.telError = '';
            }
          },
          address: function (val) {
            if (val) {
              this.addressError = '';
            }
          }
        },
        methods: {
          onConfirm(value) {
            this.sex = value;
            this.showPicker1 = false;
          },
          onPlot(value) {
            this.xiaoqu = value;
            this.showPicker2 = false;
          },
          onHeat(value) {
            this.isfare = value;
            this.showPicker3 = false;
          },
          onCough(value) {
            this.iskesou = value;
            this.showPicker4 = false;
          },
          onContact(value) {
            this.isjiechu = value;
            this.showPicker5 = false;
          },
          onSchool(value) {
            this.danwei = value;
            this.showPicker6 = false;
          },
          // 存储用户信息
          saveMessage () {
            // 表单验证
            // 姓名校验
            if (!this.name) {
              this.nameError = "姓名不能为空";
              return;
            }
            // 电话校验
            if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
              this.telError = '请输入正确的手机号';
              return;
            }
            // 详细地址校验
            if (!this.address) {
              this.addressError = '请输入详细地址';
              return;
            }
            // 获取小区id
            let xiaoquSelect;
            this.plotDateList.map((item, index) => {
              if (this.xiaoqu == item.residential) {
                xiaoquSelect = item.id;
              }
            });
            // 获取单位学校id
            let danweiSelect;
            this.unitDataList.map((item, index) => {
              if (this.danwei == item.name) {
                danweiSelect = item.id;
              }
            });

            let data = {
              name: this.name,
              idcard: this.idcard,
              sex: this.sex == "男" ? "1" : "2",
              tel: this.tel,
              xiaoqu: xiaoquSelect,
              address: this.address,
              isfare: this.isfare == "是" ? "3" : "4",
              iskesou: this.iskesou == "是" ? "3" : "4",
              isjiechu: this.isjiechu == "是" ? "3" : "4",
              danwei: danweiSelect,
              keshi: this.keshi,
              remark: this.remark
            };
            saveInfo(data).then( res => {
              this.$toast(res.msg);
            })
          },
          // 身份证格式校验，用于查询
          idCardTest(value) {
            if ((/\d{17}[\d|x]|\d{15}/).test(value) && (value.length === 15 || value.length === 18)) {
              this.idCardError = "";
              return true;
            } else {
              this.idCardError = "请输入正确的身份证号码";
              return false;
            }
          },
          // 根据身份证查询用户信息
          identityQuery () {
            this.idCardError = "";
            if (this.idcard && this.idCardTest(this.idcard)) {
              idQuery( this.idcard ).then( res => {
                this.name = res.data[0].name;
                this.sex = res.data[0].sexName;
                this.tel = res.data[0].tel;
                this.xiaoqu = res.data[0].xiaoquName;
                this.address = res.data[0].address;
                this.isfare = res.data[0].isfare == 3 ? "是" : "否";
                this.iskesou = res.data[0].iskesouName;
                this.isjiechu = res.data[0].isjiechuName;
                this.danwei = res.data[0].danweiName;
                this.keshi = res.data[0].keshi;
                this.remark = res.data[0].remark;
              }).catch((error) => {})     //错误处理
            }
          }
        }
    }
</script>

<style lang="stylus" scoped>
  .btn-box
    padding 0 .40rem
    margin-top .30rem
  .promise .van-divider
    margin .04rem
</style>
