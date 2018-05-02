<template>
    <el-button type="" @click="todeploy">test</el-button>
</template>

<script>
import { deploy } from '@/operations/test'
export default {
  methods: {
    todeploy() {
      deploy()
    }
  }
}
</script>

