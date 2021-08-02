<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


	<link rel="shortcut icon" href="assets/images/favicon.png" type="image/png">
	<!-- Global stylesheets -->
	
	<link href="assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
	
	
	<link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/bootstrap_limitless.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/layout.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/components.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/colors.min.css" rel="stylesheet" type="text/css">
	<!-- /global stylesheets -->
	<link href="assets/css/template.css?v<?=time()?>" rel="stylesheet" type="text/css">
	<link href="assets/css/styles.css?v<?=time()?>" rel="stylesheet" type="text/css">
	

	<!-- Core JS files -->
	<script src="assets/js/main/jquery.min.js"></script>
	<script src="assets/js/main/jquery-ui.1.12.1.js"></script>
	
	
	
	<script src="assets/js/main/bootstrap.bundle.min.js"></script>
	<script src="assets/js/plugins/ui/ripple.min.js"></script>
	<!-- /core JS files -->
	
	
	
	

	

	<!-- Vue JS files -->
	<script src="assets/js/plugins/lodash/lodash.min.js"></script>	
	<script src="assets/js/vue/axios.min.0.19.2.js"></script>
	<script src="assets/js/vue/vue-dist.2.6.11.js"></script>	
	<script src="assets/js/vue/vue-router.3.3.1.min.js"></script>
	<script src="assets/vue/JA.js?v<?=time()?>"></script>
	<!-- /vue JS files -->
	
	<!-- Plugins JS files -->
	<script src="assets/js/plugins/tables/datatables/datatables.min.js"></script>
	<script src="assets/js/plugins/forms/selects/select2.min.js"></script>	
	<script src="assets/js/plugins/forms/styling/switchery.min.js"></script>
	
	<script src="assets/js/plugins/ui/moment/moment.2.27.0.min.js"></script>
	<!-- <script src="assets/js/plugins/ui/moment/ru.min.js"></script> -->
	
	<script src="assets/js/plugins/notifications/pnotify.min.js"></script>
	<!-- /plugins JS files -->


	<!-- <script src="assets/js/plugins/uploaders/fileinput/plugins/purify.min.js"></script> -->
	<script src="assets/js/plugins/uploaders/fileinput/plugins/sortable.min.js"></script>
	<script src="assets/js/plugins/uploaders/fileinput/fileinput.min.js"></script>	

<!--	
	<script src="assets/js/plugins/visualization/d3/d3.min.js"></script>
	<script src="assets/js/plugins/visualization/d3/d3_tooltip.js"></script>
	<script src="assets/js/plugins/forms/selects/bootstrap_multiselect.js"></script> 
-->
	
	<script src="assets/js/plugins/forms/inputs/duallistbox/duallistbox.min.js"></script>
	<script src="assets/js/plugins/forms/styling/switch.min.js"></script>

	<script src="assets/js/plugins/tables/datatables/extensions/jszip/jszip.min.js"></script>
	<script src="assets/js/plugins/tables/datatables/extensions/pdfmake/pdfmake.min.js"></script>
	<script src="assets/js/plugins/tables/datatables/extensions/pdfmake/vfs_fonts.min.js"></script>
	<script src="assets/js/plugins/tables/datatables/extensions/buttons.min.js"></script>


	<link href="assets/js/plugins/tables/datatables/extensions/yadcf/jquery.dataTables.yadcf.css?v=3" rel="stylesheet" type="text/css">
	<script src="assets/js/plugins/tables/datatables/extensions/yadcf/jquery.dataTables.yadcf.js?v=3"></script>

	<script src="assets/js/plugins/forms/inputs/typeahead/typeahead.bundle.min.js"></script>
	<script src="assets/js/plugins/forms/inputs/typeahead/handlebars.min.js"></script>




	
	<script src="assets/js/app.js"></script>
	
	<!-- /theme JS files -->


</head>

<!-- sidebar-xs -->
<body class="sidebar-xs-open">


	<div id="app-container">
	
		<!-- Main navbar -->
		<div class="navbar navbar-expand-md navbar-dark bg-indigo navbar-static">
			<div class="navbar-brand">
				<router-link to="/" class="d-inline-block">
					<h3 style="display: block; color: white; position: relative; font-size: 14px;  text-transform: uppercase; top: 4px;height: 15px;">Gnosis App</h3>
				</router-link>	
			</div>

			<div class="d-md-none">
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
					<i class="icon-tree5"></i>
				</button>
				<button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
					<i class="icon-paragraph-justify3"></i>
				</button>
			</div>

			<div class="collapse navbar-collapse" id="navbar-mobile">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
							<i class="icon-paragraph-justify3"></i>
						</a>
					</li>
				</ul>

				<span class="navbar-text ml-md-3 ">
					<span class="badge badge-mark border-orange-300 mr-2"></span>
					Hello, {{session.firstname}} ( {{session.role}} )
				</span>


				
				<ul class="navbar-nav ml-md-auto">
					

				<li class="nav-item dropdown">
					<a href="#" class="navbar-nav-link dropdown-toggle" data-toggle="dropdown">
						<i class="icon-pulse2 mr-2"></i>
						Activity
					</a>
					
					<div class="dropdown-menu dropdown-menu-right dropdown-content wmin-md-350">
						<div class="dropdown-content-header">
							<span class="font-size-sm line-height-sm text-uppercase font-weight-semibold">Latest activity</span>
							<a href="#" class="text-default"><i class="icon-search4 font-size-base"></i></a>
						</div>

						<div class="dropdown-content-body dropdown-scrollable">
							<ul class="media-list">
								<li class="media">
									<div class="mr-3">
										<a href="#" class="btn bg-success-400 rounded-round btn-icon"><i class="icon-mention"></i></a>
									</div>

									<div class="media-body">
										<a href="#">Taylor Swift</a> mentioned you in a post "Angular JS. Tips and tricks"
										<div class="font-size-sm text-muted mt-1">4 minutes ago</div>
									</div>
								</li>

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
							</ul>
						</div>

						<div class="dropdown-content-footer bg-light">
							<a href="#" class="font-size-sm line-height-sm text-uppercase font-weight-semibold text-grey mr-auto">All activity</a>
							<div>
								<a href="#" class="text-grey" data-popup="tooltip" title="Clear list"><i class="icon-checkmark3"></i></a>
								<a href="#" class="text-grey ml-2" data-popup="tooltip" title="Settings"><i class="icon-gear"></i></a>
							</div>
						</div>
					</div>
				</li>					
				
					
				<!--	
					<li class="nav-item">
						<a href="#" v-on:click = "logout" class="navbar-nav-link">
							<i class="icon-switch2"></i>
							<span class="d-md-none ml-2">Выйти из системы</span>
						</a>
					</li>
				-->	
					
				</ul>
				
				
			</div>
		</div>
		<!-- /main navbar -->


		<!-- Page content -->
		<div class="page-content">

			<!-- Main sidebar -->
			<div class="sidebar sidebar-light sidebar-main sidebar-expand-md">

				<!-- Sidebar mobile toggler -->
				<div class="sidebar-mobile-toggler text-center">
					<a href="#" class="sidebar-mobile-main-toggle">
						<i class="icon-arrow-left8"></i>
					</a>
					<span class="font-weight-semibold">Navigation</span>
					<a href="#" class="sidebar-mobile-expand">
						<i class="icon-screen-full"></i>
						<i class="icon-screen-normal"></i>
					</a>
				</div>
				<!-- /sidebar mobile toggler -->


				<!-- Sidebar content -->
				<div class="sidebar-content">
		
						
						<sys-user-menu 
							:name = "session.firstname"
							:role = "session.role_title"
							:logo = "session.avatar"
						></sys-user-menu>
						
					
					
					<!-- Main navigation -->
					<sys-main-menu 
						:front="front.sys_main_menu"
						:session="session"
					></sys-main-menu>
					<!-- /main navigation -->

				</div>
				<!-- /sidebar content -->
				
			</div>
			<!-- /main sidebar -->


			<!-- Main content -->


			<!-- Main content -->
			<div class="content-wrapper">


				
				<!-- Page header -->
				<sys-page-header :route=$route  :breadcrumb_menu="[]"></sys-page-header>
				<!-- /page header -->
				

				<!-- Content area -->	
				<router-view></router-view>
				<!-- /content area -->


				<!-- Footer -->
				<div id="navbar-footer" class="navbar-collapse collapse">
					<span class="navbar-text">© 2021 All rights reserved</span>
				</div>				
				<!-- /footer -->

			</div>
			<!-- /main content -->

		</div>
		<!-- /page content -->

	</div>
	
	<script src="assets/js/bundle.js?v=2"></script>
	<script src="assets/js/Eth.js?v<?=time()?>"></script>
	
	
	
	<script>
		  
			JA.prepare( <?=$Vue->store()?> ); 
		
	</script>
	
	<script src="assets/js/ja-frontend-menu.js?v<?=time()?>"></script>
	<script src="assets/js/env-core.js?v<?=time()?>"></script>
	<script src="assets/js/env.js?v<?=time()?>"></script>
	
	<!-- Vue components -->
	<script src="components/d-filepond.vue.js?v=<?=time()?>"></script>
	<script src="components/my-autocomplete.vue.js?v=<?=time()?>"></script>
	<script src="components/sys-footer.vue.js?v=<?=time()?>"></script>
	<script src="components/sys-main-menu.vue.js?v=<?=time()?>"></script>
	<script src="components/sys-navbar-dropdown.vue.js?v=<?=time()?>"></script>
	<script src="components/sys-notice-dropdown.vue.js?v=<?=time()?>"></script>
	<script src="components/sys-page-header.vue.js?v=<?=time()?>"></script>
	<script src="components/sys-user-menu.vue.js?v=<?=time()?>"></script>
	<script src="components/text-truncate.vue.js?v=<?=time()?>"></script>
	<script src="components/v-checkbox.vue.js?v=<?=time()?>"></script>
	<script src="components/v-datatable.vue.js?v=<?=time()?>"></script>
	<script src="components/v-form-content.js?v=<?=time()?>"></script>
	<script src="components/v-input-row.js?v=<?=time()?>"></script>
	<script src="components/v-modal.vue.js?v=<?=time()?>"></script>
	<script src="components/v-row.js?v=<?=time()?>"></script>
	<script src="components/v-select-row.js?v=<?=time()?>"></script>
	<script src="components/v-select.vue.js?v=<?=time()?>"></script>
	<script src="components/web3-contract-events-table.vue.js?v=<?=time()?>"></script>
	<script src="components/web3-contract-table.vue.js?v=<?=time()?>"></script>
	<script src="components/web3-transaction-table.vue.js?v=<?=time()?>"></script>
	<!--/ vue components -->


	<!-- Vue modules -->
	<script src="modules/contracts_demo.js?v=<?=time()?>"></script>
	<script src="modules/demo_home.js?v=<?=time()?>"></script>
	<script src="modules/deploy_demo.js?v=<?=time()?>"></script>
	<script src="modules/develope.js?v=<?=time()?>"></script>
	<script src="modules/empty.js?v=<?=time()?>"></script>
	<script src="modules/error404.js?v=<?=time()?>"></script>
	<script src="modules/stat1.js?v=<?=time()?>"></script>
	<script src="modules/transaction_demo.js?v=<?=time()?>"></script>
	<!--/ vue modules  -->



	<script src="assets/js/vue-app.js?v<?=time()?>"></script>
	

</body>
</html>
