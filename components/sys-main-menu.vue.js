"use strict";
Vue.component('sysMainMenu', {
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		data: 			{	type: Array },
		// использовать ли роутер ссылки
		use_router: 	{  type: Boolean, default: true}, 
		front: 			{  type: Object}, 
		session: 		{  type: Object, required: true}, 

	},
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
	
		cData() { 
			
			let 
				data = this.front !== undefined ? this.front.data : this.data,
				menu = [];
			
			
			
			data.forEach( ( item, index ) => {
				
				if ( item.id === undefined ) item.id = "muid-" + index;
				if ( item.type === undefined ) item.type = ( item.url === undefined ) ? "section": "url";
				
				if ( item.role === undefined || item.role == "*" || item.role == this.session.role ) {
					menu.push( item );
				};
				
			});

			return menu;
		},
	
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<div class="card card-sidebar-mobile">
			<ul class="nav nav-sidebar" data-nav-type="accordion">
				
				
				<template v-for="item in cData">
					<li v-if="item.type == 'url'" class="nav-item"  :key="item.id">
						
						<template v-if="use_router">
							<router-link :url="item.url" :to = "item.url" class="nav-link">
								<i :class="item.icon"></i><span>{{item.title}}</span>
							</router-link>
						</template>
						<template v-else>
							<a :href="item.url" class="nav-link">
								<i :class="item.icon"></i><span>{{item.title}}</span>
							</a>
						</template>
					</li>	
					<li v-else class="nav-item-header" :key="item.id">
						<div class="text-uppercase font-size-xs line-height-xs">{{item.title}}</div> 
						<i :class="item.icon" :title="item.title"></i>
					</li>
					
				</template>		
				
			</ul>
		</div>
	`
});