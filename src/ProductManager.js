import fs from 'fs'

export class ProductManager{
  constructor(path){
      this.products=[]
      this.path= path
  }
  addProduct ({id, title, description, price, status, category, thumbnails,code,stock}){
    this.id= id,
    this.title = title,
    this.status = status,
    this.category = category,
    this.description = description,
    this.price = price,
    this.thumbnails = thumbnails,
    this.code = code,
    this.stock = stock


    let prd={
        id:this.id,
        title:this.title,
        status:this.status,
        category:this.category,
        description:this.description,
        price:this.price,
        thumbnails:this.thumbnails,
        code:this.code,
        stock:this.stock 
    }
      //const newObject = JSON.stringify(prd,null, 2)

      const exist = fs.existsSync(this.path)
      if (!exist) {
          fs.writeFileSync(this.path,"[]",'utf-8')
          const product = this.getProducts()
          const newProduct = JSON.parse(product)
          newProduct.push(prd)
          const newObject = JSON.stringify(newProduct,null, 2)
          fs.writeFileSync(this.path, newObject, "utf-8")
          console.log("Se creo el archivo y se inserto el producto")
      } else {
          const product = this.getProducts()
          const newProduct = JSON.parse(product)
          let result = newProduct.find(produ=> produ.id ==this.id)
          if (!result) {
              newProduct.push(prd)
              const newObject = JSON.stringify(newProduct,null, 2)
              fs.writeFileSync(this.path, newObject, "utf-8")
              console.log("Producto agregado", newProduct)
          }else{
              console.log("Repetidooo")
          }
          
          
      }
             
  }

  getProducts(){
      const productos = fs.readFileSync(this.path,"utf-8")
      return productos
  }
  getProductsPlain(){
    const productos = fs.readFileSync(this.path,"utf-8")
    const newProduct = JSON.parse(productos)
    return newProduct
}

  getProductById(id){
      const productos = fs.readFileSync(this.path,"utf-8")
      const newProductos = JSON.parse(productos)
      let result = newProductos.find(produ=> produ.id ===id)
      if (result) {
          return result  
      } else {
          console.log ("Not Found, id incorrecto")
          return false
      }
  }
  deleteProduct(id){
      const productos = fs.readFileSync(this.path,"utf-8")
      const newProductos = JSON.parse(productos)
      let result = newProductos.filter(produ=> produ.id !==id)
      const newObject = JSON.stringify(result,null, 2)
      fs.writeFileSync(this.path, newObject, "utf-8")
      console.log("Producto Eliminado", newObject)
  }
  updateProduct({id, title, description, price, thumbnails,code,  stock,category, status}){
      const productos = fs.readFileSync(this.path,"utf-8")
      const newProductos = JSON.parse(productos)
      let indice = newProductos.findIndex(produ=> produ.id ===id)
      newProductos[indice]={
      "id": id,
      "title": title,
      "category": category,
      "status": status,
      "description": description,
      "price": price,
      "thumbnails":thumbnails,
      "code": code,
      "stock": stock
      }
      const prdUpdate = JSON.stringify(newProductos,null, 2)
      fs.writeFileSync(this.path, prdUpdate, "utf-8")
      console.log("Producto actualizado", prdUpdate)
  }
  
}

// let lista1= new ProductManager("./products.json")


// lista1.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
//     lista1.addProduct("producto prueba2","Este es un producto prueba",200,"Sin imagen","abc123",25)
//     lista1.addProduct("producto prueba2","Este es un producto prueba",400,"Sin imagen","abc12333",25)
//     lista1.addProduct("producto prueba2","Este es un producto prueba",400,"Sin imagen","abc12332",25)
//     lista1.addProduct("producto prueba2","Este es un producto prueba",400,"Sin imagen","abc12331",25)

  //lista1.getProducts()
  
  //lista1.updateProduct(4,"producto act","Este es un producto prueba de actualizacion",400,"Sin imagen","abc1287833",25)

  //console.log(lista1.getProductById(4))
  //lista1.deleteProduct(1)
