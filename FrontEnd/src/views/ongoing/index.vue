<template>
  <div>
    <el-row style="padding-right:20px; padding-left:20px; width:100%" :gutter="20">
      <el-col :span="6" v-for="(o) in 6" :offset="0" :key="o" class="card">
        <el-card shadow="hover">
          <img class="image" :src="hamburger">
          <div style="padding: 14px;">
            <el-row>
              <el-col :span="24">
                <span>Discrete Mathematics</span>
              </el-col>
              <el-col :span="24">
                <span style="font-size: 13px;">Instructor: WANG Qi</span>
              </el-col>
            </el-row>

            <div class="bottom clearfix">
              <span style="font-size: 13px;color: #666;">Participation: 1/60</span>
              <time class="time">End Time: {{ currentDate }}</time>
              <el-button type="primary" style="margin-top:6px;width:100%">Start</el-button>
              <br>
              <el-button style="margin-top:6px;width:100%">Result</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="block" style="text-align: center; padding:60px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import hamburger from '@/assets/qwang.jpg'
export default {
  name: 'ongoing',
  data() {
    return {
      hamburger,
      currentDate: new Date().toLocaleTimeString(),
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>



<style>
.card {
  margin-top: 40px;
}
.time {
  font-size: 13px;
  color: #999;
  padding-bottom: 8px;
  padding-top: 8px;
  display: block;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  max-width: 400px;
  display: block;
}
</style>

