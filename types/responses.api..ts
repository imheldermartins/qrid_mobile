import { AxiosError } from "axios";

namespace API_RESPONSES {
  type ERROR_RESPONSE = {
    detail: string;
  };

  export type JWTResponse = {
    access: string;
    refresh: string;
  };

  export type RequestError = AxiosError<ERROR_RESPONSE>;
}

export default API_RESPONSES;
