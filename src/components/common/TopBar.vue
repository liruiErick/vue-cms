<template>
    <div class="dr-toolbar">
        <div class="option-button el-col-6">
            <div v-if="type === 'adminGroup'">
                <el-button size="small" type="primary" plain @click="addRole" round><i class="fa fa-fw fa-plus" aria-hidden="true"></i></el-button>
            </div>
            <div v-else-if="type === 'adminUser'">
                <el-button size="small" type="primary" plain @click="addUser" round><i class="fa fa-fw fa-plus"></i></el-button>
            </div>
            <div v-else-if="type === 'adminResource'">
                <el-button size="small" type="primary" plain @click="addResource" round><i class="fa fa-fw fa-plus" aria-hidden="true"></i></el-button>
            </div>
            <div v-else-if="type === 'backUpData'">
                <el-button size="small" type="primary" plain round @click="bakUpData" :loading="loadingState"><i class="fa fa-fw fa-cloud-download" aria-hidden="true"></i></el-button>
            </div>
            <div v-else-if="type === 'systemOptionLogs'">
                <el-button size="small" type="danger" plain round @click="branchDelete('systemlogs')"><i class="fa fa-fw fa-trash-o"></i></el-button>
                <el-tooltip class="item" effect="dark" content="清空所有日志" placement="right-start">
                    <el-button size="small" type="warning" plain round @click="clearSystemOptionLogs"><i class="fa fa-fw fa-window-restore"></i></el-button>
                </el-tooltip>
            </div>
            <div v-if="type === 'shopList'">
              <el-button size="small" type="primary" plain @click="addShop" round><i class="fa fa-fw fa-plus" aria-hidden="true"></i></el-button>
            </div>
        </div>
        <div class="el-col-18">
        </div>
    </div>
</template>
<script>
import services from "../../store/services.js";
import _ from "lodash";
export default {
  props: {
    type: String,
    ids: Array
  },
  data() {
    return {
      loadingState: false
    };
  },
  methods: {
    addUser() {
      this.$store.dispatch("showAdminUserForm");
    },
    addRole() {
      this.$store.dispatch("showAdminGroupForm");
    },
    addResource() {
      this.$store.dispatch("showAdminResourceForm", {
        type: "root",
        formData: {
          parentId: "0"
        }
      });
    },
    clearSystemOptionLogs() {
      this.$confirm(
        this.$t("main.del_notice"),
        this.$t("main.scr_modal_title"),
        {
          confirmButtonText: this.$t("main.confirmBtnText"),
          cancelButtonText: this.$t("main.cancelBtnText"),
          type: "warning"
        }
      )
        .then(() => {
          return services.clearSystemOptionLogs();
        })
        .then(result => {
          if (result.data.status === 200) {
            this.$store.dispatch("getSystemLogsList");
            this.$message({
              message: `清空日志成功`,
              type: "success"
            });
          } else {
            this.$message.error(result.data.message);
          }
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info")
          });
        });
    },
    branchDelete(target) {
      let _this = this,
        targetName;
      if (target === "msg") {
        targetName = this.$t("topBar.del_message");
      } else if (target === "user") {
        targetName = this.$t("topBar.del_user");
      } else if (target === "systemlogs") {
        targetName = this.$t("topBar.del_sysopt_log");
      } else if (target === "systemnotify") {
        targetName = this.$t("topBar.del_sys_notice");
      }
      if (_.isEmpty(_this.ids)) {
        this.$message({
          type: "info",
          message: this.$t("validate.selectNull", {
            label: this.$t("main.target_Item")
          })
        });
        return false;
      }
      this.$confirm(
        this.$t("main.del_notice"),
        this.$t("main.scr_modal_title"),
        {
          confirmButtonText: this.$t("main.confirmBtnText"),
          cancelButtonText: this.$t("main.cancelBtnText"),
          type: "warning"
        }
      )
        .then(() => {
          let ids = _this.ids.join();
          if (target === "systemlogs") {
            return services.deleteSystemOptionLogs({
              ids
            });
          }
        })
        .then(result => {
          if (result.data.status === 200) {
           if (target === "systemlogs") {
              this.$store.dispatch("getSystemLogsList");
            }
            this.$message({
              message: `${this.$t("main.scr_modal_del_succes_info")}`,
              type: "success"
            });
          } else {
            this.$message.error(result.data.message);
          }
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info")
          });
        });
    },
    bakUpData() {
      this.$confirm(
        this.$t("backUpData.askBak"),
        this.$t("main.scr_modal_title"),
        {
          confirmButtonText: this.$t("main.confirmBtnText"),
          cancelButtonText: this.$t("main.cancelBtnText"),
          type: "warning"
        }
      )
        .then(() => {
          this.loadingState = true;
          return services.bakUpData();
        })
        .then(result => {
          if (result.data.status === 200) {
            this.loadingState = false;
            this.$store.dispatch("getBakDateList");
            this.$message({
              message: this.$t("backUpData.bakSuccess"),
              type: "success"
            });
          } else {
            this.$message.error(result.data.message);
          }
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: this.$t("backUpData.bakEr") + err
          });
        });
    },
    addShop() {
      this.$store.dispatch("showShopListForm");
    }
  },
  components: {}
};
</script>
<style lang="scss">
.option-button {
  display: inline-block;
}
</style>
