
import { DexService } from "./DexService";
import { TokenService } from "./TokenService";

export class TradeService {
  tokens: TokenService;
  dex: DexService;

  constructor() {
    this.tokens = new TokenService();
    this.dex = new DexService();
  }

  async init() {
    await this.tokens.getTokens();
  }
}
