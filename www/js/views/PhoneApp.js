App.defaultAnim = Ext.is.Android ? false : 'slide';

App.PhoneApp = Ext.extend(Ext.Panel, {
	fullscreen : true,
	layout : 'card',
	modalWidth : 300,
	modalHeight : 300,
	cls: 'main',
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
	navTo : function(dest, params, back_name) {
		var index = 0;
		var showTabBar = true;
		var view = this.homeView;
		switch (dest.toLowerCase()) {

			case 'home':
				showTabBar = true;
				view = this.homeView;
                                view.restartPage();
				break;
			case 'key':
				showTabBar = false;
				this.keyView.restartPage();
				this.keyView.bindOurEvents();
				view = this.keyView;
				break;
			case 'catalog':
				showTabBar = true;
				view = this.catalogView;
				break;
			case 'specimen':
				showTabBar = false;
				this.specimenView.specimen = params;
				this.specimenView.back_name = back_name;
				view = this.specimenView;
				break;
		}
		//this.tabBar[(showTabBar) ? 'show' : 'hide'](true);
		if(showTabBar)
			this.tabBar.show(true);
		else {
			//this.tabBar.hide(true);
		}
        this.doComponentLayout();
		this.setActiveItem(view);
		this.doComponentLayout();
		

	},
	initComponent : function() {
		// console.log('init PhoneApp');
		
		this.keyView = new App.views.DichotemousKey();
		this.catalogView = new App.views.Catalog();
		this.aboutView = new App.views.About();
		this.specimenView = new App.views.Specimen();
        this.homeView = new App.views.Home();
		
		this.items = [this.homeView, this.catalogView, this.specimenView, this.aboutView, this.keyView];

		this.tabBar = new Ext.TabBar({
			dock : 'bottom',
			ui : 'dark',
			cls: 'footer',
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
				scope : this,
				handler : function() {
					this.keyView.restartPage();
					this.keyView.bindOurEvents();
					this.setActiveItem(this.keyView);
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
