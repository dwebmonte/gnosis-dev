"use strict";

Vue.component('d-filepond', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {

		value: {  },
		id: { type: String },
		title: { type: String, default: `Выберите файл`}, 
		
		max_files: { type: Number, default: 1	 },
		img_preview: { type: Boolean, default: true },
		
		
		log: { default: false	 }
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			pond: null,
		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
	

	},
	
	
	methods: {
		
		updateValue() {
			let value = ( this.max_files == 1 ) ? null : [];
			
			this.pond.getFiles().forEach( item => { 
				//value.push({ id: item.serverId, name: item.filename }) 	
				if ( this.max_files == 1 ) {
					value = item.serverId;
				} else {
					value.push( item.serverId ); 	
				};
			});
			
			if ( value !== this.value ) this.$emit('input', value);
			
			if ( this.log ) console.info( this.value );
		}
		
	},
	
	
	beforeDestroy() {
		FilePond.destroy( this.$refs.filepond );
		// this.pond.destroy( this.$refs.filepond );
	},
	
	
	updated() {
		if ( this.log ) console.log("updated");
		if ( this.log ) console.info( this.value );
		
	},
	
	
	mounted() {
		
		
		
		
		
/*
	labelButtonDownloadItem: 'custom label', // by default 'Download file'
	allowDownloadByUrl: false, // by default downloading by URL disabled			
	//imagePreviewHeight: 170,
	//imageCropAspectRatio: '1:1',
	//imageResizeTargetWidth: 200,
	//imageResizeTargetHeight: 200,
	//stylePanelLayout: 'compact circle',
	//  styleLoadIndicatorPosition: 'center bottom',
	// styleProgressIndicatorPosition: 'right bottom',
	//styleButtonRemoveItemPosition: 'right top',
	//  styleButtonProcessItemPosition: 'right bottom',	
	

*/	
		let pond_config = {
			labelIdle: this.title,
			server: {
				url: 'api.php?filepond',
				process: { 	onload: (response) => { return response }, },
		

			},
			allowImagePreview: this.img_preview,
			onprocessfile: (error, file) => { this.updateValue()  },			
			onupdatefiles: (files) => { this.updateValue() },
		}

		var 
			files = [],
			sources = this.value;
		if ( !Array.isArray( sources ) ) sources = [ sources ];
		
		sources.forEach( source_id => {

			if ( +source_id == source_id ) {
				
				files.push({
					source: source_id,
					options: {
						type: 'local'
					}						
				});
				
			} else {
				let type = typeof source_id ;
				if ( this.log ) console.error(`wrong type="${type}" for source_id = \"${source_id}\"`);	
			}
		});
		
		if ( files.length > 0 ) pond_config.files = files;
		
		this.pond = FilePond.create( this.$refs.filepond, pond_config );		

	},

/*
			data-allow-reorder="true"
			data-max-file-size="3MB"
*/

	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<input type="file" 
			:id="id" 
			ref='filepond'
			:multiple=" max_files > 1 "
			:data-max-files="max_files"		
		>

	`
});


