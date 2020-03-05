<template>

  <yh-container>
      <el-row :gutter="20">
        <!-- 列表页 -->
        <el-col :span="24">
          <el-card class="box-card" style="margin-bottom:20px">
            <div class="search-wrap">
              <div class="search">
                <el-button>高级搜索</el-button>
                <el-input placeholder="请输入内容" v-model="input" suffix-icon="el-icon-camera">
                  <template slot="append">搜索</template>
                </el-input>
              </div>
              <p>云海搜索：<span>习近平向金正恩致电</span><span>国庆演练</span><span>国足大胜马尔代夫</span></p>
            </div>
          </el-card>

          <div>
            <yh-list :lineDatas="linedatas" :manuscript="manuscriptType" :lineOptions="lineOptions"
              :subscribeData="subscribeList" ></yh-list>

            <!-- 智能助理 -->
            <assistant></assistant>
          </div>
        </el-col>
      </el-row>
  </yh-container>
</template>
<script>
  import request from '@/router/axios'
  //支持拖拽与缩放的vue插件
  import VueDragResize from 'vue-drag-resize'
  import assistant from '@/components/yh/assistant'
  import yhList from '@/components/yh/list'
  export default {
    name:'subscribe',
    data() {
      return {
        name: '我的订阅',
        // assistantActive:false,
        lineOptions: [{
          value: '1',
          label: '多媒体稿',
        }, {
          value: '2',
          label: '图片稿',
        }, {
          value: '3',
          label: '视频稿',
        }, {
          value: '4',
          label: '文字稿',
        }, {
          value: '5',
          label: '音频稿',
        }],
        manuscriptType: [{
          value: '1',
          label: '稿件',
        }, {
          value: '2',
          label: '图片',
        }, {
          value: '3',
          label: '视频',
        }, {
          value: '4',
          label: '音频',
        }, {
          value: '5',
          label: '外购图片',
        }],
        subscribeList: [{
          id: 1,
          name: '建国七十周年',
          visible: false
        }, {
          id: 2,
          name: '全国两会',
          visible: false
        }, {
          id: 3,
          name: '中美贸易战',
          visible: false
        }, {
          id: 4,
          name: '疫情统计',
          visible: false
        }],
        linedatas: [{
          id: 1,
          type: 1,
          title: '中宣部、中央文明办开展慰问帮扶全国道德模范活动',
          content: '新华社北京1月12日电  2020年新春佳节来临之际，中宣部、中央文明办组织开展慰问帮扶全国道德模范活动，为道德模范送去党和政府的关怀以及社会各界的温暖，在全社会营造崇德向善、见贤思齐、德行天下的浓厚氛围。',
          image: '',
          keyWOrds: ['5G领域', '中宣部', '中央文明办']
        }, {
          id: 2,
          type: 2,
          title: '中宣部、中央文明办开展慰问帮扶全国道德模范活动',
          content: '新华社北京1月12日电  2020年新春佳节来临之际，中宣部、中央文明办组织开展慰问帮扶全国道德模范活动，为道德模范送去党和政府的关怀以及社会各界的温暖，在全社会营造崇德向善、见贤思齐、德行天下的浓厚氛围。',
          image: '/img/yh/img-2.png',
          keyWOrds: ['5G领域', '中宣部', '中央文明办']
        }, {
          id: 3,
          type: 3,
          title: '中宣部、中央文明办开展慰问帮扶全国道德模范活动',
          content: '新华社北京1月12日电  2020年新春佳节来临之际，中宣部、中央文明办组织开展慰问帮扶全国道德模范活动，为道德模范送去党和政府的关怀以及社会各界的温暖，在全社会营造崇德向善、见贤思齐、德行天下的浓厚氛围。',
          image: '/img/yh/img-2.png',
          keyWOrds: ['5G领域', '中宣部', '中央文明办']
        }, {
          id: 4,
          type: 3,
          title: '中宣部、中央文明办开展慰问帮扶全国道德模范活动',
          content: '新华社北京1月12日电  2020年新春佳节来临之际，中宣部、中央文明办组织开展慰问帮扶全国道德模范活动，为道德模范送去党和政府的关怀以及社会各界的温暖，在全社会营造崇德向善、见贤思齐、德行天下的浓厚氛围。',
          image: '/img/yh/img-2.png',
          keyWOrds: ['5G领域', '中宣部', '中央文明办']
        }, {
          id: 5,
          type: 3,
          title: '中宣部、中央文明办开展慰问帮扶全国道德模范活动',
          content: '新华社北京1月12日电  2020年新春佳节来临之际，中宣部、中央文明办组织开展慰问帮扶全国道德模范活动，为道德模范送去党和政府的关怀以及社会各界的温暖，在全社会营造崇德向善、见贤思齐、德行天下的浓厚氛围。',
          image: '/img/yh/img-2.png',
          keyWOrds: ['5G领域', '中宣部', '中央文明办']
        }],
      }
    },
    methods: {

    },
    components: {
      assistant,
      yhList
    },
  }
</script>
<style lang="scss">
  .search-wrap {
      padding: 20px 0 0;

      .search {
        max-width: 500px;
        width: 100%;
        margin: auto;

        .el-input-group {
          width: 406px;
        }

        button {
          float: right;
          border: 0;
          padding: 10px;
        }
      }

      p {
        max-width: 500px;
        width: 100%;
        margin: 10px auto;

        span {
          margin: 0 10px
        }
      }
    }
</style>