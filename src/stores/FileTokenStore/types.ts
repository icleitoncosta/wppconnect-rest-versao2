export interface SessionToken {
    token: string;
    refuseCall: boolean;
    msgRefuseCall: string;
  }
  
  export interface TokenStore<T extends SessionToken = SessionToken> {
    getToken(sessionName: string): Promise<T | undefined> | T | undefined;
    setToken(
      sessionName: string,
      tokenData: T | null
    ): Promise<boolean> | boolean;
    removeToken(sessionName: string): Promise<boolean> | boolean;
    listTokens(): Promise<string[]> | string[];
  }
  