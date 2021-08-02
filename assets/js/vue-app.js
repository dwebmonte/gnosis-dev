"use strict";

var 
	role_user = env.computed.role(),
	routes = [];

if ( env.routes[ role_user ] === undefined ) {
	console.error(`В роутере не задана роль ${role_user}`);
};




env.routes[ role_user ].forEach( route_url => {
	
	if ( route_url.path === undefined ) console.error(`path not found`);
	else if ( route_url.title === undefined ) console.error(`title not found`);
	else if ( route_url.title === undefined ) console.error(`title not found`);
	else {
		
		let ja_route = { path: route_url.path, meta: { "title": route_url.title } };

		if ( route_url.redirect !== undefined ) {
			ja_route.redirect = route_url.redirect;
		} else {
			
			
			if ( env.pages[ route_url.component ] === undefined ) {
				console.error(` Не найдена страница env.pages[ "${route_url.component}" ] для роутера`);
				return false;
			} else {
				ja_route.component = env.pages[ route_url.component ] ;
			};
			
		} 
		
		if ( route_url.props !== undefined ) ja_route.props = route_url.props;
		routes.push( ja_route );
		
	}
	
});

const router = new VueRouter({
    base: JA.store.app.base,
    mode: 'history',	
	routes: routes,
	linkActiveClass: "",
	linkExactActiveClass: "active",	
});

	
router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next()
})	


var Vue = new Vue({
	el: '#app-container',
	router,
	
	computed: {
		...JA.getters,
		...env.computed,
		
		front() { return JA.store.front },
	},
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			// max_entities_id: {},
		}
	},	
	
	methods: {
		...env.methods,
		
		// ~~~~~~~~~~~~~~~~~~~			notify	
		notify( params ) {
			if ( !params.type ) params.type = "success";
            new PNotify( params );		
		},		
		
		desk( params ) {
			
			if ( !params.type ) params.type = "success";
			
			let desktop_options = {
				desktop: true,
				addclass: 'bg-green border-green',
				icon: 'assets/images/pnotify/default.png'				
			};
			
            PNotify.desktop.permission();
			new PNotify({
                title: params.title,
				type: params.type,
                text: params.text,
                desktop: desktop_options
            });			
			
		},
		
		...JA.mutations
	},

	watch: {
		//...JA.watch
	},

	created() {
		//JA.action( );
	},
	
	mounted() {
		
		var Vue = this;
		
		// редактирование
		$(document).on('click', '.edit-row-table', function () {
			let 
				$this = $(this),
				row_id = $this.attr("data-id"),
				entity = $this.attr("data-entity"),
				edit_link = $this.attr("data-edit-link") ? $this.attr("data-edit-link") : `${entity}-edit`;
			
			
			Vue.$router.push({ path: `/${edit_link}?id=${row_id}` });
			
			return false;
		});		

		// удаление
		$(document).on('click', '.delete-row-table', function () {
			
			let 
				$this = $(this),
				entity = $this.attr("data-entity"),
				row_id = $this.attr("data-id");
			
			// entity, row_id: int;

			
			if ( entity == "" ) console.error("entity not defined");	
			else if ( row_id == "" ) console.error("row_id not defined");	
			else {
				env.server.add( "delete", entity, { "id": row_id } ); 
				env.server.commit();
			};
			/*
			JA.store[ name ].forEach(function (item, index) {
				if ( item.id == row_id ) JA.store[ name ].splice(index, 1);
			});
			*/
							
			return false;
		});


		// replace project
		$(document).on('click', '.replace-project-table', function () {
			let 
				$this = $(this),
				row_id = $this.attr("data-id");
			
			
			Vue.$router.push({ path: `/project-replace?id=${row_id}` });
			
			return false;
		});
		
		$(document).on('click', '.btn-start-test', function () {
			
			let 
				$this = $(this),
				row_id = $this.attr("data-id");
				
			
			Vue.$router.push({ path: `/test?id=${row_id}` });
			
			return false;
		});





	},
});


