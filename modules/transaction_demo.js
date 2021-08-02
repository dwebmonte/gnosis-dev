"use strict";
env.pages.transaction_demo = {

props: {
	
	method: { type: String },
	entity: { type: String },
	view: { type: String, default: "card" },

},	


// ~~~~~~~~~~~~~~~~~~~~~~				data
data: function () {
	return {
		web3: undefined,
	
		eth_key: '1TSEZZWRAPE332SGK4TPU7NYDSX71W2AD4',
		address1: '0x84e30B7A76e88348f044F8844017011BceB902a6',
		address1_pk: 'dcebe6f966bbab5f1c1b14a09815a388aa39cf80c72794f3556015a7926ad8e5',
		address2: '0xe1d225c9D8c62Fcb3ecc98765f41e697C67947Ff',
		value_send: 0.01,
		txHash: ''

	}
},	

methods: {
	...env.methods,
	
	sendTransaction() {
	
		
		web3 = Eth.handlerWeb3();

		const account1 = this.address1; 
		const account2 = this.address2; 
		const privateKey1 = Buffer.from( this.address1_pk , 'hex');

		web3.eth.getTransactionCount(account1, (err, txCount) => {
			  if ( "web3.eth.getTransactionCount", err ) {
				  console.error( err );
				  env.pnotify.danger(`Error ${err.code}`, err.message);	
			  };
		  
		  const txObject = {
			nonce:    web3.utils.toHex(txCount),
			to:       account2,
			value:    web3.utils.toHex(web3.utils.toWei( `${this.value_send}`, 'ether')),
			gasLimit: web3.utils.toHex(21000),
			gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
		  }



		  // Sign the transaction
		  //const tx = new Tx(txObject)
		  var tx = new Tx(txObject, {'chain':'rinkeby'});
		  tx.sign(privateKey1)
			


		  const serializedTx = tx.serialize()
		  const raw = '0x' + serializedTx.toString('hex')


		  
		  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
			if ( err ) {
				console.error( "web3.eth.sendSignedTransaction", err );
				env.pnotify.danger(`Error ${err.code}`, err.message);	
			} else {
				env.pnotify.success("Transaction is success!", `txHash is ${txHash}`);
			};
			
			
			console.log('txHash:', txHash);
			
			setTimeout(() => { this.txHash = txHash; }, 3000);			
			
		  })
		})


		
		
	
	}
},
	
	
	
computed: {
	...env.computed,	
	


},


created() {

},



template: `

<div class="content">
	<div class="row">
		
		<div class="card" style="width: 100%">
			<div class="card-header  bg-slate-600 header-elements-inline">
				<h6 class="card-title">Send Transaction To Wallet</h6>
				<!--
				<div class="header-elements" >
					<button type="button" @click=" $router.push({path: '/variables-new' }) " class="btn btn-success"><i class="icon-plus2 mr-2"></i> Добавить</button>
				</div>
				-->
			</div>
			
			<div class="card-body">
			
				<form @submit.prevent=" sendTransaction() ">
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
						<label class="col-form-label col-lg-2">Wallet address receiver</label>
						<div class="col-lg-10">
							<input type="text" required class="form-control form-control-lg" v-model="address2 ">
						</div>
					</div>
					<div class="form-group row">
						<label class="col-form-label col-lg-2">Value</label>
						<div class="col-lg-10">
							<input type="text" required class="form-control form-control-lg" v-model="value_send">
						</div>
					</div>	
					
					<div class="form-group row">
						<div class="col">
							<div class="text-right">
								<button class="btn btn-success legitRipple">Send <i class="icon-paperplane ml-2"></i></button>
							</div>							
						</div>								
					</div>						
				</form>

				<fieldset>
					<legend class="text-uppercase font-size-sm font-weight-bold">Transaction Info</legend>									
					<web3-transaction-table :txHash="txHash"></web3-transaction-table>					
					
					
				</fieldset>

			</div>
		</div>	
	
	
	</div>
</div>


`
}