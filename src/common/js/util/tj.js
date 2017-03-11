/**
 * 统计工具
 * */
var tj = {
  report(param = {}) {
    // 上报参数默认值
    let dft = {
      url: '',
      param: {

      }
    };

    // 参数覆盖默认值
    dft.url = param.url || dft.url;
    for (let propName in param) {
      if (propName == 'url') continue;
      dft.param[propName] = param[propName];
    }

    // 查询字符串数组
    let queryArr = [];
    for (let key in dft.param) {
      let value = dft.param[key];
      queryArr.push(`${key}=${value}`);
    }

    // 生成完整的上报url
    let url = `${dft.url}?${queryArr.join('&')}`;

    // 创建img标签进行上报
    var img = document.createElement('img');
    img.src = url;

    // 上报结束后销毁img标签
    img.onload = img.onerror = function () {
      this.parentNode.removeChild(this);
    };

    // 插入DOM
    document.body.appendChild(img);
  }
};

export default tj;
