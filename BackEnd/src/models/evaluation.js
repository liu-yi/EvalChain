import mongoose from 'mongoose'

var Schema = mongoose.Schema

var EvaluationSchema = new Schema({
  address: String,
  name: String,
  instructor: String,
  avatar: String,
  startTime: Date,
  endTime: Date,
  isEnd: Boolean,
  idSet: Array,
  pkSet: Array,
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

EvaluationSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meata.updateAt = Date.now()
  }
  next()
})

var Evaluation = mongoose.model('Evaluation', EvaluationSchema)

export default Evaluation
