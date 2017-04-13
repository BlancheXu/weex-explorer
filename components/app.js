const miShop = weex.requireModule('shopEvent');
var a = 1;
console.log(miShop)

const transformToJson = (beforeData) => {
  if(typeof beforeData === 'object') {
    return beforeData;
  }
  if(beforeData === '') {
    return null;
  }
  return JSON.parse(beforeData);
};

const product = (id, type) => { // 进入商品详情页
  if(type == 'product') {
    miShop.trigger('product', id, (response)=> {
      response = transformToJson(response);
      if(response.error) {
        modal.toast({
          message: response.error.description || '出错了请稍后再试',
          duration: 1
        });
        return;
      }
      if(response.data === 0) {
        modal.toast({
          message: '进入商品详情页成功',
          duration: 1
        });
      } else if(response.data === 1) {
        modal.toast({
          message: '进入商品详情页失败',
          duration: 1
        });
      } else {
        modal.toast({
          message: '出错了请稍后再试',
          duration: 1
        });
      }
    });
  } else if(type == 'category') {
      miShop.trigger('showPlugin', JSON.stringify({ // 进入到列表页面
        "type": "list",
        "path": "ShopPlugin://com.xiaomi.shop.plugin.productlist.ui.ProductListFragment?pluginId=116",
        "extra":{
          "extra_category_id": id,
          "extra_category_name": "小米 Note 2"
        }
      }), (response)=> {
        response = transformToJson(response);
        if(response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加进入到列表页面成功后的逻辑
        if(response.data === 0) {
          modal.toast({
            message: '进入到列表页面成功',
            duration: 1
          });
        } else if(response.data === 1) {
          modal.toast({
            message: '进入到列表页面失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
  }
};

module.exports = {
  transformToJson,
  product
}
