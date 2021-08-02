env.data.eth_api = {
	key: '1TSEZZWRAPE332SGK4TPU7NYDSX71W2AD4',
	wallet: '0x84e30B7A76e88348f044F8844017011BceB902a6',
	
	balance1: "-"
};

	



env.methods.selectOptions = function( type ) {
	var res;	
	
	switch ( type ) {

		case "role": 
			res = JA.store.user_roles.map( item => { return { value: item.id, title: item.title } });
		break;

	
		default: console.error(`Unknown type=\"${type}\"`);
	};
	
	
	return res;	
};
		
env.methods.autocompleteOptions = function( type ) {
	var res = [];
	
	switch ( type ) {
		

	
		default: console.error(`Unknown type=\"${type}\"`);
	};
	
	return res;			
};
		

		
env.routes = {		
	
	"bank": [
		// { path: '/', title: 'Bank Interface Demo', component: "demo_home", props: { entity: "votes", method: "post" }  },		
		
		{ path: '/', title: 'Common Info', component: "stat1", props: { entity: "votes", method: "post" }  },
		{ path: '/demo', title: 'Bank Interface Demo', component: "demo_home", props: { entity: "votes", method: "post" }  },
		{ path: '/transaction-demo', title: 'Transaction Demo', component: "transaction_demo", props: { entity: "votes", method: "post" }  },
		{ path: '/deploy-demo', title: 'Deploy Contract Demo', component: "deploy_demo", props: { entity: "votes", method: "post" }  },
		{ path: '/contracts', title: 'Запись данных в контракт', component: "contracts_demo", props: { entity: "votes", method: "post" }  },
		

		{ path: '/*', title: 'Страница не найдена', component: "error404" },
	],
	
	"public": [
		{ path: '/*', title: 'Авторизация на сайте', component: "login_admin" },
	],
	
};	


env.dt.render.detailDeleteRow = function( data, type, row, meta ) {	
	let
		$table = $(meta.settings.nTable),
		entity = $table.attr("data-entity");
		
	return `
		<div class="list-icons-item dropdown">
			<a href="#" class="list-icons-item caret-0 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				<i class="icon-menu9"></i>
			</a>

			<div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(22px, 16px, 0px);">
				<a href="#" data-id="${row.id}" data-entity='${entity}' class="delete-row-table  dropdown-item"><i class="icon-bin"></i> Удалить</a>
			</div>
		</div>	
	`
};

env.dt.render.reestrError = function( data, type, row, meta ) {	
	return env.methods.selectOptionsTitle("reestr_errors", data);
};

env.dt.render.votes_res = function( data, type, row, meta ) {	

	//var props = env.methods.getVoteProps( row.id );
	//return `<a data-id="${row.id}" href="#" class="link_votes_res">${props.count_voted} голосов</a>`;
	return `<a title="Результаты голосвания" data-id="${row.id}" href="#" class="link_votes_res"><i style="color: orange;" class="icon-newspaper"></i></a>`;
};

env.dt.render.vote_by = function( data, type, row, meta ) {	

	var props = env.methods.getVoteProps( row.id );
	return `<a title="Проголосовать за другого пользователя" data-id="${row.id}" href="#" class="link_vote_by"><i style="color: green;" class="icon-user-check"></i></a>`;
};


 


env.dt.render.fk.user_id = function( data, type, row, meta ) {	
	let item = JA.store.users.find( item => item.id == row.user_id );
	return item !== undefined ? item.firstname : "не задан";
};

env.dt.render.fk.client_status = function( data, type, row, meta ) {	
	return env.methods.selectOptionsTitle( "client.status", data );
};

env.dt.render.fk.role = function( data, type, row, meta ) {	
	let item = JA.store.user_roles.find( item => item.id == row.role );
	return item !== undefined ? item.title : "не задан";
};

env.dt.render.fk.owner_types_id = function( data, type, row, meta ) {	
	let item = JA.store.owner_types.find( item => item.id == data );
	return item !== undefined ? item.title : "не задан";
};


env.dt.table.ip_logs = {	
	columnDefs: [
		{ name: "id", title: "<i class='icon-menu9'></i>", render:  env.dt.render.detailRow, width: "1%", sortable: false },
		{ name: "host",  title: "Хост", width: "1%",  },
		{ name: "ip", title: "IP", width: "1%", },
		{ name: "platform", title: "Платформа", },
		{ name: "browser", title: "Браузер", },
		{ name: "version", title: "Версия", },
		{ name: "user_id", title: "Пользователь", render: env.dt.render.fk.user_id},
		{ name: "time_created", title: "Когда", render: env.dt.render.date_time_ru, width: "1%"},
	],
	"order": [[ 7, "desc" ]]
};

env.dt.table.users = {	
	columnDefs: [
		{ "name": "id", title: "<i class='icon-menu9'></i>", render:  env.dt.render.detailRow, width: "1%", sortable: false },
		{ "name": "id", "title": "№", width: "1%" },
		{ "name": "firstname", "title": "ФИО" },
		{ "name": "login", "title": "Логин" },
		{ "name": "password", "title": "Пароль" },
		{ "name": "role", "title": "Роль", render: env.dt.render.fk.role, width: "1%" },
		{ "name": "time_created", "title": "Создан", render: env.dt.render.date_time_ru, width: "1%" },		
	],
	"order": [[ 1, "desc" ]]
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

if ( JA.store.session !== undefined ) {
	$.extend( $.fn.dataTable.defaults, def.default.datatable );
};