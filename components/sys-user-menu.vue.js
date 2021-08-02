"use strict";
Vue.component('sysUserMenu', {
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		//route: { type: Object, required: true },
		//breadcrumb_menu: {type: Array}
		logo: {default: "assets/images/placeholders/placeholder.jpg"},
		name: { required: "true" },
		role: { default: "Администратор" },
		data: { type: Array }
		// :data = "[{'title': 'Мой профиль', 'url': '/profile', 'icon': 'icon-user-plus'}]"

	},
	
	computed: {
		
		avatar() {
			let logo = "assets/images/placeholders/placeholder.jpg";		
			
			if ( this.logo && this.logo != null && this.logo != '' ) logo = this.logo;
			
			return logo;
		}		
		
		
	},
	
	methods: {
		
		logout() {
			this.$parent.logout();
			
		},
		

		
		
	},
	
	mounted() {
		

	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<div class="sidebar-user-material">
			<div class="sidebar-user-material-body">
				<div class="card-body text-center">
					
					<img :src="avatar" class="img-fluid rounded-circle shadow-1 mb-3" width="80" height="80" alt="">
					
					<h6 class="mb-0 text-white text-shadow-dark">{{name}}</h6>
					<span class="font-size-sm text-white text-shadow-dark">{{role}}</span>
				</div>
											

											
				<div class="sidebar-user-material-footer">
					<router-link to="profile" class="d-flex justify-content-between align-items-center text-shadow-dark" data-toggle="collapse"><span>Мой профиль</span></router-link>
				</div>
			</div>


		</div>
	`
});