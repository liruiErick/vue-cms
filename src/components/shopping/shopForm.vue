<template>
  <div class="dr-shopForm">
    <el-dialog width="35%" size="small" :title="$t('shop.lb_roleForm_title')" :visible.sync="dialogState.show"
               :close-on-click-modal="false">
      <div v-if="dialogState.edit">
        <el-form :model="dialogState.formData" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item :label="$t('shop.name')" prop="name">
            <el-input v-model="dialogState.formData.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('shop.addressTotal')" prop="addressTotal">
            <el-cascader
              :options="addressOptions"
              change-on-select
              v-model="dialogState.formData.addressTotal"
            ></el-cascader>
            <!--<LinkAge :data="dialogState.formData.addressTotal" :options="options"  v-on:handleChange="handleChange"></LinkAge>-->
          </el-form-item>
          <el-form-item :label="$t('shop.category')" prop="category">
            <el-cascader
              :options="category"
              change-on-select
              v-model="dialogState.formData.category"
            ></el-cascader>
          </el-form-item>
          <el-form-item :label="$t('shop.address')" prop="address">
            <el-input v-model="dialogState.formData.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('shop.description')" prop="description">
            <el-input v-model="dialogState.formData.description"></el-input>
          </el-form-item>
          <el-form-item :label="$t('shop.phone')" prop="phone">
            <el-input v-model="dialogState.formData.phone"></el-input>
          </el-form-item>
          <el-form-item :label="$t('shop.imgPath')" prop="image_path">
            <!--<UpLoad :src="dialogState.formData.image_path"></UpLoad>-->
            <el-upload
              list-type="picture-card"
              :file-list="dialogState.formData.image_path"
              :limit="1"
              accept="image/jpeg,image/png"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :on-success="handleChange"
              :on-remove="handleRemove"
              :action="action"
              :data="postData">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="bigImgDialog">
              <img width="100%" :src="url" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="submitForm('ruleForm')">
              {{dialogState.edit ? $t('main.form_btnText_update') : $t('main.form_btnText_save')}}
            </el-button>
            <el-button size="medium" @click="resetForm('ruleForm')">{{$t('main.reSetBtnText')}}</el-button>
          </el-form-item>
        </el-form>
        <!--:rules="editRules"-->
      </div>
      <div v-else>
        <!--:rules="addRules"-->
        <el-form :model="formData" ref="formData" label-width="140px" class="demo-formData">
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('shop.addressTotal')" prop="addressTotal">
            <el-cascader
              :options="addressOptions"
              change-on-select
              v-model="formData.addressTotal"
            ></el-cascader>
          </el-form-item>
          <el-form-item :label="$t('shop.address')" prop="address">
            <el-input v-model="formData.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="formData.phone" maxLength="11"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="description">
            <el-input v-model="formData.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语" prop="promotion_info">
            <el-input v-model="formData.promotion_info"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader
              :options="category"
              change-on-select
              v-model="formData.category"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="店铺特点" style="white-space: nowrap;">
            <span>品牌保证</span>
            <el-switch on-text="" off-text="" v-model="formData.is_premium"></el-switch>
            <span>蜂鸟专送</span>
            <el-switch on-text="" off-text="" v-model="formData.delivery_mode"></el-switch>
            <span>新开店铺</span>
            <el-switch on-text="" off-text="" v-model="formData.new"></el-switch>
          </el-form-item>
          <el-form-item style="white-space: nowrap;">
            <span>外卖保</span>
            <el-switch on-text="" off-text="" v-model="formData.bao"></el-switch>
            <span>准时达</span>
            <el-switch on-text="" off-text="" v-model="formData.zhun"></el-switch>
            <span>开发票</span>
            <el-switch on-text="" off-text="" v-model="formData.piao"></el-switch>
          </el-form-item>
          <el-form-item label="配送费" prop="float_delivery_fee">
            <el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价" prop="float_minimum_order_amount">
            <el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="营业时间" style="white-space: nowrap;">
            <el-time-select
              placeholder="起始时间"
              v-model="formData.startTime"
              :picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="formData.endTime"
              :picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: formData.startTime
							}">
            </el-time-select>
          </el-form-item>
          <el-form-item label="上传店铺头像">
            <el-upload
              list-type="picture-card"
              :file-list="formData.image_path"
              :limit="1"
              accept="image/jpeg,image/png"
              :on-exceed="handleExceed"
              :on-success="imagePath"
              :on-remove="handleRemove"
              :action="action"
              :data="postData">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传营业执照">
            <el-upload
              list-type="picture-card"
              :file-list="formData.business_license_image"
              :limit="1"
              accept="image/jpeg,image/png"
              :on-exceed="handleExceed"
              :on-success="businessLicenseImage"
              :on-remove="handleRemove"
              :action="action"
              :data="postData">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传餐饮服务许可证">
            <el-upload
              list-type="picture-card"
              :file-list="formData.catering_service_license_image"
              :limit="1"
              accept="image/jpeg,image/png"
              :on-exceed="handleExceed"
              :on-success="cateringServiceLicenseImage"
              :on-remove="handleRemove"
              :action="action"
              :data="postData">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="优惠活动">
            <el-select v-model="activityValue" @change="selectActivity" :placeholder="activityValue">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-table
            :data="formData.activities"
            style="min-width: 600px;margin-bottom: 20px;text-align: center"
            align="cneter"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="icon_name"
              label="活动标题"
              align="cneter"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="活动名称"
              align="cneter"
              width="120">
            </el-table-column>
            <el-table-column
              prop="description"
              align="cneter"
              label="活动详情">
            </el-table-column>
            <el-table-column
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item class="button_submit">
            <el-button size="medium" type="primary" @click="submitForm('formData')">
              {{dialogState.edit ? $t('main.form_btnText_update') : $t('main.form_btnText_save')}}
            </el-button>
            <el-button size="medium" @click="resetForm('formData')">{{$t('main.reSetBtnText')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {token, action, domain} from "../../public/qiniuToken";
  import services from "../../store/services.js";
  import area from '../../../static/json/area.json';
  import axios from 'axios'

  export default {
    props: {
      dialogState: Object,
      category: Array
    },
    data() {
      return {
        city: {},
        formData: {
          name: '', //店铺名称
          address: '', //地址
          latitude: '',
          addressTotal:'',
          longitude: '',
          description: '', //介绍
          phone: '',
          promotion_info: '',
          float_delivery_fee: 5, //运费
          float_minimum_order_amount: 20, //起价
          is_premium: true,
          delivery_mode: true,
          new: true,
          bao: true,
          zhun: true,
          piao: true,
          startTime: '',
          endTime: '',
          image_path: [],
          business_license_image: [],
          catering_service_license_image: [],
          activities: [{
            icon_name: '减',
            name: '满减优惠',
            description: '满30减5，满60减8',
          }]
        },
        addRules: {
          name: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话' },
            { type: 'number', message: '电话号码必须是数字' }
          ],
        },
        options: [{
          value: '满减优惠',
          label: '满减优惠'
        }, {
          value: '优惠大酬宾',
          label: '优惠大酬宾'
        }, {
          value: '新用户立减',
          label: '新用户立减'
        }, {
          value: '进店领券',
          label: '进店领券'
        }],
        activityValue: '满减优惠',
        activities: [{
          icon_name: '减',
          name: '满减优惠',
          description: '满30减5，满60减8',
        }],
        categoryOptions: [],
        selectedCategory: ['快餐便当', '简餐'],
        editRules: {
          name: [
            {
              message: this.$t("validate.inputNull", {
                label: this.$t("adminGroup.lb_group_name")
              }),
              trigger: "blur"
            }
          ]
        },
        addressOptions: area,
        mapJson: '../../../static/json/map.json',
        input: '',
        maxlength: 10,
        fileList: [],
        postData: {
          token: token()
        },
        action: action,
        bigImgDialog: false,
        url: '',
        domain: domain,
        image_path: [],
        temp: {
          data: '',
          swt: false
        }
      };
    },
    mounted() {
    },
    components: {},
    methods: {
      confirm() {
        this.$store.dispatch("hideShopListForm");
      },
      handleData(datas) {
        let that = this;
        that.temp = {
          data: '',
          swt: false
        };
        datas.forEach(function (value, index) {
          axios.get(that.mapJson).then(function (res) {
            if (res.status === 200) {
              let data = res.data
              for (let item in data) {
                if (item === value) {//省
                  if (index !== 2) {
                    that.temp.data += data[item] + '/'
                  } else {
                    that.temp.data += data[item]
                    that.temp.swt = true
                  }
                }
              }
            }
            else {
              console.log(res.status)
            }
          })
        })
      },
      submitForm(formName) {
        let that = this;
        debugger
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = that.dialogState.edit?that.dialogState.formData:that.formData;
            that.temp = {
              data: '',
              swt: false
            };
            (params.addressTotal).forEach(function (value, index) {
              axios.get(that.mapJson).then(function (res) {
                if (res.status === 200) {
                  let data = res.data
                  for (let item in data) {
                    if (item === value) {//省
                      if (index < 2) {
                        that.temp.data += data[item] + '/'
                      } else {
                        that.temp.data += data[item]
                        params.addressTotal = params.addressTotal.length>0?params.addressTotal.join('/'):params.addressTotal
                        params.category = params.category.length>0?params.category.join('/'):params.category
                        params.image_path = that.dialogState.edit?(that.image_path.length>0?that.image_path:params.image_path):that.formData.image_path;
                        params.addressTotals = that.temp.data
                        // 更新
                        if (that.dialogState.edit) {
                          services.updateShop(params).then(result => {
                            if (result.data.status === 200) {
                              that.$store.dispatch("hideShopListForm");
                              that.$store.dispatch("getShopList");
                              that.$message({
                                message: that.$t("main.updateSuccess"),
                                type: "success"
                              });
                            } else {
                              that.$message.error(result.data.message);
                            }
                            that.dialogState.show = false
                          });
                        } else {
                          // 新增
                          debugger
                          services.addRestaurant(params).then(result => {
                            if (result.data.status === 200) {
                              that.$store.dispatch("hideShopListForm");
                              that.$store.dispatch("getShopList");
                              that.$message({
                                message: that.$t("main.addSuccess"),
                                type: "success"
                              });
                            } else {
                              that.$message.error(result.data.message);
                            }
                            that.dialogState.show = false
                          });
                        }
                      }
                    }
                  }
                }
                else {
                  console.log(res.status)
                }
              })
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //图片上传
      handleChange(file, fileList) {
        this.image_path = [{
          "name": fileList.name,
          "url": this.domain + fileList.response.hash
        }]
      },
      imagePath(file, fileList) {
        this.formData.image_path = [{
          "name": fileList.name,
          "url": this.domain + fileList.response.hash
        }]
      },
      businessLicenseImage(file, fileList) {
        this.formData.business_license_image = [{
          "name": fileList.name,
          "url": this.domain + fileList.response.hash
        }]
      },
      cateringServiceLicenseImage(file, fileList) {
        this.formData.catering_service_license_image = [{
          "name": fileList.name,
          "url": this.domain + fileList.response.hash
        }]
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
      },
      handlePictureCardPreview(file) {
        this.bigImg(file.url)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      bigImg(url) {
        this.url = url;
        this.bigImgDialog = true;
      },
      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      selectActivity(){
        this.$prompt('请输入活动详情', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if (value == null) {
            this.$message({
              type: 'info',
              message: '请输入活动详情'
            });
            return
          }
          let newObj = {};
          switch(this.activityValue){
            case '满减优惠':
              newObj= {
                icon_name: '减',
                name: '满减优惠',
                description: value,
              }
              break;
            case '优惠大酬宾':
              newObj= {
                icon_name: '特',
                name: '优惠大酬宾',
                description: value,
              }
              break;
            case '新用户立减':
              newObj= {
                icon_name: '新',
                name: '新用户立减',
                description: value,
              }
              break;
            case '进店领券':
              newObj= {
                icon_name: '领',
                name: '进店领券',
                description: value,
              }
              break;
          }
          this.formData.activities.push(newObj);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      handleDelete(index){
        this.activities.splice(index, 1)
      },
    }
  };
</script>
