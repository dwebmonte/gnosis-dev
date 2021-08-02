"use strict";
env.pages.contracts_demo = {

props: {
	
	method: { type: String },
	entity: { type: String },
	view: { type: String, default: "card" },

},	


// ~~~~~~~~~~~~~~~~~~~~~~				data
data: function () {
	return {
		//web3: undefined,
	
		//eth_key: '1TSEZZWRAPE332SGK4TPU7NYDSX71W2AD4',
		address1: '0x84e30B7A76e88348f044F8844017011BceB902a6',
		address1_pk: 'dcebe6f966bbab5f1c1b14a09815a388aa39cf80c72794f3556015a7926ad8e5',
		address2: '0xe1d225c9D8c62Fcb3ecc98765f41e697C67947Ff',
		
		
		
		abi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}],
		contract_address: '0x20d3eB6E80b82540B60094951219b27440760F16',
		// адрес развернутого контракта - 0x011ccf3c31b51e71137f4afaae6e899c60ac25d4
		

		gasLimit: 1000000,
		gasPrice: 10,
		sum_send: 1000,
		txHash: '',
		
		balance1: "",
		balance2: "",
		
		/*
		data: '0x60806040526040805190810160405280600a81526020017f4441707020546f6b656e000000000000000000000000000000000000000000008152506000908051906020019061004f92919061014e565b506040805190810160405280600481526020017f44415050000000000000000000000000000000000000000000000000000000008152506001908051906020019061009b92919061014e565b506040805190810160405280600f81526020017f4441707020546f6b656e2076312e300000000000000000000000000000000000815250600290805190602001906100e792919061014e565b503480156100f457600080fd5b506000620f4240905080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600381905550506101f3565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061018f57805160ff19168380011785556101bd565b828001600101855582156101bd579182015b828111156101bc5782518255916020019190600101906101a1565b5b5090506101ca91906101ce565b5090565b6101f091905b808211156101ec5760008160009055506001016101d4565b5090565b90565b610b99806102026000396000f300608060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde031461009e578063095ea7b31461012e57806318160ddd1461019357806323b872dd146101be5780635a3b7e421461024357806370a08231146102d357806395d89b411461032a578063a9059cbb146103ba578063dd62ed3e1461041f575b600080fd5b3480156100aa57600080fd5b506100b3610496565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100f35780820151818401526020810190506100d8565b50505050905090810190601f1680156101205780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561013a57600080fd5b50610179600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610534565b604051808215151515815260200191505060405180910390f35b34801561019f57600080fd5b506101a8610626565b6040518082815260200191505060405180910390f35b3480156101ca57600080fd5b50610229600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061062c565b604051808215151515815260200191505060405180910390f35b34801561024f57600080fd5b5061025861089b565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561029857808201518184015260208101905061027d565b50505050905090810190601f1680156102c55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156102df57600080fd5b50610314600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610939565b6040518082815260200191505060405180910390f35b34801561033657600080fd5b5061033f610951565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561037f578082015181840152602081019050610364565b50505050905090810190601f1680156103ac5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156103c657600080fd5b50610405600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109ef565b604051808215151515815260200191505060405180910390f35b34801561042b57600080fd5b50610480600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b48565b6040518082815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561052c5780601f106105015761010080835404028352916020019161052c565b820191906000526020600020905b81548152906001019060200180831161050f57829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60035481565b6000600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561067c57600080fd5b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561070757600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555081600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109315780601f1061090657610100808354040283529160200191610931565b820191906000526020600020905b81548152906001019060200180831161091457829003601f168201915b505050505081565b60046020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109e75780601f106109bc576101008083540402835291602001916109e7565b820191906000526020600020905b8154815290600101906020018083116109ca57829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a3f57600080fd5b81600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60056020528160005260406000206020528060005260406000206000915091505054815600a165627a7a723058204c3f690997294d337edc3571d8e77afc5b0e56a2f4bfae6fb59139c8e4eb2f7e0029',
		//value_send: 0.01,
		
		

		*/
	}
},	

methods: {
	...env.methods,
	
	
	
	
	
	
	writeToContract() {
		
		this.txHash = this.balance1 = this.balance2 = "";
		
		web3 = Eth.handlerWeb3();

		const account1 = this.address1;
		const privateKey1 = Buffer.from( this.address1_pk , 'hex');
		const account2 = this.address2;


		//const contractAddress = '0xd03696B53924972b9903eB17Ac5033928Be7D3Bc'
		//const contractAddress = '0x011ccf3c31b51e71137f4afaae6e899c60ac25d4';
		const contractAddress = this.contract_address;
		const contractABI = this.abi;



		const contract = new web3.eth.Contract( contractABI, contractAddress );


	
		// Deploy the contract
		web3.eth.getTransactionCount(account1, (err, txCount) => {
			
			if ( "web3.eth.getTransactionCount", err ) { console.error( err ); env.pnotify.danger(`Error ${err.code}`, err.message) };


			
			const txObject = {
				nonce: txCount,
				gasLimit: this.gasLimit, 
				gasPrice: this.gasPrice,
				to: contractAddress,
				data: contract.methods.transfer(account2, this.sum_send).encodeABI()
			};
			
			const tx = Eth.handlerTx( txObject, privateKey1 );

			

		  const serializedTx = tx.serialize()
		  const raw = '0x' + serializedTx.toString('hex')

		  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
			
			if ( !err ) {
				// console.log( `txHash=` + txHash );

				env.pnotify.success("Write contract is success!", `txHash is ${txHash}`);
				setTimeout(() => { this.txHash = txHash; }, 2000);

				
				contract.methods.balanceOf( account1 ).call((err, balance) => {
					if ( !err ) {

						this.balance1 = balance;						
					} else { console.error( err ); env.pnotify.danger(`Error ${err.code}`, err.message) }; 
				})

				contract.methods.balanceOf( account2 ).call((err, balance) => {
					if ( !err ) {
						
						this.balance2 = balance;
					} else { console.error( err ); env.pnotify.danger(`Error ${err.code}`, err.message) }; 
				})				
				
				
			} else { console.error( err ); env.pnotify.danger(`Error ${err.code}`, err.message) }; 
			
		  })


			


		});
	


		
		
		
		
		
		
		
		
		
	},
	
	
	
	
	
	
	
	


},
	
	
	
computed: {
	...env.computed,	
	


},


mounted() {

	//web3 = Eth.handlerWeb3();
	//const contract = new web3.eth.Contract( this.abi, this.contract_address );

},



template: `

<div class="content">
	<div class="row">
		<div class="card" style="width: 100%">
			
			<div class="card-header  bg-slate-600 header-elements-inline">
				<h6 class="card-title">Записываем данные в смарт-контракт</h6>
				<!--
				<div class="header-elements" >
					<button type="button" @click=" $router.push({path: '/variables-new' }) " class="btn btn-success"><i class="icon-plus2 mr-2"></i> Добавить</button>
				</div>
				-->
			</div>
			
			<div class="card-body">		
		
				<form @submit.prevent=" writeToContract() ">
					
					
					<div class="form-group row">
						<label class="col-form-label col-lg-2">Contract address</label>
						<div class="col-lg-10">
							<input type="text" required class="form-control form-control-lg" v-model="contract_address ">
						</div>
					</div>						
					
					<div class="form-group row">
						<label class="col-form-label col-lg-2">Wallet address sender</label>
						<div class="col-lg-10">
							<input type="text" required class="form-control form-control-lg" v-model="address1 ">
						</div>
					</div>						
					<div class="form-group row">
						<label class="col-form-label col-lg-2">Private key sender</label>
						<div class="col-lg-10">
							<input type="text" required class="form-control form-control-lg" v-model="address1_pk ">
						</div>
					</div>
					<div class="form-group row">
						<label class="col-form-label col-lg-2">Кошелек куда отправляем</label>
						<div class="col-lg-10">
							<input type="text" required class="form-control form-control-lg" v-model="address2 ">
						</div>
					</div>						
					<div class="form-group row">
						<label class="col-form-label col-lg-2">Сумма сколько отправляем</label>
						<div class="col-lg-10">
							<input type="text" required class="form-control form-control-lg" v-model="sum_send ">
						</div>
					</div>						
					

					<div class="form-group row">
						<label class="col-form-label col-lg-2">Gas Limit</label>
						<div class="col-lg-10">
							<input type="text" required class="form-control form-control-lg" v-model="gasLimit">
						</div>
					</div>	
					<div class="form-group row">
						<label class="col-form-label col-lg-2">Gas price</label>
						<div class="col-lg-10">
							<input type="text" required class="form-control form-control-lg" v-model="gasPrice">
						</div>
					</div>						
					<div class="form-group row">
						<div class="col">
							<div class="text-right">
								<button class="btn btn-success legitRipple">Write to Contract <i class="icon-paperplane ml-2"></i></button>
							</div>							
						</div>								
					</div>						
					
					
					<fieldset v-if=" balance1 != '' ">
						<legend class="text-uppercase font-size-sm font-weight-bold">На балансе в контакте</legend>									
						
						<table class="table table-striped table-bordered mt-2">
							<tbody>	
								<tr>
									<td><label class="font-weight-semibold">{{address1}}</label></td>
									<td>{{balance1}}</td>
								</tr>
								<tr>
									<td><label class="font-weight-semibold">{{address2}}</label></td>
									<td>{{balance2}}</td>
								</tr>								
							</tbody>
						</table>
					</fieldset>
					
					
					<fieldset class="mt-4">
						<legend class="text-uppercase font-size-sm font-weight-bold">Transaction Info</legend>									
						<web3-transaction-table :txHash="txHash"></web3-transaction-table>					
					</fieldset>
					
					<fieldset class="mt-4">
						<legend class="text-uppercase font-size-sm font-weight-bold">Contract transactions history</legend>									
						<web3-contract-events-table :abi="abi" :contract_address="contract_address"></web3-contract-events-table>		
					</fieldset>					
					
				</form>		
		
			</div>
		</div>
	</div>
</div>


`
}

