<template>
  <div class="yh-list" ref="yhlist">
    <el-tabs v-model="activeName">
      <el-tab-pane label="社稿专线" name="first">
        <!-- 新增订阅 -->
        <div class="s-p">
          <span>我的订阅：</span>
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加订阅</el-button>

          <div class="sub-item" v-for="item in subscribeList" :key="item.id">
            <el-popover placement="top" width="40" v-model="item.visible">
              <i class="el-icon-edit" @click="item.visible = false"></i>
              <i class="el-icon-delete" @click="item.visible = false"></i>
              <span class="s-btn" slot="reference" :class="{'el-button--primary':activeSubscribe == item.id}"
                @click="activeSubscribe = item.id">{{item.name}}</span>
            </el-popover>
          </div>

          <div class="manuscript-type">
            <span :class="{'el-button--primary':manuscriptActive==''}" @click="changeManuscriptType('')">全部</span>

            <span v-for="item in manuscriptType" :key="item.value"
              :class="{'el-button--primary':item.value == manuscriptActive}"
              @click="changeManuscriptType(item.value)">{{item.label}}</span>
          </div>

        </div>

        <el-card class="box-card sub-wrap">
          <!-- 订阅列表 -->
          <div class="sub-list">
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <el-button type="primary">批量选用至智能助理</el-button>
            <div class="btn-wrap" v-if="manuscriptActive != 5">
              <el-button :class="{'text-btn':textBtn=='text'}" @click="textBtn ='text'" size="min"
                icon="el-icon-s-grid"></el-button>
              <el-button :class="{'text-btn':textBtn=='img'}" @click="textBtn ='img'" size="min" icon="el-icon-menu">
              </el-button>
            </div>
            <div class="select-wrap">
              <span>稿件类型：</span>
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in lineManuscript" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item-wrap" v-if="textBtn=='text' && manuscriptActive !=5">
            <el-checkbox-group v-model="checkedIds" @change="handleCheckedIdsChange">
              <div v-for="item in linedatas" :key="item.id" class="text item ">
                <el-checkbox :label="item.id"></el-checkbox>
                <div class="manuscript-list">
                  <div class="img-wrap" v-if="item.image">
                    <img :src="item.image" alt="">
                  </div>
                  <div class="info">
                    <h3>
                      <span class="type" v-if="item.type == 1">
                        文
                      </span>
                      <span class="type type-p" v-if="item.type == 2">
                        图
                      </span>
                      <span class="type type-v" v-if="item.type == 3">
                        视
                      </span>
                      {{item.title}}
                    </h3>
                    <p>{{item.content}}</p>
                    <div class="key-words">
                      <span>关键词：</span>
                      <span v-for="(key,index) in item.keyWOrds" :key="index">#{{key}}#</span>
                    </div>
                    <div class="film-wrap">
                      <el-tooltip content="查看详情" placement="bottom" effect="light">
                        <el-button icon="el-icon-view" @click="handleView('1')"></el-button>
                      </el-tooltip>
                      <el-tooltip content="选至智能助理" placement="bottom" effect="light">
                        <el-button icon="el-icon-film"></el-button>
                      </el-tooltip>
                    </div>
                    <div class="base-info">
                      新华网通稿
                      <span class="date">2018-07-19 15:13:27</span>
                      <span class="issue">自动签发</span>
                      <span class="date">正面 | 已选（12）</span>
                    </div>

                  </div>
                </div>
              </div>
            </el-checkbox-group>
          </div>

          <div class="item-wrap" v-if="textBtn=='img' || manuscriptActive == 5">
            <el-row :gutter="8">
              <el-col :span="imgSpan" v-for="(item, index) in linedatas" :key="index" v-if="item.image">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="item.image" class="image">
                  <div class="info">
                    <h3>
                      <span class="type" v-if="item.type == 1">
                        文
                      </span>
                      <span class="type type-p" v-if="item.type == 2">
                        图
                      </span>
                      <span class="type type-v" v-if="item.type == 3">
                        视
                      </span>
                      {{item.title}}
                    </h3>
                    <div class="date">
                      <span>新华网通稿</span>
                      2018-07-19 15:13:27
                    </div>
                    <div class="film-wrap">
                      <el-tooltip content="查看详情" placement="bottom" effect="light">
                        <el-button icon="el-icon-view" @click="handleView('1','2')"></el-button>
                      </el-tooltip>
                      <el-tooltip content="选至智能助理" placement="bottom" effect="light">
                        <el-button icon="el-icon-film"></el-button>
                      </el-tooltip>
                    </div>
                    <div class="base-info">
                      <span class="date">正面 | 社会 | 已选（12）</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
            layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="综合素材" name="second">
        <!-- 新增订阅 -->
        <div>综合素材</div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="添加订阅-社稿" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="订阅名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词" :label-width="formLabelWidth">
          <el-input v-model="form.keyword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新旧社稿" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="1">新社稿</el-radio>
            <el-radio label="2">旧社稿</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="稿件类型" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="文字" name="type"></el-checkbox>
            <el-checkbox label="图片" name="type"></el-checkbox>
            <el-checkbox label="视频" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="相关人物" :label-width="formLabelWidth">
          <el-input v-model="form.keyword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="相关地点" :label-width="formLabelWidth">
          <el-input v-model="form.keyword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="社稿路线" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="文字" value="shanghai"></el-option>
            <el-option label="图片" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="稿件语言" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="中文" name="type"></el-checkbox>
            <el-checkbox label="英文" name="type"></el-checkbox>
            <el-checkbox label="日文" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="消息通知类型" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="微信" name="type"></el-checkbox>
            <el-checkbox label="微博" name="type"></el-checkbox>
            <el-checkbox label="APP" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="消息通知频率" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="只发一次" name="type"></el-checkbox>
            <el-checkbox label="逐条发送" name="type"></el-checkbox>
            <el-checkbox label="APP" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="启用" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">保存</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">重置</el-button>
      </div>

      <h3>订阅列表</h3>
      <el-table :data="gridData">
        <el-table-column property="name" label="订阅名称"></el-table-column>
        <el-table-column property="name" label="新旧稿件"></el-table-column>
        <el-table-column property="address" label="线路名称"></el-table-column>
        <el-table-column property="address" label="稿件类型"></el-table-column>
        <el-table-column property="date" label="时间" width="100px"></el-table-column>
        <el-table-column property="address" label="状态"></el-table-column>
        <el-table-column property="address" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">转送</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'yhlist',
    props: {
      lineDatas: {
        type: Array,
        default: []
      },
      subscribeData: {
        type: Array,
        default: []
      },
      lineOptions: {
        type: Array,
        default: []
      },
      manuscript: {
        type: Array,
        default: []
      },
      span: {
        type: Number,
        default: '12'
      }
    },
    data() {
      return {
        value:'',
        activeSubscribe: '1',
        activeName: 'first',
        checkedIds: ['1', '2'],
        isIndeterminate: true,
        checkAll: false,
        currentPage: 4,
        subscribeList: this.subscribeData,
        linedatas: this.lineDatas,
        lineManuscript: this.lineOptions,
        manuscriptType: this.manuscript,
        manuscriptActive: '',
        textBtn: 'text',
        imgSpan: this.span,
        dialogFormVisible: false,
        form: {
          name: '',
          keyword: '',
          resource: '1',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          value:'',
        },
        formLabelWidth: '120px',
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }],
      }
    },
    mounted() {
      //根据元素宽度控制图片单行排列个数
      const $width = this.$refs.yhlist.offsetWidth;
      if ($width < '375') { //1个
        this.imgSpan = '24';
      } else if ($width > '375' && $width <= '768') {
        this.imgSpan = '12'; //2个
      }
      if ($width > '768' && $width <= '1200') {
        this.imgSpan = '8'; //3个
      } else if ($width > '1200') {
        this.imgSpan = '6'; //4个
      }

    },
    methods: {
      handleCheckAllChange(val) {
        if (val) {
          this.checkedIds = this.linedatas.map(item => {
            return item.id;
          })
        } else {
          this.checkedIds = [];
        }
        this.isIndeterminate = false;
      },
      handleCheckedIdsChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.linedatas.length;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      changeManuscriptType(value) {
        this.manuscriptActive = value;
        this.$emit("manuscriptActive", value)
      },
      handleView(id, type) {
        type = type || this.manuscriptActive || 0;
        this.$router.push({
          path: '/yh/subscribe/detail',
          query: {
            id: id,
            type: type
          }
        })
      }
    },

  }
</script>

<style lang="scss">
  .yh-list {

    .sub-wrap {
      width: 100%;

      .el-checkbox-group {
        font-size: 14px;

        .item {
          min-height: 172px;
          border-bottom: 1px dashed #e5e5e5;
        }
      }

      .el-checkbox__label {
        display: none;
      }

      .el-checkbox {
        float: left;
        line-height: 120px;
      }

      .img-menu {
        display: inline;
      }

      .item-wrap {

        .img-wrap {
          float: left;
          margin-right: 15px;

          img {
            max-width: 200px;
          }
        }

        .type {
          display: inline-block;
          padding: 0px 4px;
          margin-right: 4px;
          color: #298aff;
          border: 1px solid #298aff;
          border-radius: 4px;
          line-height: 22px;
        }

        .type-p {
          color: #41aa82;
          border: 1px solid #41aa82;
        }

        .type-v {
          color: #e36729;
          border: 1px solid #e36729;
        }

        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin: 10px 0;
          color: #999;
        }

        .key-words {
          margin-top: 10px;

          span {
            color: #298aff;
            margin-right: 10px;
          }
        }

        .film-wrap {
          float: right;

          .el-button {
            padding: 4px;
            border: 1px solid #298aff;
            color: #298aff;
          }
        }

        .date {
          color: #999;

          span {
            display: block;
            float: right;
            color: #000;
          }
        }

        .base-info {
          margin-right: 60px;

          span {
            margin-left: 10px;
          }

          .issue {
            padding: 2px 4px;
            margin-right: 4px;
            color: #d19f3a;
            border: 1px solid #d19f3a;
            border-radius: 4px;
          }
        }

        .manuscript-list {
          margin-left: 30px;
          padding: 10px 0;
        }

        .el-card {
          padding: 10px;
          border: 1px solid #EBEEF5 !important;
          margin-bottom: 10px;

          .base-info span {
            margin-left: 0;
          }

          img {
            width: 100%;
          }

          .date {
            margin: 10px 0;
          }
        }

        .el-card-active {
          border: 1px solid #298aff !important;
        }
      }
    }

    .sub-list {
      border-top: 1px dashed #EBEEF5;
      padding: 20px 0;

      .el-checkbox {
        line-height: 40px
      }

      .el-button {
        margin-left: 10px;
      }

      .btn-wrap {
        float: right;

        .el-button {
          padding: 12px 2px;
          border: 0;
        }

        .text-btn {
          color: #298aff;
        }
      }

      .select-wrap {
        float: right;

        .el-select {
          width: 100px;
          margin-right: 10px;
        }
      }

      .el-checkbox__label {
        display: inline-block
      }
    }

    .el-tabs--top {
      padding: 0 20px;

      .s-p {
        margin: 10px 0;

        .sub-item {
          display: inline-block;
        }

        .s-btn {
          display: inline-block;
          margin: 0 10px;
        }

        .el-button--primary {
          padding: 4px 10px;
          border-radius: 4px;
        }

        .el-button {
          float: right;
          padding: 10px;
        }
      }

      .manuscript-type {
        width: 100%;
        margin: 10px 0 0 60px;

        span {
          line-height: 24px;
          margin: 0 10px;
          cursor: pointer;
        }
      }
    }

    .el-pagination {
      margin-top: 40px
    }
  }
</style>