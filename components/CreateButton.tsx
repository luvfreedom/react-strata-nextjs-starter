import React, {useState} from "react";
import { useStrataSdks } from "@strata-foundation/react";
import { SplTokenCollective } from "@strata-foundation/spl-token-collective";
import { PublicKey } from "@solana/web3.js";
import { Button } from "@chakra-ui/react";

export interface ITokenState {
  tokenRef?: PublicKey;
  tokenBonding?: PublicKey;
}

async function create(name: string, tick: string, tokenCollectiveSdk: SplTokenCollective): Promise<ITokenState> {
 var collective = new PublicKey("HRLfuZ1bmGKWMmHMensxvgBEeF4UtQtoXoH5p65fg2W6");
 var curve = new PublicKey("4GjUSeiRWnDAsw7QQauQ3V1W5ZrMeeuNerZkkehWYWL8");
var { ownerTokenRef, tokenBonding } = await tokenCollectiveSdk.createSocialToken({
  isPrimary: false, // Creates a social token explicitly associated with the collective by pda, instead of the wallet alone.
  collective,
  metadata: {
    name: name,
    symbol: tick,
    uri: "https://raw.githubusercontent.com/luvfreedom/strata-marketplace/master/json.json",
  },
  ignoreIfExists: true, // If a Social Token already exists for this wallet, ignore.
  tokenBondingParams: {
    curve,
    buyBaseRoyaltyPercentage: 5,
    buyTargetRoyaltyPercentage: 5,
    sellBaseRoyaltyPercentage: 5,
    sellTargetRoyaltyPercentage: 5
  }
});

//var tokenBondingAcct = await tokenBondingSdk.getTokenBonding(tokenBonding);
//var ownerTokenRefAcct = await tokenCollectiveSdk.getTokenRef(ownerTokenRef);
  return {
    tokenRef: ownerTokenRef,
    tokenBonding: tokenBonding!
  }
}

export function CreateButton({ setTokenState }: { setTokenState: (state: ITokenState) => void }) {
  const { tokenCollectiveSdk } = useStrataSdks();
  const [ name, setName ] = useState("<3 Freedom");;
  const [ tick, setTick ] = useState("FREE");
  function change(event: any) {    setName(event.target.value);  }
  function change2(event: any) {    setTick(event.target.value);  }

  return (<div><label>Hi there! I am an incredibly angry developer buried somewhere in the mountains plains or some other teeny tiny corner of the great white nonrth. I want to help. You&apos;re creating an I Love Freedom token - of your very own. Once it&apos;s created, it can be minted by anyone - whenever anyone buys, sells, mints or otherwise transfers your tokens in the future you will keep a 10% royalty on those transactions.<br />
  The name and symbol can be edited. <br /> Symbols are meant to be short, easy-to-remember letters for your longer name - like stock tickers (FB for Facebook, GOOGL for Google, MSFT for Microsoft.. etc)<br /></label><label>All of ths is happening on the Solana blockchain - you&apos;ll need a Solana wallet and some $SOL in order to pay the (minimal) fees for the transaction.</label><label>
         <br /> <br /> Name:
          <input type="text" value={name} onChange={change} />        </label>
          <label>
          Symbol:
          <input type="text" value={tick} onChange={change2} />        </label>
          <Button
    onClick={async () => {
      if (tokenCollectiveSdk) {
        setTokenState(await create(name, tick, tokenCollectiveSdk))
      }
    }}
  >
    Tokenize!
  </Button></div>)
}
