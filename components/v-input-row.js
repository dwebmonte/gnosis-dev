"use strict";
Vue.component("v-input-row", {
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		label: { type: String },
		value: { required: true },
		wrapper: { default: "row" },
		
		help: { type: String },
		required: { type: Boolean, default: false },
		disabled: { type: Boolean, default: false },
		type: { type: String, default: "text" },
	},
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
	
	
	},

	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
	
	
	},

	// ~~~~~~~~~~~~~~~~~~~~~~				mounted
	mounted() {
	
	
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<div :class=" ( wrapper == 'row' ) ? 'form-group row' : 'col' ">
			<label class="col-form-label col-md-3">{{label}}</label>
			<div class="col-md-9">
				<input 
					:value="value"
					:required="required" 
					:disabled="disabled" 
					
					:type="type" 
					class="form-control" 
					
					v-on:change="$emit('input', $event.target.value)"
				>
				<span v-if="help" class="form-text text-muted">{{help}}</span>
			</div>	
		</div>
	`
});