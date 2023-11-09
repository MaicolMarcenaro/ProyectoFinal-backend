import productsModel from '../models/product.model.js';
// import { Exception } from '../utils.js';

export default class ProductManager{

    static async get(criteria={}, opts){
        

        const data =  await productsModel.paginate(criteria, opts)
        const res = await this.buildResponse(data,criteria,opts)  
        return res
        
    }
    static  buildResponse = async (data,criteria,opts) => {
        return {
          status: 'success',
          payload: data.docs.map(student => student.toJSON()),
          totalPages: data.totalPages,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
          page: data.page,
          hasPrevPage: data.hasPrevPage,
          hasNextPage: data.hasNextPage,
          prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}${criteria.category ? `&category=${criteria.category}` : ''}${opts.sort ? `&sort=${opts.sort.price}` : ''}` : '',
          nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}${criteria.category ? `&category=${criteria.category}` : ''}${opts.sort ? `&sort=${opts.sort.price}` : ''}` : '',
        };
      };
    
    static async getById(pid){
        
        try {
            const product = await productsModel.findById(pid)
            if (!product) {
                throw new Error('No existe el carrito 😨');
            }
            return product;
            
        } catch (error) {
            console.log("error", error)
        }
    }

    static async create(data) {
        const product = await productsModel.create(data);
        console.log('Producto creado correctamente 😁');
        return product;
      }

    static async updateById(pid, {title='',status='',category='',description='',  price='', thumbnails='',code='', stock=''}){
        const product = await productsModel.findById(pid);
        if (!product) {
            throw new Error('No existe el producto 😨');
        }
        const objUP={}
        if(title !==''){
            objUP.title = title
        }
        if(category !==''){
            objUP.category = category
        }
        if(description !==''){
            objUP.description = description
        }
        if(price !==''){
            objUP.price = price
        }
        if(thumbnails !==''){
            objUP.thumbnails = thumbnails
        }
        if(status !==''){
            objUP.status = status
        }
        if(code !==''){
            objUP.code = code
        }
        if(stock !==''){
            objUP.stock = stock
        }
        console.log(objUP)
        try {
            const criteria = { _id: pid };
            const operation = { $set: objUP} ;
            await cartModel.updateOne(criteria, operation);
            console.log('Producto actualizado correctamente 😁');
            return objUP
        }catch (error) {
            console.log("error", error)
        }
    }

    static async deleteById(pid){
        try {
            await productsModel.deleteById(pid)
            console.log("Producto eliminado")
        } catch (error) {
            console.log("error", error)
        }
    }

    
}