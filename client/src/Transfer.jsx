import { useState } from "react";
import server from "./server";

import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    // Ensure Private Key is valid
    if (privateKey.length == 64) {

      // Derive Address
      const publicKey = secp.getPublicKey(privateKey);
      const address = toHex(keccak256(publicKey.slice(1)).slice(-20));

      // Generate Transaction Message
      var message = { 'to': recipient, 'amount': parseInt(sendAmount) };
      var messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));

      // Sign Message and get Recovery Bit
      var [signature, recoveryBit] = secp.signSync(messageHash, privateKey, { recovered: true });

      console.log(signature);

      try {
        const {
          data: { balance },
        } = await server.post(`send`, {
          sender: address,
          signature: [signature, recoveryBit],
          message: message,
          amount: parseInt(sendAmount),
          recipient,
        });
        setBalance(balance);
      } catch (ex) {
        alert(ex.response.data.message);
      }
    }


  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}
export default Transfer;
