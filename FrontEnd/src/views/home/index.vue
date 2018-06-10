<template>
  <div class="dashboard-container">
    <el-row>
      <!-- <el-col :span="6" :offset="9"> -->
        <!-- <img style="width:100%;max-width:200px" :src="logo"> -->
      <!-- </el-col> -->
      <el-col :span="24">
        <br>
        <p style="font-size: 20px; color: #555; text-align: center;">
          Hello, {{name}} (
          <span v-for='role in roles' :key='role'>{{role}}</span> ), welcome to Evalchain.
        </p>
      </el-col>
      <el-col :span="16" :offset="4" v-loading="loading" >
        <el-carousel :interval="4000" type="card" height="470px">
          <el-carousel-item v-for="(course, item) in coursesList" :key="item">
            <el-card>
            <img class="image" :src="course.pic">
            <a href="#/courses/ongoing"><h3>{{course.name}}</h3></a>
            <span style="font-size: 13px;">Instructor: {{course.instructor}}</span>
            </el-card>>

          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "@/assets/logo1.png";
import { getCourses } from "@/api/courses";

export default {
  name: "dashboard",
  data() {
    return {
      logo,
      loading: true,
      courses: [],
      coursesList: [],
    };
  },
  computed: {
    ...mapGetters(["name", "roles"])
  },
  async created() {
    const message = await getCourses(false);
    console.log(message)
    this.courses = message.data;
    this.coursesList = [];
    const size =
      this.courses.length > this.pageSize ? this.pageSize : this.courses.length;
    for (let i = 0; i < size; i++) {
      this.coursesList.push(this.courses[i]);
    }
    this.loading = false;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.image {
  width: 100%;
  max-width: 400px;
  display: block;
}
</style>
