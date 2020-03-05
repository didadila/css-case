<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div
        v-if="showCollapse"
        :class="[{ 'avue-breadcrumb--active': isCollapse }]"
        class="avue-breadcrumb">
        <i
          class="icon-navicon"
          @click="setCollapse"/>
      </div>
    </div>
    <div class="top-bar__title">
      <div
        v-if="showMenu"
        class="top-bar__item top-bar__item--show">
        <top-menu/>
      </div>
    </div>
    <div class="top-bar__right">
      <el-tooltip
        v-if="showColor"
        effect="dark"
        content="主题色"
        placement="bottom">
        <div class="top-bar__item">
          <top-color/>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="showDebug"
        :content="logsFlag?'没有错误日志':`${logsLen}条错误日志`"
        effect="dark"
        placement="bottom">
        <div class="top-bar__item">
          <top-logs/>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="showLock"
        effect="dark"
        content="锁屏"
        placement="bottom">
        <div class="top-bar__item">
          <top-lock/>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="showTheme"
        effect="dark"
        content="特色主题"
        placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme/>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="showFullScren"
        :content="isFullScren?'退出全屏':'全屏'"
        effect="dark"
        placement="bottom">
        <div class="top-bar__item">
          <i
            :class="isFullScren?'icon-zuixiaohua':'icon-quanpingzuidahua'"
            @click="handleScreen"/>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="userInfo.avatar"
        effect="dark"
        content="用户头像"
        placement="bottom">
        <img
          id="thumbnail"
          class="top-bar__img">
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <!-- <el-dropdown-item divided>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item> -->
          <el-dropdown-item
            divided
            @click.native="dialogFormVisible = true">个人中心
          </el-dropdown-item>
           <el-dropdown-item
            divided
            @click.native="dialogDataVisible = true">任务中心
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="$refs.seting.open()">界面设置
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout">退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dialog title="个人中心" :visible.sync="dialogFormVisible">
         <el-tabs :tab-position="'left'" style="height: 500px;">
            <el-tab-pane label="个人信息管理">个人信息管理</el-tab-pane>
            <el-tab-pane label="设备管理">设备管理</el-tab-pane>
            <el-tab-pane label="登录管理">登录管理</el-tab-pane>
            <el-tab-pane label="消息管理">消息管理</el-tab-pane>
            <el-tab-pane label="显示策略管理">显示策略管理</el-tab-pane>
            <el-tab-pane label="赋权二维码">赋权二维码</el-tab-pane>
            <el-tab-pane label="其他设置">其他设置</el-tab-pane>
            <el-tab-pane label="工作台工作管理">工作台工作管理</el-tab-pane>
          </el-tabs>
      </el-dialog>


      <el-dialog title="任务中心" :visible.sync="dialogDataVisible">
         <el-table :data="gridData">
          <el-table-column property="id" label="ID"></el-table-column>
          <el-table-column property="name" label="工作室名称"></el-table-column>
          <el-table-column property="name" label="任务名称"></el-table-column>
          <el-table-column property="name" label="任务类型"></el-table-column>
          <el-table-column property="date" label="任务日期"></el-table-column>
          <el-table-column property="name" label="状态"></el-table-column>
          <el-table-column property="name" label="创建人"></el-table-column>
          <el-table-column property="date" label="创建时间"></el-table-column>
        </el-table>
      </el-dialog>
      <top-setting ref="seting"/>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { fullscreenToggel, handleImg, listenfullscreen } from '@/util/util'
import topLock from './top-lock'
import topMenu from './top-menu'
import topTheme from './top-theme'
import topLogs from './top-logs'
import topColor from './top-color'
import topSetting from './top-setting'

export default {
  name: 'Top',
  components: {
    topLock,
    topMenu,
    topTheme,
    topLogs,
    topColor,
    topSetting
  },
  filters: {},
  data() {
    return {
      dialogFormVisible:false,
      dialogDataVisible:false,
      gridData: [{
          id:'1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
           id:'2',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
           id:'3',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
           id:'4',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
    }
  },
  computed: {
    ...mapState({
      showDebug: state => state.common.showDebug,
      showTheme: state => state.common.showTheme,
      showLock: state => state.common.showLock,
      showFullScren: state => state.common.showFullScren,
      showCollapse: state => state.common.showCollapse,
      showMenu: state => state.common.showMenu,
      showColor: state => state.common.showColor
    }),
    ...mapGetters([
      'userInfo',
      'isFullScren',
      'tagWel',
      'tagList',
      'isCollapse',
      'tag',
      'logsLen',
      'logsFlag'
    ])
  },
  created() {
    handleImg(this.userInfo.avatar, 'thumbnail')
  },
  mounted() {
    listenfullscreen(this.setScreen)
  },
  methods: {
    handleScreen() {
      fullscreenToggel()
    },
    setCollapse() {
      this.$store.commit('SET_COLLAPSE')
    },
    setScreen() {
      this.$store.commit('SET_FULLSCREN')
    },
    logout() {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
            this.$router.push({ path: '/login' })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
