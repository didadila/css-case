<template>
  <div class="yh-detail">
    <yh-container>
      <div class="base-info">
        <el-card class="box-card" :style="{ height: baseHeight}">
          <div slot="header" class="clearfix">
            <span><i class="el-icon-document"></i> 卡片名称</span>
          </div>
          <div class="text item">
            <p>人名：李克强</p>
            <p>地点：新华网、国务院</p>
            <p>短语：李克强会见德国总理</p>
            <p>情感：正面</p>
            <p>时间：5月2日</p>
            <p>来源：新华社通稿</p>
            <p>分类：国际|时政</p>
            <p>大小：30M</p>
            <p>时常：60分钟</p>
            <div>
              <el-button type="primary" icon="el-icon-edit-outline">选用</el-button>
              <el-button type="primary" icon="el-icon-download">下载</el-button>
              <el-button icon="icon-bug">查看日志</el-button>
            </div>
          </div>
        </el-card>
      </div>

      <div class="detail" ref="yhdetail">
        <div class="header">
          <h3 class="header__title">{{data.title}}</h3>
          <div>
            <span>来源：{{data.source}}</span>
            <span class="date">{{data.date}}</span>
            <span>{{data.editor}}</span>

            <div class="film-wrap">
              <el-tooltip content="字号增大" placement="bottom" effect="light">
                <el-button icon="el-icon-view" @click="handleBigger"></el-button>
              </el-tooltip>
              <el-tooltip content="字号减小" placement="bottom" effect="light">
                <el-button icon="el-icon-film" @click="handleReduce"></el-button>
              </el-tooltip>
            </div>
          </div>

        </div>
        <el-divider></el-divider>
        <div class="keyWord">
          关键词：
          <span v-for="(key,index) in data.keyWords" :key="index">#{{key}}#</span>
        </div>
        <div class="content" :class="fontSize" v-html="data.content"></div>

        <el-card class="box-card" v-if="type == 2">
          <div slot="header" class="clearfix">
            <span>人脸识别后的相似图片</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in data.imglist1" :key="item">
              <img :src="item" alt="" width="100%">
            </el-col>
          </el-row>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[10]" :page-size="10"
            layout="total, sizes, prev, pager, next, jumper" :total="4">
          </el-pagination>
        </el-card>

        <el-card class="box-card" v-if="type == 2">
          <div slot="header" class="clearfix">
            <span>相似图片</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in data.imglist1" :key="item">
              <img :src="item" alt="" width="100%">
            </el-col>
          </el-row>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[10]" :page-size="10"
            layout="total, sizes, prev, pager, next, jumper" :total="4">
          </el-pagination>
        </el-card>
      </div>

    </yh-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        type: '',
        baseHeight: '200px',
        fontSize: 'fontSize-14',
        currentPage: 4,
        data: {
          source: '文字稿件',
          title: '中宣部、中央文明办开展慰问帮扶全国道德模范活动',
          date: '2020-02-28 19:11:12',
          editor: '吴三',
          content: `新华社北京1月12日电 `,
          image: '/img/yh/img-2.png',
          keyWords: ['5G领域', '中宣部', '中央文明办']
        },
        manuscriptDatas: [{
          source: '文字稿件',
          title: '中宣部、中央文明办开展慰问帮扶全国道德模范活动',
          date: '2020-02-28 19:11:12',
          editor: '吴三',
          content: `<div id="p-detail">
              <p>　　新华社北京1月12日电&nbsp; 2020年新春佳节来临之际，中宣部、中央文明办组织开展慰问帮扶全国道德模范活动，为道德模范送去党和政府的关怀以及社会各界的温暖，在全社会营造崇德向善、见贤思齐、德行天下的浓厚氛围。</p>
              <p>　　2019年9月，中央文明委在京隆重表彰第七届全国道德模范，习近平总书记作出重要指示，高度评价道德模范崇高精神，对发挥道德模范榜样示范作用提出明确要求。中央领导同志十分关心道德模范，要求持之以恒关怀关爱他们，帮助解决实际生活困难。近日，中宣部、中央文明办派出慰问组分赴26个省（区、市），登门看望慰问48位生活困难的全国道德模范及其家属，转达中央领导同志的亲切问候，送上帮扶资金和新春祝福。慰问组来到道德模范家中，详细了解他们的工作生活情况，叮嘱他们保重身体，勉励他们珍惜荣誉，切实发挥好示范引领作用。</p>
              <p>　　慰问帮扶的全国道德模范，有为掩护战友被炸伤，失去双眼双手，生动诠释新时代军人忠诚与担当的“排雷英雄”杜富国；有毅然跳下火车勇救他人性命，致使右腿高位截肢的“最美铁路人”徐前凯；有18年扎根深山，潜心课堂教学、无私关爱学生的“乡村教师”张玉滚……慰问组还看望了部分牺牲去世的道德模范家属，有毕业后毅然返乡，在脱贫攻坚一线无私奉献，遭遇山洪不幸遇难的“驻村第一书记”黄文秀的父母；有为保护国家某重点试验平台，英勇冲锋在前，用宝贵生命谱写许党报国壮歌的“时代英雄”黄群的妻子。道德模范们纷纷表示，感谢党和政府的关怀，一定珍惜荣誉，再接再厉，发挥好榜样作用，向社会传递更多正能量，带动身边人、影响更多人。</p>
              <p>　　据悉，近年来，中宣部、中央文明办先后出资2400多万元，帮扶全国道德模范280多人次。各地也广泛开展走访慰问道德模范活动，通过政策保障、资金支持、社会捐助、志愿服务等方式，落实关爱帮扶措施，切实解决实际困难，彰显了好人好报、德者有得的价值导向。</p>
              <div class="lb">
              <div class="standard_lb">
              <span class="tj">图集</span> <span class="origin"></span>
              <div class="swiper-container2" id="swiperContainer2">
              <div class="swiper-wrapper"> </div>
              <div class="swiper-pagination"></div>
              <div class="swiper_arrow arrow_left s_arrow_left"></div>
              <div class="swiper_arrow arrow_right s_arrow_right"></div>
              <div class="swiper-scrollbar"></div>
              <span class="lb-left s_arrow_left"></span> <span class="lb-right s_arrow_right"></span>
              </div>
              </div>
              </div>
              <div class="zan-wap">
              <a href="javascript:void(0);" class="zan"> </a>
              <div class="zan-i">+1</div>
              <div class="zan-v"> <span></span> </div>
              </div>
              <div class="p-tags" id="">
              <div class="p-kwap" style="display: none;"><a href="javascript:void(0);">道德模范</a><a href="javascript:void(0);">慰问
              </a></div>
              <span class="p-jc">
              <span class="tiyi1">
              <a href="javascript:void(0);" class="advise">【纠错】</a>
              <div class="tiyi01" id="advisebox01" style="display:none">
              <div>
              <iframe id="jc_link1" style="width:600px;height:350px; float:left;" border="0" name="search" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" noresize="" scrolling="no" vspale="0"></iframe>
              </div>
              <div class="tiyi03">
              <div id="jc_close1" style="cursor:pointer"><img src="http://www.xinhuanet.com/images/syicon/space.gif" width="24" height="24" border="0"></div>
              </div>
              </div>
              </span>
              责任编辑：
              赵文涵
              </span>
              </div>
              </div>`,
          image: '/img/yh/img-2.png',
          keyWords: ['5G领域', '中宣部', '中央文明办'],
          imglist1: [],
        }, {
          source: '视频稿件',
          date: '2020-02-28 19:11:12',
          editor: '吴三',
          title: '中宣部、中央文明办开展慰问帮扶全国道德模范活动',
          content: `<div id="p-detail">
            <p align="center"><span><iframe class="pageVideo" height="512" marginheight="0" src="https://player.v.news.cn/api/v1/getPlayPage?uuid=1_1a20e72966714fc295a9d816818dc691&amp;vid=0d3ea2ee0944aa9e3f7f6e673a93af98&amp;playType=0" frameborder="0" width="640" marginwidth="0" scrolling="no" filesize="26031802.0" filelength="947600000" uuid="1_1a20e72966714fc295a9d816818dc691" vid="0d3ea2ee0944aa9e3f7f6e673a93af98" allowfullscreen="true"> </iframe></span></p>
            <p>　　新华社武汉2月29日电（记者胡浩、赵文君）为深入贯彻习近平总书记重要指示精神，落实中央应对疫情工作领导小组部署，29日下午，中共中央政治局委员、国务院副总理孙春兰率中央指导组来到军事医学前方专家组驻地和华中科技大学，考察疫情防控科研攻关情况，强调要以一线疫情防控救治为导向，坚持科研攻关与临床救治、防控实践紧密结合，不断提高防控救治能力。</p>
            <p>　　有关专家介绍了有效药物筛选和临床试验、抗病毒疫苗研发、智能体温检测、辅助医学影像、免疫应答等科研攻关情况。孙春兰对科研人员夜以继日开展科研攻关表示感谢，并详细询问了研发进展和存在的困难。她指出，疫情发生以来，我国科研人员做了大量工作，在较短时间内分离出新型冠状病毒并找到病原体，研制出核酸检测试剂盒，筛选出临床有效的中药西药和诊疗方法，为快速诊断、科学防治赢得了宝贵时间。</p>
            <p>　　孙春兰强调，要坚持把维护人民群众生命安全和身体健康放在第一位，急防控所急，为科研攻关开通绿色通道，重点在病毒溯源、传播机理、医疗救治、药物筛选、疫苗研发等方面加大攻关力度，加快筛选研发具有较好临床疗效的药物，发挥中医药特色优势，不断完善诊疗方案并加强救治指导，依靠科学武器战胜疫情。</p>
            <div class="lb">
            <div class="standard_lb">
            <span class="tj">图集</span> <span class="origin"></span>
            <div class="swiper-container2" id="swiperContainer2">
            <div class="swiper-wrapper"> </div>
            <div class="swiper-pagination"></div>
            <div class="swiper_arrow arrow_left s_arrow_left"></div>
            <div class="swiper_arrow arrow_right s_arrow_right"></div>
            <div class="swiper-scrollbar"></div>
            <span class="lb-left s_arrow_left"></span> <span class="lb-right s_arrow_right"></span>
            </div>
            </div>
            </div>
            <div class="zan-wap">
            <a href="javascript:void(0);" class="zan"> </a>
            <div class="zan-i">+1</div>
            <div class="zan-v"> <span></span> </div>
            </div>
            <div class="p-tags" id="">
            <div class="p-kwap" style="display: none;"><a href="javascript:void(0);">科研</a><a href="javascript:void(0);">攻关</a><a href="javascript:void(0);">救治</a><a href="javascript:void(0);">防控</a><a href="javascript:void(0);">疫情
            </a></div>
            <span class="p-jc">
            <span class="tiyi1">
            <a href="javascript:void(0);" class="advise">【纠错】</a>
            <div class="tiyi01" id="advisebox01" style="display:none">
            <div>
            <iframe id="jc_link1" style="width:600px;height:350px; float:left;" border="0" name="search" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" noresize="" scrolling="no" vspale="0"></iframe>
            </div>
            <div class="tiyi03">
            <div id="jc_close1" style="cursor:pointer"><img src="http://www.xinhuanet.com/images/syicon/space.gif" width="24" height="24" border="0"></div>
            </div>
            </div>
            </span>
            责任编辑：
            钱中兵
            </span>
            </div>
            </div>`,
          image: '/img/yh/img-2.png',
          keyWords: ['5G领域', '中宣部', '中央文明办'],
          imglist1: [],
        }, {
          source: '图片稿件',
          date: '2020-02-28 19:11:12',
          editor: '吴三',
          title: '中宣部、中央文明办开展慰问帮扶全国道德模范活动',
          content: `<p align="center"><img src="http://m.xinhuanet.com/titlepic/112561/1125614838_1582444835709_title0h.jpg"></p>
          <p>　　2月29日，在哈尔滨东安汽车发动机制造有限公司的变速器生产线，工人在进行生产作业。 当日，国内同时拥有汽车发动机、手动变速器和自动变速器制造技术的企业——哈尔滨东安汽车发动机制造有限公司的变速器生产线正式复工。东安汽发从2月15日复工至今，累计生产发动机近3000台，保证国内外订单的生产。 新华社记者 王建威 摄</p>`,
          image: '/img/yh/img-2.png',
          keyWords: ['5G领域', '中宣部', '中央文明办'],
          imglist1: ['img/yh/img-3.png', 'img/yh/img-3.png', 'img/yh/img-3.png', 'img/yh/img-3.png']
        }]
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.type = this.$route.query.type;
      this.data = this.manuscriptDatas[parseInt(this.type)]
    },
    methods: {
      breaks() {
        this.$router.$avueRouter.closeTag()
        this.$router.push({
          path: '/yh/subscribe/index'
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleReduce() {
        let num = this.fontSize.substr(9, 10);
        if (num != 12) {
          num = parseInt(num) - 2;
        }
        this.fontSize = 'fontSize-' + num
      },
      handleBigger() {
        let num = this.fontSize.substr(9, 10);
        if (num != 22) {
          num = parseInt(num) + 2;
        }
        this.fontSize = 'fontSize-' + num
      }
    },
    mounted() {
      const $height = this.$refs.yhdetail.offsetHeight;
      this.baseHeight = $height + 'px'
    }
  }
</script>

<style lang="scss" scoped>
  .yh-detail {
    .base-info {
      float: right;
      width: 300px;

      p {
        padding: 8px 20px;
        margin: 0 -20px;
      }

      p:nth-child(2n) {
        background: #efefef;
      }

      .el-button {
        margin-top: 10px;
        padding: 8px 10px;
      }
    }

    .detail {
      margin-right: 320px;
      background: #fff;
      border-radius: 4px;

      .header {
        text-align: center;
        padding-top: 20px;

        span {
          margin-right: 10px;
        }

        .date {
          color: #999;
        }

      }

      .film-wrap {
        float: right;
        margin-right: 20px;

        .el-button {
          padding: 12px 2px;
          border: 0;
        }

        .text-btn {
          color: #298aff;
        }
      }

      .keyWord {
        line-height: 20px;
        color: #999;
        margin-bottom: 10px;
        padding: 0 20px;

        span {
          color: #298aff;
          margin-left: 10px;
        }
      }

      .content {
        margin-top: 20px;
        padding: 0 20px;

        p {
          margin: 5px 0;
        }
      }

      .fontSize-12 {
        font-size: 12px;
      }

      .fontSize-14 {
        font-size: 14px;
      }

      .fontSize-16 {
        font-size: 16px;
      }

      .fontSize-18 {
        font-size: 18px;
      }

      .fontSize-20 {
        font-size: 20px;
      }

      .fontSize-22 {
        font-size: 22px;
      }
    }

    .el-card__header {
      span {
        border-left: 4px solid #298aff;
        padding-left: 10px;
      }
    }
  }
</style>