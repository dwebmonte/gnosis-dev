"use strict";
Vue.component("v-modal", {
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		id: { type: String, required: true },
		value: {}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
		}
	},		
	
	// ~~~~~~~~~~~~~~~~~~~~~~				created
	created() {
	},

	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
	
		saveForm() {
			$('#' + this.id).modal('hide');
			
			this.$emit( "input",  1);				
		},
		
	
	},


	updated() {
		//console.log("updated");
		
	},
	
	watch: {
		
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `

			<div :id="id" class="modal fade" tabindex="-1">
				<div class="modal-dialog modal-sm">
					<div class="modal-content">
						<form @submit.prevent="saveForm">
							<!--
							<div class="modal-header bg-primary">
								<h5 class="modal-title">Signature Request</h5>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							-->
							<div class="modal-body text-center" style="word-break: break-all;">
								<h5 class="mb-3">Signature Request</h5>

								<i class="icon-checkmark3 icon-2x text-success border-success border-3 rounded-round p-3 mb-3"></i>
								<div class="text-muted font-size-sm mb-1">https://rinkeby.etherscan.io/address/0x56f50b02fa4fcDE1A1d17852bCdD847f5E2aD196</div>								
								<div class="form-separator"></div>
								
								<div class="d-sm-flex flex-sm-wrap mb-3">
									<div class="font-weight-semibold">Message To:</div>
									<div class="ml-sm-auto mt-2 mt-sm-0" style="word-break: break-all;">0x01EafA5B269a3f916b9B0EeE60EF9427B50aD19d</div>
								</div>

								<div class="d-sm-flex flex-sm-wrap mb-3">
									<div class="font-weight-semibold">Value:</div>
									<div class="ml-sm-auto mt-2 mt-sm-0" style="word-break: break-all;">0</div>
								</div>

								<div class="d-sm-flex flex-sm-wrap mb-3">
									<div class="font-weight-semibold">Data:</div>
									<div class="ml-sm-auto mt-2 mt-sm-0" style="word-break: break-all;">0x01EafA5B269a3f916b9B0EeE60EF9427B50aD19dEafA5B269a3f916b9B0EeE60EF9427B50aD19dEafA5B269a3f916b9B0EeE60EF9427B50aD19dEafA5B269a3f916b9B0EeE60EF9427B50aD19d</div>
								</div>

								<div class="d-sm-flex flex-sm-wrap mb-3">
									<div class="font-weight-semibold">Operation:</div>
									<div class="ml-sm-auto mt-2 mt-sm-0" style="word-break: break-all;">0</div>
								</div>

								<div class="d-sm-flex flex-sm-wrap mb-3">
									<div class="font-weight-semibold">safeTxGas:</div>
									<div class="ml-sm-auto mt-2 mt-sm-0" style="word-break: break-all;">54808</div>
								</div>

								<div class="d-sm-flex flex-sm-wrap mb-3">
									<div class="font-weight-semibold">baseGas:</div>
									<div class="ml-sm-auto mt-2 mt-sm-0" style="word-break: break-all;">0</div>
								</div>

								<div class="d-sm-flex flex-sm-wrap mb-3">
									<div class="font-weight-semibold">gasPrice:</div>
									<div class="ml-sm-auto mt-2 mt-sm-0" style="word-break: break-all;">0</div>
								</div>

								<div class="d-sm-flex flex-sm-wrap mb-3">
									<div class="font-weight-semibold">gasToken:</div>
									<div class="ml-sm-auto mt-2 mt-sm-0" style="word-break: break-all;">0x56f50b02fa4fcDE1A1d17852bCdD847f5E2aD196</div>
								</div>

								<div class="d-sm-flex flex-sm-wrap mb-3">
									<div class="font-weight-semibold">refundReceiver:</div>
									<div class="ml-sm-auto mt-2 mt-sm-0" style="word-break: break-all;">0x01EafA5B269a3f916b9B0EeE60EF9427B50aD19d</div>
								</div>

								<div class="d-sm-flex flex-sm-wrap mb-3">
									<div class="font-weight-semibold">Nonce:</div>
									<div class="ml-sm-auto mt-2 mt-sm-0" style="word-break: break-all;">9</div>
								</div>





								
								<div class="form-separator"></div>
								
							</div>

							<div class="modal-footer">
								<button type="button" class="btn btn-link legitRipple" data-dismiss="modal">Cancel</button>
								<button type="submit" class="btn bg-primary">Sign</button>
							</div>
						</form>	
					</div>
				</div>
			</div>	
	
	
	`
});