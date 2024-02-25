import { DataUtils } from "./DataUtils";

export interface Token {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  extensions: object;
}

export class TokenService extends DataUtils<Token>{
  list: Token[];

  constructor() {
    super();
    this.list = [];
  }

  async getTokens() {
    try {
      const response = await fetch(
        "https://gateway.ipfs.io/ipns/tokens.uniswap.org"
      );
      const data = await response.json();
      const tokensData: { tokens: Token[] } = data as { tokens: Token[] };
      this.list = tokensData.tokens;
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  }
}
