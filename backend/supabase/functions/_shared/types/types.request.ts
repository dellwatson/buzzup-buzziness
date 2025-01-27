export interface BaseResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface AuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
}
