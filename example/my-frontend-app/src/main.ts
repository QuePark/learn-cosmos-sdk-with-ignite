import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter";
import { Client } from "../../ts-client/";
// import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

// const mnemonic =
// "play butter frown city voyage pupil rabbit wheat thrive mind skate turkey helmet thrive door either differ gate exhibit impose city swallow goat faint";
// const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
// const [{ address }] = await wallet.getAccounts();

const client = new Client({
	apiURL: "http://localhost:1317",
	rpcURL: "http://localhost:26657",
	prefix: "cosmos",
});

// const txResult = await client.CosmosBankV1Beta1.tx.sendMsgSend({
// 	value: {
// 		amount: [
// 			{
// 				amount: "200",
// 				denom: "token",
// 			},
// 		],
// 		fromAddress: address,
// 		toAddress: "cosmos15uw6qpxqs6zqh0zp3ty2ac29cvnnzd3qwjntnc",
// 	},
// 	fee: {
// 		amount: [{ amount: "0", denom: "stake" }],
// 		gas: "200000",
// 	},
// 	memo: "Hello world",
// });

// console.log("txResult", txResult);

// const balances = await client.CosmosBankV1Beta1.query.queryAllBalances("cosmos13xkhcx2dquhqdml0k37sr7yndquwteuvt2cml7");
// console.log(balances.data.balances);

await client.useKeplr().then(async () => {
	const { keplr } = client.signer;
	console.log("keplr", keplr);
	const chainInfos = await keplr.getChainInfosWithoutEndpoints();
	console.log(chainInfos);
	if (chainInfos.filter((x) => x.chainId === "groot-16").length === 0) {
		const obj = Object.assign({}, chainInfos[0]);
		const groot16 = {
			...obj,
			chainId: "groot-16",
			chainName: "RIZON TestNet",
			currencies: [
				{
					coinDenom: "ATOLO",
					coinMinimalDenom: "uatolo",
					coinDecimals: 6,
					coinGeckoId: "rizon",
				},
			],
			feeCurrencies: [
				{
					coinDenom: "ATOLO",
					coinMinimalDenom: "uatolo",
					coinDecimals: 6,
					coinGeckoId: "rizon",
					gasPriceStep: {
						low: 0.0025,
						average: 0.025,
						high: 0.04,
					},
				},
			],
			features: [
				"stargate",
				"ibc-transfer",
				"no-legacy-stdTx",
				"no-legacy-stdTx",
				"ibc-go",
				"query:/cosmos/bank/v1beta1/spendable_balances",
			],
			rpc: "http://seed-1.mainnet.rizon.world:26657/",
		};
		keplr.experimentalSuggestChain(groot16);
	}
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
