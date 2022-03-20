(function() {
  if (file[0]) {
    return Promise.all(Array.from(file).map(e => Vue.prototype.$compression(e, size))) // 如果是 file 数组返回 Promise 数组
  } else {
    return new Promise((resolve) => {
      const reader = new FileReader() // 创建 FileReader
      reader.onload = ({ target: { result: src }}) => {
        const fileSize = Number((file.size / 1024).toFixed(2))
        if (fileSize <= size) {
          resolve({ file: file, origin: file, beforeSrc: src, afterSrc: src, beforeKB: fileSize + 'KB', afterKB: fileSize + 'KB', detail: [], quality: null })
        } else {
          const image = new Image() // 创建 img 元素
          image.onload = async() => {
            const canvas = document.createElement('canvas') // 创建 canvas 元素
            canvas.width = image.width
            canvas.height = image.height
            canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height) // 绘制 canvas
            let canvasURL, miniFile
            let L = true
            //利用二分法压缩图片
            let quality = 0
            const detail = []
            let start = Date.now()
            for (let i = 1; i <= device; i++) {
              canvasURL = canvas.toDataURL('image/jpeg', L ? (quality += 1 / (2 ** i)) : (quality -= 1 / (2 ** i)))
              const buffer = atob(canvasURL.split(',')[1])
              let length = buffer.length
              const bufferArray = new Uint8Array(new ArrayBuffer(length))
              while (length--) {
                bufferArray[length] = buffer.charCodeAt(length)
              }
              miniFile = new File([bufferArray], file.name, { type: 'image/jpeg' });
              (miniFile.size / 1024) > size ? L = false : L = true
              detail.push({
                quality,
                size: miniFile.size,
                kb: Number((miniFile.size / 1024).toFixed(2)),
                time: Date.now() - start
              })
              start = Date.now()
            }
            resolve({
              detail,
              quality,
              file: miniFile,
              origin: file,
              beforeSrc: src,
              afterSrc: canvasURL,
              beforeKB: Number((file.size / 1024).toFixed(2)),
              afterKB: Number((miniFile.size / 1024).toFixed(2))
            })
          }
          image.src = src
        }
      }
      reader.readAsDataURL(file)
    })
  }
}(file))