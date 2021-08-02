"use strict";
Vue.component('sysNoticeDropdown', {
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		title: { type: String },
		icon_title: { type: String },
		arrow: { type: Boolean, default: false}
	},
	
	
	computed: {
		
		session() {
			return JA.store["session"];
		
		},
		
		data() {
			let res = JA.store["sys_notices"].filter( R => { return R.user_id == 0 || this.session.id == R.user_id });
			return res;
		},
		
	},
	
	mounted() {
		
		var Vue = this;
		
		$(document).ready(function()  {
			JA.store["sys_notices"].filter( R => { return R.notify != 'none' && R.user_id == Vue.session.id }).forEach( R => {
				new PNotify({
					text: R.text, 
					type: R.notify, 
					icon: R.icon,
					buttons: {
						closer: true,
						sticker: false
					}
				});
				JA.mutations["set_sys_notices_by_id"]('none', R.id, 'notify');
			})
		});
	},	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<li class="nav-item dropdown">
			<a href="#" :class="{'dropdown-toggle': arrow}"  class="navbar-nav-link" data-toggle="dropdown">
				<i class="icon-pulse2 mr-2"></i>
				<span class="badge badge-pill bg-warning-400 ml-auto ml-md-0">{{data.length}}</span>
				{{title}}
				
			</a>
			
			<div class="dropdown-menu dropdown-menu-right dropdown-content wmin-md-350">
				<div class="dropdown-content-header">
					<span class="font-size-sm line-height-sm text-uppercase font-weight-semibold">{{icon_title}}</span>
					<a href="#" class="text-default"><i class="icon-search4 font-size-base"></i></a>
				</div>

				<div class="dropdown-content-body dropdown-scrollable">
					<ul class="media-list">
						<li class="media" v-for="item in data" :key="item.id">
							<div class="mr-3" v-if="item.icon">
								<a href="#" :class=" 'bg-' + item.color + '-400' " class="btn rounded-round btn-icon"><i :class="item.icon"></i></a>
							</div>

							<div class="media-body">
								{{item.text}}
								<div class="font-size-sm text-muted mt-1">{{item.time|fromnow}}</div>
							</div>
						</li>
					</ul>
				</div>

				<div class="dropdown-content-footer bg-light">
					<!--
					<a href="#" class="font-size-sm line-height-sm text-uppercase font-weight-semibold text-grey mr-auto">All activity</a>
					<div>
						<a href="#" class="text-grey" data-popup="tooltip" title="Clear list"><i class="icon-checkmark3"></i></a>
						<a href="#" class="text-grey ml-2" data-popup="tooltip" title="Settings"><i class="icon-gear"></i></a>
					</div>
					-->
				</div>
				
			</div>
		</li>
	`
}); 
 
 
/*

						<li class="media">
							<div class="mr-3">
								<a href="#" class="btn bg-pink-400 rounded-round btn-icon"><i class="icon-paperplane"></i></a>
							</div>
							
							<div class="media-body">
								Special offers have been sent to subscribed users by <a href="#">Donna Gordon</a>
								<div class="font-size-sm text-muted mt-1">36 minutes ago</div>
							</div>
						</li>

						<li class="media">
							<div class="mr-3">
								<a href="#" class="btn bg-blue rounded-round btn-icon"><i class="icon-plus3"></i></a>
							</div>
							
							<div class="media-body">
								<a href="#">Chris Arney</a> created a new <span class="font-weight-semibold">Design</span> branch in <span class="font-weight-semibold">Limitless</span> repository
								<div class="font-size-sm text-muted mt-1">2 hours ago</div>
							</div>
						</li>

						<li class="media">
							<div class="mr-3">
								<a href="#" class="btn bg-purple-300 rounded-round btn-icon"><i class="icon-truck"></i></a>
							</div>
							
							<div class="media-body">
								Shipping cost to the Netherlands has been reduced, database updated
								<div class="font-size-sm text-muted mt-1">Feb 8, 11:30</div>
							</div>
						</li>

						<li class="media">
							<div class="mr-3">
								<a href="#" class="btn bg-warning-400 rounded-round btn-icon"><i class="icon-comment"></i></a>
							</div>
							
							<div class="media-body">
								New review received on <a href="#">Server side integration</a> services
								<div class="font-size-sm text-muted mt-1">Feb 2, 10:20</div>
							</div>
						</li>

						<li class="media">
							<div class="mr-3">
								<a href="#" class="btn bg-teal-400 rounded-round btn-icon"><i class="icon-spinner11"></i></a>
							</div>
							
							<div class="media-body">
								<strong>January, 2018</strong> - 1320 new users, 3284 orders, $49,390 revenue
								<div class="font-size-sm text-muted mt-1">Feb 1, 05:46</div>
							</div>
						</li>
						
	
*/						
 
 
 
 
 
 
 /*
 

			<li class="nav-item dropdown">
					<a href="#" class="navbar-nav-link dropdown-toggle caret-0" data-toggle="dropdown">
						<i class="icon-bubbles4"></i>
						<span class="d-md-none ml-2">Messages</span>
						<span class="badge badge-pill bg-warning-400 ml-auto ml-md-0">2</span>
					</a>
					
					<div class="dropdown-menu dropdown-menu-right dropdown-content wmin-md-350">
						<div class="dropdown-content-header">
							<span class="font-weight-semibold">Messages</span>
							<a href="#" class="text-default"><i class="icon-compose"></i></a>
						</div>

						<div class="dropdown-content-body dropdown-scrollable">
							<ul class="media-list">
								<li class="media">
									<div class="mr-3 position-relative">
										<img src="{$smarty.const.ASSETS_PATH}/images/placeholders/placeholder.jpg" width="36" height="36" class="rounded-circle" alt="">
									</div>

									<div class="media-body">
										<div class="media-title">
											<a href="#">
												<span class="font-weight-semibold">James Alexander</span>
												<span class="text-muted float-right font-size-sm">04:58</span>
											</a>
										</div>

										<span class="text-muted">who knows, maybe that would be the best thing for me...</span>
									</div>
								</li>

								<li class="media">
									<div class="mr-3 position-relative">
										<img src="{$smarty.const.ASSETS_PATH}/images/placeholders/placeholder.jpg" width="36" height="36" class="rounded-circle" alt="">
									</div>

									<div class="media-body">
										<div class="media-title">
											<a href="#">
												<span class="font-weight-semibold">Margo Baker</span>
												<span class="text-muted float-right font-size-sm">12:16</span>
											</a>
										</div>

										<span class="text-muted">That was something he was unable to do because...</span>
									</div>
								</li>

								<li class="media">
									<div class="mr-3">
										<img src="{$smarty.const.ASSETS_PATH}/images/placeholders/placeholder.jpg" width="36" height="36" class="rounded-circle" alt="">
									</div>
									<div class="media-body">
										<div class="media-title">
											<a href="#">
												<span class="font-weight-semibold">Jeremy Victorino</span>
												<span class="text-muted float-right font-size-sm">22:48</span>
											</a>
										</div>

										<span class="text-muted">But that would be extremely strained and suspicious...</span>
									</div>
								</li>

								<li class="media">
									<div class="mr-3">
										<img src="{$smarty.const.ASSETS_PATH}/images/placeholders/placeholder.jpg" width="36" height="36" class="rounded-circle" alt="">
									</div>
									<div class="media-body">
										<div class="media-title">
											<a href="#">
												<span class="font-weight-semibold">Beatrix Diaz</span>
												<span class="text-muted float-right font-size-sm">Tue</span>
											</a>
										</div>

										<span class="text-muted">What a strenuous career it is that I've chosen...</span>
									</div>
								</li>

								<li class="media">
									<div class="mr-3">
										<img src="{$smarty.const.ASSETS_PATH}/images/placeholders/placeholder.jpg" width="36" height="36" class="rounded-circle" alt="">
									</div>
									<div class="media-body">
										<div class="media-title">
											<a href="#">
												<span class="font-weight-semibold">Richard Vango</span>
												<span class="text-muted float-right font-size-sm">Mon</span>
											</a>
										</div>
										
										<span class="text-muted">Other travelling salesmen live a life of luxury...</span>
									</div>
								</li>
							</ul>
						</div>

						<div class="dropdown-content-footer justify-content-center p-0">
							<a href="#" class="bg-light text-grey w-100 py-2" data-popup="tooltip" title="Load more"><i class="icon-menu7 d-block top-0"></i></a>
						</div>
					</div>
				</li>

	
				
*/
 
 
 
 
