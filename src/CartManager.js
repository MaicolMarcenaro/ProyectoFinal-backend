import fs from 'fs';

export const existFile= async (path)=>{
    try {
        await fs.promises.access(path);
    } catch (error) {
        await fs.promises.writeFile(path,"[]",'utf-8');
    }
}

export const addCart = async (path, {id, products}) =>{
    await existFile(path)
    const cart = {
        "id": id,
        "products":products
    }
    const product  = await getCarts(path)
    product.push(cart)
    const content = JSON.stringify(product, null, '\t');
    await fs.promises.writeFile(path, content, "utf-8")
    console.log("Producto agregado", cart)
}
export const getCarts = async (path)=>{
    const productos = await fs.promises.readFile(path,"utf-8")
    const newProduct = JSON.parse(productos)
    return newProduct
}
