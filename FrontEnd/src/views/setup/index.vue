<template>
  <div class="app-container" style="padding-top: 3%">
    <el-row>
      <el-col :lg="15" :md="12">
        <el-form ref="setupForm" :model="setupForm" :rules="setupRules" label-width="110px" style="width: 95%">

          <el-form-item label="Course Name" prop="name">
            <el-input v-model="setupForm.name"></el-input>
          </el-form-item>

          <el-form-item label="Instructor" prop="instructor">
            <el-input v-model="setupForm.instructor"></el-input>
          </el-form-item>

          <el-form-item label="Time" prop="time">
            <div>
              <el-date-picker v-model="setupForm.time" type="datetimerange" align="right" start-placeholder="Start Time" end-placeholder="End Time" :default-time="['12:00:00', '12:00:00']" style="width: 100%">
              </el-date-picker>
            </div>
          </el-form-item>

          <el-form-item v-show="showTransfer" label="" prop="participants">
            <div>
              <el-transfer v-model="participants" filterable :titles="['Candidates', 'Participants']" :format="{
                  noChecked: '${total}',
                  hasChecked: '${checked}/${total}'
                  }" :data="transferData" :render-content="renderFunc">
              </el-transfer>
            </div>
          </el-form-item>

          <div style="padding-top:20px">
          </div>
          <el-form-item>
            <div>
              <el-button :disabled="!isCompleted" style="width:100%" type="primary" :loading="loading" @click="onPublish">Publish</el-button>
            </div>
          </el-form-item>

        </el-form>
      </el-col>
      <el-col :lg="8" :md="12" style="">
        <!-- <el-card > -->
          <div style="min-width: 450px; padding-top: 8%; padding-bottom: 8%; text-align:center; border: 1px solid #ebeef5; ">
            <croppa style="" v-model="myCroppa" :width="400" :height="400" placeholder="Choose an image" :placeholder-font-size="0" :disabled="false" :prevent-white-space="true" :show-remove-button="true" :initial-image="wangqi"></croppa>
          </div>

        <!-- </el-card> -->

      </el-col>
    </el-row>

  </div>
</template>

<script>
import { dateToUnixTime } from "@/utils/time";
import { publish } from "@/operations/deploy";
import { getAll, setup } from "@/api/setup";
import wangqi from '@/assets/qwang.jpg'

export default {
  data() {
    return {
      loading: false,
      showTransfer: true, // need to extend
      renderFunc(h, option) {
        return (
          <span>
            {option.id} {option.label}
          </span>
        );
      },
      setupForm: {
        name: "Fall 2018 CS101 Discrete Mathematics",
        instructor: "王琦",
        time: "",
        pic: ""
      },
      participants: [], // 被选中的参与评教的人
      setupRules: {
        name: [{ required: true, trigger: "blur" }],
        time: [{ required: true, trigger: "blur" }],
        instructor: [{ required: true, trigger: "blur" }]
      },
      transferData: [],
      pkSet: [],
      idSet: [],
      myCroppa: {},
      wangqi
    };
  },
  computed: {
    isCompleted: function() {
      let flag = true;
      for (const item in this.setupForm) {
        if (this.setupForm[item] !== undefined) {
          if (item != 'pic' && this.setupForm[item].length === 0) {
            flag = false;
          }
        }
      }
      if(this.participants.length === 0){
        flag = false
      }
      return flag;
    }
  },
  async created() {
    const res = await getAll();
    res.data.forEach(element => {
      const item = {};
      item.key = element.id;
      item.label = element.name;
      this.transferData.push(item);
      this.pkSet.push(element.pk);
      this.idSet.push(element.id);
    });
    this.setupForm.pic = this.myCroppa.generateDataUrl()
    // console.log(this.setupForm.pic)

  },

  mounted(){

  },
  methods: {
    uploadCroppedImage() {
      this.myCroppa.generateBlob(
        blob => {
          // write code to upload the cropped image file (a file is a blob)
        },
        "image/jpeg",
        0.8
      ); // 80% compressed jpeg file
    },
    async onPublish() {
      this.loading = true;
      const startTime = dateToUnixTime(this.setupForm.time[0]);
      const endTime = dateToUnixTime(this.setupForm.time[1]);
      this.setupForm.pkSet = this.participants.map(item => {
        return this.pkSet[this.idSet.indexOf(item)];
      });
      const address = await publish(this.setupForm.pkSet, startTime, endTime);
      this.setupForm.idSet = this.participants;
      this.setupForm.address = address;
      this.setupForm.startTime = this.setupForm.time[0];
      this.setupForm.endTime = this.setupForm.time[1];
      this.setupForm.time = undefined;
      this.setupForm.pic = this.myCroppa.generateDataUrl()
      setup(this.setupForm);
      this.loading = false;
      this.$alert(
        "The address of the evalutation is " + this.setupForm.address + ".",
        "Deploy Successfully!",
        {
          confirmButtonText: "Ok"
        }
      );
    }
  }
};
</script>

<style scoped>
.el-transfer-panel {
  width: 40%;
}
</style>

