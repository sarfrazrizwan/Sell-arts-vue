const getBase64 = (file: any) => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() {
      resolve(reader.result)
    }
  })
}

export { getBase64 }
