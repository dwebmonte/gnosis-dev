/*
	version 1.0
*/


"use strict";

axios.defaults.baseURL = 'index.php';
const token = localStorage.getItem('user-token')
if (token) {
	axios.defaults.headers.common['Authorization'] = token
}


const JA = {
	
	log: true,
	entities: [],
	routes: [],
	
	store: {_old: {}},
	

	getters: {},
	watch: {},
	mutations: {},
	actions: {},
	
	

	
	
	
	model: {
		get( _fields, _where = {} ) {
			var res = "", rows = [], table, fields;
			
			//if ( opt.fields === undefined ) { console.error("[JA.model.get] opt.fields - обязательное поле "); return false; };
			
			if ( typeof( _fields ) == 'string' ) {
				
				fields = [
					_fields.split(".").length == 1 ? 
						{ table: _fields.trim(), name: '*' } : 
						{ table: _fields.split(".")[0].trim(), name: _fields.split(".")[1].trim() }
				];	
				
				table = fields[0].table;
				
			} else {
			
				fields = _fields.map( R => { 
					let res;
					
					if ( R.split(".").length == 1 ) res = { table: table, name: R.trim() }
					else {
						res = { table: R.split(".")[0].trim(), name: R.split(".")[1].trim() };
						table = res.table;
					};
						
					return res;	
				});
			};

			

			if ( _where == "" || _where == {} ) {
				if ( JA.store[ table ] === undefined) console.error(`[JA.model.get] JA.store[ "${table}" ] не существует `);
				else rows = JA.store[ table ];
			} else {
				if ( JA.store[ table ] === undefined) console.error(`[JA.model.get] JA.store[ "${table}" ] не существует `);
				else 
					rows = JA.store[ table ].filter( R => {
						let res = true;
						
						for ( let name in _where ) if ( R[ name ] != _where[ name]  ) res = false; 
						
						return res;
					});	
			}
			
			
			res = rows.map( R => {
				
				let out = {};
				fields.forEach( F => {   
					if ( F.table == table ) {
						if ( F.name == "*" ) out = R; else {
							if ( R[ F.name ] !== undefined ) out[ F.name ] = R[ F.name ];
							else console.error(`[JA.model.get] JA.store[ "${table}" ] не имеет поля "${F.name}" `);
						}
					}
				});
				
				return out;	
			})
			
			return res;
		},

		getValue( _fields, _where = {} ) {
			let res = "", rows = JA.model.get( _fields, _where );
			
			console.info( _fields, _where, rows );
			
			if ( rows.length > 0 ) for ( let name in rows[0] ) res = rows[0][ name ];

			return res;
		},
		
		
		
		
		
		
		/*
		// users.table by users.id
		relValue( str_field, value, default_value = "" ) {
			let 
				table, field, table_by, rows, 
				field_by = "id", 
				parts_by = str_field.split(" by "),
				res = default_value;
			
			if ( parts_by.length == 2 ) {
				
				// users.avatar by ...
				if ( parts_by[0].split(".").length == 2 ) {
					table = parts_by[0].split(".")[0].trim();
					field = parts_by[0].split(".")[1].trim();
					
					if ( parts_by[1].split(".").length == 2 ) {
						table_by = parts_by[1].split(".")[0].trim();
						field_by = parts_by[1].split(".")[1].trim();
					} else {
						table_by = table;
						field_by = parts_by[1].trim();
					};					
					
				} else {
					// options by order.status	
					table = parts_by[0].trim();
					if ( table == "options" ) {
						field = "title";
						table_by = table;
						field_by = "value";
						
					} else {
						console.error(`[JA.relValue]: achtung`);
					}
					
				}
				
				
				
				

				
			} else {
				
				table = table_by = str_field.split(".")[0].trim();
				field = str_field.split(".")[1].trim();
				
			};
			
			
			
			
			if ( rows.length == 1 ) res = rows[0][ field ];
			else {
				console.error(`[JA.relValue]: ${table}.${field} по ${table_by}.${field_by} == "${value}" найдено ${rows.length} строк`);
			};
			
			if ( JA.store[ table ] === undefined ) console.error( `[JA.relValue]: JA.store[ "${table}" ] не существует` );
			else if ( JA.store[ table ][ row_id ] === undefined ) console.error( `[JA.relValue]: JA.store[ "${table}" ][ ${[ row_id ]} ] не существует` );
			else if ( JA.store[ table ][ row_id ][ field ] === undefined ) console.error( `[JA.relValue]: JA.store[ "${table}" ][ ${[ row_id ]} ][ "${field}" ] не существует` );
			else res = JA.store[ table ][ row_id ][ field ];
			
			return res;			
			
			
		}
					*/

	},
	
	
	
	
	action: () => {
		JA.entities.forEach(function (entity) {
			
			if ( entity.request !== null ) {
			
				JA.actions[ entity.request ] = function() {

					axios.get( entity.request ).then(response => {
						let data = JA.getResponseData(response, entity.name);
						JA.mutations[ "set_" + entity.name ]( data );
					})
					.catch(error => {	console.error(error); })
					
				};
			
				JA.actions[ entity.request ]();
			
			};
		});
	},		
	
	
	addStore( custom_store ) {
		
		
		
		for ( let entity_name in custom_store ) {	
		
			// ~~~~~~~~~~~~			store
			JA.store[ entity_name ] = custom_store[ entity_name ];
			JA.store["_old"][ entity_name ] = custom_store[ entity_name ];
			//JA.store[ entity_name ] = _.map(custom_store[ entity_name ], _.clone);
			//JA.store["_old"][ entity_name ] = _.map(custom_store[ entity_name ], _.clone);
		};
	},

	
	getResponseData(response, entity_name) {
		
		var 
			data = null,
			entity = JA.entities.filter( (item) => item.name == entity_name)[0]; 
		
		data = (entity.output == "object" ) ? {} : [];
		
		if ( response.data.data ) {
			response.data.data.forEach(item => 	{ 
				if (item.type == entity.name) {
					if ( entity.output == "object" ) data[ item.id ] = _.clone(item.attributes); else data.push( _.clone(item.attributes) );
				};
			}) ;
		};
			
		return data;
	},
	
	
	compareEnities( entity_name, after, before ) {
		var
			entity = JA.entities.filter( (item) => item.name == entity_name)[0],
			data = { 
				patch: [], delete: [], post: [], 
				changed: false,  
			},
			oAfter = {}, oBefore = {}, row_update = {};					
		
		if ( before !== null ) {
			
			// преобразовываем массивы в объекты
			if ( entity.output == "array" ) {
				after.forEach( item => oAfter[ item[ entity.key ] ] = _.clone(item)	);
				before.forEach( item => oBefore[ item[ entity.key ] ] = _.clone(item)	);
			} else {
				oAfter = _.clone( after );
				oBefore = _.clone( before );
			};
			
			for (var key in oAfter) {
				
				// post	
				if ( oBefore[key] === undefined ) {
					row_update = { type: entity.name, attributes: _.cloneDeep( oAfter[key] ) };
					
					if ( oAfter[ key ][ entity.key ] !== undefined ) {
						row_update.id = oAfter[ key ][ entity.key ];
						delete row_update.attributes[ entity.key ];
					};
					
					data.post.push( row_update ); 
				
				// patch
				} else if ( !_.isEqual(oAfter[key], oBefore[key]) ) {
					row_update = { id: key, type: entity.name, attributes: {} };
					
					for (var field in oAfter[key]) {
						if ( oAfter[key][ field ] !== oBefore[key][ field ] ) row_update.attributes[ field ] = oAfter[key][ field ];
					};
					
					data.patch.push( row_update );
				}
			};		
			
			// delete
			for (var key in oBefore) {
				if ( oAfter[key] === undefined ) {
					data.delete.push( { id: key, type: entity.name } );
				};
			};
		
			if ( data.post.length > 0 || data.patch.length > 0 || data.delete.length > 0 ) data.changed = true;
		} else {
			if ( after !== null ) data.changed = "all";
		};

		return data;	
	},
	
	prepare( new_entites ) {
		
		JA.entities = new_entites;
		
		
		
		JA.entities.forEach( (entity, index) => {
			
			if ( entity.key === undefined ) JA.entities[index].key = entity.key = "id";
			if ( entity.request === undefined ) {
				JA.entities[index].request = ( entity.key !== null ) ? entity.name : null;
			}
			
			if ( entity.output === undefined ) {
				if ( entity.key !== null ) {
					JA.entities[index].output = entity.output = ( entity.key == "id" ) ? "array" : "object";
				} else {
					
					if ( entity.store instanceof Array ) entity.output = "array";
					else if ( entity.store instanceof Object ) entity.output = "object";
					else {
						console.error("[jsonapi] свойство store не является ни объектом ни массивом", entity);	
					};
					
				}
			} 
			
			// ~~~~~~~~~~~~			store
			if ( JA.store[ entity.name ] === undefined ) {
				
				if ( entity.store === undefined ) {
					
					if ( entity.output == "object" ) JA.store[ entity.name ] = {}; else JA.store[ entity.name ] = [];
					JA.store["_old"][ entity.name ] = null;
					
				} else {
					
					if ( entity.output == "object" ) {
						JA.store[ entity.name ] = _.cloneDeep(entity.store);
						JA.store["_old"][ entity.name ] = _.cloneDeep(entity.store);		
					} else {
						JA.store[ entity.name ] = _.map(entity.store, _.clone);
						JA.store["_old"][ entity.name ] = _.map(entity.store, _.clone);		
					};
						

				};
			};
			

			// ~~~~~~~~~~~~			getters
			JA.getters[ entity.name ] = {
				get() {
					return JA.store[ entity.name ];
				},
				set( value ) {
					JA.store[ entity.name ] = value;
				}
			};
			
			// ~~~~~~~~~~~~			mutations
			
			
			JA.mutations[ "delete_" + entity.name ] = (key, sync_old = false ) => {
				
				if ( JA.log ) console.info(`JA.mutations.delete_${entity.name}()`, key);
				
				if ( entity.output === "object" ) {
					if ( sync_old ) delete JA.store["_old"][ entity.name ][ key ];
					delete JA.store[ entity.name ][ key ];
				} else if ( entity.output === "array" ) {
					if ( sync_old ) JA.store["_old"][ entity.name ].splice(key, 1);
					JA.store[ entity.name ].splice(key, 1);
				} else console.error(`Unknown output = ${entity.output}`);				
				
				
			},
			
			JA.mutations[ "set_" + entity.name ] = (value, key, field, sync_old = false ) => {
				
				if ( JA.log ) console.info(`JA.mutations.set_${entity.name}( ${value}, ${key}, ${field} )`);

				
				if ( key === undefined || key === null) {
					
					if ( sync_old ) JA.store["_old"][ entity.name ] = value;
					JA.store[ entity.name ] = value;
					
				} else if ( field === undefined  || field === null) {
					
					if ( sync_old ) JA.store["_old"][ entity.name ][ key ] = value;
					
					if ( entity.output === "object" ) 		JA.store[ entity.name ][ key ] = value;
					else if ( entity.output === "array" ) 	JA.store[ entity.name ].splice(key, 1, value);
					else console.error(`Unknown output = ${entity.output}`);
					
				} else {
					
					if ( sync_old ) JA.store["_old"][ entity.name ][ key ][ field ] = value;


					if ( entity.output === "object" ) 		JA.store[ entity.name ][ key ][ field ] = value;
					else if ( entity.output === "array" ) 	{
						let new_row = JA.store[ entity.name ][ key ];
						new_row[ field ] = value;
						
						JA.store[ entity.name ].splice(key, 1, new_row);
						
					} else console.error(`Unknown output = ${entity.output}`);
					
				};
			};
			
			JA.mutations[ "set_" + entity.name + "_by_id" ] = (value, id, field, sync_old = false ) => {
				if ( id == undefined ) JA.mutations[ "set_" + entity.name ](value, undefined, field, sync_old );
				else {
					
					let found_index = null;
					
					JA.store[ entity.name ].forEach( (item, index) => {
						if ( item.id == id ) found_index = index;
					});
					
					if ( found_index === null ) console.error("Achtung 2");
					else JA.mutations[ "set_" + entity.name ](value, found_index, field, sync_old );
					
				};
			};
			
			// ~~~~~~~~~~~~			watch
			
			JA.watch[ entity.name ] = {
				handler: ( after, before ) => {
		
					let data = JA.compareEnities( entity.name, after, JA.store["_old"][entity.name] );
					if ( JA.log ) console.info(`JA.watch.${entity.name}()`);
					
					console.info(data);
					
					// send patch
					if ( data.patch.length > 0 ) {
						data.patch.forEach(function (params, index) {
							axios.patch( entity.name, params ).then(response => {}).catch(error => {	console.error(error); })
						});
					};
					
					// send delete
					if ( data.delete.length > 0 ) {
						data.delete.forEach(function (params, index) {
							axios.delete( entity.name + "/" + params.id ).then(response => {}).catch(error => {	console.error(error); })
						});
					};					
					
					// send post
					if ( data.post.length > 0 ) {
						data.post.forEach(function (params, index) {
							axios.post( entity.name, params ).then(response => { 
								
								// обновляем добавленную запись
								if ( response.status == 201 ) {
									// перебираем данные ответа
									response.data.data.forEach(item_response => 	{ 
										// если нужный нам тип
										if (item_response.type == entity.name) {
											// перебираем хранилище
											JA.getters[ entity.name ]().forEach(function (item_store, index_store) {
												// перебираем id записи в хранилище совпадает возвращаемой
												if ( item_store[ entity.key ] === item_response.id ) {
													if ( entity.output == "object" ) {
														JA.mutations["set_" + entity.name](_.clone(item_response.attributes), index_store, null, true);		
													} else {
														JA.mutations["set_" + entity.name](_.clone(item_response.attributes), index_store, null, true);		
													};
													
												};
											});
											
										};
									}) ;									
								}
							})
							.catch(error => {	console.error(error); })
						});
					};

					
					// обновляем старое значение	
					JA.store["_old"][ entity.name ] = ( entity.output == "array" ) ? _.map(after, _.clone) :  _.cloneDeep( after );		
				},
				deep: true
			};
			
		});
		
		JA.store = Vue.observable( JA.store );
	}
};

