"use strict";
Vue.component("web3-transaction-table", {
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		txHash: { required: true }
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			stat: {}
		}
	},		
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
	
	
	},

	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
		
		updateData() {
		
		
			this.stat = {};
			
			if ( this.txHash == "" ) return false;
			var web3 = Eth.handlerWeb3();
			
			
			web3.eth.getTransaction( this.txHash, (err, result) => { 
				if ( !err ) {
					
					
					
					if ( result !== null ) {
						this.stat = result;
						
						if ( this.stat.value ) this.stat.value = web3.utils.fromWei(this.stat.value, 'ether');
						if ( this.stat.gasPrice ) this.stat.gasPrice = web3.utils.fromWei(this.stat.gasPrice, 'ether');
						
					};	
				
				} else { console.error( err ); env.pnotify.danger(`Error ${err.code}`, err.message) }; 
			});			
			
			
			
			/*
			web3.eth.getTransactionReceipt( this.txHash, (err, result) => { 
				if ( !err ) {
			
					console.info( result );
			
				} else { console.error( err ); env.pnotify.danger(`Error ${err.code}`, err.message) }; 
			});
			*/
		}
	
	},



	watch: {
		txHash: {
			handler: function(val, oldVal) {
				this.updateData();
			},
		//deep: true
		}
	}, 

	created() {
		this.updateData();
	
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
	
	
		<table class="table table-striped table-bordered mt-2">
			<tbody>	
				<tr v-if=" stat.hash">
					<td><label class="font-weight-semibold">Hash of the transaction</label> <code>(hash)</code></td>
					<td><a :href=" 'https://rinkeby.etherscan.io/tx/' + stat.hash " target="_blank">{{stat.hash}}</a></td>
				</tr>
				<tr v-if=" stat.nonce">
					<td><label class="font-weight-semibold">The number of transactions made by the sender</label> <code>(nonce)</code></td>
					<td>{{stat.nonce}}</td>
				</tr>
				
				<tr v-if=" stat.blockNumber">
					<td><label class="font-weight-semibold">Block number where this transaction was in</label> <code>(blockNumber)</code></td>
					<td>{{stat.blockNumber}}</td>
				</tr>
				<tr v-if=" stat.transactionIndex">
					<td><label class="font-weight-semibold">Integer of the transactions index position in the block</label> <code>(transactionIndex)</code></td>
					<td>{{stat.transactionIndex}}</td>
				</tr>
				
				
				
				
				<tr v-if=" stat.from">
					<td><label class="font-weight-semibold">Address of the sender</label> <code>(from)</code></td>
					<td><a :href=" 'https://rinkeby.etherscan.io/address/' + stat.from " target="_blank">{{stat.from}}</a></td>
					
					
				</tr>
				<tr v-if=" stat.to">
					<td><label class="font-weight-semibold">Address of the receiver</label> <code>(to)</code></td>
					<td><a :href=" 'https://rinkeby.etherscan.io/address/' + stat.to " target="_blank">{{stat.to}}</a></td>
				</tr>
				<tr v-if=" stat.value">
					<td><label class="font-weight-semibold">Value transferred</label> <code>(value)</code></td>
					<td>{{stat.value}}</td>
				</tr>
				<tr v-if=" stat.gasPrice">
					<td><label class="font-weight-semibold">Gas price</label> <code>(gasPrice)</code></td>
					<td>{{stat.gasPrice}}</td>
				</tr>
				<tr v-if=" stat.gas">
					<td><label class="font-weight-semibold">Gas</label> <code>(Gas)</code></td>
					<td>{{stat.gas}}</td>
				</tr>

			</tbody>
		
		</table>
	
	`
});