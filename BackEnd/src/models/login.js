import mongoose from 'mongoose'

var Schema = mongoose.Schema

var LoginSchema = new Schema({
  id: String,
  password: String,
  role: String,
  pk: String,
  encryptedSk: String,
  verifyCode: String,
  verified: {
    type: Boolean,
    default: false
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

LoginSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meata.updateAt = Date.now()
  }
  next()
})

var Login = mongoose.model('Login', LoginSchema)

export default Login
