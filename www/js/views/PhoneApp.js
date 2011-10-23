App.defaultAnim = Ext.is.Android ? false : 'slide';

App.PhoneApp = Ext.extend(Ext.Panel, {
	fullscreen : true,
	layout : 'card',
	modalWidth : 300,
	modalHeight : 300,
	cls: 'main',
	/*tabBar : {
		dock : 'bottom',
		ui : 'dark',
		layout : {
			pack : 'center'
		}
	},*/
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
				if (!this.keyView) {
					this.keyView = new App.views.DichotemousKey();
					this.add(this.keyView);
				}
				this.keyView.restartPage();
				this.keyView.bindOurEvents();
				view = this.keyView;
				break;
			case 'catalog':
				showTabBar = true;
				if (!this.catalogView) {
					this.catalogView = new App.views.Catalog();
					this.add(this.catalogView);
				}
				view = this.catalogView;
				break;
			case 'specimen':
				showTabBar = false;
				if (!this.specimenView) {
				  this.specimenView = new App.views.Specimen();
					this.add(this.specimenView);
				}
				this.specimenView.specimen = params;
				this.specimenView.back_name = back_name;
				view = this.specimenView;
				break;
		}
		if(showTabBar)
			this.tabBar.show(true);
		this.setActiveItem(view);
	},
	initComponent : function() {
		// console.log('init PhoneApp');
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
					this.navTo('key');
					//this.keyView.restartPage();
					//this.keyView.bindOurEvents();
					//this.setActiveItem(this.keyView);
				}
			}, {
				text : 'Catalog',
				iconCls : 'bookmark_black',
				scope : this,
				handler : function() {
					this.navTo('catalog');
					//App.viewport.setActiveItem(App.viewport.catalogView)
				}				
			}
			//, { text: 'About',
			//	iconCls : 'about',
			//	handler : function() {
			//		App.viewport.setActiveItem(App.viewport.aboutView)
			//	}
			//}
			],
			layout : {
				pack : 'center'
			}
		});

		this.dockedItems = [this.tabBar];

        //this.keyView = new App.views.DichotemousKey();
		//this.aboutView = new App.views.About();
		
        this.homeView = new App.views.Home();
		
		this.items = [this.homeView];

		App.PhoneApp.superclass.initComponent.call(this);
		//console.log("initted PhoneApp");
		for(var prop in window.specimens) {
			if(window.specimens.hasOwnProperty(prop))
				App.stores.Specimen.add(window.specimens[prop]);
		}
	}
	/*,
	displayPortrait : function() {
	},
	displayLandscape : function() {
	}*/
});
