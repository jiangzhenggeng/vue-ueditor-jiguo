//基础数据骨架
var baseDataItem = {
  'blogid': '50808',
  'pid': '0',
  'status': '1',
  'title': '舒适还抗菌，这副柔性耳机可完美贴合耳道',
  'cover': '027f8b4e-43a2-4242-8c1c-0d6ec3d941cb',
  'banner': '',
  'tag': '',
  'addtime': '2小时前',
  'updatetime': '1509109202',
  'pidnum': '1',
  'displayorder': '0',
  'praise': '2',
  'reply': '0',
  'stow': '2',
  'author': '神奇的小明',
  'uid': '1349498',
  'groupid': '0',
  'productinfo': {
    'start_price': 0,
    'price': 520,
    'discount': 0,
    'mall': 'kickstarter',
    'type': 1,
    'pidnum': '',
    'discounts': ''
  },
  'type': '2',
  'issync': '0',
  'feature': '<em class="ft18">￥520</em><em class="ft14 ml10"></em>',
  'ischecked': '0',
  'describe': '',
  'isgift': '0',
  'orderid': null,
  'merit': null,
  'defect': null,
  'jinghua': '0',
  'button': '',
  'button_link': '',
  'listorder': '0',
  'video': '0',
  'first_check_status': '0',
  'first_check_remark': '',
  'is_original': '0',
  'is_featured': '1',
  'read_num': 1223,
  'cid1': '322',
  'cid2': '334',
  'cid3': '404',
  'score': '0.0',
  'score_num': '0',
  'score_meta': null,
  'is_article_jingxuan': '0',
  'is_edit': '0',
  'limit': '1509109202',
  'format': {
    'middle_left': '￥520',
    'middle_right': '',
    'bottom_left': 'kickstarter',
    'list_bottom_left': ''
  },
  'isstow': 0,
  'avatar': 'http://s1.jiguo.com/2ad793ef-4372-444d-a6fb-d38b9b53e2b2'
}

import * as util from '../util'
import Card from '@/components/card/card.vue'
import Large from '@/components/card/large.vue'
import Topic from '@/components/card/topic.vue'

describe('src/pages/app.vue', () => {
  let vm
  afterEach(()=>{
    util.destroyVM(vm)
  });

  it('测试首页小卡片（标题，时间）', () => {
    vm = util.createTest(Card, {
      item: baseDataItem
    }, true)
    expect(vm.$el.querySelector('.stream-title').textContent)
      .to.equal(baseDataItem.title)
    expect(vm.$el.querySelector('.time').textContent)
      .to.equal(baseDataItem.addtime)
  })

  it('测试首页大卡片（产品名称，产品数量）', () => {
    baseDataItem.product = '产品名称';
    baseDataItem.num = 10;
    vm = util.createTest(Large, {
      item: baseDataItem,
      //显示标签
      tag: true,
      //显示产品信息
      productName: true
    }, true)
    expect(vm.$el.querySelector('.article-show-all-header-href span').textContent)
      .to.equal(baseDataItem.product)
    expect(vm.$el.querySelector('.article-show-all-header-href .icon-more').textContent)
      .to.equal(baseDataItem.num+'篇')
  })

  it('话题大卡片', () => {
    baseDataItem.type = 6;
    vm = util.createTest(Topic, {
      item: baseDataItem,
      //显示标签
      tag: true
    }, true)
    expect(vm.$el.querySelector('.event-tag').textContent)
      .to.equal('话题')
  })

  it('图片加载指令', (done) => {
    vm = util.createTest(Topic, {
      item: baseDataItem
    }, true)
    setTimeout(()=>{
      expect(vm.$el.querySelector('.stream-img img').getAttribute('src').indexOf('/640?imageView2/1/w/640/h/320/q/100'))
        .to.be.above('http://s1.jiguo.com/'.length)
      done();
    },1200)
  })

})

