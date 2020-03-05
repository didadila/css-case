<template>
  <div class="P-workbench">
    <yh-container>
      <el-row :gutter="20">
        <!-- 左侧内容 -->
        <el-col :span="6">
          <el-card class="box-card M-wokbench">
            <div slot="header" class="clearfix">
              <span>知识学习中...</span>
            </div>
            <div v-for="item in knowledgeDatas" :key="item.id" class="text item">
              <p>{{item.title}}</p>
              <a :herf="item.href">{{item.href}}</a>
              <div>
                <span class="from">从该来源学习到..</span>
                <span v-for="(key,index) in item.keyWord" :key="index">#{{key}}#</span>
              </div>
            </div>
          </el-card>

          <el-card class="box-card M-wokbench">
            <div slot="header" class="clearfix">
              <span>最新稿件</span>
              <time>2020-2-28</time>
            </div>
            <div v-for="item in manuscriptDatas" :key="item.id" class="text item">
              <p>{{item.title}}</p>
              <div>
                <i class="el-icon-share"></i>
                <span>{{item.from}}</span>
                <span class="date">{{item.date}}</span>
              </div>
            </div>
          </el-card>

          <el-card class="box-card M-wokbench">
            <div slot="header" class="clearfix">
              <span>知识库</span>
              <time class="el-icon-more"></time>
            </div>
            <div v-for="item in knowledgeBaseDatas" :key="item.id" class="text item kowledge-list">
              <el-avatar :size="80" src="https://empty">
                <img :src="item.avatar" />
              </el-avatar>
              <h4>{{item.name}}</h4>
              <p class="date">英文名：{{item.enName}}</p>
            </div>
          </el-card>

          <el-card class="box-card M-wokbench">
            <div slot="header" class="clearfix">
              <span>案例库</span>
              <time class="el-icon-more"></time>
            </div>
            <el-carousel height="200px">
              <el-carousel-item v-for="(item,index) in caseBaseDatas" :key="index">
                <img :src="item.img" alt="" width="100%">
                <p>{{item.title}}</p>
                <div class="date">{{item.date}}</div>
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </el-col>
        <!-- 右侧内容 -->
        <!-- 搜索栏 -->
        <el-col :span="12">
          <el-card class="box-card" style="margin-bottom:20px">
            <div class="search-wrap">
              <div class="search">
                <el-button @click="dialogFormVisible = true">高级搜索</el-button>
                <el-input placeholder="请输入内容" v-model="input" suffix-icon="el-icon-camera">
                  <template slot="append">搜索</template>
                </el-input>
              </div>
              <p>云海搜索：<span>习近平向金正恩致电</span><span>国庆演练</span><span>国足大胜马尔代夫</span></p>
            </div>
          </el-card>
          <!-- 社稿专线 -->
          <yh-list :span='12' :lineDatas="linedatas"
          :manuscript="manuscriptType"
          :lineOptions="lineOptions"
          :subscribeData="subscribeList"
          @manuscriptActive="changeManuscriptType"></yh-list>
        </el-col>

        <el-col :span="6">
          <div class="M-drag" ref="dDrag">
            <vue-drag-resize :isActive="true" :isDraggable="true"
            :z="99"
             :isResizable="true" :sticks="['ml']" :h="1500"
              :axis="'x'">
              <div class="M-preview">
                <div class="drag-handle"></div>
                <h3><i class="el-icon-view"></i> 稿件预览</h3>
                <h4>{{manuscriptInfo.title}}</h4>
                <time>{{manuscriptInfo.time}}</time>
                <div class="keyWord">
                  关键词：
                  <span v-for="(key,index) in manuscriptInfo.keyWord" :key="index">#{{key}}#</span>
                </div>
                <div class="content" v-if="!externalImage"
                v-html="manuscriptInfo.content"></div>
                <div class="img-info" v-if="externalImage">
                  <el-row>
                    <el-col :span="24" v-for="(item, index) in manuscriptInfo.images" :key="index">
                      <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.img" class="image">
                        <div class="info-item">
                          <div class="clearfix">
                            <time class="time">{{item.time}}</time>
                            <b>{{item.title}}</b>
                          </div>
                          <div class="clearfix">
                            社会 | 已选（12）
                            <div class="film-wrap">
                              <el-tooltip content="查看详情" placement="bottom" effect="light">
                                <el-button icon="el-icon-view" @click="handleView('1','2')"></el-button>
                              </el-tooltip>
                              <el-tooltip content="选至智能助理" placement="bottom" effect="light">
                                <el-button icon="el-icon-film"></el-button>
                              </el-tooltip>
                            </div>
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </vue-drag-resize>
          </div>
        </el-col>

        <!-- 智能助理 -->
        <assistant></assistant>
      </el-row>

       <el-dialog title="高级搜索" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="线路" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="1">社稿专线</el-radio>
            <el-radio label="2">综合素材</el-radio>
          </el-radio-group>
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
        <el-form-item label="时间范围" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="1">12小时</el-radio>
            <el-radio label="2">24小时</el-radio>
            <el-radio label="3">3天</el-radio>
            <el-radio label="4">自定义</el-radio>
          </el-radio-group>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">保存</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">重置</el-button>
      </div>
    </el-dialog>
    </yh-container>
  </div>
</template>
<script>
  import request from '@/router/axios'
  //支持拖拽与缩放的vue插件
  import VueDragResize from 'vue-drag-resize'
  import assistant from '@/components/yh/assistant'
  import yhList from '@/components/yh/list'
  export default {
    data() {
      return {
        name: '云海工作台',
        input: '',
        //高级搜索
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
        externalImage:false,
        manuscriptInfo:{
          id:'1',
          time:'2020-2-28',
          title:'中宣部、中央文明办开展慰问帮扶全国道德模范活动',
          keyWord:['5G领域','全球变暖','全球科技'],
          images:[
            {
              title:'金秋美景',
              time:'2020-2-28 19:20',
              img:'img/yh/img-3.png',
            },
            {
              title:'金秋美景',
              time:'2020-2-28 19:20',
              img:'img/yh/img-3.png',
            },
            {
              title:'金秋美景',
              time:'2020-2-28 19:20',
              img:'img/yh/img-3.png',
            }
          ],
          content:` 新华社北京1月12日电 2020年新春佳节来临之际，中宣部、中央文明办组织开展慰问帮扶全国道德模范活动，为道
                    德模范送去党和政府的关怀以及社会各界的温暖，在全社会营造崇德向善、见贤思齐、德行天下的浓厚氛围。
                    <br>
                    　　2019年9月，中央文明委在京隆重表彰第七届全国道德模范，习近平总书记作出重要指示，高度评价道德模范崇高
                    精神，对发挥道德模范榜样示范作用提出明确要求。中央领导同志十分关心道德模范，要求持之以恒关怀关爱他们，帮助
                    解决实际生活困难。近日，中宣部、中央文明办派出慰问组分赴26个省（区、市），登门看望慰问48位生活困难的全国道德模
                    范及其家属，转达中央领导同志的亲切问候，送上帮扶资金和新春祝福。慰问组来到道德模范家中，详细了解他们的工作生活情
                    况，叮嘱他们保重身体，勉励他们珍惜荣誉，切实发挥好示范引领作用。
                    <br>
                    　　慰问帮扶的全国道德模范，有为掩护战友被炸伤，失去双眼双手，生动诠释新时代军人忠诚与担当的“排雷英雄”杜富国；有
                    毅然跳下火车勇救他人性命，致使右腿高位截肢的“最美铁路人”徐前凯；有18年扎根深山，潜心课堂教学、无私关爱学生的“
                    乡村教师”张玉滚……慰问组还看望了部分牺牲去世的道德模范家属，有毕业后毅然返乡，在脱贫攻坚一线无私奉献，遭遇山洪
                    不幸遇难的“驻村第一书记”黄文秀的父母；有为保护国家某重点试验平台，英勇冲锋在前，用宝贵生命谱写许党报国壮歌的“时
                    代英雄”黄群的妻子。道德模范们纷纷表示，感谢党和政府的关怀，一定珍惜荣誉，再接再厉，发挥好榜样作用，向社会传递更多
                    正能量，带动身边人、影响更多人。
                    <br>
                    　　据悉，近年来，中宣部、中央文明办先后出资2400多万元，帮扶全国道德模范280多人次。各地也广泛开展走访慰问道德模范
                    活动，通过政策保障、资金支持、社会捐助、志愿服务等方式，落实关爱帮扶措施，切实解决实际困难，彰显了好人好报、德者有得
                    的价值导向。`
        },
        manuscriptType: [{
          type:'0',
          value: '1',
          label: '稿件',
        }, {
          type:'1',
          value: '2',
          label: '图片',
        }, {
          type:'2',
          value: '3',
          label: '视频',
        }, {
          type:'3',
          value: '4',
          label: '音频',
        }, {
          type:'4',
          value: '5',
          label: '外购图片',
        }],
        Dwidth: '300',
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
        caseBaseDatas: [{
          id: 1,
          img: 'img/yh/img-3.png',
          title: '中美贸易战1',
          date: '2019-03-05 ~ 2019-04-05',
        }, {
          id: 2,
          img: 'img/yh/img-3.png',
          title: '中美贸易战2',
          date: '2019-03-05 ~ 2019-04-05',
        }, {
          id: 3,
          img: 'img/yh/img-3.png',
          title: '中美贸易战3',
          date: '2019-03-05 ~ 2019-04-05',
        }, {
          id: 4,
          img: 'img/yh/img-3.png',
          title: '中美贸易战4',
          date: '2019-03-05 ~ 2019-04-05',
        }],
        knowledgeBaseDatas: [{
          id: 1,
          avatar: 'img/yh/img-1.png',
          name: '唐纳德·特朗普',
          enName: 'Donald Trump',
        }, {
          id: 2,
          avatar: 'img/yh/img-1.png',
          name: '唐纳德·特朗普',
          enName: 'Donald Trump',
        }],
        manuscriptDatas: [{
          id: 1,
          title: '大闸蟹嫌贵？吃肥美便宜正当时的梭子蟹！',
          from: '网易',
          date: '19:18:02'
        }, {
          id: 2,
          title: '申花推迟赴广州并放弃踩场 三大核心恐缺席战',
          from: '网易',
          date: '19:18:02'
        }, {
          id: 3,
          title: '申花推迟赴广州并放弃踩场 三大核心恐缺席战',
          from: '网易',
          date: '19:18:02'
        }, {
          id: 4,
          title: '申花推迟赴广州并放弃踩场 三大核心恐缺席战',
          from: '网易',
          date: '19:18:02'
        }],
        knowledgeDatas: [{
          id: 1,
          title: '大闸蟹嫌贵？吃肥美便宜正当时的梭子蟹！',
          href: 'https://www.sohu.com/a/357583804_463728',
          keyWord: ['大闸蟹', '中秋团圆'],
        }, {
          id: 2,
          title: '申花推迟赴广州并放弃踩场 三大核心恐缺席战',
          href: 'https://www.sohu.com/a/357583804_463728',
          keyWord: ['大闸蟹', '中秋团圆'],
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
      // handleCheckAllChange(val) {
      //   if (val) {
      //     this.checkedIds = this.linedatas.map(item => {
      //       return item.id;
      //     })
      //   } else {
      //     this.checkedIds = [];
      //   }
      //   this.isIndeterminate = false;
      // },
      // handleCheckedIdsChange(value) {
      //   let checkedCount = value.length;
      //   this.checkAll = checkedCount === this.cities.length;
      //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.linedatas.length;
      // },
      // handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      // },
      // handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      // }
      changeManuscriptType(value){
        if(value == 5){
          this.externalImage = true;
        }else{
          this.externalImage = fasle;
        }
      },
      handleView(id,type){
        this.$router.push({ path: '/yh/cubscribe/detail',query:{id:id,type:type} })
      }
    },
    mounted() {
      // this.Dwidth = this.$refs.mDrag.offsetWidth;
    },
    components: {
      VueDragResize,
      assistant,
      yhList
    },
  }
</script>
<style lang="scss">
  .P-workbench {
    padding: 8px 10px;
    border-radius: 10px;
    box-sizing: border-box;

    .vdr.active:before{
      outline: 0;
    }
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
  }

  .M-wokbench {
    margin-bottom: 20px;

    .el-card__header {
      span {
        border-left: 4px solid #298aff;
        padding-left: 10px;
      }

      time {
        float: right;
        padding: 3px 0;
        color: #999;
      }
    }

    .item {
      border-bottom: 1px solid #e5e5e5;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      a {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #298aff;
        display: block;
      }

      div {
        margin: 4px 0;
      }

      .from {
        display: inline-block;
        background: url(/img/yh/personalcenter.png) left center no-repeat;
        background-size: 24px;
        padding-left: 30px;
        color: #000;
        margin-left: 0;
      }

      span {
        margin-left: 10px;
        color: #298aff;
      }

      .date {
        color: #999;
      }

      .el-avatar {
        float: left;
        display: block;
        margin-left: 0
      }

      h4 {
        margin-left: 90px;
        padding-top: 30px
      }
    }

    .kowledge-list {
      height: 100px;
      padding-top: 10px
    }
  }

  .M-drag {
    width: 100%;
    position: relative;

    .vdr {
      width: auto !important;
    }

    .vdr-stick {
      display: none
    }
  }

  .el-popper {
    text-align: center;

    i {
      padding: 5px 10px;
    }
  }

  .M-preview {
    padding: 20px;
    background: #fff;

    .drag-handle {
      position: absolute;
      top: 300px;
      left: -20px;
      width: 20px;
      height: 100px;
      background: url(/img/yh/huakuai.png);
      background-repeat: no-repeat;
      background-size: 100%;
    }

    h3 {
      font-size: 22px;
      line-height: 40px;

      i {
        font-size: 18px;
        border: 1px dashed #000;
        padding: 0 2px;
        margin-right: 5px;
      }
    }

    h4 {
      margin: 10px 0 0;
      line-height: 22px;
      font-size: 16px;
    }

    time {
      color: #999;
      line-height: 40px;
    }

    .keyWord {
      line-height: 20px;
      color: #999;
      margin-bottom: 10px;

      span {
        color: #298aff;
        margin-left: 10px;
      }
    }

    .img-info{
      width: 100%;

      img{
        width: 100%;
      }

      .el-col{
        position: relative;
        margin-bottom: 20px;
      }

      .info-item{
        position: absolute;
        bottom:0;
        color: #fff;
        background: rgba(0,0,0,0.5);
        width: 100%;
        padding: 2px 4px;

        .time{
          float: right;
          line-height: 20px;
          color: #fff;
          font-size: 12px
        }
        .film-wrap {
          float: right;

          .el-button {
            padding: 4px;
            border: 1px solid #298aff;
            color: #298aff;
          }
        }
      }
    }

    .content {
      line-height: 22px;
    }
  }
</style>