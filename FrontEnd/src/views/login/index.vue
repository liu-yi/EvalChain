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
              <el-row :span="20" justify="center" style="padding-bottom: 10%; padding-top: 10%">
                <img style="width:100%;max-width:200px" :src="logo">
              </el-row>
              <div>
                <el-tabs :tab-position="'top'" v-model="activeName">
                  <el-tab-pane label="Log In" name="login">
                    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
                      <el-form-item label="" prop="id">
                        <el-input type="text" name="id" v-model="loginForm.id" placeholder="Username" autoComplete="on"></el-input>
                      </el-form-item>
                      <el-form-item label="" prop="password">
                        <el-input :type="pwdType" name="username" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="Password" autoComplete="on">
                          <i @click="showPwd" slot="suffix" class="el-input__icon el-icon-view"></i>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="">
                        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">Log In</el-button>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  <br>
                  <el-tab-pane label="Sign Up" name="signup">
                    <el-form autoComplete="on" :model="signupForm" :rules="signupRules" ref="signupForm">
                      <el-form-item prop="id">
                        <el-input placeholder="Student ID" v-model="signupForm.id" class="input-with-select">
                          <template slot="append">@mail.sustc.edu.cn
                          </template>
                        </el-input>
                      </el-form-item>
                      <el-form-item prop="name">
                        <el-input placeholder="Name" v-model="signupForm.name">
                        </el-input>
                      </el-form-item>
                      <el-form-item label="" prop="password">
                        <el-input :type="pwdType" name="username" v-model="signupForm.password" placeholder="Password" autoComplete="on"></el-input>
                      </el-form-item>
                      <el-form-item label="" prop="pk">
                        <el-row :gutter="10">
                          <el-col :span="12">
                            <el-input v-model="signupForm.pk" class="pkInput" style="width:100%"> </el-input>
                          </el-col>
                          <el-col :span="12">
                            <el-button style="width:100%" type="success" class="pkButton" @click.native.prevent="handleGenerate" :disabled="signupForm.password === ''">Generate Public Key</el-button>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <el-form-item label="" v-show="showKeyPairMessage">
                        <el-alert title="Success! Your private key is in the following." type="success" center show-icon>
                        </el-alert>
                      </el-form-item>
                      <el-form-item label="" v-show="showKeyPairMessage">
                        <el-input v-model="sk"></el-input>
                      </el-form-item>
                      <el-form-item label="">
                        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleSignup">Sign Up</el-button>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-row justify="center">
        <el-col :span="6"></el-col>
      </el-row>
    </el-footer>
  </el-container>

</template>

<script>
import logo from '@/assets/logo.png'
import { validateId } from '@/utils/validate'
import { signup } from '@/api/login'
import generateKeyPair from '@/operations/generateKeyPair'
import crypto from 'crypto'

export default {
  name: 'login',
  data() {
    const validatePk = (rule, value, callback) => {
      if (/^\([0-9]+,[0-9]+\)$/.test(value)) {
        callback()
      } else {
        callback(new Error('Wrong Public Key'))
      }
    }
    const validateName = (rule, value, callback) => {
      if (/^[\u4e00-\u9fa5]{2,4}$/.test(value)) {
        callback()
      } else {
        callback(new Error('Please use a Chinese Name'))
      }
    }
    const validateSignupId = (rule, value, callback) => {
      if (validateId(value)) {
        callback()
      } else {
        callback(new Error('ID must be 8 digital'))
      }
    }
    const validateLoginId = (rule, value, callback) => {
      if (/^[A-Za-z0-9]+$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的用户名'))
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'login',
      signupForm: {
        id: '11410601',
        password: '8270614',
        name: '刘逸',
        encryptedSk: null
      },
      loginForm: {
        id: '11410601',
        password: '8270614'
      },
      loginRules: {
        id: [{ required: true, trigger: 'blur', validator: validateLoginId }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      signupRules: {
        id: [{ required: true, trigger: 'blur', validator: validateSignupId }],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        name: [
          {
            required: true,
            validator: validateName,
            trigger: 'blur'
          }
        ],
        pk: [
          {
            require: true,
            trigger: 'change',
            validator: validatePk
          }
        ]
      },
      loading: false,
      pwdType: 'password',
      logo,
      sk: undefined,
      showKeyPairMessage: false
    }
  },
  watch: {
    'signupForm.password': function(oldPass, newPass) {
      this.signupForm.pk = ''
      this.sk = ''
      this.showKeyPairMessage = false
    }
  },
  methods: {
    aesEncrypt(data, key) {
      const cipher = crypto.createCipher('aes192', key)
      let crypted = cipher.update(data, 'utf8', 'hex')
      crypted += cipher.final('hex')
      return crypted
    },
    aesDecrypt(encrypted, key) {
      const decipher = crypto.createDecipher('aes192', key)
      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    },
    sha256(message) {
      const hash = crypto.createHash('sha256')
      hash.update(message)
      const h = hash.digest('hex')
      return h.substring(0)
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.loginForm.password = this.sha256(this.loginForm.password)
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleSignup() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.signupForm.password = this.sha256(this.signupForm.password)
          signup(this.signupForm)
            .then(() => {
              this.loading = false
              this.$message({
                message: 'Congratulation! Sign up successfully!',
                type: 'success'
              })
              this.activeName = 'login'
              this.loginForm.id = this.signupForm.id
              this.loginForm.password = ''
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit sign up!!')
          return false
        }
      })
    },

    handleGenerate() {
      const keyPair = generateKeyPair()
      this.signupForm.pk = keyPair.pk.toString()
      this.sk = keyPair.sk.toString()
      this.showKeyPairMessage = true
      this.signupForm.encryptedSk = this.aesEncrypt(
        this.sk,
        this.signupForm.password
      )
    }
  }
}
</script>



<style>
.login-container {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  /* margin-top: 1%; */
}

.el-select .el-input {
  width: 200px;
}

.pkInput {
  width: 59%;
}
.pkButton {
  width: 40%;
}
</style>