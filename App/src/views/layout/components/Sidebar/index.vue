<template>
    <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
export default {
  components: {
      SidebarItem,
      ScrollBar
  },
  computed: {

    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return false;
    }
  }
}
</script>

