"use strict";
Vue.component("v-select-row", {
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		
		value: { required: true },
		options: { required: true },
		
		
		wrapper: { default: "row" },
		label: { type: String },
		required: { type: Boolean, default: false },
		type: { type: String, default: "text" },
		help: {},
		size: {},
		
	},
	
	
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		val() {
			
			let res = this.value;
			if ( res === undefined ) {

				let option_def =  this.option_def;
				//console.info(option_def);
				
				if ( option_def ) {
					res = option_def.value;
					this.$emit('input', res);
				}
			};
			
			console.log(`value[${this.label}]=` + res);
			
			return res;
		},
		
		
		select_options() {
			let res = ( Array.isArray( this.options ) ) ? this.options : env.methods.selectOptions( this.options.trim() );			
			//console.info( res );
			return res;
		},	

		option_def() {
			
			var res;
			this.select_options.forEach( item => {
				//console.info( item );
				if ( item.default ) res = item;
				if ( item.items ) {
					item.items.forEach( item1 => {
						//console.info( item1 );
						if ( item1.default ) res = item1;
					});
				}
			});
			
			return res;
		},

	
	},

	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
	
	
	},

	// ~~~~~~~~~~~~~~~~~~~~~~				mounted
	mounted() {
	
	
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<div v-if=" wrapper == 'row' " class="form-group row">
			<label class="col-form-label col-md-3">{{label}}</label>
			<div class="col-md-9">
			
				<select 
					:options="options"
					:value="val"
					:required="required" 
					:type="type" 
					:size="size"
					
					class="form-control" 
					
					v-on:change="$emit('input', $event.target.value)" 
				>
					<option value="" disabled selected>Выберите значение...</option>
					<template v-for = " option in select_options" >
						<option v-if=" option.items === undefined " 
							:key = "option.value" 
							:value = "option.value"
						>{{option.title}}</option>
						<optgroup v-else 
							:key = " 'group-' + option.title" 
							:label="option.title"
						>
							<template v-for = " sub_option in option.items" >
								<option 
									:key = "sub_option.value" 
									:value = "sub_option.value"
								>{{sub_option.title}}</option>
							</template>				
							
						</optgroup>
					</template>
					
				</select>	
				<span v-if="help" class="form-text text-muted">{{help}}</span>				

			</div>
		</div>
		
		<div v-else class="col">

			<div class="row">
			
			<label class="col-form-label col-md-4">{{label}}</label>
			<div class="col-md-8">
			
				<select 
					:options="options"
					:value="val"
					:required="required" 
					:type="type" 
					class="form-control" 
					
					v-on:change="$emit('input', $event.target.value)" 
				>
					<option value="" disabled selected>Выберите значение...</option>
					<template v-for = " option in select_options" >
						<option v-if=" option.items === undefined " 
							:key = "option.value" 
							:value = "option.value"
						>{{option.title}}</option>
						<optgroup v-else 
							:key = " 'group-' + option.title" 
							:label="option.title"
						>
							<template v-for = " sub_option in option.items" >
								<option 
									:key = "sub_option.value" 
									:value = "sub_option.value"
								>{{sub_option.title}}</option>
							</template>				
							
						</optgroup>
					</template>
					
				</select>			

			</div>		
		
			</div>

		
		
		</div>
		
		
	`
});