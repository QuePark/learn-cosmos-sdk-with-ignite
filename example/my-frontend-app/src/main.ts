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
	apiURL: "http://seed-1.mainnet.rizon.world:1317",
	rpcURL: "http://seed-1.mainnet.rizon.world:26657",
	prefix: "rizon",
});

await client.useKeplr({
	chainName: "Rizon Testnet",
	stakeCurrency: {
		coinDenom: "AOTOLO",
		coinMinimalDenom: "uatolo",
		coinDecimals: 6,
	},
});

const account = await client.CosmosAuthV1Beta1.query.queryAccounts();

console.log(account);

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
