<template>
  <div class="dr-goodForm">
    <el-dialog width="35%" size="small" title="添加商品" :visible.sync="dialogState.show" :close-on-click-modal="false">
      <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="$t('adminGroup.lb_group_name')" prop="name">
          <el-input size="small" v-model="dialogState.formData.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('adminGroup.lb_group_dis')" prop="comments">
          <el-input size="small" v-model="dialogState.formData.comments"></el-input>
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
        this.$store.dispatch("hideAdminGroupForm");
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = this.dialogState.formData;
            // 更新
            if (this.dialogState.edit) {
              services.updateAdminGroup(params).then(result => {
                if (result.data.status === 200) {
                  this.$store.dispatch("hideAdminGroupForm");
                  this.$store.dispatch("getAdminGroupList");
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
              // 新增
              services.addAdminGroup(params).then(result => {
                if (result.data.status === 200) {
                  this.$store.dispatch("hideAdminGroupForm");
                  this.$store.dispatch("getAdminGroupList");
                  this.$message({
                    message: this.$t("main.addSuccess"),
                    type: "success"
                  });
                } else {
                  this.$message.error(result.data.message);
                }
                this.dialogState.show = false
              });
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
