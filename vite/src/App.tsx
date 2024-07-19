import { FC, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Contract, JsonRpcSigner, ethers } from "ethers";
import { Switch } from "@chakra-ui/react";
// Fultime Scam investor
const App: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [isMintingEnabled, setIsMintingEnabled] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<string>("");
  const [mint, setMint] = useState<string>("");
  const [contract, setContract] = useState<Contract | null>();

  const abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_symbol",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_totalSupply",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "_isMintingEnabled",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "allowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSpender",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_address",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "mintAmount",
          type: "uint256",
        },
      ],
      name: "Mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const abc = () => {
    console.log(1);
  };

  const abc2 = () => {
    console.log(1);
  };

  const getSigner = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    setSigner(await provider.getSigner());
  };

  const onClickMetamask = async () => {
    try {
      getSigner();
    } catch (error) {
      console.error(error);
    }
  };

  const onClicMint = async () => {
    try {
      setContract(new Contract(deployedAddress, abi, signer));
      const response = await contract?.Mint(
        deployedAddress,
        parseInt(mint, 10)
      );
      await response.wait();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = () => {
    console.log(!isMintingEnabled);
    setIsMintingEnabled(!isMintingEnabled);
  };

  const handleDeployContract = async () => {
    try {
      const contractFactory = new ethers.ContractFactory(
        abi,
        "608060405234801561000f575f80fd5b506040516118b63803806118b6833981810160405281019061003191906104da565b83838160039081610042919061077a565b508060049081610052919061077a565b505050610065338361008760201b60201c565b8060055f6101000a81548160ff0219169083151502179055505050505061095e565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036100f7575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016100ee9190610888565b60405180910390fd5b6101085f838361010c60201b60201c565b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361015c578060025f82825461015091906108ce565b9250508190555061022a565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050818110156101e5578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016101dc93929190610910565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610271578060025f82825403925050819055506102bb565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516103189190610945565b60405180910390a3505050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6103848261033e565b810181811067ffffffffffffffff821117156103a3576103a261034e565b5b80604052505050565b5f6103b5610325565b90506103c1828261037b565b919050565b5f67ffffffffffffffff8211156103e0576103df61034e565b5b6103e98261033e565b9050602081019050919050565b8281835e5f83830152505050565b5f610416610411846103c6565b6103ac565b9050828152602081018484840111156104325761043161033a565b5b61043d8482856103f6565b509392505050565b5f82601f83011261045957610458610336565b5b8151610469848260208601610404565b91505092915050565b5f819050919050565b61048481610472565b811461048e575f80fd5b50565b5f8151905061049f8161047b565b92915050565b5f8115159050919050565b6104b9816104a5565b81146104c3575f80fd5b50565b5f815190506104d4816104b0565b92915050565b5f805f80608085870312156104f2576104f161032e565b5b5f85015167ffffffffffffffff81111561050f5761050e610332565b5b61051b87828801610445565b945050602085015167ffffffffffffffff81111561053c5761053b610332565b5b61054887828801610445565b935050604061055987828801610491565b925050606061056a878288016104c6565b91505092959194509250565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806105c457607f821691505b6020821081036105d7576105d6610580565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026106397fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826105fe565b61064386836105fe565b95508019841693508086168417925050509392505050565b5f819050919050565b5f61067e61067961067484610472565b61065b565b610472565b9050919050565b5f819050919050565b61069783610664565b6106ab6106a382610685565b84845461060a565b825550505050565b5f90565b6106bf6106b3565b6106ca81848461068e565b505050565b5b818110156106ed576106e25f826106b7565b6001810190506106d0565b5050565b601f82111561073257610703816105dd565b61070c846105ef565b8101602085101561071b578190505b61072f610727856105ef565b8301826106cf565b50505b505050565b5f82821c905092915050565b5f6107525f1984600802610737565b1980831691505092915050565b5f61076a8383610743565b9150826002028217905092915050565b61078382610576565b67ffffffffffffffff81111561079c5761079b61034e565b5b6107a682546105ad565b6107b18282856106f1565b5f60209050601f8311600181146107e2575f84156107d0578287015190505b6107da858261075f565b865550610841565b601f1984166107f0866105dd565b5f5b82811015610817578489015182556001820191506020850194506020810190506107f2565b868310156108345784890151610830601f891682610743565b8355505b6001600288020188555050505b505050505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61087282610849565b9050919050565b61088281610868565b82525050565b5f60208201905061089b5f830184610879565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6108d882610472565b91506108e383610472565b92508282019050808211156108fb576108fa6108a1565b5b92915050565b61090a81610472565b82525050565b5f6060820190506109235f830186610879565b6109306020830185610901565b61093d6040830184610901565b949350505050565b5f6020820190506109585f830184610901565b92915050565b610f4b8061096b5f395ff3fe608060405234801561000f575f80fd5b506004361061009c575f3560e01c8063313ce56711610064578063313ce5671461015857806370a082311461017657806395d89b41146101a6578063a9059cbb146101c4578063dd62ed3e146101f45761009c565b806306fdde03146100a0578063095ea7b3146100be5780630f6798a5146100ee57806318160ddd1461010a57806323b872dd14610128575b5f80fd5b6100a8610224565b6040516100b59190610b5c565b60405180910390f35b6100d860048036038101906100d39190610c0d565b6102b4565b6040516100e59190610c65565b60405180910390f35b61010860048036038101906101039190610c0d565b6102d6565b005b610112610332565b60405161011f9190610c8d565b60405180910390f35b610142600480360381019061013d9190610ca6565b61033b565b60405161014f9190610c65565b60405180910390f35b610160610369565b60405161016d9190610d11565b60405180910390f35b610190600480360381019061018b9190610d2a565b610371565b60405161019d9190610c8d565b60405180910390f35b6101ae6103b6565b6040516101bb9190610b5c565b60405180910390f35b6101de60048036038101906101d99190610c0d565b610446565b6040516101eb9190610c65565b60405180910390f35b61020e60048036038101906102099190610d55565b610468565b60405161021b9190610c8d565b60405180910390f35b60606003805461023390610dc0565b80601f016020809104026020016040519081016040528092919081815260200182805461025f90610dc0565b80156102aa5780601f10610281576101008083540402835291602001916102aa565b820191905f5260205f20905b81548152906001019060200180831161028d57829003601f168201915b5050505050905090565b5f806102be6104ea565b90506102cb8185856104f1565b600191505092915050565b60055f9054906101000a900460ff16610324576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031b90610e3a565b60405180910390fd5b61032e8282610503565b5050565b5f600254905090565b5f806103456104ea565b9050610352858285610582565b61035d858585610614565b60019150509392505050565b5f6012905090565b5f805f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b6060600480546103c590610dc0565b80601f01602080910402602001604051908101604052809291908181526020018280546103f190610dc0565b801561043c5780601f106104135761010080835404028352916020019161043c565b820191905f5260205f20905b81548152906001019060200180831161041f57829003601f168201915b5050505050905090565b5f806104506104ea565b905061045d818585610614565b600191505092915050565b5f60015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b5f33905090565b6104fe8383836001610704565b505050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610573575f6040517fec442f0500000000000000000000000000000000000000000000000000000000815260040161056a9190610e67565b60405180910390fd5b61057e5f83836108d3565b5050565b5f61058d8484610468565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461060e57818110156105ff578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016105f693929190610e80565b60405180910390fd5b61060d84848484035f610704565b5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610684575f6040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260040161067b9190610e67565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036106f4575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016106eb9190610e67565b60405180910390fd5b6106ff8383836108d3565b505050565b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610774575f6040517fe602df0500000000000000000000000000000000000000000000000000000000815260040161076b9190610e67565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107e4575f6040517f94280d620000000000000000000000000000000000000000000000000000000081526004016107db9190610e67565b60405180910390fd5b8160015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f208190555080156108cd578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516108c49190610c8d565b60405180910390a35b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610923578060025f8282546109179190610ee2565b925050819055506109f1565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050818110156109ac578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016109a393929190610e80565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a38578060025f8282540392505081905550610a82565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610adf9190610c8d565b60405180910390a3505050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610b2e82610aec565b610b388185610af6565b9350610b48818560208601610b06565b610b5181610b14565b840191505092915050565b5f6020820190508181035f830152610b748184610b24565b905092915050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610ba982610b80565b9050919050565b610bb981610b9f565b8114610bc3575f80fd5b50565b5f81359050610bd481610bb0565b92915050565b5f819050919050565b610bec81610bda565b8114610bf6575f80fd5b50565b5f81359050610c0781610be3565b92915050565b5f8060408385031215610c2357610c22610b7c565b5b5f610c3085828601610bc6565b9250506020610c4185828601610bf9565b9150509250929050565b5f8115159050919050565b610c5f81610c4b565b82525050565b5f602082019050610c785f830184610c56565b92915050565b610c8781610bda565b82525050565b5f602082019050610ca05f830184610c7e565b92915050565b5f805f60608486031215610cbd57610cbc610b7c565b5b5f610cca86828701610bc6565b9350506020610cdb86828701610bc6565b9250506040610cec86828701610bf9565b9150509250925092565b5f60ff82169050919050565b610d0b81610cf6565b82525050565b5f602082019050610d245f830184610d02565b92915050565b5f60208284031215610d3f57610d3e610b7c565b5b5f610d4c84828501610bc6565b91505092915050565b5f8060408385031215610d6b57610d6a610b7c565b5b5f610d7885828601610bc6565b9250506020610d8985828601610bc6565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680610dd757607f821691505b602082108103610dea57610de9610d93565b5b50919050565b7f72657665727400000000000000000000000000000000000000000000000000005f82015250565b5f610e24600683610af6565b9150610e2f82610df0565b602082019050919050565b5f6020820190508181035f830152610e5181610e18565b9050919050565b610e6181610b9f565b82525050565b5f602082019050610e7a5f830184610e58565b92915050565b5f606082019050610e935f830186610e58565b610ea06020830185610c7e565b610ead6040830184610c7e565b949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610eec82610bda565b9150610ef783610bda565b9250828201905080821115610f0f57610f0e610eb5565b5b9291505056fea26469706673582212200f7aac112535706ae9362c1fd58619e60ad7cf8a2de4fc18274d45b17731583d64736f6c63430008190033",
        signer
      );

      const deployedContract = await contractFactory.deploy(
        name,
        symbol,
        parseInt(totalSupply, 10),
        isMintingEnabled
      );
      console.log(deployedContract);

      const address = await deployedContract.getAddress();
      setDeployedAddress(address);
      console.log(address);
      console.log(name, symbol);
      console.log(isMintingEnabled);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex maxW="100%" flexDir="column">
      <Text>{signer?.address}</Text>
      <Text>{signer?.address}</Text>
      <Button onClick={onClickMetamask}>test</Button>
      <Button onClick={onClickMetamask}>지갑 연결</Button>
      <Button onClick={handleDeployContract}>컨트랙트 생성</Button>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      <Input
        value={totalSupply}
        onChange={(e) => setTotalSupply(e.target.value)}
      />
      {isMintingEnabled && (
        <Flex>
          <Input value={mint} onChange={(e) => setMint(e.target.value)} />
          <Input value={deployedAddress} />
          <Button onClick={onClicMint}>추가 민트</Button>
        </Flex>
      )}

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          mint
        </FormLabel>
        <Switch
          id="email-alerts"
          isChecked={isMintingEnabled}
          onChange={handleToggle}
        />
      </FormControl>
    </Flex>
  );
};

export default App;
