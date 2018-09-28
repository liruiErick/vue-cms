<template>
    <div class="dr-shopForm">
        <el-dialog width="35%" size="small" :title="$t('shop.lb_roleForm_title')" :visible.sync="dialogState.show" :close-on-click-modal="false">
        <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item :label="$t('shop.name')" prop="name">
            <el-input v-model="dialogState.formData.name" auto-complete="off"></el-input>
          </el-form-item>
          <!--<el-form-item :label="$t('shop.address')" prop="name">-->
            <!--<el-autocomplete-->
              <!--v-model="address.address"-->
              <!--:fetch-suggestions="querySearchAsync"-->
              <!--placeholder="请输入地址"-->
              <!--style="width: 100%;"-->
              <!--@select="addressSelect"-->
            <!--&gt;</el-autocomplete>-->
            <!--<span>当前城市：{{city.name}}</span>-->
          <!--</el-form-item>-->
          <el-form-item :label="$t('shop.description')" prop="description">
            <el-input v-model="dialogState.formData.description"></el-input>
          </el-form-item>
          <el-form-item :label="$t('shop.phone')" prop="phone">
            <el-input v-model="dialogState.formData.phone"></el-input>
          </el-form-item>
          <!--<el-form-item :label="$t('shop.category')">-->
            <!--<el-cascader-->
              <!--:options="categoryOptions"-->
              <!--v-model="selectedCategory"-->
              <!--change-on-select-->
            <!--&gt;</el-cascader>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="商铺图片" label-width="100px">-->
            <!--<el-upload-->
              <!--class="avatar-uploader"-->
              <!--:action="baseUrl + '/v1/addimg/shop'"-->
              <!--:show-file-list="false"-->
              <!--:on-success="handleServiceAvatarScucess"-->
              <!--:before-upload="beforeAvatarUpload">-->
              <!--<img v-if="dialogState.formData.image_path" :src="baseImgPath + dialogState.formData.image_path" class="avatar">-->
              <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button size="medium" type="primary" @click="submitForm('ruleForm')">{{dialogState.edit ? $t('main.form_btnText_update') : $t('main.form_btnText_save')}}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>
<script>
import services from "../../store/services.js";

export default {
  props: {
    dialogState: Object
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
      }
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("hideShopListForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
