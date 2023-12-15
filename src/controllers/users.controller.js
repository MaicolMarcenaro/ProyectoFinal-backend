import userModel from "../models/user.model.js";

export default class UsersController {
  static async get(query = {}) {
    const users = await userModel.findAll(query);
    return users;
  }

  static async create(data) {
    console.log('Creando el nuevo usuario 👽');
    const user = await userModel.create(data);
    console.log('Usuario creado corretamente 👽');
    return user;
  }

  static async getById(uid) {
    const user = await userModel.findById(uid);
    if (!user) {
      throw new Error(`Id de usuario no fue encontrado ${uid} 😨`);
    }
    return user;
  }

  static async updateById(uid, data) {
    await UsersController.getByID(uid);
    console.log('Actualizando el usuario 👽');
    await userModel.updateById(uid, data);
    console.log('Usuario actualizado corretamente 👽');
  }

  static async deleteById(uid) {
    await UsersController.getByID(uid);
    console.log('Eliminando el usuario 👽');
    await userModel.deleteById(uid);
    console.log('Usuario eliminado corretamente 👽');
  }
}