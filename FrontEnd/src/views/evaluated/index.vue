<template>
  <div class="app-container" style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
    <el-row>
      <el-col :span="24" v-loading="loading">
        <h1 style="padding: 18px 20px; border-bottom: 1px solid #ebeef5; text-align:center">{{evalForm.name}}</h1>
      </el-col>
      <el-col :span="24">
        <div style="padding-left: 20px; padding-bottom: 15px; text-align: center;">Instructor: {{evalForm.instructor}}</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" v-for="(item, index) in evalForm.result" :key="index" style="padding:20px">
        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{evalForm.items[index].question}}</span>
          </div>
          <div class="chart-wrapper">
            <pie-chart :question="item"></pie-chart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24" style="padding:20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>本课程哪些方面最吸引你？ 本课程哪些方面最需要改进？ 你对本课程还有其它愿意反馈的学习感受和需求吗？</span>
          </div>
          <div class="chart-wrapper" >
            <div class="text item" v-for="(comment, index) in evalForm.M" :key="index">
              {{comment}}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EVALUATION from '@/operations/info'
import { getEvaluation } from '@/api/evaluating'
import PieChart from './components/PieChart'

export default {
  components: {
    PieChart
  },
  data() {
    return {
      evalForm: {
        name: '',
        instructor: '',
        items: [
          {
            question: '你对这门课程教学的总体感受是',
            type: 'score',
            required: true,
            content: 5
          },
          {
            question: '备课认真充分,熟悉授课内容',
            type: 'score',
            required: true,
            content: 5
          },
          {
            question: '课堂讲解清晰有条理、循序渐进',
            type: 'score',
            required: true,
            content: 5
          },
          {
            question: '讲授的知识内容丰富, 能反映知识前沿',
            type: 'score',
            required: true,
            content: 5
          },
          {
            question: '教学方法多样灵活，激发学生兴趣',
            type: 'score',
            required: true,
            content: 5
          },
          {
            question: '能够根据学生的理解水平有效调节授课进度',
            type: 'score',
            required: true,
            content: 5
          },
          {
            question: '能够适时引导讨论问题, 形成课堂互动, 激发学生思考',
            type: 'score',
            required: true,
            content: 5
          },
          {
            question: '能够注意给予学生学习方法的指导',
            type: 'score',
            required: true,
            content: 5
          },
          {
            question: '能够及时批改、发放作业, 给予建设性的评价',
            type: 'score',
            required: true,
            content: 5
          },
          {
            question: '我从这门课程里收获非常大',
            type: 'score',
            required: true,
            content: 5
          },
          {
            question:
              '本课程哪些方面最吸引你？ 本课程哪些方面最需要改进？ 你对本课程还有其它愿意反馈的学习感受和需求吗？',
            type: 'comment',
            lengthLimit: 200,
            required: true,
            content: 'good'
          }
        ],
        M: [],
        result: []
      },
      evaluation: null,
      contractAddress: this.$route.params.address,
      loading: true
    }
  },
  watch: {},
  async created() {
    try {
      this.evaluation = await new EVALUATION(this.contractAddress)
    } catch (e) {
      this.$alert('The address is not exist.', 'Fail Access', {
        confirmButtonText: 'Ok',
        callback: action => {
        //   window.history.length > 1
        // ? this.$router.go(-1)
        // : this.$router.push('/')
          this.$router.go(-1)
        }
      })
    }
    try {
      1 / this.evaluation.evalChoices[0].length
    } catch (e) {
      await this.$alert('No evaluation is published.', 'Fail Obtain Result', {
        confirmButtonText: 'Ok',
        callback: action => {
          // this.$router.push({ path: "/" });
          this.$router.go(-1)
        }
      })
    }
    for (let i = 0; i < this.evaluation.evalChoices[0].length; i++) {
      this.evalForm.result[i] = [0, 0, 0, 0, 0, 0]
      for (let j = 0; j < this.evaluation.evalChoices.length; j++) {
        this.evalForm.result[i][
          parseInt(this.evaluation.evalChoices[j][i]) - 1
        ]++
      }
    }
    const message = await getEvaluation(this.contractAddress)
    const evaluationInfo = message.data
    console.log(evaluationInfo)
    console.log(this.evaluation.evalComments.length)
    console.log(evaluationInfo.comments.length)
    for (let i = 0; i < this.evaluation.evalComments.length; i++) {
      for (let j = 0; j < evaluationInfo.comments.length; j++) {
        if (evaluationInfo.comments[j].hash === this.evaluation.evalComments[i]) {
          this.evalForm.M.push(evaluationInfo.comments[j].detail)
          break
        }
      }
    }
    this.evalForm.name = evaluationInfo.name
    this.evalForm.instructor = evaluationInfo.instructor
    this.loading = false
  },
  computed: {
    isCompleted: function() {
      let flag = false
      for (const item in this.evalForm.items) {
        if (
          this.evalForm.items[item].required &&
          this.evalForm.items[item].content === null
        ) {
          flag = true
        }
      }
      return flag
    }
  },
  methods: {

  }
}
</script>

<style scoped>
 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
  }
</style>
