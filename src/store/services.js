import Axios from "axios";

function objArgs(url,obj) {
  var url = url + '?'; // 提前加好问号
  for(var name in obj){
    url += name + '=' + obj[name] + '&'; // 转码并进行赋值
  }
  url = url.substring(0,url.length-1); // 去掉最后一个&符号
  return url; // 返回
}

export function reqJsonData(url, params = {}, method = 'post') {
  if (method === 'get') {
    return Axios.get(objArgs(url, params))
  } else if (method === 'post') {
    return Axios.post(url, params)
  }

}

export default {

  logOut() {
    return reqJsonData('manage/logout', {}, 'get')
  },

  getUserSession() {
    return reqJsonData('manage/getUserSession', {}, 'get')
  },

  getSiteBasicInfo(params) {
    return reqJsonData('manage/getSitBasicInfo', params, 'get')
  },

  adminUserList(params) {
    return reqJsonData('manage/adminUser/getList', params, 'get')
  },

  addAdminUser(params) {
    return reqJsonData('manage/adminUser/addOne', params)
  },

  updateAdminUser(params) {
    return reqJsonData('manage/adminUser/updateOne', params)
  },

  deleteAdminUser(params) {
    return reqJsonData('manage/adminUser/deleteUser', params, 'get')
  },

  adminGroupList(params) {
    return reqJsonData('manage/adminGroup/getList', params, 'get')
  },

  addAdminGroup(params) {
    return reqJsonData('manage/adminGroup/addOne', params)
  },

  updateAdminGroup(params) {
    return reqJsonData('manage/adminGroup/updateOne', params)
  },

  deleteAdminGroup(params) {
    return reqJsonData('manage/adminGroup/deleteGroup', params, 'get')
  },

  adminResourceList(params) {
    return reqJsonData('manage/adminResource/getList', params, 'get')
  },

  getAllResource(params) {
    return reqJsonData('manage/adminResource/getAllResource', params, 'get')
  },

  getTemplateFileInfo(params) {
    return reqJsonData('manage/template/getTemplateFileText', params, 'get')
  },

  updateTemplateFileText(params) {
    return reqJsonData('manage/template/updateTemplateFileText', params)
  },

  getMyTemplateList(params) {
    return reqJsonData('manage/template/getMyTemplateList', params, 'get')
  },

  getTemplatelistfromShop(params) {
    return reqJsonData('manage/template/getTempsFromShop', params, 'get')
  },

  installTemp(params) {
    return reqJsonData('manage/template/installTemp', params, 'get')
  },

  enableTemp(params) {
    return reqJsonData('manage/template/enableTemp', params, 'get')
  },

  uninstallTemp(params) {
    return reqJsonData('manage/template/uninstallTemp', params, 'get')
  },

  addAdminResource(params) {
    return reqJsonData('manage/adminResource/addOne', params)
  },

  updateAdminResource(params) {
    return reqJsonData('manage/adminResource/updateOne', params)
  },

  deleteAdminResource(params) {
    return reqJsonData('manage/adminResource/deleteResource', params, 'get')
  },

  getSystemConfigs(params) {
    return reqJsonData('manage/systemConfig/getConfig', params, 'get')
  },

  updateSystemConfigs(params) {
    return reqJsonData('manage/systemConfig/updateConfig', params)
  },

  contentCategoryList(params) {
    return reqJsonData('manage/contentCategory/getList', params, 'get')
  },

  addContentCategory(params) {
    return reqJsonData('manage/contentCategory/addOne', params)
  },

  updateContentCategory(params) {
    return reqJsonData('manage/contentCategory/updateOne', params)
  },

  deleteContentCategory(params) {
    return reqJsonData('manage/contentCategory/deleteCategory', params, 'get')
  },

  contentList(params) {
    return reqJsonData('manage/content/getList', params, 'get')
  },

  getOneContent(params) {
    return reqJsonData('manage/content/getContent', params, 'get')
  },

  addContent(params) {
    return reqJsonData('manage/content/addOne', params)
  },

  updateContent(params) {
    return reqJsonData('manage/content/updateOne', params)
  },

  deleteContent(params) {
    return reqJsonData('manage/content/deleteContent', params, 'get')
  },

  contentTagList(params) {
    return reqJsonData('manage/contentTag/getList', params, 'get')
  },

  addContentTag(params) {
    return reqJsonData('manage/contentTag/addOne', params)
  },

  updateContentTag(params) {
    return reqJsonData('manage/contentTag/updateOne', params)
  },

  deleteContentTag(params) {
    return reqJsonData('manage/contentTag/deleteTag', params, 'get')
  },

  contentMessageList(params) {
    return reqJsonData('manage/contentMessage/getList', params, 'get')
  },

  addContentMessage(params) {
    return reqJsonData('manage/contentMessage/addOne', params)
  },

  deleteContentMessage(params) {
    return reqJsonData('manage/contentMessage/deleteMessage', params, 'get')
  },

  regUserList(params) {
    return reqJsonData('manage/regUser/getList', params, 'get')
  },

  updateRegUser(params) {
    return reqJsonData('manage/regUser/updateOne', params)
  },

  deleteRegUser(params) {
    return reqJsonData('manage/regUser/deleteUser', params, 'get')
  },

  getBakDataList(params) {
    return reqJsonData('manage/backupDataManage/getBakList', params, 'get')
  },

  bakUpData() {
    return reqJsonData('manage/backupDataManage/backUp', {})
  },

  deletetBakDataItem(params) {
    return reqJsonData('manage/backupDataManage/deleteDataItem', params, 'get')
  },

  getSystemOptionLogsList(params) {
    return reqJsonData('manage/systemOptionLog/getList', params, 'get')
  },

  deleteSystemOptionLogs(params) {
    return reqJsonData('manage/systemOptionLog/deleteLogItem', params, 'get')
  },

  clearSystemOptionLogs(params) {
    return reqJsonData('manage/systemOptionLog/deleteAllLogItem', params, 'get')
  },

  getSystemNotifyList(params) {
    return reqJsonData('manage/systemNotify/getList', params, 'get')
  },

  deleteSystemNotify(params) {
    return reqJsonData('manage/systemNotify/deleteNotifyItem', params, 'get')
  },

  setNoticeRead(params) {
    return reqJsonData('manage/systemNotify/setHasRead', params, 'get')
  },

  getSystemAnnounceList(params) {
    return reqJsonData('manage/systemAnnounce/getList', params, 'get')
  },

  deleteSystemAnnounce(params) {
    return reqJsonData('manage/systemAnnounce/deleteItem', params, 'get')
  },

  addSystemAnnounce(params) {
    return reqJsonData('manage/systemAnnounce/addOne', params)
  },

  getShopList(params) {
    return reqJsonData('manage/shopping/restaurants', params, 'get')
  },
  updateShop(params){
    return reqJsonData('manage/shopping/updateRestaurant', params)
  },
  addRestaurant(params) {
    return reqJsonData('manage/shopping/addRestaurant', params)
  },
  delRestaurant(params) {
    return reqJsonData('manage/shopping/delRestaurant', params, 'get')
  },
  getCategoryList(params) {
    return reqJsonData('manage/shopping/getCategories', params, 'get')
  },
  getGoods(params){
    return reqJsonData('manage/goods/goods', params, 'get')
  }

}
