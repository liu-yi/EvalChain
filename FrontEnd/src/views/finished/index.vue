<template>
  <div>
    <el-row style="padding-right:20px; padding-left:20px; width:100%" :gutter="20">
      <el-col :span="6" v-for="(course, item) in coursesList" :offset="0" :key="item" class="card">
        <el-card shadow="hover">
          <img class="image" :src="hamburger">
          <div style="padding: 14px;">
            <el-row>
              <el-col :span="24">
                <span>{{course.name}}</span>
              </el-col>
              <el-col :span="24">
                <span style="font-size: 13px;">Instructor: {{course.instructor}}</span>
              </el-col>
            </el-row>

            <div class="bottom clearfix">
              <span style="font-size: 13px;color: #666;">Participation: 1/60</span>
              <time class="time">End Time: {{ new Date(Date.parse(course.endTime)).toLocaleString() }}</time>
              <el-button style="margin-top:6px;width:100%">Result</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="block" style="text-align: center; padding:60px">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="courses.length">
          </el-pagination>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import hamburger from "@/assets/hamburger.png";
import { getCourses } from "@/api/courses";
export default {
  name: "ongoing",
  data() {
    return {
      hamburger,
      currentDate: new Date().toLocaleTimeString(),
      currentPage: 1,
      courses: [],
      coursesList: [],
      pageSize: 1
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.coursesList = [];
      let iStart = (val - 1) * this.pageSize;
      let iEnd = val * this.pageSize;
      for (let i = iStart; i < iEnd; i++) {
        this.coursesList.push(this.courses[i]);
      }
    }
  },
  async created() {
    let message = await getCourses(false);
    this.courses = message.data;
    this.coursesList = [];
    let size = this.courses.length > this.pageSize ? this.pageSize : this.courses.length;
    for (let i = 0; i < size; i++) {
      this.coursesList.push(this.courses[i]);
    }
  }
};
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

