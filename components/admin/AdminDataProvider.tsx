import { AdminUser, Albums } from "../../utils/BackendAPI";

/* React-Admin calls the Data Provider with each of methods and expects a Promise in return */

export default {
  getList: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers().then((response) => {
        return {
          data: response.data,
          total: response.data.length,
        };
      });
    } else if (resource == "albums") {
      return Albums.getAllAlbums().then((response) => {
        return {
          data: response.data,
          total: response.data.albums.length,
        };
      });
    } else {
      console.error("There is no such resource");
    }
  },

  // TODO return only one piece of resource
  getOne: (resource, params) => {
    if (resource == "users") {
      // return AdminUser.getAllUsers().then((response) => {
      //   return {
      //     data: response.data[params.id],
      //   };
      // });
      return AdminUser.getAllUsers();
    } else if (resource == "albums") {
      return Albums.getAllAlbums().then((response) => {
        return {
          data: response.data.albums[params.id],
        };
      });
    } else {
      console.error("There is no such resource");
    }
  },

  // TODO return some resources
  getMany: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    } else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },

  // TODO
  getManyReference: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    } else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },

  // TODO
  update: (resource, params) => {
    if (resource == "users") {
      return AdminUser.deleteUser(params.id)
        .then(() => {
          var body = {
            username: params.data["username"],
            nickname: params.data["nickname"],
            password: params.data["password"],
            role: params.data["role"].trim().toLowerCase(),
          };
          AdminUser.createUser(body);
        })
        .then(() => {
          AdminUser.getAllUsers().then((response) => {
            return {
              data: response.data,
              total: response.data.length,
            };
          });
        });
    } else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },

  // TODO
  updateMany: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    } else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },

  // CREATE USER WORKS
  create: (resource, params) => {
    if (resource == "users") {
      var body = {
        username: params.data["username"],
        nickname: params.data["nickname"],
        password: params.data["password"],
        role: params.data["role"].trim().toLowerCase(),
      };
      return AdminUser.createUser(body);
    } else if (resource == "albums") {
      // TODO create albums
    }
  },

  // DELETE USER WORKS
  delete: (resource, params) => {
    if (resource == "users") {
      var id = params.id;
      return AdminUser.deleteUser(id);
    } else if (resource == "albums") {
      // TODO delete albums
    }
  },

  // TODO
  deleteMany: (resource, params) => {
    if (resource == "users") {
      return AdminUser.getAllUsers();
    } else if (resource == "albums") {
      return Albums.getAllAlbums();
    }
  },
};
