import mongoose from 'mongoose'

var Schema = mongoose.Schema

var EvaluationSchema = new Schema({
  address: String,
  name: String,
  instructor: String,
  avatar: String,
  startTime: Date,
  endTimeL: Date,
  isEnd: Boolean,
  participants: Array
})

var Evaluation = mongoose.model('Evaluation', EvaluationSchema)

export default Evaluation
