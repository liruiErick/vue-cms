<template>
    <div class="dr-shopForm">
        <el-dialog width="35%" size="small" :title="$t('shop.lb_roleForm_title')" :visible.sync="dialogState.show" :close-on-click-modal="false">
        <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item :label="$t('shop.name')" prop="name">
            <el-input v-model="dialogState.formData.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('shop.addressTotal')" prop="addressTotal">
            <LinkAge :data="dialogState.formData.addressTotal" :options="options" @data></LinkAge>
          </el-form-item>
          <el-form-item :label="$t('shop.category')" prop="category">
            <LinkAge :data="dialogState.formData.category" :options="category"></LinkAge>
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
            <UpLoad :src="dialogState.formData.image_path"></UpLoad>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="submitForm('ruleForm')">{{dialogState.edit ? $t('main.form_btnText_update') : $t('main.form_btnText_save')}}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>
<script>
import services from "../../store/services.js";
import LinkAge from '../common/linkage.vue';
import UpLoad from '../common/upload.vue';
import area from '../../../static/json/area.json';
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
      options:area
    };
  },
  mounted() {
  },
  components: {
    LinkAge,
    UpLoad
  },
  methods: {
    confirm() {
      this.$store.dispatch("hideShopListForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.dialogState.formData;
          params.addressTotal = params.addressTotal.join('/')
          params.category = params.category.join('/')
          debugger
          // 更新
          if (this.dialogState.edit) {
            services.updateShop(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hideShopListForm");
                this.$store.dispatch("getShopList");
                this.$message({
                  message: this.$t("main.updateSuccess"),
                  type: "success"
                });
              } else {
                this.$message.error(result.data.message);
              }
              this.dialogState.show = false
            });
          } else {
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
