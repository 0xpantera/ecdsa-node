import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  return (
    <div className="app">
      <Wallet
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setAddress={setAddress}
        balance={balance}
        setBalance={setBalance}
      />
      <Transfer setBalance={setBalance} privateKey={privateKey} />
    </div>
  );
}

export default App;
