"use strict";
Vue.component('sysPageHeader', {
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		route: { type: Object, required: true },
		breadcrumb_menu: {type: Array}
	},
	
	mounted() {
		//console.info( window.location.pathname, JA.store.app.base );
		
	},
	
	computed: {
	
		curr_path() { return window.location.pathname },
		base_path() { return JA.store.app.base },
	
		session() { return JA.store.session },
	},
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<div class="page-header page-header-light">
			<div class="page-header-content header-elements-md-inline">
				<div class="page-title d-flex">
					<h4><i class="icon-newspaper  mr-2"></i> <span class="font-weight-semibold">{{$route.meta.title}}</span></h4>
					<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
				</div>
				
				<template v-if=" session.role == 'client1' ">
					<div class="header-elements d-none">
						<div class="d-flex justify-content-center">
							<router-link to="/" class="btn btn-link btn-float font-size-sm font-weight-semibold text-default legitRipple">
								<i class="icon-comment-discussion text-pink-300"></i>
								<span>Главная</span>
							</router-link>							
							<router-link to="/profile" class="btn btn-link btn-float font-size-sm font-weight-semibold text-default legitRipple">
								<i class="icon-user-check text-pink-300"></i>
								<span>Профиль</span>
							</router-link>
						</div>
					</div>
				</template>		
			</div>


		
		</div>		
	`
});