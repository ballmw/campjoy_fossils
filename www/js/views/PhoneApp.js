App.defaultAnim = Ext.is.Android ? false : 'slide';

App.PhoneApp = Ext.extend(Ext.Panel, {
	fullscreen : true,
	layout : 'card',
	modalWidth : 300,
	modalHeight : 300,
	tabBar : {
		dock : 'bottom',
		ui : 'dark',
		layout : {
			pack : 'center'
		}
	},
	cardSwitchAnimation : {
		type : 'slide',
		cover : true
	},
	defaults : {
		scroll : 'vertical'
	},
	hideTabBar : function() {
		this.tabBar.hide(true);
	},
	navigateToDichotomousKey : function() {
		this.setActiveItem(1);
	},
	history : [],
	navTo : function(dest, params) {
		var index = 0;
		var showTabBar = true;
		switch (dest.toLowerCase()) {
			case 'home':
				showTabBar = true;
				this.setActiveItem(this.homeView)
				break;
			case 'key':
				showTabBar = false;
				this.setActiveItem(this.keyView)
				break;
			case 'catalog':
				showTabBar = false;
				this.setActiveItem(this.catalogView);
				break;
			case 'specimen':
				showTabBar = false;
				this.specimenView.specimen = params;
				this.setActiveItem(this.specimenView);
				break;
		}
		this.tabBar[(showTabBar) ? 'show' : 'hide'](true);

	},
	initComponent : function() {
		// console.log('init PhoneApp');
		this.homeView = new App.views.Home();
		this.keyView = new App.views.DichotemousKey();
		this.catalogView = new App.views.Catalog();
		this.homeView = new App.views.About();
		this.specimenView = new App.views.Specimen();

		this.items = [this.homeView, this.keyView, this.catalogView, this.specimenView];

		this.tabBar = new Ext.TabBar({
			dock : 'bottom',
			ui : 'dark',
			centered : true,
			items : [{
				text : 'Home',
				iconCls : 'home',
				handler : function() {
					App.viewport.setActiveItem(App.viewport.homeView)
				}
			}, {
				text : 'Key',
				iconCls : 'maps',
				handler : function() {
					App.viewport.setActiveItem(App.viewport.keyView)
				}
			}, {
				text : 'Catalog',
				iconCls : 'catalog',
				handler : function() {
					App.viewport.setActiveItem(App.viewport.catalogView)
				}				
			}, { text: 'About',
				iconCls : 'about',
				handler : function() {
					App.viewport.setActiveItem(App.viewport.aboutView)
				}
			}],
			layout : {
				pack : 'center'
			}
		});

		this.dockedItems = [this.tabBar];
		//, this.specimenView

		App.PhoneApp.superclass.initComponent.call(this);
		console.log("initted PhoneApp");
	},
	displayPortrait : function() {
	},
	displayLandscape : function() {
	}
});
