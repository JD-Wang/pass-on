function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous'; // 允许image请求的图片应用到canvas，就像他们在同一个域
  img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) { // 确保对缓存的图片也触发img.onload事件
      img.src = src;
  }
}

function observerDom(id) {
  const target = document.querySelector(id)

  return new Promise((resolve, reject) => {
      // 创建一个观察器实例并传入回调函数
      const observer = new MutationObserver(function() {
          resolve()
      })

      // 以上述配置开始观察目标节点
      observer.observe(target, { characterData: true, childList: true, subtree: true })
  })
}

export { toDataURL, observerDom }