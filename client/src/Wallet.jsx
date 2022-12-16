import server from "./server";

import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";


function Wallet({ privateKey, setPrivateKey, setAddress, balance, setBalance, }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    // Ensure Private Key is valid
    if (privateKey.length == 64) {
      // Derive Address
      const publicKey = secp.getPublicKey(privateKey);
      const address = toHex(keccak256(publicKey.slice(1)).slice(-20));

      setAddress(address);
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }

    } else {
      setBalance(0);
    }


  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Insert a valid Private Key" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
