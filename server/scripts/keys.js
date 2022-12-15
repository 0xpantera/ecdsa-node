const { toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
console.log('Private Key:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log('Public Key', toHex(publicKey));

const ethAddress = keccak256(publicKey.slice(1)).slice(-20);
console.log('Eth address', toHex(ethAddress));

/*
Private Key: e8f0a9e204b65eabfda16af62029f9b3e6c7a6678f9a67f32d37d78664f0c3c7
Public Key 04c2c3a4a22054b56ca998a29850665a18344fa1c4a794c385bd0e9ea0b7fb37d466125cbb579f4295e23ac17ed381003f7ca93e93adb1c5439e28c513b0e4e0f1
Eth address 139242bbccbaf31966f5a39a8d78b7f6231e48bf

Private Key: 3c5095bcbb852418bd9d06bb2fce19ff428e57dc3a6d76aac3d683df91ef04c4
Public Key 046ee320bd3c0f6e371a59156039dacd94d9385d3dfaa1be738db406f621907a16bd79578639e5981e004f05f84e009a8d8cc6de26d7a28aee7a46c3075e43bf8a
Eth address 8c4ad5c1521e35e3e2b3e4b4e548a2ac9cad0ed2

Private Key: 246d0e3e15b4b9d052d4b5751eed2410f4f0b77f810c3422064b44ae013cea70
Public Key 04c571c29d14b3833c2eacdd41a4d7a28cab1dbcb563a185a4414143a6a2fc381cb9973c0455329dad6b3e55ac405d2616ee37da9b09599c98aac969b2ff587423
Eth address 80c2be2b0ed971dba6584e484a535a0097907667
*/