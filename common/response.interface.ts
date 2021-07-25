export enum ResponseType {
  Error = "error",
  Success = "success"
};

export interface Response {
  type: ResponseType,
  message?: string,
  data?: Object
}

