<template>
  <div class="app-container" style="padding-top: 60px; padding-left: 80px; padding-right: 80px;">
    <el-row>
      <el-col :span="24">
        <h1 style="padding: 18px 20px; border-bottom: 1px solid #ebeef5; text-align:center">{{evalForm.name}}</h1>
      </el-col>
      <el-col :span="24">
        <div style="padding-left: 20px; padding-bottom: 15px; text-align: center;">Instructor: {{evalForm.instructor}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" v-for="(item, index) in evalForm.items" :key="index">
        <el-card style="margin: 20px; margin-top:20px; padding: 10px;">
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
      <el-col :span="24">
        <el-card style="margin: 20px; margin-top:20px; padding: 10px;">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-input v-model="password" type="password" placeholder="Password"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button @click="getSk()" type="primary">Get Sk</el-button>
            </el-col>
          </el-row>
          <div style="padding: 10px"></div>
          <el-input v-model="signingKey" type="textarea" placeholder="Private Key"></el-input>

        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="margin: 20px; margin-top:30px;">
        <el-button :disabled="isCompleted" type="primary" @click="onEval" :loading="loading">Submit</el-button>
      </el-col>
      <el-col :span="24">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { generateSignAndPublish } from '@/operations/eval'
import EVALUATION from '@/operations/info'
import { getEvaluation, postComment } from '@/api/evaluating'
import BigInteger from 'bigi'
import web3Utils from 'web3-utils'
import store from '@/store'
import crypto from 'crypto'

export default {
  data() {
    return {
      evalForm: {
        id: null,
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
        M: {}
      },
      evaluation: null,
      contractAddress: this.$route.params.address,
      sk: store.getters.sk,
      password: '',
      signingKey: '',
      loading: false,
      percentage: 0
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
          this.$router.push({ path: '/' })
        }
      })
    }
    const message = await getEvaluation(this.contractAddress)
    const evaluationInfo = message.data
    console.log(evaluationInfo)
    this.evalForm.name = evaluationInfo.name
    this.evalForm.instructor = evaluationInfo.instructor
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
    getSk() {
      this.signingKey = this.aesDecrypt(this.sk, this.password)
    },
    aesDecrypt(encrypted, key) {
      const decipher = crypto.createDecipher('aes192', key)
      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    },
    async onEval() {
      this.loading = true
      let evalChoice = ''
      const evalComment = {}
      for (const item in this.evalForm.items) {
        if (this.evalForm.items[item].type === 'score') {
          if (this.evalForm.items[item].content === null) {
            evalChoice += '6'
          } else {
            evalChoice += this.evalForm.items[item].content
          }
        } else if (this.evalForm.items[item].type === 'comment') {
          evalComment.detail = this.evalForm.items[item].content
        }
      }
      this.evalForm.M.evalChoice = evalChoice
      this.evalForm.M.evalComment = BigInteger.fromHex(
        web3Utils.keccak256(evalComment.detail).substring(2)
      ).toString()
      evalComment.hash = this.evalForm.M.evalComment

      try {
        const result = await generateSignAndPublish(
          this.evaluation,
          this.evalForm.M,
          this.signingKey
        )
        if (!result) {
          throw new Error()
        }
        await postComment(this.contractAddress, evalComment)
      } catch (e) {
        console.log(e)
        this.$alert(
          'You may submit a wrong signature or have evaluated.',
          'Fail to Submit Evaluation',
          {
            confirmButtonText: 'Ok',
            callback: action => {
              this.$router.go(-1)
            }
          }
        )
      }
    }
  }
}
</script>

<style scoped>
</style>
