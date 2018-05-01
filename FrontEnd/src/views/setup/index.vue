<template>
  <div class="app-container" style="padding-top: 60px;">
    <el-form ref="setupForm" :model="setupForm" :rules="setupRules" label-width="180px" style="width:700px;">

      <el-form-item label="Course Name" prop="courseName">
        <el-input v-model="setupForm.courseName"></el-input>
      </el-form-item>

      <el-form-item label="Time" prop="time">
        <div>
          <el-date-picker v-model="setupForm.time" type="datetimerange" align="right" start-placeholder="Start Time" end-placeholder="End Time" :default-time="['12:00:00', '12:00:00']" style="width: 100%">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="Participants" prop="participantsFrom">
        <div style="padding-bottom: 20px">
          <el-select style="width:100%" v-model="setupForm.participantsFrom" multiple filterable remote reserve-keyword placeholder="Participants From" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in choosenFrom" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-alert v-show="showTransfer" title="Select more than one candidate from left side to right side." type="info" center show-icon>
        </el-alert>
      </el-form-item>

      <el-form-item v-show="showTransfer" label="" prop="choosenCandidates">
        <div>
          <el-transfer style="text-align: left; display: inline-block; " v-model="setupForm.choosenCandidates" filterable :titles="['Candidates', 'Participants']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="data" :render-content="renderFunc">
          </el-transfer>
        </div>
      </el-form-item>

      <div style="padding-top:20px">
      </div>
      <el-form-item>
        <div>
          <el-button :disabled="submitDisabled" style="width:95%" type="primary" @click="onPublish">Publish</el-button>
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { dateToUnixTime } from "@/utils/time";
import { publish } from "@/operations/deploy";
import ecurve from "ecurve";
import secureRandom from "secure-random";
import BigInteger from "bigi";
import { generateKeyPair } from "@/operations/ringSign";

export default {
  data() {
    /*
      just for test
    */
    var generateData = _ => {
      var data = {};
      for (let i = 1; i <= 3; i++) {
        let className;
        if (i < 10) {
          className = "0" + i;
        } else {
          className = "" + i;
        }
        data["Class 14" + className] = [];
        for (let j = 0; j < 5; j++) {
          data["Class 14" + className][j] = {
            key: generateKeyPair().pk.toString(),
            id: 11410601,
            label: "学生" + className + j
          };
        }
      }
      return data;
    };
    return {
      data: [],
      choosenFrom: [], //被选中的来源的对象，不重要
      list: [],
      loading: false,
      showTransfer: false,
      renderFunc(h, option) {
        return (
          <span>
            {option.id} {option.label}
          </span>
        );
      },
      setupForm: {
        courseName: "Fall 2018 CS101 Discrete Mathematics",
        time: "",
        ringSize: 500,
        participantsFrom: [],
        choosenCandidates: [] //被选中的参与评教的人
      },
      setupRules: {
        courseName: [{ required: true, trigger: "blur" }],
        time: [
          {
            required: true,
            trigger: "blur"
          }
        ],
        participantsFrom: [
          {
            required: true,
            trigger: "blur"
          }
        ]
      },
      datasource: generateData()
    };
  },
  computed: {
    submitDisabled: function() {
      let flag = false;
      for (let item in this.setupForm) {
        if (this.setupForm[item].length === 0) {
          flag = true;
        }
      }
      return flag;
    }
  },
  watch: {
    "setupForm.participantsFrom": function(newFrom, oldFrom) {
      this.data = [];
      var keyset = [];
      if (newFrom.length > 0) {
        this.showTransfer = true;
      }
      for (let j = 0; j < newFrom.length; j++) {
        let item = newFrom[j];
        for (let i = 0; i < this.datasource[item].length; i++) {
          if (keyset.indexOf(this.datasource[item][i].key) == -1) {
            keyset.push(this.datasource[item][i].key);
            this.data.push(this.datasource[item][i]);
          }
        }
      }
    }
  },
  mounted() {
    this.list = [];
    for (let item in this.datasource) {
      this.list.push({
        value: item,
        label: item
      });
    }
    console.log(this.list);
  },
  methods: {
    onPublish() {
      var startTime = dateToUnixTime(this.setupForm.time[0])
      var endTime = dateToUnixTime(this.setupForm.time[1])
      publish(this.setupForm.choosenCandidates, startTime, endTime)

    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.choosenFrom = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.choosenFrom = [];
      }
    }
  }
};
</script>

<style scoped>

</style>

