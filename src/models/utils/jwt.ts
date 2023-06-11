export class JwtModel {
  private token: string;
  private refreshToken: string;

  /**
   * Constructor
   * @param token
   * @param refreshToken
   */
  constructor(token: string = null, refreshToken: string = null) {
    this.token = token;
    this.refreshToken = refreshToken;
  }

  public getToken(): string | null {
    return this.token;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  public setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
