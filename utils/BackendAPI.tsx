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
    data: { id: number; username: string; nickname: string; role: string };
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
        console.log(
          "Did receive unexpected body. Maybe backend api not reachable."
        );
        json = undefined;
      }
    }
    return {
      responseCode: code,
      data: json,
    };
  },
  getAllData: async () => {
    console.log("not implemented.");
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
