export default (
  base64,
  maxWidth = Infinity,
  maxHeight = Infinity,
  outType = "image/png"
) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const originWidth = img.width;
      const originHeight = img.height;

      // 目标尺寸
      let targetWidth = originWidth,
        targetHeight = originHeight;
      // 图片尺寸超过400x400的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      canvas.toBlob(blob => {
        // 图片ajax上传
        resolve(blob);

        // 用于测试 , 下载到本地
        // var blobURL = window.URL.createObjectURL(blob);
        // var tempLink = document.createElement("a");
        // tempLink.style.display = "none";
        // tempLink.href = blobURL;
        // tempLink.setAttribute(
        //   "download",
        //   "msr-" + new Date().toISOString().replace(/:|\./g, "-") + ".png"
        // );
        // document.body.appendChild(tempLink);
        // tempLink.click();
      }, outType);
    }; // CHANGE to whatever function you want which would eventually call resolve
  });
};
