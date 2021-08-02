"use strict";

Vue.component('my-autocomplete', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		
		id: {			type: String,		},		
		
		value: { },


		/*
		propC: {
			type: String,
			required: true
		},
		propE: {
			type: Object,
			default: function () { return { message: 'hello' } }
		},
		*/
		type: {
			
		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			
		}
	},
	
	
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		...env.computed,
		states() {
			var data = this.autocompleteOptions( this.type );
			data.sort();		
			return data;
		}

	},
	
	methods: {
		...env.methods,
		
        substringMatcher(strs) {
            return function findMatches(q, cb) {
                var matches, substringRegex;

                // an array that will be populated with substring matches
                matches = [];

                // regex used to determine if a string contains the substring `q`
                var substrRegex = new RegExp(q, 'i');

                // iterate through the pool of strings and for any string that
                // contains the substring `q`, add it to the `matches` array
                $.each(strs, function(i, str) {
                    if (substrRegex.test(str)) {

                        // the typeahead jQuery plugin expects suggestions to a
                        // JavaScript object, refer to typeahead docs for more info
                        matches.push({ value: str });
                    }
                });

                cb(matches);
            };
        }		
		
	},
	
	mounted() {

		var $obj = $( this.$refs.typeahead);

        // Initialize
        $obj.typeahead(
            {
                hint: true,
                highlight: true,
                minLength: 0
            },
            {
                name: 'states',
                displayKey: 'value',
                source: this.substringMatcher( this.states )
            }
        );

		$obj.on('typeahead:selected',  (e, datum) => {
			this.$emit('input', datum.value);
		});		
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<input 
			:id="id" 
			type="text" 
			ref='typeahead'
			class="form-control typeahead-basic" 
			
			:value="value" 
			v-on:change="$emit('input', $event.target.value)"
		>
		
	`
});


