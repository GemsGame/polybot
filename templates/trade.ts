import { TradeService } from "../core/TradeService";
import { abi } from "../artifacts/contracts/BotV1.sol/BotV1.json";
import "dotenv/config";
const hre = require("hardhat");

const run = async () => {
  let attempt = 0;
  const provider = new hre.ethers.JsonRpcProvider(
    "https://rpc.ankr.com/polygon"
  );
  const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const botv1 = await hre.ethers.getContractAt(
    abi,
    process.env.CONTRACT_ADDRESS,
    wallet
  );

  const trade = new TradeService();
  await trade.init();

  const tokenIn = trade.tokens.filter(trade.tokens.list, [
    { field: "chainId", value: 137 },
    { field: "symbol", value: "USDT" },
  ]);

  const search = async () => {
    const routers = trade.dex.filter(trade.dex.list, [
      { field: "version", value: "v2" },
    ]);

    const dex0 = trade.dex.random(routers);
    const dex1 = trade.dex.random(routers);

    const tokensOut = trade.tokens.filter(trade.tokens.list, [
      { field: "chainId", value: 137 },
    ]);

    const tokenOut = trade.tokens.random(tokensOut);
    
    console.log(
      {
        dex0: dex0.dex,
        dex1: dex1.dex,
        tokenIn: 'USDT',
        tokenOut: tokenOut.name,
        attempt,
      }
    )
    try {
      await botv1.tradeV2(
        dex0.address,
        dex1.address,
        tokenIn[0].address,
        tokenOut.address,
        hre.ethers.parseUnits("1", tokenIn[0].decimals),
        "1",
        300
      );

    } catch (error: any) {
      return new Error(error);
    }
  };

  while (true) {
    attempt += 1;
    await search();
  }
};

run();
