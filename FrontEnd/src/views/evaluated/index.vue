<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <h1 style="padding: 18px 20px; border-bottom: 1px solid #ebeef5; text-align:center">{{evalForm.name}}</h1>
      </el-col>
      <el-col :span="24">
        <div style="padding-left: 20px; padding-bottom: 15px; text-align: center;">Lecture: {{evalForm.prof}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" v-for="(item, index) in evalForm.items" :key="index">
        <el-card style="margin: 20px; margin-top:20px; padding: 10px;" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{index + 1 +'. ' + item.question}}</span>
          </div>
          <div v-if="item.type === 'score'" style="padding-left: 20px">
            <el-rate v-model="item.content" show-text :texts="['Very Bad', 'Bad', 'Fair', 'Good', 'Very Good']">
            </el-rate>
          </div>
          <div v-else-if="item.type === 'comment'">
            <el-input :autosize="{ minRows: 4}" type="textarea" v-model="item.content" placeholder="" :maxlength=item.lengthLimit></el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { generateSignAndPublish } from '@/operations/eval'
import EVALUATION from '@/operations/info'

export default {
  data() {
    return {
      evalForm: {
        id: null,
        name: 'Fall 2018 CS101 Discrete Mathematics',
        prof: 'Qi Wang',
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
        result: []
      },
      evaluation: null,
      contractAddress: this.$route.params.address,
    }
  },
  watch: {},
  mounted() {
    new EVALUATION(this.contractAddress).then(
      res => {
        this.evaluation = res
        for(let i = 0; i < this.evaluation.evalChoices[0].length; i++){
          this.evalForm.result[i] = [0, 0, 0, 0, 0, 0]
          for(let j = 0; j < this.evaluation.evalChoices.length; j++){
            this.evalForm.result[i][parseInt(this.evaluation.evalChoices[j][i]) - 1]++
          }
        }
      }
    )

    
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
