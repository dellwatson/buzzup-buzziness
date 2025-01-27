import { BaseResponse } from "../../_shared/types.ts";

export interface YoutubeAuthResponse extends BaseResponse {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface YoutubeUserProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
}
