<template>
  <div class="M-assistant">
    <el-button type="primary" class="assistant-btn"
    @click="assistantActive = !assistantActive" icon="el-icon-box">
    </el-button>
    <div class="ai-assistant" v-show="assistantActive">
      <vue-drag-resize :isActive="true" :sticks="['ml']" :isDraggable="true"
       :h="500" :w='400' :minw='400' :minh='500' :z="99">
        <div>
          <el-card class="box-card">

            <div slot="header" class="clearfix">
              <span>智能助理</span>
              <el-button type="text" icon="el-icon-close" @click="assistantActive = !assistantActive"></el-button>
            </div>

            <el-tabs v-model="assistantName">
              <el-tab-pane label="融创栏" name="first">
                <el-timeline>
                  <el-timeline-item placement="top" v-for="item in timelineDatas" :key='item.id'>
                    <el-card>
                      <h4>{{item.title}} <i class="el-icon-delete"></i></h4>
                      <template v-if="item.img">
                        <img :src="item.img">
                      </template>
                      <template>
                        <p>{{item.content}}</p>
                      </template>
                      <div>
                        <span class="date">{{item.date}}</span>
                        <el-button type="primary">加入编辑器</el-button>
                      </div>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </el-tab-pane>
              <el-tab-pane label="融创栏" name="second">融创栏</el-tab-pane>
              <el-tab-pane label="智能推荐" name="third">智能推荐</el-tab-pane>
              <el-tab-pane label="智能搜索" name="fourth">智能搜索</el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </vue-drag-resize>
    </div>
  </div>
</template>

<script>
  import VueDragResize from 'vue-drag-resize'
  export default {
    name: 'assistant',
    props: {
      block: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        assistantName: 'first',
        assistantActive: false,
        timelineDatas: [{
          id: '1',
          title: '数据折线增长图',
          date: '2019/4/12 20:46',
          img: '/img/yh/img-2.png',
        }, {
          id: '2',
          title: '国家统计局：中国经济数据平稳.....',
          date: '2019/4/12 20:46',
          content: '今年一季度GDP增速跟去年四季度相比持平，回顾中国多年以来经济增长数据，可以看到一直都非常平稳.....',
        }, {
          id: '3',
          title: '国家统计局：中国经济数据平稳.....',
          date: '2019/4/12 20:46',
          content: '今年一季度GDP增速跟去年四季度相比持平，回顾中国多年以来经济增长数据，可以看到一直都非常平稳.....',
        }, {
          id: '4',
          title: '国家统计局：中国经济数据平稳.....',
          date: '2019/4/12 20:46',
          content: '今年一季度GDP增速跟去年四季度相比持平，回顾中国多年以来经济增长数据，可以看到一直都非常平稳.....',
        }]
      }
    },
    components: {
      VueDragResize
    },
  }
</script>

<style lang="scss">
  .M-assistant {
    .assistant-btn {
      position: fixed;
      right: 0;
      top: 140px;
      padding: 8px 12px;
      z-index:999;
    }

    .ai-assistant {
      .el-tabs--top {
        margin: 0;
        padding: 0
      }

      .el-card__header .el-button--medium {
        padding: 8px 12px;
        float: right;
        border: 0;
        font-size: 20px;
        padding: 0 3px;
      }

      img {
        margin: 10px 0;
      }

      p {
        color: #656565;
        line-height: 20px;
        margin: 10px 0;
      }

      .date {
        color: #999;
        line-height: 32px;
        display: inline-block;
      }

      .el-icon-delete {
        float: right;
      }

      .el-button--primary {
        float: right;
      }

      .el-tabs__item {
        padding: 0 10px;
        height: 32px;
        line-height: 32px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        position: relative;
        border: 1px solid #e5e5e5;
        margin-right: 10px;
        border-radius: 5px
      }

      .el-tabs__item.is-active {
        color: #fff;
        background: #298aff;
        border: 1px solid #298aff;
      }

      .el-tabs--top .el-tabs__item.is-top:nth-child(2),
      .el-tabs--top .el-tabs__item.is-top:last-child {
        padding: 0 10px;
      }

      .el-tabs__nav-wrap::after,
      .el-tabs__active-bar {
        height: 0;
      }
    }
  }
</style>