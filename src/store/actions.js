import * as types from './types.js';
import services from './services.js';
import _ from 'lodash';

/**
 * 渲染树形目录数据
 */
export function renderTreeData(result) {
  let newResult = result;
  let treeData = newResult.docs;
  let childArr = _.filter(treeData, (doc) => {
    return doc.parentId != '0'
  });

  for (let i = 0; i < childArr.length; i++) {
    let child = childArr[i];
    for (let j = 0; j < treeData.length; j++) {
      let treeItem = treeData[j];
      if (treeItem._id == child.parentId || treeItem.id == child.parentId) {
        if (!treeItem.children) treeItem.children = [];
        treeItem.children.push(child);
        break;
      }
    }
  }

  newResult.docs = _.filter(treeData, (doc) => {
    return doc.parentId == '0'
  });
  return newResult;
}

export default {
  getGoodList({
                    commit
                  }, params = {}) {
    services.getGoods(params).then((result) => {
      debugger
      commit(types.GOODLIST, result.data.data)
    })
  },
  getCategoryList({
                commit
              }, params = {}) {
    services.getCategoryList(params).then((result) => {
      commit(types.CATEGORYLIST, result.data.data)
    })
  },
  getShopList({
                     commit
                   }, params = {}) {
    services.getShopList(params).then((result) => {
      commit(types.SHOPLIST, result.data.data)
    })
  },
  increment: ({
                commit
              }) => {
    console.log(commit);
    commit(types.INCREMENT);
  },
  decrement: ({
                commit
              }) => {
    console.log(commit);
    commit(types.DECREMENT);
  },
  handleOpen: ({
                 commit
               }) => {
    console.log(commit);
  },
  handleClose: ({
                  commit
                }) => {
    console.log(commit);
  },
  handleSelect: ({
                   commit
                 }) => {
    console.log(commit);
  },
  loginState: ({
                 commit
               }, params = {
    userInfo: {},
    state: false
  }) => {
    services.getUserSession().then((result) => {
      commit(types.ADMING_LOGINSTATE, result.data.data)
    })
  },
  showAdminUserForm: ({
                        commit
                      }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.ADMINUSERFORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideAdminUserForm: ({
                        commit
                      }) => {
    commit(types.ADMINUSERFORMSTATE, {
      show: false
    })
  },
  getAdminUserList({
                     commit
                   }, params = {}) {
    services.adminUserList(params).then((result) => {
      commit(types.ADMINUSERLIST, result.data.data)
    })
  },
  showAdminGroupForm: ({
                         commit
                       }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.ADMINGROUP_FORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideAdminGroupForm: ({
                         commit
                       }) => {
    commit(types.ADMINGROUP_FORMSTATE, {
      show: false
    })
  },
  showAdminGroupRoleForm: ({
                             commit
                           }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.ADMINGROUP_ROLEFORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideAdminGroupRoleForm: ({
                             commit
                           }) => {
    commit(types.ADMINGROUP_ROLEFORMSTATE, {
      show: false
    })
  },
  showShopListForm: ({
                             commit
                           }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.SHOPLISTSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },
  showGoodListForm: ({
                       commit
                     }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.GOODLISTSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideShopListForm: ({
                             commit
                           }) => {
    commit(types.SHOPLISTSTATE, {
      show: false
    })
  },
  getAdminGroupList({
                      commit
                    }, params = {}) {
    services.adminGroupList(params).then((result) => {
      commit(types.ADMINGROUP_LIST, result.data)
    })
  },
  showAdminResourceForm: ({
                            commit
                          }, params = {
    type: 'root',
    edit: false,
    formData: {}
  }) => {
    commit(types.ADMINRESOURCE_FORMSTATE, {
      show: true,
      type: params.type,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideAdminResourceForm: ({
                            commit
                          }) => {
    commit(types.ADMINRESOURCE_FORMSTATE, {
      show: false
    })
  },
  getAdminResourceList({
                         commit
                       }, params = {}) {
    services.adminResourceList(params).then((result) => {
      let treeData = renderTreeData(result.data.data);
      commit(types.ADMINRESOURCE_LIST, treeData)
    })
  },
  getMyTemplateList({
                      commit
                    }, params = {}) {
    services.getMyTemplateList(params).then((result) => {
      commit(types.MYTEMPLATE_LIST, result.data.data)
    })
  },
  showTemplateConfigForm: ({
                             commit
                           }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.TEMPLATECONFIG_FORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideTemplateConfigForm: ({
                             commit
                           }) => {
    commit(types.TEMPLATECONFIG_FORMSTATE, {
      show: false
    })
  },
  getTempsFromShop({
                     commit
                   }, params = {}) {
    services.getTemplatelistfromShop(params).then((result) => {
      commit(types.DORACMSTEMPLATE_LIST, result.data.data)
    })
  },
  getSystemConfig({
                    commit
                  }, params = {}) {
    services.getSystemConfigs(params).then((config) => {
      let currentConfig = (config.data.data && config.data.data.docs) ? config.data.data.docs[0] : {};
      commit(types.SYSTEMCONFIG_CONFIGLIST, currentConfig)
    })
  },
  showContentCategoryForm: ({
                              commit
                            }, params = {
    type: 'root',
    edit: false,
    formData: {}
  }) => {
    commit(types.CONTENTCATEGORYS_FORMSTATE, {
      show: true,
      type: params.type,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideContentCategoryForm: ({
                              commit
                            }) => {
    commit(types.CONTENTCATEGORYS_FORMSTATE, {
      show: false
    })
  },
  getContentCategoryList({
                           commit
                         }, params = {}) {
    services.contentCategoryList(params).then((result) => {
      let treeData = renderTreeData(result.data.data);
      commit(types.CONTENTCATEGORYS_LIST, treeData)
    })
  },

  showContentForm: ({
                      commit
                    }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.CONTENT_FORMSTATE, {
      edit: params.edit,
      formData: params.formData
    })
  },
  getContentList({
                   commit
                 }, params = {}) {
    services.contentList(params).then((result) => {
      commit(types.CONTENT_LIST, result.data.data)
    })
  },

  getOneContent({
                  commit
                }, params = {}) {
    services.contentInfo(params).then((result) => {
      commit(types.CONTENT_ONE, result.data.data)
    })
  },

  showContentTagForm: ({
                         commit
                       }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.CONTENTTAG_FORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideContentTagForm: ({
                         commit
                       }) => {
    commit(types.CONTENTTAG_FORMSTATE, {
      show: false
    })
  },
  getContentTagList({
                      commit
                    }, params = {}) {
    services.contentTagList(params).then((result) => {
      commit(types.CONTENTTAG_LIST, result.data.data)
    })
  },
  showContentMessageForm: ({
                             commit
                           }, params = {
    edit: false,
    formData: {},
    parentformData: {}
  }) => {
    commit(types.CONTENTMESSAGE_FORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData,
      parentformData: params.parentformData
    })
  },
  hideContentMessageForm: ({
                             commit
                           }) => {
    commit(types.CONTENTMESSAGE_FORMSTATE, {
      show: false
    })
  },
  getContentMessageList({
                          commit
                        }, params = {}) {
    services.contentMessageList(params).then((result) => {
      commit(types.CONTENTMESSAGE_LIST, result.data.data)
    })
  },
  showRegUserForm: ({
                      commit
                    }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.REGUSERFORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideRegUserForm: ({
                      commit
                    }) => {
    commit(types.REGUSERFORMSTATE, {
      show: false
    })
  },
  getRegUserList({
                   commit
                 }, params = {}) {
    services.regUserList(params).then((result) => {
      commit(types.REGUSERLIST, result.data.data)
    })
  },

  getBakDateList({
                   commit
                 }, params = {}) {
    services.getBakDataList(params).then((result) => {
      commit(types.BAKUPDATA_LIST, result.data.data)
    })
  },

  getSystemLogsList({
                      commit
                    }, params = {}) {
    services.getSystemOptionLogsList(params).then((result) => {
      commit(types.SYSTEMOPTIONLOGS_LIST, result.data.data)
    })
  },
  getSystemNotifyList({
                        commit
                      }, params = {}) {
    services.getSystemNotifyList(params).then((result) => {
      commit(types.SYSTEMNOTIFY_LIST, result.data.data)
    })
  },
  getSystemAnnounceList({
                          commit
                        }, params = {}) {
    services.getSystemAnnounceList(params).then((result) => {
      commit(types.SYSTEMANNOUNCE_LIST, result.data.data)
    })
  },
  showSysAnnounceForm: ({
                          commit
                        }, params = {}) => {
    commit(types.SYSTEMANNOUNCE_FORMSTATE, {
      formData: params
    })
  },
  getSiteBasicInfo({
                     commit
                   }, params = {}) {
    services.getSiteBasicInfo(params).then((result) => {
      commit(types.MAIN_SITEBASIC_INFO, result.data.data)
    })
  }

}
