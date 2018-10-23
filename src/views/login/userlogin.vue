<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="userName">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.userName" auto-complete="off" placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码">
        <i slot="prefix" class="icon-yanzhengma yanzhengma" style=""></i>
        <template slot="append">
          <span @click="handleSend" class="msg-text" style="cursor: pointer">{{code.value}}</span>
        </template>
      </el-input>
    </el-form-item>
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import siteFunc from '../../utils/siteFunc'
import services from "../../store/services.js";
import axios from 'axios'
import md5 from 'js-md5';
export default {
  name: 'userlogin',
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = ''
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: 'doramart',
        password: '123456',
        code:''
      },
      checked: false,
      code: {
        src: '',
        value: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        userName: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateCode }
        ]
      },
      passwordType: 'password',
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  computed: {
  },
  props: [],
  methods: {
    init(){
      this.getCode()
    },
    handleSend() {
      this.getCode()
    },
    getCode(){
      var that = this
      axios.get('api/getImgCode').then(function (res) {
        that.code.value = res.data.text
      })
    },
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin() {
      var that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginForm.password = md5(this.loginForm.password)
          axios.post('api/admin/doLogin', this.loginForm).then(function (resp) {
            if(resp.data.status === 200){
              services.getAllResource().then(function (res) {
                if(res.data.length>0){
                  sessionStorage.setItem('routerPath',JSON.stringify(siteFunc.renderNoPowerMenus(res.data, resp.data.data.adminPower)))
                  sessionStorage.setItem('main',0)
                  that.$router.push('/main')
                }
              }).catch(function (error) {
                alert(error);
              });
            }else {
              that.$message.error(resp.data.message);
            }
          }).catch(function (error) {
            alert(error);
          });
        }
      })
    }
  },
  watch: {
    '$route'(to, from) {
      if(!Number(sessionStorage.getItem('loginOut'))){
        setTimeout(function () {
          sessionStorage.setItem('loginOut',1)
          window.location.reload();
        },10)
      }
    }
  }
}
</script>
<style>
</style>
