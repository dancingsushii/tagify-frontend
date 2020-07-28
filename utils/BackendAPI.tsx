//=============================================================================
// ___  ____ ____ _ _  _ _ ___ _ ____ _  _ ____
// |  \ |___ |___ | |\ | |  |  | |  | |\ | [__
// |__/ |___ |    | | \| |  |  | |__| | \| ___]

export enum ResponseCode {
  "Ok" = 200,
  "BadRequest" = 400,
  "Unauthorized" = 401,
  "NotFound" = 404,
  "InternalServerError" = 500,
}

export enum Status {
  Ok = "Ok",
  BadRequest = "BadRequest",
  Unauthorized = "Unauthorized",
  NotFound = "NotFound",
  InternalServerError = "InternalServerError",
  Unknown = "Unknown",
}

function getStatus(code: number): Status {
  switch (code) {
    case 200:
      return Status.Ok;
    case 400:
      return Status.BadRequest;
    case 401:
      return Status.Unauthorized;
    case 404:
      return Status.NotFound;
    case 500:
      return Status.InternalServerError;
    default:
      return Status.Unknown;
  }
}

export enum UserRole {
  User = "user",
  Admin = "admin",
}

export interface MinimalResponse {
  status: Status;
}

export interface Response<T> {
  status: Status;
  data: T;
}

export interface UserInformation {
  id: number;
  username: string;
  nickname: string;
  role: UserRole;
}

export interface AlbumPreview {
  albums: Array<{
    id: number;
    title: string;
    description: string;
    first_photo: number;
  }>;
}

export interface AlbumInformation {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image_number: number;
  tagged_number: number;
  users_id: number;
  first_photo: number;
}

export const EmptyAlbumInformation: AlbumInformation = {
  id: 0,
  title: "",
  description: "",
  tags: [],
  image_number: 0,
  tagged_number: 0,
  users_id: 0,
  first_photo: 0,
};

export interface PhotoInformation {
  id: number;
  file_path: string;
}

export interface TagPhotoInformation {
  id: number;
  file_path: string;
  tagged: boolean;
  tag: string;
  timestamp: string;
  coordinates: string;
}

//=============================================================================
// ___ ____ _  _ ____ _  _
//  |  |  | |_/  |___ |\ |
//  |  |__| | \_ |___ | \|

class BackendToken {
  authenticated: boolean;
  userRole: UserRole | undefined;
  nickname: string;

  constructor() {
    this.authenticated = false;
    this.userRole = undefined;
    this.nickname = "";
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

//=============================================================================
// _  _ ____ _    ___  ____ ____
// |__| |___ |    |__] |___ |__/
// |  | |___ |___ |    |___ |  \

/**
 * Basic funtion to extract response code and convert json data of response
 * to js object literal if expected.
 *
 * @param response          response object
 * @param expectsResponse   response data expected? (default=false)
 *
 * @returns Object literal containing:
 *            * response code
 *            * object literal of response data, if expected
 */
async function handleResponse(
  response: globalThis.Response,
  expectsResponse: boolean = false
): Promise<Response<any>> {
  let status = getStatus(response.status);
  let json = undefined;
  if (expectsResponse && status == Status.Ok) {
    try {
      json = await response.json();
    } catch (error) {
      console.error(error);
      console.error(
        "The API query resulted with an unexpected body: Could not parse JSON: " +
          "You most probably run the website with 'npm run serve-frontend': " +
          "Use 'npm run serve-backend' instead."
      );
      status = Status.InternalServerError;
      json = undefined;
    }
  }
  return {
    status: status,
    data: json,
  };
}

interface INIT_GET {
  endpoint: string;
}

async function do_GET(init: INIT_GET): Promise<Response<any>> {
  const response = await fetch(init.endpoint, {
    method: "GET",
    credentials: "same-origin",
  });
  return handleResponse(response, true);
}

interface INIT_DELETE {
  endpoint: string;
}

async function do_DELETE(init: INIT_DELETE): Promise<Response<any>> {
  const response = await fetch(init.endpoint, {
    method: "DELETE",
    credentials: "same-origin",
  });
  return handleResponse(response);
}

interface INIT_POST {
  endpoint: string;
  body?: any;
  type?: string;
  expectsResponse?: boolean;
}

const INIT_POST_DEFAULT = {
  expectsResponse: true,
};

async function do_POST(init: INIT_POST): Promise<Response<any>> {
  let options = { ...INIT_POST_DEFAULT, ...init };
  let _init: RequestInit = {
    method: "POST",
    credentials: "same-origin",
  };
  if (options.type) _init.headers = { "Content-Type": options.type };
  if (options.body && options.type === "application/json")
    _init.body = JSON.stringify(options.body);
  else _init.body = options.body;
  const response = await fetch(options.endpoint, _init);
  return handleResponse(response, options.expectsResponse);
}

interface INIT_PUT {
  endpoint: string;
  body?: any;
  type?: string;
  expectsResponse?: boolean;
}

const INIT_PUT_DEFAULT = {
  expectsResponse: true,
};

async function do_PUT(init: INIT_PUT): Promise<Response<any>> {
  let options = { ...INIT_PUT_DEFAULT, ...init };
  let _init: RequestInit = {
    method: "PUT",
    credentials: "same-origin",
  };
  if (options.type) _init.headers = { "Content-Type": options.type };
  if (options.body && options.type === "application/json")
    _init.body = JSON.stringify(options.body);
  else _init.body = options.body;
  const response = await fetch(options.endpoint, _init);
  return handleResponse(response, options.expectsResponse);
}

//=============================================================================
// ___  ____ ____ ____ _  _ _    ___
// |  \ |___ |___ |__| |  | |     |
// |__/ |___ |    |  | |__| |___  |

interface DefaultType {
  login(body: {
    username: string;
    password: string;
  }): Promise<Response<UserInformation>>;
  getUser(): Promise<Response<UserInformation>>;
  status(): Promise<MinimalResponse>;
}

export const Default: DefaultType = {
  login: async (body) =>
    do_POST({
      endpoint: "/api/login",
      body: body,
      type: "application/json",
    }),
  getUser: async () => {
    let response = await do_GET({ endpoint: "/api/user/me" });
    if (response.status != Status.Ok || response.data === undefined) {
      response = await do_GET({ endpoint: "/api/admin/me" });
    }
    return response;
  },
  status: async () =>
    do_GET({
      endpoint: "/api/status",
    }),
};

//=============================================================================
// _  _ ____ ____ ____
// |  | [__  |___ |__/
// |__| ___] |___ |  \

interface UserType {
  logout(): Promise<MinimalResponse>;
  getUser(): Promise<Response<UserInformation>>;
  getAllData(): Promise<MinimalResponse>; // TODO
  updateNick(body: { nickname: string }): Promise<MinimalResponse>;
  updatePassword(body: { password: string }): Promise<MinimalResponse>;
  deleteAccout(): Promise<MinimalResponse>;
}

export const User: UserType = {
  logout: async () =>
    do_POST({
      endpoint: "/api/user/logout",
      expectsResponse: false,
    }),
  getUser: async () => do_GET({ endpoint: "/api/user/me" }),
  getAllData: async () => {
    console.error("not implemented.");
    return { status: Status.Unknown };
  },
  updateNick: async (body) =>
    do_PUT({
      endpoint: "/api/user/me",
      body: body,
      type: "application/json",
      expectsResponse: false,
    }),
  updatePassword: async (body) =>
    do_PUT({
      endpoint: "/api/user/me/password",
      body: body,
      type: "application/json",
      expectsResponse: false,
    }),
  deleteAccout: async () => do_DELETE({ endpoint: "/api/user/me" }),
};

//=============================================================================
// ____ _    ___  _  _ _  _
// |__| |    |__] |  | |\/|
// |  | |___ |__] |__| |  |

interface AlbumType {
  getAllAlbums(): Promise<Response<AlbumPreview>>;
  getAlbum(id: string): Promise<Response<AlbumInformation>>;
  getAlbumPhotos(
    albumId: string,
    rangeIndex: string
  ): Promise<Response<Array<PhotoInformation>>>;
  searchAlbums(query: string): Promise<Response<AlbumPreview>>;
}

export const Albums: AlbumType = {
  getAllAlbums: async () => do_GET({ endpoint: "/api/albums" }),
  getAlbum: async (id) => do_GET({ endpoint: `/api/albums/${id}` }),
  getAlbumPhotos: async (albumId, rangeIndex) =>
    do_GET({ endpoint: `/api/albums/${albumId}/photos/${rangeIndex}` }),
  searchAlbums: async (query) =>
    do_GET({ endpoint: `/api/albums/search/${query}` }),
};

//=============================================================================
// _  _ ____ ____ ____    ____ _    ___  _  _ _  _
// |  | [__  |___ |__/ __ |__| |    |__] |  | |\/|
// |__| ___] |___ |  \    |  | |___ |__] |__| |  |

interface UserAlbumType {
  getMyAlbums(): Promise<Response<Array<AlbumInformation>>>;
  createNewAlbum(body: {
    title: string;
    description: string;
    tags: string[];
  }): Promise<Response<AlbumInformation>>;
  updateAlbum(
    albumId: string | number,
    body: {
      title: string;
      description: string;
    }
  ): Promise<MinimalResponse>;
  deleteOwnAlbum(albumId: string): Promise<MinimalResponse>;
}

export const UserAlbum: UserAlbumType = {
  getMyAlbums: async () => do_GET({ endpoint: "/api/user/albums" }),
  createNewAlbum: async (body) =>
    do_POST({
      endpoint: "/api/user/albums",
      body: body,
      type: "application/json",
    }),
  updateAlbum: async (albumId, body) =>
    do_PUT({
      endpoint: `/api/user/albums/${albumId}`,
      body: body,
      type: "application/json",
    }),
  deleteOwnAlbum: async (albumId) =>
    do_DELETE({ endpoint: `/api/user/albums/${albumId}` }),
};

//=============================================================================
// _  _ ____ ____ ____    ___  _  _ ____ ___ ____
// |  | [__  |___ |__/ __ |__] |__| |  |  |  |  |
// |__| ___] |___ |  \    |    |  | |__|  |  |__|

interface UserPhotoType {
  addPhotoToAlbum(albumId: string, body: FormData): Promise<MinimalResponse>;
  replacePhotoInAlbum(
    albumId: string,
    photoId: string,
    body: FormData
  ): Promise<MinimalResponse>;
  deletePhotoFromAlbum(
    albumId: string,
    photoId: string
  ): Promise<MinimalResponse>;
}

export const UserPhoto: UserPhotoType = {
  addPhotoToAlbum: async (albumId, body) =>
    do_POST({
      endpoint: `/api/user/albums/${albumId}/photos`,
      body: body,
      expectsResponse: false,
    }),
  replacePhotoInAlbum: async (albumId, photoId, body) =>
    do_PUT({
      endpoint: `/api/user/albums/${albumId}/photos/${photoId}`,
      body: body,
      expectsResponse: false,
    }),
  deletePhotoFromAlbum: async (albumId, photoId) =>
    do_DELETE({
      endpoint: `/api/user/albums/${albumId}/photos/${photoId}`,
    }),
};

//=============================================================================
// _  _ ____ ____ ____    ___ ____ ____
// |  | [__  |___ |__/ __  |  |__| | __
// |__| ___] |___ |  \     |  |  | |__]

interface UserTagType {
  getLockPhotos(albumId: string): Promise<Response<TagPhotoInformation>>;
  verifyPhoto(
    photoId: string,
    body: { verified: boolean }
  ): Promise<MinimalResponse>;
  tagPhoto(
    photoId: string,
    body: { tag: string; coordinates: string }
  ): Promise<MinimalResponse>;
}

export const UserTag: UserTagType = {
  getLockPhotos: async (albumId) =>
    do_GET({
      endpoint: `/api/user/tag/${albumId}`,
    }),
  verifyPhoto: async (photoId, body) =>
    do_PUT({
      endpoint: `/api/user/tag/verify/${photoId}`,
      body: body,
      type: "application/json",
      expectsResponse: false,
    }),
  tagPhoto: async (photoId, body) =>
    do_PUT({
      endpoint: `/api/user/tag/action/${photoId}`,
      body: body,
      type: "application/json",
      expectsResponse: false,
    }),
};

//=============================================================================
// ____ ___  _  _ _ _  _
// |__| |  \ |\/| | |\ |
// |  | |__/ |  | | | \|

interface AdminType {
  logout(): Promise<MinimalResponse>;
  getUser(): Promise<Response<UserInformation>>;
}

export const Admin: AdminType = {
  logout: async () =>
    do_POST({
      endpoint: "/api/admin/logout",
      expectsResponse: false,
    }),
  getUser: async () => do_GET({ endpoint: "/api/admin/me" }),
};

//=============================================================================
// ____ ___  _  _ _ _  _    _  _ ____ ____ ____
// |__| |  \ |\/| | |\ | __ |  | [__  |___ |__/
// |  | |__/ |  | | | \|    |__| ___] |___ |  \

interface AdminUserType {
  getAllUsers(): Promise<Response<Array<UserInformation>>>;
  // getUser(id): Promise<Response<UserInformation>>;
  createUser(body: {
    username: string;
    nickname: string;
    password: string;
    role: String;
  }): Promise<
    Response<{
      id: number;
      username: string;
      nickname: string;
      password: string;
      role: string;
    }>
  >;
  deleteUser(id: number): Promise<MinimalResponse>;
}

export const AdminUser: AdminUserType = {
  getAllUsers: async () =>
    do_GET({
      endpoint: "/api/admin/users",
    }),
  createUser: async (body) =>
    do_POST({
      endpoint: "/api/admin/users",
      body: body,
      type: "application/json",
    }),
  deleteUser: async (id) =>
    do_DELETE({
      endpoint: `/api/admin/user/${id}`,
    }),
};

//=============================================================================
// ____ ___  _  _ _ _  _    ____ _    ___  _  _ _  _
// |__| |  \ |\/| | |\ | __ |__| |    |__] |  | |\/|
// |  | |__/ |  | | | \|    |  | |___ |__] |__| |  |

interface AdminAlbumType {
  updateAlbum(
    albumId: string,
    body: {
      title: string;
      description: string;
    }
  ): Promise<Response<MinimalResponse>>;
  deleteAlbum(albumId: string): Promise<Response<MinimalResponse>>;
}

export const AdminAlbum: AdminAlbumType = {
  updateAlbum: async (albumId, body) =>
    do_PUT({
      endpoint: `/api/admin/albums/${albumId}`,
      body: body,
      expectsResponse: false,
    }),
  deleteAlbum: async (albumId) =>
    do_DELETE({
      endpoint: `/api/admin/albums/${albumId}`,
    }),
};
