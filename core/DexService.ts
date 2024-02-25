import { DataUtils } from "./DataUtils";

export interface DEX {
  dex: string;
  version: string;
  network: number;
  address: string;
}
export class DexService extends DataUtils<DEX> {
  list: DEX[];

  constructor() {
    super();
    this.list = [
      {
        dex: "SushiSwap",
        version: "v2",
        network: 137,
        address: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
      },
      {
        dex: "Uniswap",
        version: "v2",
        network: 137,
        address: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
      },

      {
        dex: "Frax",
        version: "v2",
        network: 137,
        address: "0xE52D0337904D4D0519EF7487e707268E1DB6495F",
      },

      {
        dex: "Quickswap Dex",
        version: "v2",
        network: 137,
        address: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
      },

      {
        dex: "ape",
        version: "v2",
        network: 137,
        address: "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607",
      },

      {
        dex: "dfyn",
        version: "v2",
        network: 137,
        address: "0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429",
      },

      {
        dex: "honey",
        version: "v2",
        network: 137,
        address: "0xaD340d0CD0B117B0140671E7cB39770e7675C848",
      },

      {
        dex: "elk",
        version: "v2",
        network: 137,
        address: "0xf38a7A7Ac2D745E2204c13F824c00139DF831FFf",
      },

      {
        dex: "jetswap",
        version: "v2",
        network: 137,
        address: "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923",
      },

      {
        dex: "polycat",
        version: "v2",
        network: 137,
        address: "0x94930a328162957FF1dd48900aF67B5439336cBD",
      },

      {
        dex: "polymm",
        version: "v2",
        network: 137,
        address: "0x51aba405de2b25e5506dea32a6697f450ceb1a17",
      },
    ];
  }
}
