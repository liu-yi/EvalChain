<template>
    <el-row style="padding-right:20px" >
        <el-col :span="5" v-for="(o, index) in 6" :offset="1" :key="o" class="card">
            <el-card shadow="never">
                <img class="image" :src="hamburger" >
                <div style="padding: 14px;">
                    <el-row>
                      <el-col :span="12"><span>离散数学</span></el-col>
                      <el-col :span="9" :offset="3" ><span style="font-size: 13px;color: #666;">已参与：人</span></el-col>
                    </el-row>
                    
                    
                    <div class="bottom clearfix">
                        <time class="time">结束时间：{{ currentDate }}</time>
                        <el-button style="margin-top:6px;width:100%">查看结果</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
        
    </el-row>
    
</template>

<script>
import hamburger from '@/assets/hamburger.png'
export default {
  name: 'ongoing',
  data() {
    return {
      hamburger,
      currentDate: new Date().toLocaleTimeString()
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
  /* padding-top: 8px; */
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
  max-width:400px;
  display: block;
}


</style>

