export type AuthUser = {
  id: number;
  username: string;
};

export type AuthUserResponse = {
  user: AuthUser;
};

export type ApiErrorBody = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | string[];
};

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}
