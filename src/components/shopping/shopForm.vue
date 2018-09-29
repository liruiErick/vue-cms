<template>
  <div class="dr-shopForm">
    <el-dialog width="35%" size="small" :title="$t('shop.lb_roleForm_title')" :visible.sync="dialogState.show"
               :close-on-click-modal="false">
      <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item :label="$t('shop.name')" prop="name">
          <el-input v-model="dialogState.formData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('shop.addressTotal')" prop="addressTotal">
          <el-cascader
            :options="options"
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
        rules: {
          name: [
            {
              message: this.$t("validate.inputNull", {
                label: this.$t("adminGroup.lb_group_name")
              }),
              trigger: "blur"
            }
          ],
          comments: [
            {
              message: this.$t("validate.inputNull", {
                label: this.$t("main.comments_label")
              }),
              trigger: "blur"
            },
            {
              min: 5,
              max: 30,
              message: this.$t("validate.ranglengthandnormal", {
                min: 5,
                max: 30
              }),
              trigger: "blur"
            }
          ]
        },
        options: area,
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
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = that.dialogState.formData;
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
                      if (index !== 2) {
                        that.temp.data += data[item] + '/'
                      } else {
                        that.temp.data += data[item]
                        params.addressTotal = params.addressTotal.join('/')
                        params.category = params.category.join('/')
                        params.image_path = that.image_path
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
      }
    }
  };
</script>
