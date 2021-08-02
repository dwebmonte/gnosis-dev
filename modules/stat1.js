env.pages.stat1 = {

props: {
	
	method: { type: String },
	entity: { type: String },
	view: { type: String, default: "card" },

},	


// ~~~~~~~~~~~~~~~~~~~~~~				data
data: function () {
	return {
	
		eth_key: '1TSEZZWRAPE332SGK4TPU7NYDSX71W2AD4',
		address1: '0x84e30B7A76e88348f044F8844017011BceB902a6',
		address1_pk: 'dcebe6f966bbab5f1c1b14a09815a388aa39cf80c72794f3556015a7926ad8e5',

		txHash: '0x287375f5ba13b7fb9b1836d4aa1031b171e99fd3d57ed373e8de9fbb083ae463',
		txCount: "",
		balanceWei: "",
		balance: "",
		nodeInfo: "",
		
		abi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}],
		contract_address: '0x0894300cad9f4320a25e0acd9991afb3c910cff4',
		
		avgGasPrice: "",
		latestBlockNumber: "",
		latestBlocks: [],
	}
},	

methods: {
	...env.methods,
	
	
	
	updateStat() {
		
		web3 = Eth.handlerWeb3();
		
		
		web3.eth.getGasPrice( (err, result) => { 
			if ( !err ) {
				this.avgGasPrice = web3.utils.fromWei(result, 'ether');
			} else { console.error( err ); env.pnotify.danger(`Error ${err.code}`, err.message) }; 
		});

		
		this.latestBlocks = [];
		web3.eth.getBlockNumber( (err, result) => { 
			if ( !err ) {
				this.latestBlockNumber = result;
				
				for (let i = 0; i < 10; i++) {
					
					web3.eth.getBlock( this.latestBlockNumber - i, (err, result) => { 
						if ( !err ) {
							result.time = moment.unix( result.timestamp ).format('YYYY-MM-DD HH:mm:ss');
							this.latestBlocks.push( result );
						} else { console.error( err ); env.pnotify.danger(`Error ${err.code}`, err.message) }; 		
					});
					
				}				
				
			} else { console.error( err ); env.pnotify.danger(`Error ${err.code}`, err.message) }; 		
		});


	
	},
	
	
	updateWallet() {
	
		web3 = Eth.handlerWeb3();
	
		this.txCount = this.balanceWei = this.balance = this.nodeInfo = "";
	
	

	
		web3.eth.getBalance( this.address1, (err, wei) => { 
			if ( !err ) {
				this.balanceWei = wei;
				this.balance = web3.utils.fromWei(wei, 'ether') ;
			} else console.eror(err);
		});	

		web3.eth.getTransactionCount(this.address1, (err, txCount) => {
			if ( !err ) {
				this.txCount = txCount;
			} else console.eror(err);
		});	
	
		web3.eth.getNodeInfo( (err, result) => { 
			this.nodeInfo = result;
		});

/*
		web3.eth.getBlockTransactionCount( this.address1, (err, result) => { 
			console.info( result );
		});
*/


		

		
		




		
		
	
	}
},
	
	
	
computed: {
	...env.computed,	
	
	data() { return this.dbRowsClone(`${this.entity}`);},




	

},


created() {
	this.updateWallet();
	this.updateStat();	

	
},

watch: {
	address1: {
		handler: function(val, oldVal) {
			this.updateWallet();
		},
	//deep: true
	}
}, 

template: `

<div class="content">
	<div class="row">
		
		<div class="card" style="width: 100%">
			<div class="card-header  bg-slate-600 header-elements-inline">
				<h6 class="card-title">Wallet Info</h6>
				<!--
				<div class="header-elements" >
					<button type="button" @click=" $router.push({path: '/variables-new' }) " class="btn btn-success"><i class="icon-plus2 mr-2"></i> Добавить</button>
				</div>
				-->
			</div>
			
			<div class="card-body">
			
				<form @submit.prevent="  ">
					<div class="form-group row">
						<label class="col-form-label col-lg-2">Wallet</label>
						<div class="col-lg-10">
							<input type="text" class="form-control form-control-lg" v-model="address1 ">
						</div>
					</div>						
				</form>

				<fieldset>
					<legend class="text-uppercase font-size-sm font-weight-bold">Wallet Info</legend>				
					<table class="table table-striped table-bordered mt-2">
						<tbody>	
							<tr>
								<td><label class="font-weight-semibold">Balance in wei</label></td>
								<td>{{balanceWei}}</td>
							</tr>
							<tr>
								<td><label class="font-weight-semibold">Balance</label></td>
								<td>{{balance}}</td>
							</tr>
							<tr>
								<td><label class="font-weight-semibold">Transaction Count</label> <code>(nonce)</code></td>
								<td>{{txCount}}</td>
							</tr>							
							<tr>
								<td><label class="font-weight-semibold">Node Info</label></td>
								<td>{{nodeInfo}}</td>
							</tr>
							
							
						</tbody>
					</table>
				</fieldset>

			</div>
		</div>	
		
		
		<div class="card" style="width: 100%">
			<div class="card-header  bg-slate-600 header-elements-inline">
				<h6 class="card-title">Transaction</h6>
			</div>
			
			<div class="card-body">
			
				<form @submit.prevent="  ">
					<div class="form-group row">
						<label class="col-form-label col-lg-2">Transaction Hash</label>
						<div class="col-lg-10">
							<input type="text" class="form-control form-control-lg" v-model="txHash ">
						</div>
					</div>					
					<fieldset>
						<legend class="text-uppercase font-size-sm font-weight-bold">Transaction Info</legend>									
						<web3-transaction-table :txHash="txHash"></web3-transaction-table>		
					</fieldset>	
				</form>
			</div>
		</div>			


		<div class="card" style="width: 100%">
			<div class="card-header  bg-slate-600 header-elements-inline">
				<h6 class="card-title">Contract</h6>
			</div>
			
			<div class="card-body">
			
				<form @submit.prevent="  ">
					<!--
					<div class="form-group row">
						<label class="col-form-label col-lg-2">ABI</label>
						<div class="col-lg-10">
							<input type="text" class="form-control form-control-lg" v-model="abi ">
						</div>
					</div>	
					-->
					<div class="form-group row">
						<label class="col-form-label col-lg-2">Contract Address</label>
						<div class="col-lg-10">
							<input type="text" class="form-control form-control-lg" v-model="contract_address ">
						</div>
					</div>

					
					<fieldset>
						<legend class="text-uppercase font-size-sm font-weight-bold">Contract Info</legend>									
						<web3-contract-table :abi="abi" :contract_address="contract_address"></web3-contract-table>		
					</fieldset>	
					<fieldset class="mt-4">
						<legend class="text-uppercase font-size-sm font-weight-bold">Contract Events</legend>									
						<web3-contract-events-table :abi="abi" :contract_address="contract_address"></web3-contract-events-table>		
					</fieldset>	
					
				</form>
			</div>
		</div>

		<div class="card" style="width: 100%">
			<div class="card-header  bg-slate-600 header-elements-inline">
				<h6 class="card-title">System info</h6>
			</div>
			
			<div class="card-body">
				
				<table class="table table-striped table-bordered mt-2">
					<tbody>	
						<tr>
							<td><label class="font-weight-semibold">Средняя цена за газ</label></td>
							<td>{{avgGasPrice}}</td>
						</tr>
						<tr>
							<td><label class="font-weight-semibold">Последний номер блока</label></td>
							<td>{{latestBlockNumber}}</td>
						</tr>								
					</tbody>
				</table>				
				
		

			</div>
		</div>	
		
		<div class="card" style="width: 100%">
			<div class="card-header  bg-slate-600 header-elements-inline">
				<h6 class="card-title">Latest blocks</h6>
			</div>
			
			<div class="card-body">
				
		<table class="table table-striped table-bordered table-responsive mt-2">
			<thead>
				<tr>
					
					<th>№</th>
					<th>gas Limit</th>
					<th>gas Used</th>
					<th>hash</th>
					<th>size</th>
					<th>time</th>
					
					
					<!--
					<th>block Number</th>
					<th>event</th>
					<th>from</th>
					<th>to</th>
					<th>value</th>
					-->
				</tr>
			</thead>
			
			<tbody>	
				<tr v-for= " item in latestBlocks" :key="item.id">
					
					
					<td>{{item.number}}</td>
					<td>{{item.gasLimit}}</td>
					<td>{{item.gasUsed}}</td>
					<td>
						<a :href=" 'https://rinkeby.etherscan.io/tx/' + item.hash " target="_blank">{{item.hash}}</a>
					</td>
					<td>{{item.size}}</td>
					<td>{{item.time}}</td>
					
					<!--
					<td><a :href=" 'https://rinkeby.etherscan.io/address/' + item.address " target="_blank">{{item.address}}</a></td>
					<td><a :href=" 'https://rinkeby.etherscan.io/tx/' + item.blockHash " target="_blank">{{item.blockHash}}</a></td>
					<td>{{item.blockNumber}}</td>
					<td>{{item.event}}</td>
					<td v-if="item.returnValues._from">
						<a :href=" 'https://rinkeby.etherscan.io/address/' + item.returnValues._from " target="_blank">{{item.returnValues._from}}</a>
					</td>
					<td v-if="item.returnValues._to">
						<a :href=" 'https://rinkeby.etherscan.io/address/' + item.returnValues._to " target="_blank">{{item.returnValues._to}}</a>
					</td>					
					<td v-if="item.returnValues._value">{{item.returnValues._value}}</td>
					-->
					
				</tr>
			</tbody>
		
		</table>
			
				
		

			</div>
		</div>		
	
	
	</div>
</div>


`
}