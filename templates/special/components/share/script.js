import App from '../app';
const miShop = weex.requireModule('shopEvent');
const modal = weex.requireModule('modal');

export default {
  props: [
    'wx',
    'wb',
    'pyq'
  ],
  data() {
    return {
      isApp: false
    }
  },
  mounted() {
    const self = this;
    self.isAppFunc();
  },
  methods: {

    isAppFunc() {
      const self = this;
      // if (weex.config.platform == 'Web') {
        // self.isApp = false;
      // } else if(weex.config.env.platform) {
          self.isApp = true;
      // }
    },

    shareWx(obj) {
      modal.toast({
        message: '微信朋友圈',
        duration: 1
      });
      const self = this;
      miShop.trigger('wxShare', JSON.stringify({
        "title": obj.title,
        "desc": obj.desc,
        "url": obj.url,
        "image": obj.image
      }));
    },

    shareWb(obj) {
      const self = this;
      miShop.trigger('weibo', JSON.stringify({
        "text": obj.text,
        "image": obj.image,
        "url": obj.url
      }));
    },

    sharePyq() {
      
    }
  }
}