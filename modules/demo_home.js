"use strict";

env.pages.demo_home = {

props: {
	
	method: { type: String },
	entity: { type: String },
	view: { type: String, default: "card" },

},	

methods: {
	...env.methods,
},

data: function () {
	return {
		reject: 0,
		confirm: 0
	}
},	
	

computed: {
	...env.computed,	
	
	curr_time() {
		return moment().format('LLLL');
	}
},


mounted() {
},

template: `

<div class="content">
	<div class="row">
		<div class="col-md-12">


					<div class="card" style="width: 100%">
						<div class="card-body">


<!-- d-flex flex-row bg-light border rounded p-2 -->

			<div class="d-flex flex-row font-size-lg mb-4">
				<div class="mr-5">
					<label class="font-weight-semibold pr-1">Token Name:</label><span>AADollar</span>
				</div>
				<div class="mr-5">
					<label class="font-weight-semibold pr-1">Token Address:</label><span>0x250F317829Cb30D9994093C34d68b58ff547CaC5</span>
				</div>
				<div class="">
					<label class="font-weight-semibold pr-1">Total Supply:</label><span>240&nbsp;450&nbsp;$</span>				
				</div>
			</div>

		
			<div class="row" v-if=" reject == 0">
			
			
				<div class="col-md-8">

					<div class="d-flex justify-content-between align-items-center font-size-lg mb-4">
						<div class=""><label class="font-weight-semibold pr-1">Signed:</label>Monday, July 26, 2021 10:12 PM</div>
						<div class=""><label class="font-weight-semibold pr-1">Now:</label>{{curr_time}}</div>
					</div>

					<div class="bg-light border rounded mb-3 p-3 font-size-lg" style="width: 100%; height: 85px; display: table;">
						<span style="display: table-cell;vertical-align: middle;">Amount to mint (burn): 1&nbsp;000&nbsp;000&nbsp;$</span>
					</div>						

					<div class="bg-light border rounded mb-3 p-3 font-size-lg" style="width: 100%; height: 85px; display: table;">
						<span style="display: table-cell;vertical-align: middle;">Customer Name: Binance</span>
					</div>						

					<div class="bg-light border rounded mb-3 p-3 font-size-lg" style="width: 100%; height: 85px; display: table;">
						<span style="display: table-cell;vertical-align: middle;">Amount to mint (burn): 1&nbsp;000&nbsp;000&nbsp;$</span>
					</div>						

					<div class="bg-light border rounded mb-3 p-3 font-size-lg" style="width: 100%; height: 85px; display: table;">
						<span style="display: table-cell;vertical-align: middle;">Transaction Hash: 0x56f50b02fa4fcDE1A1d17852bCdD847f5E2aD196DE1A1d17852bCdD847f5E2aD196</span>
					</div>						


				</div>
				
				<div class="col-md-4">

						<div class="card ">
							<div class="card-header  bg-light header-elements-inline">
								<h6 class="card-title">Status</h6>
								<div class="header-elements" ></div>
							</div>

							<div class="card-body  bg-light">
								<div class="list-feed">
									<div class="list-feed-item border-success">
										<h6 class="font-weight-semibold">Binance</h6>
										<div class="text-muted font-size-sm mb-1">2 hours ago</div>
										<a href="#">David Linner</a> approved transactions on Gnosis Safe 
									</div>

									<div class="list-feed-item border-success">
										<h6 class="font-weight-semibold">Validator</h6>
										<div class="text-muted font-size-sm mb-1">12 minutes ago</div>
										<a href="#">Christopher Wallace</a> approved transactions on Gnosis Safe
										
									</div>

									<div class="list-feed-item " :class=" confirm == 0 ? 'border-grey-300' : 'border-success' ">
										<h6 class="font-weight-semibold">Bank</h6>
										<div  v-if=" confirm == 1" class="text-muted font-size-sm mb-1">right now</div>
										<a href="#" v-if=" confirm == 1">Dmitry</a> approved transactions on Gnosis Safe
										
										
										
										
									</div>

									<div class="list-feed-item border-grey-300">
										<h6 class="font-weight-semibold">Operator</h6>
									</div>
								</div>
								<div class="text-center mt-3">
									<button type="button" class="btn btn-success legitRipple" style="width: auto">Awaiting a decision from the bank</button>
								</div>
							</div>
							
							
						</div>

				</div>	
			
			</div>
		
			<div class="form-group row"  v-if=" reject == 0 && confirm == 0">
				<div class="col">
					<button type="button" class="btn btn-success legitRipple mr-2 btn-lg" style="width: 130px" data-toggle="modal" data-target="#uz_calc">Confirm</button>
					<button type="button" @click="  " class="btn btn-warning legitRipple mr-2 btn-lg" style="width: 130px">Reject </button>
				</div>								
			</div>
		
		
		
		
		
		
		
		
		
		
		
		</div>
	</div>
	
	
	
			<div class="card" style="width: 100%; display: none">
				<div class="card-header bg-light header-elements-inline">
					<h6 class="card-title">Заголовок</h6>
				</div>
				
				<div class="card-body">
					<div class="row">
						<div class="col">
							<div class="card card-body bg-blue-400 has-bg-image">
								<div class="media">
									<div class="media-body">
										<h3 class="mb-0">154</h3>
										<span class="text-uppercase font-size-xs">Текущее количество токенов в обращении</span>
									</div>

									<div class="ml-3 align-self-center">
										<i class="icon-bubbles4 icon-3x opacity-75"></i>
									</div>
								</div>
							</div>
						</div>

						<div class="col">
							<div class="card card-body bg-danger-400 has-bg-image">
								<div class="media">
									<div class="media-body">
										<h3 class="mb-0">389.438</h3>
										<span class="text-uppercase font-size-xs">Текущая комиссия, взимаемая за переводы</span>
									</div>

									<div class="ml-3 align-self-center">
										<i class="icon-bag icon-3x opacity-75"></i>
									</div>
								</div>
							</div>
						</div>

						<div class="col">
							<div class="card card-body bg-success-400 has-bg-image">
								<div class="media">
									<div class="mr-3 align-self-center">
										<i class="icon-pointer icon-3x opacity-75"></i>
									</div>

									<div class="media-body text-right">
										<h3 class="mb-0">652.549</h3>
										<span class="text-uppercase font-size-xs">Текущая сумма собранных сборов</span>
									</div>
								</div>
							</div>
						</div>

					</div>
					
			
					
				</div>
				
						</div>
					</div>
				
				
			</div>		
	

	<v-modal id="uz_calc" v-model="confirm"></v-modal>
	
</div>







`
}