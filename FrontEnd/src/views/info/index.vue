<template>
    <div class="app-container" style="padding-top: 60px;">
        <el-form ref="infoForm" :model="infoForm" :rules="infoRules" label-width="180px" style="width:800px;">
            <el-form-item label="Name" prop="name">
                <el-input v-model="infoForm.name" disabled=""></el-input>
            </el-form-item>
            <el-form-item label="Student ID" prop="stuid">
                <el-input v-model="infoForm.stuid" disabled=""></el-input>
            </el-form-item>
            <el-form-item label="E-mail" prop="email">
                <el-input v-model="infoForm.email" :class="{toVerifyInput: infoForm.changeEmail}" :disabled="infoForm.changePassword||infoForm.changePublicKey"></el-input>
                <el-button v-if="infoForm.changeEmail" :class="{toVerifyButton: infoForm.changeEmail}" :disabled="infoForm.changePassword||infoForm.changePublicKey">Send E-mail to Verify</el-button>
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Change Password" prop="changePassword">
                        <el-switch v-model="infoForm.changePassword" :disabled="infoForm.changePublicKey"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="Change Public Key" prop="changePublicKey">
                        <el-switch v-model="infoForm.changePublicKey" :disabled="infoForm.changePassword"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Current Password" v-if="infoForm.changePassword||infoForm.changePublicKey" prop="currentPassword">
                <el-input type="password" v-model="infoForm.currentPassword" placeholder="" auto-complete="off" :required="infoForm.changePassword||infoForm.changePublicKey"></el-input>
            </el-form-item>
            <el-form-item label="New Password" v-if="infoForm.changePassword" prop="newPassword">
                <el-input type="password" v-model="infoForm.newPassword" placeholder="" auto-complete="off" :required="infoForm.changePassword"></el-input>
            </el-form-item>
            <el-form-item label="Confirm New Password" v-if="infoForm.changePassword" prop="checkPassword">
                <el-input type="password" v-model="infoForm.checkPassword" placeholder="" auto-complete="off" :required="infoForm.changePassword"></el-input>
            </el-form-item>
            <el-form-item label="New Public Key" v-if="infoForm.changePublicKey" prop="publicKey">
                <el-input type="textarea" v-model="infoForm.publicKey" :rows="4"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Submit</el-button>
                <el-button @click="resetForm('infoForm')">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    var validateEmail = (rule, value, callback) => {}
    var validateCheckPassword = (rule, value, callback) => {
      if (this.infoForm.changePassword) {
        if (value === '') {
          callback(new Error('Please input the password again!'))
        } else if (value !== this.infoForm.newPassword) {
          callback(
            new Error('The password is different from the new password!')
          )
        } else {
          callback()
        }
      }
    }
    var validateCurrentPassword = (rule, value, callback) => {
      if (this.infoForm.changePassword || this.infoForm.changePublicKey) {
        if (value === '') {
          callback(new Error('Please input the current password!'))
        }
      }
    }
    var validateNewPassword = (rule, value, callback) => {
      if (this.infoForm.changePassword) {
        if (value === '') {
          callback(new Error('Please input the current password!'))
        }
      }
    }
    return {
      infoForm: {
        name: '刘逸',
        stuid: '11410601',
        email: '11410601@mail.sustc.edu.cn',
        changeEmail: false,
        changePassword: false,
        changePublicKey: false,
        currentPassword: '',
        newPassword: '',
        checkPassword: '',
        publicKey: ''
      },
      infoRules: {
        name: [],
        stuid: [],
        email: [
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        currentPassword: [
          {
            validator: validateCurrentPassword,
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            validator: validateNewPassword,
            trigger: 'blur'
          }
        ],
        checkPassword: [
          {
            validator: validateCheckPassword,
            trigger: 'blur'
          }
        ],
        publicKey: []
      },
      oldEmail: '11410601@mail.sustc.edu.cn'
    }
  },
  watch: {
    'infoForm.email': function(newmail, oldmail) {
      if (this.oldEmail === newmail) {
        this.infoForm.changeEmail = false
      } else {
        this.infoForm.changeEmail = true
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.toVerifyInput {
    width:69%
}
.toVerifyButton {
    width:30%
}

.line {
  text-align: center;
}
</style>

