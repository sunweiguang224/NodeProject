// callUpNative.js
// ================================


let ua = navigator.userAgent;

// UA 识别
let browser = {
  isAndroid: function() {
    return ua.match(/Android/i) ? true : false;
  },
  isIOS: function() {
    return ua.match(/iPhone|iPad|iPod/i) ? true : false;
  },
  isMobileQQ : function(){
    return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(ua) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(ua);
  },
  isSOHUNewsClient: function () {
    return ua.match(/jsKit/i) ? true : false;
  },
  isWeibo: function () {
    return ua.match(/weibo/i) ? true : false;
  },
  isWechat: function () {
    return ua.match(/MicroMessenger/i) ? true : false;
  },
  isUC: function() {
    return ua.match(/UCBrowser/i) ? true : false;
  },
  isAlipay: function() {
    return ua.match(/alipayclient/i) ? true : false;
  },
  isChrome: function() {
    return ua.match(/(?:Chrome|CrMo|CriOS)\/([0-9]{1,2}\.[0-9]\.[0-9]{3,4}\.[0-9]+)/i) && window.chrome ? true : false;
  },
  isBaidubox: function() {
    //手机百度 && 针对于三星等机器系统自带的手机百度会存在  没有安装客户端 并且  自动调起客户端  情况下 出现的404的状况
    //这种手机百度的ua和正常手机百度的ua 的区别在于 在ua中不存在 T7/7.4 这个字段
    //针对于这种手机百度，在页面加载时 取消自动调起客户端的逻辑
    //正常的手机百度允许  页面加载时  自动调起客户端
    return ua.match(/baiduboxapp/i) && !ua.match(/T7\/7\.4/i) ? true : false;
  },
  isSupportAPPLink: function () {
    // ios 9.3 以上支持
    return /OS 9(_[3-9])* like Mac OS X/img.test(ua) || /OS 1[0-9]+(_\d+)+ like Mac OS X/img.test(ua);
  },
  isIOS9Up: function () {
    // ios 9-9.2
    return /OS 9(_[0-2])* like Mac OS X/img.test(ua);
  },
  isPC: function() {
    // wap
    return ua.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? false : true;
  }
};


// 默认配置
const DEFAULT = {
  // 默认为首页
  protocol: 'channel://channelId=1&channelName=%E9%A6%96%E9%A1%B5',
  loadWaiting: 3000,  // 唤起超时时间
  autoTrigger: false, // 是否自动唤起
  useAppLink: true, // 是否使用 ios app link
  failUrl: '//3g.k.sohu.com', // 唤起失败的链接
  isDownload: false,
  h5from: 'browser',
  callback: function () {}, // 唤起时 回调函数

  // 协议头
  androidSchema: 'sohunews://pr/', //android协议头
  IosSchema: 'sohunewsiphone://pr/', //ios协议头
  appLinkSchema: '//applink.k.sohu.com?url=', //ios9.3以上universalLink
  redirectUrl: '//3g.k.sohu.com/h5apps/callupapp/modules/callupapp/callupapp.html' //ios9.3以上微博 跳转链接
};


let callUpApp = {
  /**
   * 混合配置
   * @param config
   */
  mixinConfig: function (config) {
    DEFAULT.autoTrigger = false;
    if (!config) return;
    DEFAULT.protocol = config.protocol || DEFAULT.protocol;
    DEFAULT.loadWaiting = config.loadWaiting || DEFAULT.loadWaiting;
    DEFAULT.autoTrigger = config.autoTrigger || DEFAULT.autoTrigger;
    // DEFAULT.useAppLink = config.useAppLink || DEFAULT.useAppLink;
    DEFAULT.useAppLink = String(config.useAppLink) == 'false' ? config.useAppLink : DEFAULT.useAppLink;
    DEFAULT.callback = config.callback || DEFAULT.callback;
    DEFAULT.isDownload = config.isDownload || DEFAULT.isDownload;
    DEFAULT.h5from = config.h5from || DEFAULT.h5from;
    DEFAULT.failUrl = config.failUrl || DEFAULT.failUrl;
  },

  /**
   * 根据 UA 生成不同的 SCHEMA
   * @param protocol
   * 安卓的二代协议需要编码后再使用，ios的二代协议则不需要编码就可以使用，
   * 并且如果对ios系统的二代协议编码使用则会出现进入客户端后定位不到指定页面的情况
   * 如果使用universalLink调起客户端，则二代协议也需要编码
   */
  generateSchema: function (protocol) {
    let encodeProtocol = encodeURIComponent(protocol);
    let schemaString = encodeProtocol;

    // 安卓
    if (browser.isAndroid()) {
      schemaString = DEFAULT.androidSchema + encodeProtocol;
    }

    // ios
    if (browser.isIOS()) {
      schemaString = DEFAULT.IosSchema + protocol;
    }

    // ios app link
    if (browser.isSupportAPPLink() && DEFAULT.useAppLink && !DEFAULT.autoTrigger) {
      schemaString = DEFAULT.appLinkSchema + encodeProtocol;
    }

    if (browser.isAndroid() && browser.isChrome()) {
      /**
       * protocol: 二代链接(前面需要加pr/)
       * package: 客户端包名
       * scheme: native 协议头(sohunews)
       * S.browser_fallback_url: 调起失败  跳转链接
       */
      schemaString =  'intent://pr/' + protocol + '/#Intent;' + 
                      'package=' + 'com.sohu.newsclient' + ';' + 
                      'scheme=' + 'sohunews' + ';' + 
                      'S.browser_fallback_url=' + encodeURIComponent(window.location.protocol + DEFAULT.failUrl) + ';' + 
                      'end';
      if (DEFAULT.autoTrigger) {
        schemaString =  'intent://pr/' + protocol + '/#Intent;' + 
                      'package=' + 'com.sohu.newsclient' + ';' + 
                      'scheme=' + 'sohunews' + ';' + 
                      'end';
      }
    } 

    // 新闻客户端内 不需要 协议头 与 encode
    if (browser.isSOHUNewsClient()) {
      schemaString = protocol;
    }

    return schemaString;
  },

  /**
   * 显示引导浮层
   */
  showGuideDOM: function () {
    let img = '//k.sohu.com/static/ui-open/2.0/images/';
    let bgColor = '#fff';
    let imgWidth = '100%';

    if (browser.isAndroid()) {
      img += 'android-';
    }

    if (browser.isIOS()) {
      img += 'ios-';
    }

    if (browser.isWechat()) {
      img += 'weixin.png';
    } else if (browser.isMobileQQ()) {
      img += 'qq.png';
    } else if (browser.isWeibo()) {
      img += 'weibo.png'
    }

    // 安卓 && 微信 显示背景颜色不一样
    if (browser.isAndroid() && browser.isWechat()) {
      bgColor = '#f3f3f3';
    }
    if (browser.isAndroid() && browser.isMobileQQ()) {
      imgWidth = '90%';
    }

    let style = 'position: fixed;top: 0;left: 0;right: 0; bottom: 0; width: 100%;height: 100%;background-color: '+ bgColor + ';z-index: 100000;';
    let dom = [
      '<div style="'+ style +'">',
      '<img src="'+ img +'"style="display:block;width: '+ imgWidth +';margin:0 auto;" alt="guide image" />',
      '</div>'
    ].join('');

    document.body.insertAdjacentHTML('beforeend', dom);
  },

  /**
   * 特殊情况 重定向
   * ios 微博
   */
  redirect: function (schema) {
    if (browser.isIOS() && browser.isWeibo()) {
      location.href = DEFAULT.redirectUrl + '?protocol=' + encodeURIComponent(schema);
    }
  },


  ios9OpenNative: function(protocol) {
    var date = new Date();
    var timeStamp = date.getTime();
    var turnNativeNode = "<a href ='" + protocol + "' style='width:100%;height:10px;' id='" + timeStamp + "'></a> "
    document.body.insertAdjacentHTML('beforeend', turnNativeNode);
    var turnNativeLink = document.getElementById(timeStamp);
    var e = document.createEvent('MouseEvent');
    e.initEvent('click', false, false);
    turnNativeLink.dispatchEvent(e);
  },

  /**
   * 加载协议,唤起 app
   * @param config
   */
  loadSchema: function (config) { 

    if (!config) {
      config = DEFAULT;
    }

    // 混合配置参数
    this.mixinConfig(config);
    // ajax
    let protocol = DEFAULT.protocol + '&h5from=' + DEFAULT.h5from;
    let schemaUrl = this.generateSchema(protocol);
    let iframe = document.createElement('iframe');
    let aLink = document.createElement('a');
    let body = document.body;
    let loadTimer = null;

    // 隐藏 iframe 及 a
    aLink.style.cssText = iframe.style.cssText = 'display:none;width:0px;height:0px;';



    if (browser.isPC()) {
      //如果页面在pc端打开，跳转至官网,如果autoTrigger = true ,保持页面不变
      if (DEFAULT.autoTrigger) {
        return;
      }
      window.location.href = '//k.sohu.com';
      return;

    } else if (browser.isSOHUNewsClient()) {
      // 在新闻客户端 不用 唤起
      DEFAULT.callback();
      location.href = schemaUrl;
      return;

    } else if (DEFAULT.autoTrigger) {
      //打开页面自动调起native
      if (browser.isMobileQQ() || browser.isWechat() || browser.isBaidubox()) {
        return;
      }
      DEFAULT.callback();
      aLink.href = schemaUrl;
      body.appendChild(aLink);
      aLink.click();
      return;

    } else if (browser.isSupportAPPLink() && DEFAULT.useAppLink) {
      // ios 使用 applink
      DEFAULT.callback();
      // aLink.href = schemaUrl;
      // body.appendChild(aLink);
      // aLink.click();
      this.ios9OpenNative(schemaUrl);

    } else if (browser.isMobileQQ() || browser.isWechat() || browser.isWeibo()) {
      // 使用引导浮层
      this.showGuideDOM();
      return;

    } else if (browser.isIOS9Up()) {
      // 不支持 iframe 的方式跳转
      // ios 8 以上 safari
      // chrome, leibao, mibrowser, opera, 360
      DEFAULT.callback();
      aLink.href = schemaUrl;
      body.appendChild(aLink);
      aLink.click();

    } else if (browser.isUC() && browser.isAndroid() && !browser.isAlipay()) {
      // 支付宝采用uc浏览器  排除支付宝
      //android UC 提示下载
      window.location.href = '//9194597c51c0c.cdn.sohucs.com/upgrade/SohuNewsClient_V5.8.1_20161219120914_1001.apk';
      
    } else if (browser.isAndroid() && browser.isChrome()) {
        // chrome for android 
        DEFAULT.callback();
        aLink.href = schemaUrl;
        body.appendChild(aLink);
        aLink.click();
        return;

    } else {
      // 其他浏览器
      // 适用：UC,irefox,mobileQQ
      DEFAULT.callback();
      body.appendChild(iframe);
      iframe.src = schemaUrl;

    }


    // 如果 loadWaiting 时间后,还是无法唤醒 app，则直接打开下载页
    // opera 无效
    let start = Date.now();
    let that = this;

    loadTimer = setTimeout(function () {
      if (document.hidden || document.webkitHidden) {
        return;
      }

      // 如果app启动，浏览器最小化进入后台，则计时器存在推迟或者变慢的问题
      // 那么代码执行到此处时，时间间隔必然大于设置的定时时间
      let time = Date.now() - start;
      if (time > DEFAULT.loadWaiting + 200) {
        // come back from app
      } else {
        // 如果浏览器未因为app启动进入后台，则定时器会准时执行，故应该跳转到下载页
        if (DEFAULT.isDownload && browser.isAndroid()) {
          window.location.href = '//9194597c51c0c.cdn.sohucs.com/upgrade/SohuNewsClient_lite_standalone_edition_1626_2016-12-09-1132.apk';
        } else {
          window.location.href = DEFAULT.failUrl;
        }

      }
    }, DEFAULT.loadWaiting);

    // 当本地app被唤起，则页面会隐藏掉，就会触发 pagehide 与 visibilitychange 事件
    // 在部分浏览器中可行，网上提供方案，作hack处理
    let visibilitychange = function() {
      var tag = document.hidden || document.webkitHidden;
      tag && clearTimeout(loadTimer);
    };

    document.addEventListener('visibilitychange', visibilitychange, false);
    document.addEventListener('webkitvisibilitychange', visibilitychange, false);

    // pagehide 必须绑定到window
    window.addEventListener('pagehide', function() {
      clearTimeout(loadTimer);
    }, false);
  },

};

module.exports = callUpApp;
