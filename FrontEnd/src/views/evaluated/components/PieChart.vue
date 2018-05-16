<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import { debounce } from '@/utils'
export default {
  props: {
    question: {
      type: Array
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize()
    //   }
    // }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          // left: 'center',
          bottom: '10',
          data: ['Very Bad', 'Bad', 'Fair', 'Good', 'Very Good']
        },
        calculable: true,
        series: [
          {
            name: 'Evaluation Score',
            type: 'pie',
            // roseType: 'radius',
            radius: [15, 95],
            // center: ['50%', '38%'],
            data: [
              { value: this.question[0], name: 'Very Bad' },
              { value: this.question[1], name: 'Bad' },
              { value: this.question[2], name: 'Fair' },
              { value: this.question[3], name: 'Good' },
              { value: this.question[4], name: 'Very Good' }
            ]
            // animationEasing: 'cubicInOut',
            // animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>