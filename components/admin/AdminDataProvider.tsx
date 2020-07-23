import { AdminUser, Albums } from '../../utils/BackendAPI';

/* React-Admin calls the Data Provider with each of methods and expects a Promise in return */

export default {
  getList: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    }
    else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },
  // TODO return only one resource
  getOne: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    }
    else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },
  // TODO return some resources
  getMany: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    }
    else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },
  getManyReference: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    }
    else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },
  update: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    }
    else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },
  updateMany: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    }
    else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },
  // CREATE USER
  create: (resource, params) => {
    return AdminUser.createUser(params);
  },
  // DELETE USER
  delete: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    }
  },
  deleteMany: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    }
    else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  }
};
