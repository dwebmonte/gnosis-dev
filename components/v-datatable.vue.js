"use strict";

Vue.component('v-datatable', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		id: { type: String },
		value: { required: true },
		entity: { required: true },
		def: {}
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {

		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		
		dt() { return jQuery("#" + this.table_id).DataTable() },	
		table_id() { return ( this.id === undefined ) ? `${this.entity}_datatable` : this.id; }

	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
		setData: function( newData ) {
			if (newData instanceof Array) {
				this.dt.clear();
				this.dt.rows.add( newData ).draw();		
			};			
		}
	},	
	
	mounted() {
		
		var definition = this.def;
		definition.columnDefs.forEach(  (item_col, index_col) => {
			if ( item_col.targets === undefined ) item_col.targets = index_col;
			if ( item_col.data === undefined ) item_col.data = item_col.name;	
			
			definition.columnDefs[ index_col ] = item_col;
		});
		
		
		$( '#' + this.table_id ).dataTable( definition );
		this.setData( this.value );
	},
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				watch
	
	watch: {
		
        value: {
            handler: function( newData ) {
				if ( this.log ) console.log(`Watch for $(this.entity) - data is changed`);	
				this.setData( newData );
            },
            deep: true
        },
		
	},	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<table :id="table_id" :data-entity="entity" class="table datatable-basic table-bordered table-striped table-hover" :ref="id"></table>
	`
});


