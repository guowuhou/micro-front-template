<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="menu in menus" :key="menu.path" :item="menu" :base-path="basePath(menu.path)" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import path from 'path'
import Logo from './Logo'
import menus from '../../menus'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { isExternal } from '@/utils/validate'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    appBasePath() {
      const { $route } = this
      const appBasePath = $route.path.split('/')[1]
      return appBasePath
    },
    menus() {
      return menus[this.appBasePath]
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    basePath(basePath) {
      // if (isExternal(basePath)) {
      //   return basePath
      // }
      return path.join('/' + this.appBasePath, basePath)
    }
  }
}
</script>
