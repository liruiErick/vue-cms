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
    commit(types.INCREMENT);
  },
  decrement: ({
                commit
              }) => {
    commit(types.DECREMENT);
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
  getSiteBasicInfo({
                     commit
                   }, params = {}) {
    services.getSiteBasicInfo(params).then((result) => {
      commit(types.MAIN_SITEBASIC_INFO, result.data.data)
    })
  }

}
