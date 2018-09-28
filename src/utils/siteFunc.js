/**
 * Created by Administrator on 2015/5/30.
 */

const _ = require('lodash');

var siteFunc = {

  getNoticeConfig: function (type, value) {
    var noticeObj;
    if (type == 'reg') {
      noticeObj = {
        type: '2',
        systemSender: 'doraCMS',
        title: '用户注册提醒',
        content: '新增注册用户 ' + value,
        action: type
      };
    } else if (type == 'msg') {
      noticeObj = {
        type: '2',
        sender: value.author,
        title: '用户留言提醒',
        content: '用户 ' + value.author.userName + ' 给您留言啦！',
        action: type
      };
    }
    return noticeObj;
  },

  renderNoPowerMenus(manageCates, adminPower) {
    let newResources = [], newRootCates = [];
    let rootCates = _.filter(manageCates, (doc) => {
      return doc.parentId == '0';
    });
    let menuCates = _.filter(manageCates, (doc) => {
      return doc.type == '0' && doc.parentId != '0';
    });
    let optionCates = _.filter(manageCates, (doc) => {
      return doc.type != '0';
    });
    if (!_.isEmpty(adminPower)) {
      // 是否显示子菜单
      for (let i = 0; i < menuCates.length; i++) {
        let resourceObj = JSON.parse(JSON.stringify(menuCates[i]));
        let cateFlag = this.checkNoAllPower(resourceObj._id, optionCates, adminPower);
        if (!cateFlag) {
          newResources.push(resourceObj);
        }
      }
      // 是否显示大类菜单
      for (const cate of rootCates) {
        let fiterSubCates = _.filter(newResources, (doc) => {
          return doc.parentId == cate._id;
        });
        if (fiterSubCates.length != 0) {
          newRootCates.push(cate);
        }
      }
    }
    return newResources.concat(newRootCates);
  },

  // 子菜单都无权限校验
  checkNoAllPower(resourceId, childCates, power) {
    let cateFlag = true;
    let rootCates = _.filter(childCates, (doc) => {
      return doc.parentId == resourceId
    });
    for (const cate of rootCates) {
      if ((power).indexOf(cate._id) > -1) {
        cateFlag = false;
        break;
      }
    }
    return cateFlag;
  },

  // 异常捕获对象
  UserException: function (message) {
    this.message = message;
    this.name = "UserException";
  },

  // 封装api返回的数据
  renderApiData(res, responseCode, responseMessage, data = {}, type = "getlist") {

    if (type == 'getlist') {
      responseMessage = res.__("validate_error_getSuccess", {success: responseMessage})
    }

    let sendData = {
      status: responseCode,
      message: responseMessage,
      server_time: (new Date()).getTime(),
      data
    }
    return sendData;
  },

  getStrLength(str) {
    let charCode = -1;
    const len = str.length;
    let realLength = 0;
    let zhChar = 0, enChar = 0;
    for (let i = 0; i < len; i++) {
      charCode = str.charCodeAt(i)
      if (charCode >= 0 && charCode <= 128) {
        realLength += 1;
        enChar++
      } else {
        realLength += 2;
        zhChar++
      }
    }
    return {
      length: realLength,
      enChar,
      zhChar
    }
  },

  setTempParentId(arr, key) {
    for (var i = 0; i < arr.length; i++) {
      var pathObj = arr[i];
      pathObj.parentId = key;
    }
    return arr;
  },

  getTempBaseFile: function (path) {
    var thisType = (path).split('.')[1];
    var basePath;
    if (thisType == 'html') {
      basePath = settings.SYSTEMTEMPFORDER;
    } else if (thisType == 'json') {
      basePath = process.cwd();
    } else {
      basePath = settings.TEMPSTATICFOLDER;
    }
    return basePath;
  },

  // 扫描某路径下文件夹是否存在
  checkExistFile(tempFilelist, forderArr) {

    let filterForderArr = [], distPath = false;
    for (let i = 0; i < forderArr.length; i++) {
      const forder = forderArr[i];
      let currentForder = _.filter(tempFilelist, (fileObj) => {
        return fileObj.name == forder;
      })
      filterForderArr = filterForderArr.concat(currentForder);
    }
    if (filterForderArr.length > 0 && (tempFilelist.length >= forderArr.length) && (filterForderArr.length == tempFilelist.length)) {
      distPath = true;
    }

    return distPath;
  }

};
export default  siteFunc;
