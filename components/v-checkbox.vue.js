"use strict";

Vue.component('v-checkbox', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		id: { type: String },
		value: { required: true },
		true_value: { default: "1"},
		false_value: { default: "0"}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			
		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		checked() {
			//if ( this.value == '0' || this.value == 0 ) return false;
			if ( this.value == this.false_value ) return fals;
			else return true;
		}
	},
	
	

		
	
	methods: {
		
		onChange( event ) {
			let value = event.target.checked ? true : false;
			this.$emit('input', value);			
		},
		
		
		createPlugin() {
			
			//if ( this.id === undefined ) return false;
			
			if (!$().uniform) {
				console.error('Warning - uniform.min.js is not loaded.');
				return;
			}

			// Default initialization
			//$('#' + this.id).uniform();
			$( this.$refs.checkbox).uniform();
			
			
			
		}
		
	},
	
	mounted() {
		if (document.readyState === "complete") {
			this.createPlugin();
		} else {
			window.addEventListener("DOMContentLoaded", this.createPlugin());
		}			
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<div class="form-check">												
			<label class="form-check-label">
				<input 
					:id="id" 
					ref='checkbox'
					@input=" onChange( $event )" 
					:checked="checked" 
					type="checkbox" 
					class="form-check-input" 
					:true-value="true_value" 
					:false-value="false_value"
				>
				<slot></slot>
			</label>
		</div>	
		
	`
});


