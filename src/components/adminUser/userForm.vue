<template>
    <div class="dr-adminUserForm">
        <el-dialog width="35%" size="small" :title="$t('adminUser.lb_form_title')" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item :label="$t('adminUser.lb_userName')" prop="userName">
                    <el-input size="small" v-model="dialogState.formData.userName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('adminUser.lb_name')" prop="name">
                    <el-input size="small" v-model="dialogState.formData.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('adminUser.lb_password')" prop="password">
                    <el-input size="small" type="password" v-model="dialogState.formData.password"></el-input>
                </el-form-item>
                <!--<el-form-item :label="$t('adminUser.lb_confirmPassword')" prop="confirmPassword">-->
                    <!--<el-input size="small" type="password" v-model="dialogState.formData.password"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item :label="$t('adminUser.lb_userGroup')" prop="group">
                    <el-select size="small" v-model="dialogState.formData.group" :placeholder="$t('main.ask_select_label')">
                        <el-option :key="index" v-for="(group,index) in groups" :label="group.name" :value="group._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('adminUser.lb_phoneNum')" prop="phoneNum">
                    <el-input size="small" v-model.number="dialogState.formData.phoneNum"></el-input>
                </el-form-item>
                <el-form-item :label="$t('adminUser.lb_email')" prop="email">
                    <el-input size="small" v-model="dialogState.formData.email"></el-input>
                </el-form-item>
                <el-form-item :label="$t('adminUser.lb_enable')" prop="enable">
                    <el-switch :on-text="$t('main.radioOn')" :off-text="$t('main.radioOff')" v-model="dialogState.formData.enable"></el-switch>
                </el-form-item>
                <el-form-item :label="$t('adminUser.lb_comments')" prop="comments">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.comments"></el-input>
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
    dialogState: Object,
    groups: Array
  },
  data() {
    return {
      rules: {
        userName: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("adminUser.lb_userName")
            }),
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("adminUser.lb_name")
            }),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("adminUser.lb_password")
            }),
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("adminUser.lb_confirmPassword")
            }),
            trigger: "blur"
          }
        ],
        group: [
          {
            required: true,
            message: this.$t("validate.selectNull", {
              label: this.$t("adminUser.lb_userGroup")
            }),
            trigger: "change"
          }
        ],
        phoneNum: [
          {
            type: "number",
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("adminUser.lb_phoneNum")
            }),
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("adminUser.lb_email")
            }),
            trigger: "blur"
          }
        ],
        comments: [
          {
            message: this.$t("validate.inputNull", {
              label: this.$t("adminUser.lb_comments")
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
      this.$store.dispatch("hideAdminUserForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, this.dialogState.formData);
          params.password = params.password;
          // 更新
          if (this.dialogState.edit) {
            services.updateAdminUser(params).then(result => {
              if (result.status === 200) {
                this.$store.dispatch("hideAdminUserForm");
                this.$store.dispatch("getAdminUserList");
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
            services.addAdminUser(params).then(result => {
              if (result.status === 200) {
                this.$store.dispatch("hideAdminUserForm");
                this.$store.dispatch("getAdminUserList");
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
    },
    resetForm(formName) {
      this.dialogState.formData = {};
    }
  }
};
</script>
