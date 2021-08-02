"use strict";
Vue.component("v-form-content", {
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		value: { required: true },
		save_btn: { default: 'Сохранить'},
		cancel_url: { },
		col_class: { default: 'col-md-10' },
		
	},
	
	  
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: { 
	
	
	},

	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {

	
	},

	// ~~~~~~~~~~~~~~~~~~~~~~				mounted
	mounted() {
	
	
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
	<div class="content">
		<div class="row justify-content-center">
			<div :class="col_class">
				<div class="card" v-if="value">
					<div class="card-body">
						<form class="horizonatal" @submit.prevent="$emit('submit', $event)">	
						
							<slot></slot>
							
							<template v-if=" save_btn != '' ">
								<div class="form-separator"></div>


								<div class="form-group row">
									<div class="col">
										<div class="text-left">
											<button @click=" $router.go( -1 ); " type="button" class="btn btn-white legitRipple">Отмена</button>
										</div>
									</div>
									<div class="col">
										<div class="text-right">
											<button class="btn btn-success legitRipple">Сохранить <i class="icon-paperplane ml-2"></i></button>
										</div>							
									</div>								
								</div>
								
							</template>
							
						</form>
					</div>
				</div>	
				<div v-else>
					<div class="alert alert-warning ">
						<h4 class="alert-heading">Не найдено такого объекта!</h4> 
					</div>
				</div>
			</div>
		</div>
	
	</div>	
	`
});