<template>
  <div class="app-container" style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
    <el-card>
      <el-row>
        <el-col :span="24">
          <h1 style="padding: 18px 20px; border-bottom: 1px solid #ebeef5; text-align:center">{{evalForm.name}}</h1>
        </el-col>
        <el-col :span="24">
          <div style="padding-left: 20px; padding-bottom: 15px; text-align: center;">Lecture: {{evalForm.prof}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" v-for="(item, index) in evalForm.items" :key="item">
          <el-card style="margin: 20px; margin-top:20px; padding: 10px;">
            <div slot="header" class="clearfix">
              <span>{{index+1 +'. ' + item.question}}</span>
            </div>
            <div style="padding-left: 20px">
              <el-rate v-model="item.score" show-text :texts="['Very Bad', 'Bad', 'Fair', 'Good', 'Very Good']">
              </el-rate>
            </div>
          </el-card>
        </el-col>
        <el-col :span="24">
          <el-card style="margin: 20px; margin-top:20px; padding: 10px;">
            <div slot="header" class="clearfix">
              <span> 本课程哪些方面最吸引你？ 本课程哪些方面最需要改进？ 你对本课程还有其它愿意反馈的学习感受和需求吗？</span>
            </div>
            <div>
              <el-input type="textarea" v-model="evalForm.comment" placeholder="" :rows="4"></el-input>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="margin: 20px; margin-top:30px;">
          <el-button type="primary" @click="onSubmit">Submit Directly</el-button>
          <el-button type="success">Generate Submit File</el-button>
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>
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
            score: null
          },
          {
            question: '备课认真充分,熟悉授课内容',
            score: null
          },
          {
            question: '课堂讲解清晰有条理、循序渐进',
            score: null
          },
          {
            question: '讲授的知识内容丰富, 能反映知识前沿',
            score: null
          },
          {
            question: '教学方法多样灵活，激发学生兴趣',
            score: null
          },
          {
            question: '能够根据学生的理解水平有效调节授课进度',
            score: null
          },
          {
            question: '能够适时引导讨论问题, 形成课堂互动, 激发学生思考',
            score: null
          },
          {
            question: '能够注意给予学生学习方法的指导',
            score: null
          },
          {
            question: '能够及时批改、发放作业, 给予建设性的评价',
            score: null
          },
          {
            question: '我从这门课程里收获非常大',
            score: null
          }
        ],
        comment: null
      }
    }
  },
  watch: {},
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

</style>

