export enum ResponseCode {
  "Ok" = 200,
  "BadRequest" = 400,
  "Unauthorized" = 401,
  "NotFound" = 404,
  "InternalServerError" = 500,
}

class BackendToken {
  authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}

var token = new BackendToken();
export default token;

interface DefaultType {
  login(body: { username: string; password: string }): Promise<string>;
  status(): Promise<string>;
}

export const Default: DefaultType = {
  login: async (body) => {
    const response: Response = await fetch("/api/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return ResponseCode[response.status];
  },
  status: async () => {
    const response: Response = await fetch("/api/status", {
      method: "GET",
    });
    return ResponseCode[response.status];
  },
};

interface UserType {
  logout(): Promise<string>;
  getUser(): Promise<{
    responseCode: string;
    data:
      | { id: number; username: string; nickname: string; role: string }
      | undefined;
  }>;
  getAllData(): Promise<void>; // TODO
  updateNick(body: { nickname: string }): Promise<string>;
  updatePassword(body: { password: string }): Promise<string>;
  deleteAccout(): Promise<string>; // TODO
}

export const User: UserType = {
  logout: async () => {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    return ResponseCode[response.status];
  },
  getUser: async () => {
    const response = await fetch("/api/user/me", {
      method: "GET",
      credentials: "same-origin",
    });
    let code = ResponseCode[response.status];
    let json = undefined;
    if (code == "Ok") {
      try {
        json = await response.json();
      } catch (error) {
        console.error(error);
        console.error(
          "The API query resulted with an unexpected body: Could not parse JSON: " +
            "You most probably run the website with 'npm run serve-frontend': " +
            "Use 'npm run serve-backend' instead."
        );
        code = ResponseCode[500];
        json = undefined;
      }
    }
    return {
      responseCode: code,
      data: json,
    };
  },
  getAllData: async () => {
    console.error("not implemented.");
  },
  updateNick: async (body) => {
    const response = await fetch("/api/user/me", {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return ResponseCode[response.status];
  },
  updatePassword: async (body) => {
    const response = await fetch("/api/user/me/password", {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return ResponseCode[response.status];
  },
  deleteAccout: async () => {
    const response = await fetch("/api/user/me", {
      method: "DELETE",
      credentials: "same-origin",
    });
    return ResponseCode[response.status];
  },
};

interface AlbumType {
  getAllAlbums(): Promise<{
    responseCode: string;
    albums:
      | Array<{
          album_id: string;
          album_name: string;
          first_photo: string;
        }>
      | undefined;
  }>;
  getAlbum(
    album_id: string
  ): Promise<{
    responseCode: string;
    album:
      | {
          album_id: string;
          album_name: string;
          first_photo: string;
          tags: string[];
          description: string;
          owner: string;
        }
      | undefined;
  }>;
  getAlbumPhotos(
    album_id: string,
    index: string
  ): Promise<{
    responseCode: string;
    photos: string[] | undefined;
  }>;
}

export const Albums: AlbumType = {
  getAllAlbums: async () => {
    const response = await fetch("api/albums", {
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    });
    let code = ResponseCode[response.status];
    let json = undefined;
    try {
      json = await response.json();
    } catch (error) {
      console.error(error);
      console.error(
        "The API query resulted with an unexpected body: Could not parse JSON"
      );
      code = ResponseCode[500];
      json = undefined;
    }
    return {
      responseCode: code,
      albums: json,
    };
  },
  getAlbum: async (album_id) => {
    let url = `api/albums/${album_id}`;
    const response = await fetch(url, {
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    });
    let code = ResponseCode[response.status];
    let json = undefined;
    try {
      json = await response.json();
    } catch (error) {
      console.error(error);
      console.error(
        "The API query resulted with an unexpected body: Could not parse JSON"
      );
      code = ResponseCode[500];
      json = undefined;
    }

    return {
      responseCode: code,
      album: json,
    };
  },
  getAlbumPhotos: async (album_id, index) => {
    let url = `api/albums/${album_id}/photos/${index}`;
    const response = await fetch(url, {
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    });
    let code = ResponseCode[response.status];
    let json = undefined;
    try {
      json = await response.json();
    } catch (error) {
      console.error(error);
      console.error(
        "The API query resulted with an unexpected body: Could not parse JSON"
      );
      code = ResponseCode[500];
      json = undefined;
    }
    return {
      responseCode: code,
      photos: json,
    };
  },
};

interface UserAlbumType {
  getMyAlbums(): Promise<{
    responseCode: string;
    albums:
      | [
          {
            id: string;
            title: string;
            description: string;
            tags: string[];
            image_number: string;
            tagged_number: string;
            users_id: string;
            first_photo: string;
          }
        ]
      | undefined;
  }>;
  createNewAlbum(body: {
    title: string;
    description: string;
    tags: string[];
  }): Promise<{
    responseCode: string;
    album:
      | {
          id: string;
          title: string;
          description: string;
          tags: string[];
          image_number: string;
          tagged_number: string;
          users_id: string;
          first_photo: string;
        }
      | undefined;
  }>;
}

export const UserAlbum: UserAlbumType = {
  getMyAlbums: async () => {
    const response = await fetch("/api/user/albums", {
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    });
    let code = ResponseCode[response.status];
    let json = undefined;
    try {
      json = await response.json();
    } catch (error) {
      console.error(error);
      console.error(
        "The API query resulted with an unexpected body: Could not parse JSON"
      );
      code = ResponseCode[500];
      json = undefined;
    }
    return {
      responseCode: code,
      albums: json,
    };
  },
  createNewAlbum: async (body) => {
    const response = await fetch("/api/user/albums", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let code = ResponseCode[response.status];
    let json = undefined;
    try {
      json = await response.json();
    } catch (error) {
      console.error(error);
      console.error(
        "The API query resulted with an unexpected body: Could not parse JSON"
      );
      code = ResponseCode[500];
      json = undefined;
    }
    return {
      responseCode: code,
      album: json,
    };
  },
};
