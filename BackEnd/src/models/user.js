import mongoose from 'mongoose'

var Schema = mongoose.Schema

var UserSchema = new Schema({
  id: Number,
  name: String,
  department: String,
  emailAddress: String,
  avatar: String,
  pk: String,
  evaluation: Array,
  role: String
})

var User = mongoose.model('User', UserSchema)

export default User
