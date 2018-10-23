import * as types from './types.js'
import getters from './getters';
import _ from 'lodash';

const state = {
  language: 'en',
  count: 20,
  loginState: {
    state: false,
    userInfo: {
      userName: '',
      email: '',
      logo: '',
      group: []
    },
    noticeCounts: 0
  },
  adminUser: {
    formState: {
      show: false,
      edit: false,
      formData: {
        name: '',
        userName: '',
        password: '',
        confirmPassword: '',
        group: '',
        email: '',
        comments: '',
        phoneNum: ''
      }
    },
    userList: {
      pageInfo: {},
      docs: []
    },
    addUser: {
      state: '',
      err: {}
    }
  },
  adminGroup: {
    formState: {
      show: false,
      edit: false,
      formData: {
        name: '',
        comments: '',
        enable: false,
        power: []
      }
    },
    roleFormState: {
      show: false,
      edit: true,
      formData: {
        name: '',
        comments: '',
        enable: false,
        power: []
      }
    },
    roleList: {
      pageInfo: {},
      docs: []
    },
    addGroup: {
      state: '',
      err: {}
    }
  },
  adminResource: {
    formState: {
      type: 'root',
      show: false,
      edit: false,
      formData: {
        label: '',
        type: '',
        api: '',
        icon: '',
        routePath: '',
        componentPath: '',
        enable: true,
        parentId: '',
        sortId: 0,
        comments: '',
        parent: {
          id: '',
          label: ''
        }
      }
    },
    resourceList: {
      pageInfo: {},
      docs: []
    },
    addResource: {
      state: '',
      err: {}
    }
  },
  tempShoplist: {
    pageInfo: {},
    docs: []
  },
  bakDataList: {
    pageInfo: {},
    docs: []
  },
  systemOptionLogs: {
    pageInfo: {},
    docs: []
  },
  basicInfo: {
    adminUserCount: 0,
    regUserCount: 0,
    contentCount: 0,
    messageCount: 0
  },
  shop: {
    formState: {
      show: false,
      edit: false,
      formData: {}
    },
    shopList: {
      pageInfo: {},
      docs: []
    }
  },
  good: {
    formState: {
      show: false,
      edit: false,
      formData: {}
    },
    goodList: {
      pageInfo: {},
      docs: []
    }
  },
  category: {
    formState: {
      show: false,
      edit: false,
      formData: {}
    },
    categoryList: {
      pageInfo: {},
      docs: []
    }
  }
}

const mutations = {
  [types.CATEGORYLIST](state, categoryList) {
    state.category.categoryList = categoryList;
  },
  [types.SHOPLIST](state, shoplist) {
    state.shop.shopList = shoplist;
  },
  [types.GOODLIST](state, goodList) {
    state.good.goodList = goodList;
  },
  [types.INCREMENT](state) {
    state.count++
  },
  [types.DECREMENT](state) {
    state.count--
  },
  [types.ADMING_LOGINSTATE](state, params) {
    state.loginState = Object.assign({
      userInfo: {
        userName: '',
        email: '',
        logo: '',
        group: []
      },
      state: false
    }, {
      userInfo: params.userInfo,
      state: params.loginState || false,
      noticeCounts: params.noticeCounts
    });
  },
  [types.ADMINUSERFORMSTATE](state, formState) {
    state.adminUser.formState.show = formState.show;
    state.adminUser.formState.edit = formState.edit;
    if (!_.isEmpty(formState.formData)) {
      state.adminUser.formState.formData = formState.formData
    } else {
      state.adminUser.formState.formData = {
        name: '',
        userName: '',
        password: '',
        confirmPassword: '',
        group: '',
        email: '',
        comments: '',
        phoneNum: ''
      }
    }

  },
  [types.ADMINUSERLIST](state, userlist) {
    state.adminUser.userList = userlist
  },
  [types.ADMINGROUP_FORMSTATE](state, formState) {
    state.adminGroup.formState.show = formState.show;
    state.adminGroup.formState.edit = formState.edit;
    if (!_.isEmpty(formState.formData)) {
      state.adminGroup.formState.formData = formState.formData
    } else {
      state.adminGroup.formState.formData = {
        name: '',
        comments: '',
        enable: false
      }
    }

  },
  [types.ADMINGROUP_ROLEFORMSTATE](state, formState) {
    state.adminGroup.roleFormState.show = formState.show;
    state.adminGroup.roleFormState.edit = formState.edit;
    state.adminGroup.roleFormState.formData = Object.assign({
      name: '',
      comments: '',
      enable: false,
      power: []
    }, formState.formData);
  },
  [types.SHOPLISTSTATE](state, formState) {
    state.shop.formState.show = formState.show;
    state.shop.formState.edit = formState.edit;
    state.shop.formState.formData = Object.assign({}, formState.formData);
  },
  [types.GOODLISTSTATE](state, formState) {
    state.good.formState.show = formState.show;
    state.good.formState.edit = formState.edit;
    state.good.formState.formData = Object.assign({}, formState.formData);
  },
  [types.ADMINGROUP_LIST](state, rolelist) {
    state.adminGroup.roleList = rolelist
  },
  [types.ADMINRESOURCE_FORMSTATE](state, formState) {
    state.adminResource.formState.show = formState.show;
    state.adminResource.formState.edit = formState.edit;
    state.adminResource.formState.type = formState.type;
    state.adminResource.formState.formData = Object.assign({
      label: '',
      type: '',
      api: '',
      icon: '',
      routePath: '',
      componentPath: '',
      enable: true,
      parentId: '',
      sortId: 0,
      comments: '',
      parent: {
        id: '',
        label: ''
      }
    }, formState.formData);

  },
  [types.ADMINRESOURCE_LIST](state, resourceList) {
    state.adminResource.resourceList = resourceList
  },
  [types.BAKUPDATA_LIST](state, list) {
    state.bakDataList = list
  },
  [types.SYSTEMOPTIONLOGS_LIST](state, list) {
    state.systemOptionLogs = list
  },
  [types.MAIN_SITEBASIC_INFO](state, list) {
    state.basicInfo = list
  }
}

export default {
  state,
  mutations,
  getters
}
