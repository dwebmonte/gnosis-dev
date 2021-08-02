"use strict";
Vue.component("web3-contract-events-table", {
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		abi: { required: true },
		contract_address: { required: true }
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			events: []
			
		}
	},		
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
	
	
	},

	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
		
		updateData() {
			
			 this.events = [];
			
			var web3 = Eth.handlerWeb3();
			const contract = new web3.eth.Contract( this.abi, this.contract_address );

			contract.getPastEvents(
			  'AllEvents',
			  {
				fromBlock: 1,
				toBlock: 'latest'
			  },
			  (err, events) => { 
					if ( !err ) {
						this.events = events; 
					} else { console.error( err ); env.pnotify.danger(`Error ${err.code}`, err.message) }; 
					
					
				}
			)
		
			
		}
	
	},



	watch: {
		contract_address: {
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
	
	
		<table class="table table-striped table-bordered table-responsive mt-2">
			<thead>
				<tr>
					<th>#</th>
					<th>address</th>
					<th>block Hash</th>
					<th>block Number</th>
					<th>event</th>
					<th>from</th>
					<th>to</th>
					<th>value</th>
				</tr>
			</thead>
			
			<tbody>	
				<tr v-for= " item in events" :key="item.id">
					<td>{{item.logIndex}}</td>
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
					
					
				</tr>
			</tbody>
		
		</table>
	
	`
});