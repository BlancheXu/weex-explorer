import App from '../app';

export default {
  props: [
    'productList',
    'type'
  ],
  data() {
    return {
      cmsList: []
    }
  },
  mounted() {
    const self = this;
    self.cmsList.push(self.productList[0]);
    console.log(self.cmsList)
  },
  methods: {

    product(id, type) {
      App.product(id, type);
    },
  }
}