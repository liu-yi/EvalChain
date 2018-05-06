import mongoose from 'mongoose'

var Schema = mongoose.Schema

var UserSchema = new Schema({
  id: Number,
  name: String,
  department: String,
  emailAddress: String,
  verifyCode: String,
  verified: {
    type: Boolean,
    default: false
  },
  avatar: String,
  pk: String,
  evaluation: Array,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  },
  password: String,
  role: String
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meata.updateAt = Date.now()
  }
  next()
})

var User = mongoose.model('User', UserSchema)

export default User
