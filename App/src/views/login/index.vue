<template>
<el-container class="login-container">
  <el-header>
    <el-row>
      <el-col :span="24">
        <div>
        </div>
      </el-col>
    </el-row>  
  </el-header>
  <el-main>
    <el-row>
      <el-col :xl="{span:6, offset:9}" :lg="{span:6, offset:9}" :md="{span:8, offset:8}" :sm="{span:12, offset:6}" :xs="{span:16, offset:4}">
        <div class="login-container">
          <el-card class="box-card">
            <el-row :span="20" justify="center">
              <img style="width:100%;max-width:200px" src="@/assets/logo.png">
            </el-row>
            <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
              <el-form-item label="" prop="username">
                <el-input type="text" name="username" v-model="loginForm.username" placeholder="Username" autoComplete="on"></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input :type="pwdType" name="username" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="Password" autoComplete="on">
                  <i @click="showPwd" slot="suffix" class="el-input__icon el-icon-view"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">Log in</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-main>
  <el-footer>
    <el-row justify="center">
      <el-col :span="6" ></el-col>
    </el-row>
  </el-footer>
</el-container>

  
</template>

<script>
function isvalidUsername(){
  return true;
}

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if(!isvalidUsername(value)){
        callback(new Error("Please enter the correct username."));
      }else{
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if(value.length <5){
        callback(new Error("The password need to be longer than 5 characters"));
      }else{
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername}
        ],
        password: [
         { required: true, trigger: "blur", validator: validatePass}
        ]
      },
      loading: false,
      pwdType: "password"
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password"){
        this.pwdType = "text";
      } else{
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if(valid){
          this.loading = true;
          
        } else {
          console.log("error submit!");
          return false;
        }
      })
    }
  }
};
</script>

<style>
.login-container {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  margin-top: 3%;
}
</style>

