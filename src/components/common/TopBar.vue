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
      <div v-else-if="type === 'content'">
        <el-button size="small" type="primary" plain @click="addContent('content')" round><i class="fa fa-fw fa-plus" aria-hidden="true"></i></el-button>
        <el-button size="small" type="danger" plain round @click="branchDelete('content')"><i class="fa fa-fw fa-trash-o"></i></el-button>
      </div>
      <div v-else-if="type === 'contentCategory'">
        <el-button size="small" type="primary" plain @click="addTopCates" round><i class="fa fa-fw fa-plus" aria-hidden="true"></i></el-button>
      </div>
      <div v-else-if="type === 'contentMessage'">
        <el-button size="small" type="danger" plain round @click="branchDelete('msg')"><i class="fa fa-fw fa-trash-o"></i></el-button>
      </div>
      <div v-else-if="type === 'contentTag'">
        <el-button size="small" type="primary" plain round @click="addTag"><i class="fa fa-fw fa-plus" aria-hidden="true"></i></el-button>
      </div>
      <div v-else-if="type === 'backUpData'">
        <el-button size="small" type="primary" plain round @click="bakUpData" :loading="loadingState"><i class="fa fa-fw fa-cloud-download" aria-hidden="true"></i></el-button>
      </div>
      <div v-else-if="type === 'systemOptionLogs'">
        <el-button size="small" type="danger" plain round @click="branchDelete('systemlogs')"><i
          class="fa fa-fw fa-trash-o"></i></el-button>
        <el-tooltip class="item" effect="dark" content="清空所有日志" placement="right-start">
          <el-button size="small" type="warning" plain round @click="clearSystemOptionLogs"><i
            class="fa fa-fw fa-window-restore"></i></el-button>
        </el-tooltip>
      </div>
      <div v-else-if="type === 'systemNotify'">
        <el-button size="small" type="primary" plain round @click="setHasRead()"><i class="fa fa-fw fa-eye" aria-hidden="true"></i></el-button>
        <el-button size="small" type="danger" plain round @click="branchDelete('systemnotify')"><i class="fa fa-fw fa-trash-o"></i></el-button>
      </div>
      <div v-else-if="type === 'systemAnnounce'">
        <el-button type="primary" size="small" plain round @click="addSysAnnounce"><i class="fa fa-fw fa-plus"></i>
        </el-button>
      </div>
      <div v-if="type === 'shopList'">
        <el-button size="small" type="primary" plain @click="addShop" round><i class="fa fa-fw fa-plus" aria-hidden="true"></i></el-button>
      </div>
    </div>
    <div class="el-col-18">
      <div class="dr-toolbar-right" v-if="type === 'content'">
        <el-input class="dr-searchInput" size="small" :placeholder="$t('topBar.keywords')" v-model="pageInfo.searchkey"
                  suffix-icon="el-icon-search" @keyup.enter.native="searchResult" :on-icon-click="searchResult">
        </el-input>
        <div class="dr-select-box">
          <el-select size="small" @change="changePostOptions" v-model="authPost" placeholder="请选择">
            <el-option
              v-for="item in authPostOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="dr-toolbar-right" v-else-if="type === 'contentTag'">
        <el-input class="dr-searchInput" size="small" :placeholder="$t('topBar.tagName')" v-model="pageInfo.searchkey"
                  suffix-icon="el-icon-search" @keyup.enter.native="searchResult" :on-icon-click="searchResult">
        </el-input>
      </div>
      <div class="dr-toolbar-right" v-else-if="type === 'contentMessage'">
        <el-input class="dr-searchInput" size="small" :placeholder="$t('topBar.messageContent')"
                  v-model="pageInfo.searchkey" suffix-icon="el-icon-search" @keyup.enter.native="searchResult"
                  :on-icon-click="searchResult">
        </el-input>
      </div>
      <div class="dr-toolbar-right" v-else></div>
    </div>
  </div>
</template>
<script>
  import services from "../../store/services.js";
  import _ from "lodash";

  export default {
    props: {
      pageInfo: Object,
      type: String,
      ids: Array,
      code: String,
      path: String
    },
    data() {
      return {
        targetSysLogType: "all",
        loadingState: false,
        formState: {
          show: false
        },
        searchkey: "",
        authPost: "0",
        authPostOptions: [
          {
            value: "0",
            label: "全部"
          },
          {
            value: "1",
            label: "待审核"
          }
        ]
      };
    },
    methods: {
      changePostOptions(value) {
        if (value === "0") {
          this.$store.dispatch("getContentList");
        } else if (value === "1") {
          this.$store.dispatch("getContentList", {state: false});
        }
      },
      selectSysLogType(type) {
        this.targetSysLogType = type;
        if (type === "all") {
          this.$store.dispatch("getSystemLogsList");
        } else {
          this.$store.dispatch("getSystemLogsList", {type});
        }
      },
      searchResult(ev) {
        debugger
        let searchkey = this.pageInfo ? this.pageInfo.searchkey : "";
        if (this.type === "content") {
          this.$store.dispatch("getContentList", {
            searchkey
          });
        } else if (this.type === "contentTag") {
          this.$store.dispatch("getContentTagList", {
            searchkey
          });
        } else if (this.type === "contentMessage") {
          this.$store.dispatch("getContentMessageList", {
            searchkey
          });
        }
      },
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
      addContent() {
        this.$store.dispatch("showContentForm");
        this.$router.push("/addContent");
      },
      addSysAnnounce() {
        this.$store.dispatch("showContentForm");
        this.$router.push("/addSysAnnounce");
      },
      addTopCates() {
        this.$store.dispatch("showContentCategoryForm", {
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
            if (target === "msg") {
              return services.deleteContentMessage({
                ids
              });
            } else if (target === "user") {
              return services.deleteRegUser({
                ids
              });
            } else if (target === "systemlogs") {
              return services.deleteSystemOptionLogs({
                ids
              });
            } else if (target === "systemnotify") {
              return services.deleteSystemNotify({
                ids
              });
            } else if (target === "content") {
              return services.deleteContent({
                ids
              });
            }
          })
          .then(result => {
            if (result.data.status === 200) {
              if (target === "msg") {
                this.$store.dispatch("getContentMessageList");
              } else if (target === "user") {
                this.$store.dispatch("getRegUserList");
              } else if (target === "systemlogs") {
                this.$store.dispatch("getSystemLogsList");
              } else if (target === "systemnotify") {
                this.$store.dispatch("getSystemNotifyList");
              } else if (target === "content") {
                this.$store.dispatch("getContentList");
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
      addTag() {
        this.$store.dispatch("showContentTagForm");
      },
      delUser() {
        // this.$store.dispatch('showAdminUserForm')
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
      setHasRead() {
        if (_.isEmpty(this.ids)) {
          this.$message({
            type: "info",
            message: this.$t("validate.selectNull", {
              label: this.$t("main.target_Item")
            })
          });
          return false;
        }
        let ids = this.ids.join();
        services.setNoticeRead({ids}).then(result => {
          if (result.data.status === 200) {
            this.$store.dispatch("getSystemNotifyList");
            let oldNoticeCounts = this.$store.getters.loginState.noticeCounts;
            this.$store.dispatch("loginState", {
              noticeCounts: oldNoticeCounts - this.ids.length
            });
          } else {
            this.$message.error(result.data.message);
          }
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
