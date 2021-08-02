"use strict";



const env = {
	
	data: { },
	
	computed: {
		role() { return JA.store.session !== undefined ? JA.store.session.role : "public" },	
		session() { return JA.store.session !== undefined ? JA.store.session : false },	
	},
	
	methods: {
		
		getEntity( entity ) {
			switch ( entity ) {
				
				default: 
					if ( JA.store[ entity ] === undefined ) {
						console.error(`[app.getEntityById] entity = "${entity}" not found`);
						return false;
					} else {
						return JA.store[ entity ]
					};
			}			
		},
		
		getEntityById( entity, entity_id ) {
			
			if ( entity_id == 0 ) return false;
			
			if ( JA.store[ entity ] === undefined ) {
				console.error(`[app.getEntityById] entity = "${entity}" not found`);
				return false;
			} else {
				return JA.store[ entity ].find( item => item.id == entity_id )
			};
			
		},

		maxID( data ) {
			let max_id = 0;
			
			data.forEach( item => { if ( +item.id > max_id ) max_id = +item.id; });
		
			return max_id;
		},		
		
		selectOptionsTitle( type, value, default_title ) {
			if ( default_title === undefined ) default_title = 'не задан';
			
			let options = env.methods.selectOptions( type );
			for ( let ind = 0; ind < options.length; ind++ ) {
				let opt = options[ind];
				
				// вложенная optgroup
				if ( opt.value === undefined && opt.items !== undefined ) {
					
					for ( let sub_ind = 0; sub_ind < opt.items.length; sub_ind++ ) {
						let sub_opt = opt.items[sub_ind];
						if ( sub_opt.value == value ) return sub_opt.title;
					};
					
				} else {
					if ( opt.value == value ) return opt.title;
				};
			};
			
			//let item = env.methods.selectOptions( type ).find( item => item.value == value );
			
			return default_title;
		},
		
		logout() {
			axios.defaults.baseURL = '';
			axios.post( "?action=logout" ).then(response => {
				location.href = this.$router.options.base;
			})	.catch(error => {	console.error(error); })	
			return false;	
		},	
		

		dbRows( query, def, log ) {
			var
				res = false,
				parse = env.methods.dbParse( query );
			
			if ( log === undefined ) log = false;
			if ( def === undefined ) def = [];
			
			if ( !parse ) return false;
			if ( log ) console.info(`[db.fetch] parse query = ${query}`, parse );
			
			var pitem = parse[0];
			
			if ( pitem.where === undefined ) {
				res = JA.store[ pitem.entity ]; 
				if ( res === undefined ) {
					if ( log ) console.info(`[db.fetch] пустой результат был приведен к дефолтному виду. query = ${query}`);
					res = def;
				};
			} else {
				var error;
				
				res = JA.store[ pitem.entity ].filter( item => {
					
					let 
						field = pitem.where[0].field,
						value = pitem.where[0].value, 
						cond = pitem.where[0].cond;

					
					// проверяем есть ли такое поле
					if ( item[field] === undefined  ) {
						error = `нет такого поля ${pitem.entity}.${field}`;
						return false;
					} else {
						switch ( cond ) {
							case "==":
							case "=": return item[field] == value; break;
							case ">": return item[field] > value; break;
							case "<": return item[field] < value; break;
							case "!=": return item[field] != value; break;
						}
					}
				});
				
				if ( error ) {
					console.error(`[db.fetch] ${error}. query = ${query}`);
					return false;
				};
				
				if ( res.length == 0 ) {
					if ( log ) console.info(`[db.fetch] пустой результат был приведен к дефолтному виду. query = ${query}`);
					res = def;
				};
				
			};
			
			return res;
			
		},
		
		dbRow( query, def, log ) {
			
			if ( log === undefined ) log = false;
			if ( def === undefined ) def = [];
			
			var res = env.methods.dbRows( query, [], log );
			
			if ( res.length > 0 ) return res[0];
			else return def;
		},
		
		dbRowsClone( query, def, log ) {
			let res = env.methods.dbRows( query, def, log );
			if ( Array.isArray( res ) ) return env.app.cloneCollection( res );
			else return env.app.cloneObject( res );
		},

		dbRowClone( query, def, log ) {
			let res = env.methods.dbRow( query, def, log );
			if ( Array.isArray( res ) ) return env.app.cloneCollection( res );
			else return env.app.cloneObject( res );
		},
		
		dbParse( query ) {
			query = query.trim();
			var parse, res = [];

			// users[id=3], users[title!=dfdfdf]
			parse = query.match(/^\s*(\w+?)\s*\[\s*(\w+?)\s*(=|==|<|>|!=)\s*(.+?)\s*\]\s*$/);
			if ( parse && parse.length == 5) {
				if ( JA.store[ parse[1] ] === undefined ) { console.error(`[db.parse] entity = "${parse[1]}" not found in query=${query}`); return false;	};

				res.push({ 	entity: parse[1], where: [{ field: parse[2], cond: parse[3], value: parse[4] }] });
			
				return res;			
			};
			
			// users[3]
			parse = query.match(/^\s*(\w+?)\s*\[\s*(.+?)\s*\]\s*$/);
			if ( parse && parse.length == 3) {
				if ( JA.store[ parse[1] ] === undefined ) { console.error(`[db.parse] entity = "${parse[1]}" not found in query=${query}`); return false;	};

				res.push({ 	entity: parse[1], where: [{ field: "id", cond: "=", value: parse[2] }] });
			
				return res;			
			};
			
			// users
			parse = query.match(/^\s*(\w+?)\s*$/);
			if ( parse && parse.length == 2) {
				if ( JA.store[ parse[1] ] === undefined ) { console.error(`[db.parse] entity = "${parse[1]}" not found in query=${query}`); return false;	};

				res.push({ 	entity: parse[1] });
			
				return res;			
			};
			
			console.error(`[db.parse] ошибка парсинга. query=${query}`);
			return false;
		},		
		
	},
	
	app: {
		cloneCollection( data ) { return _.map( data, _.clone) },
		cloneObject( data ) { return Object.assign({}, data) },
		
		sys_error( title, text ) {
		
			// title = "[model.commit] " + title;

			let error = {
				type: "error",
				icon: 'icon-warning22',
				addclass: 'alert alert-styled-left alert-arrow-left',
				title: title,
				text: text
			};

			new PNotify( error );			
			
			console.error( title + " - " + text );
		}
	},
	
	server: {
		
		queue: [],

		push: {
			
			replace( type, data, replace_by_key, replace_by_value ) {
				
				if ( data === undefined ) { console.error(`[app.server] add(${method}, ${type}) - data is undefined`); return false; };
				if ( !Array.isArray(data) ) data = [ data ];
			
				env.server.add( "replace", type, data, {key: {name: replace_by_key, "value": replace_by_value} });
			}
			
		},

		add( method, type, data, default_options ) {
			
			if ( data === undefined ) { console.error(`[app.server] add(${method}, ${type}) - data is undefined`); return false; };
			if ( !Array.isArray(data) ) data = [ data ];
			if ( default_options === undefined ) default_options = {};
		
			data.forEach( attr => {
				let item_queue = env.app.cloneObject( default_options );
				
				item_queue.method = method;
				item_queue.type = type;
				item_queue.attr = attr;
				
				env.server.queue.push( item_queue );
			});		
			
		},
		
		clear() {
			this.queue = [];
		},
		
		commit() {


			let send_data = { data: env.server.queue };
			
			env.server.clear();
			
			axios.defaults.baseURL = 'api.php';
			
			axios.post( "/commit", send_data ).then(response => { 

				if ( response.data.errors !== undefined ) {
					response.data.errors.forEach( error => {
						env.pnotify.danger( error.title, error.text );
					});
				};
				
				if ( response.data.data === undefined ) {
					env.pnotify.danger( "Ошибка в ответе", "Не найдено data в ответе" );
					console.info( response.data );
					return false;
				};
				
				for ( let index_req = 0; index_req < response.data.data.length; index_req++ ) {
					
					let req = response.data.data[ index_req ];
				
					// проверка есть ли type в ответе
					if ( req.type === undefined ) {
						console.info( req );
						console.error( "Не найден type или id в одной из строк ответа на запрос uniRequest" );						
						continue;	
					};
				
					// проверка есть ли такой type в хранилище
					if ( JA.store[ req.type ] === undefined ) {
						console.error(`JA.store[ ${req.type} ] не задано`);
						continue;
					};
					
					JA.store[ req.type ] = req.data;
					console.log(`[env.store] full updated ${req.type}`);	
				};
				
				if ( response.data.pnotify !== undefined ) {
					response.data.pnotify.forEach( item => {
						env.pnotify.notice( item );
					});
					
				}
				
			});
			
			
		}
	
	},	


	pnotify: {
		
		options: {
			default: { desktop: { desktop: true, icon: 'images/desctop-icon.png' } },
			success: { type: "success", icon: 'icon-checkmark3' },
			info: { type: "info", icon: 'icon-info22' },
			danger: { type: "danger", icon: 'icon-blocked' },
			warning: { type: "warning", icon: 'icon-warning22' },
		},
		
		notice( params ) {
			
			if ( params.type === undefined ) params.type = "info";
			params = Object.assign( env.pnotify.options[ params.type ]  , params );
			
			if ( params.title == "title" ) delete params.title;
			if ( params.text == "description" ) delete params.text;
			
			PNotify.desktop.permission();
            new PNotify(params);			
		},
		
		success( title, text ) {
			let params = { type: "success"};
			if ( title !== undefined ) params.title = title;
			if ( text !== undefined ) params.text = text;
			env.pnotify.notice( params );
		},
		
		info( title, text ) {
			let params = { type: "info"};
			if ( title !== undefined ) params.title = title;
			if ( text !== undefined ) params.text = text;
			env.pnotify.notice( params );
		},

		error( title, text ) { env.pnotify.danger( title, text ) },

		danger( title, text ) {
			let params = { type: "danger"};
			if ( title !== undefined ) params.title = title;
			if ( text !== undefined ) params.text = text;
			env.pnotify.notice( params );
		},
		
		warn( title, text ) { env.pnotify.warning( title, text ) },

		warning( title, text ) {
			let params = { type: "warning"};
			if ( title !== undefined ) params.title = title;
			if ( text !== undefined ) params.text = text;
			env.pnotify.notice( params );
		},		
	},

	routes: {},
	components: {},
	pages: {},
	dt: {
		table: {

		},
		render: {
			fk: {},

			
			rowNumber: function( data, type, row, meta ) {	
				return meta.row + meta.settings._iDisplayStart + 1;
			},

			detailRow: function( data, type, row, meta ) {	
				let
					$table = $(meta.settings.nTable),
					entity = $table.attr("data-entity"),
					edit_link = $table.attr("data-edit-link") ? $table.attr("data-edit-link") : `${entity}-edit`;
					
					
				return `
					<div class="list-icons-item dropdown">
						<a href="#" class="list-icons-item caret-0 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
							<i class="icon-menu9"></i>
						</a>

						<div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(22px, 16px, 0px);">
							<a href="#" data-id="${row.id}" data-edit-link='${edit_link}' data-entity='${entity}'  class="edit-row-table dropdown-item"><i class="icon-pencil7"></i> Редактировать</a>
							<div class="dropdown-divider"></div>
							<a href="#" data-id="${row.id}" data-entity='${entity}' class="delete-row-table  dropdown-item"><i class="icon-bin"></i> Удалить</a>
						</div>
					</div>	
				`
			},

			date_ru: function( data, type, row, meta ) {	
				if ( type === 'display' ) return moment( data ).format("DD.MM.YYYY");
				else return data;
			},

			date_time_ru: function( data, type, row, meta ) {	
				if ( type === 'display' ) return moment( data ).format("DD.MM.YYYY в HH:mm");
				else return data;
			},

			wrapEdit: function( data, type, row, meta ) {	
				let
					$table = $(meta.settings.nTable),
					entity = $table.attr("data-entity"),
					edit_link = $table.attr("data-edit-link") ? $table.attr("data-edit-link") : `${entity}-edit`;
				
				if ( type === 'display' ) {
					return `<a href="#" data-id="${row.id}" data-edit-link='${edit_link}' data-entity='${entity}'  class="edit-row-table">${data}</a>`;		
				} else return data;
			},
			
			deleteRowIconApprove: function( data, type, row, meta ) {	
				let
					$table = $(meta.settings.nTable),
					entity = $table.attr("data-entity");
				return `
					<a href="#"  onclick="return confirm('Вы действительно хотите удалить?')" data-id="${row.id}" data-entity='${entity}' class="delete-row-table"><i class="icon-bin"></i></a>
				`
			},			
			
		}		
	}
	
};




const def = {
	dt_render: {
		fk: {
			
		}	
	},
	default: {
		entity: {},
		
	},
	dt: {},
};



def.default.datatable = {
	columnDefs: [],
	stateSave: true,
	responsive: true,
	autoWidth: false,
			
	"oSearch": {
		"bSmart": false, 
		"bRegex": true,
		"sSearch": ""                
	},		

			
	"bStateSave": true,
	"fnStateSave": function (oSettings, oData) {
		localStorage.setItem('offersDataTables', JSON.stringify(oData));
	},
	"fnStateLoad": function (oSettings) {
		return JSON.parse(localStorage.getItem('offersDataTables'));
	},	
	

	buttons: {
		dom: {
			button: {
				className: 'btn btn-light'
			}
		},
		buttons: []
	},
	
	/*		
	buttons: {            
		dom: {
			button: {
				className: 'btn btn-light'
			}
		},
		buttons: [
		
		{
			extend: 'print',
			text: '<i class="icon-printer mr-2"></i> Печать',
			className: 'btn bg-danger ml-2'
		},
		{
			extend: 'excel',
			text: '<i class="icon-file-excel mr-2"></i> Excel',
			className: 'btn bg-green ml-2'
		},				
		{
			extend: 'pdf',
			text: '<i class="icon-file-pdf mr-2"></i> PDF',
			className: 'btn bg-orange ml-2'
		},				
		{
			extend: 'csv',
			text: '<i class="icon-upload10 mr-2"></i> Экспорт',
			className: 'btn bg-blue ml-2 mr-4'
		},	
		]
	},
	*/			
	dom: '<"datatable-header"flB><"datatable-scroll-wrap"t><"datatable-footer"ip>',
	language: {
		"processing": "Подождите...",
		"search": "Поиск:",
		"lengthMenu": "Показать _MENU_ записей",
		"info": "Записи с _START_ до _END_ из _TOTAL_ записей",
		"infoEmpty": "Записи отсутствуют.",
		"infoFiltered": "(отфильтровано из _MAX_ записей)",
		"infoPostFix": "",
		"loadingRecords": "Загрузка записей...",
		"zeroRecords": "Записи отсутствуют.",
		"emptyTable": "В таблице отсутствуют данные",
		"aria": {
			"sortAscending": ": активировать для сортировки столбца по возрастанию",
			"sortDescending": ": активировать для сортировки столбца по убыванию"
		},
		paginate: { 'first': 'Первая', 'last': 'Последняя', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' },
		select: {
			rows: {
				"_": "Выбрано записей: %d",
				"0": "Кликните по записи для выбора",
				"1": "Выбрана одна запись"
			}
		}
	}			
};



