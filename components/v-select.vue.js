"use strict";

Vue.component("v-select", {
	
	props: {
		options: { required: true },
		value: {  },
	},
	
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
	
	 
	
	
	
	template: `
		<select 
			:value="val"
			v-on:change="$emit('input', $event.target.value)" 
			class="form-control"
		>
			<option value="" disabled selected>Выберите значение...</option>
			<option 
				v-for = "option in select_options" 
				:key = "option.value" 
				:value = "option.value"

			>{{option.title}}
			
			</option>
		</select>
	`		
});