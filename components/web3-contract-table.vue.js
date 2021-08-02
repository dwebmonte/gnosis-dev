"use strict";
Vue.component("web3-contract-table", {
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		abi: { required: true },
		contract_address: { required: true }
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			name: "",
			totalSupply: "",
			symbol: "",
			balanceOf: "",
			
		}
	},		
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
	
	
	},

	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
		
		updateData() {
			var web3 = Eth.handlerWeb3();
		
			this.name = this.totalSupply = this.symbol = this.balanceOf = "";
			
			if ( this.abi == "" || this.contract_address == "" ) return false;
			
			const contract = new web3.eth.Contract( this.abi, this.contract_address)

			contract.methods.name().call((err, name) => {
				if ( !err ) this.name = name; else console.error( err )
			});

			contract.methods.totalSupply().call((err, result) => { 
				if ( !err ) this.totalSupply = result; else console.error( err )
			});

			contract.methods.symbol().call((err, result) => { 
				if ( !err ) this.symbol = result; else console.error( err )
			});

			contract.methods.balanceOf( this.contract_address ).call((err, result) => { 
				if ( !err ) this.balanceOf = result; else console.error( err )
			})
		
			
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
	
	
		<table class="table table-striped table-bordered mt-2">
			<tbody>	
				<tr >
					<td><label class="font-weight-semibold">Name</label> <code>(name)</code></td>
					<td>{{name}}</td>
				</tr>
				<tr >
					<td><label class="font-weight-semibold">Total Supply</label> <code>(totalSupply)</code></td>
					<td>{{totalSupply}}</td>
				</tr>
				
				<tr >
					<td><label class="font-weight-semibold">Symbol</label> <code>(symbol)</code></td>
					<td>{{symbol}}</td>
				</tr>
				<tr >
					<td><label class="font-weight-semibold">Balance Of</label> <code>(balanceOf)</code></td>
					<td>{{balanceOf}}</td>
				</tr>

			</tbody>
		
		</table>
	
	`
});