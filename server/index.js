const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "139242bbccbaf31966f5a39a8d78b7f6231e48bf": 100,
  "8c4ad5c1521e35e3e2b3e4b4e548a2ac9cad0ed2": 50,
  "80c2be2b0ed971dba6584e484a535a0097907667": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, signature, message } = req.body;

  const sig = toHex(Uint8Array.from(Object.values(signature[0])));
  const recoveryBit = signature[1];

  const msgHash = keccak256(utf8ToBytes(JSON.stringify(message)));
  const recipient = message["to"];
  const amount = message["amount"];

  const recoverdPk = secp.recoverPublicKey(msgHash, sig, recoveryBit);
  console.log('Recovered PK:', toHex(recoverdPk));
  
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
