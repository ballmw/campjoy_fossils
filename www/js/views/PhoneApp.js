App.defaultAnim = Ext.is.Android ? false : 'slide';

App.PhoneApp = Ext.extend(Ext.Panel, {
	fullscreen : true,
	layout : 'card',
	modalWidth : 300,
	modalHeight : 300,
	cls : 'main',
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
	navTo : function(dest, params, back_name) {
		var view = this.homeView;
		switch (dest.toLowerCase()) {
			case 'home':
				view = this.homeView;
				view.restartPage();
				break;
			case 'key':
				if(!this.keyView) {
					this.keyView = new App.views.DichotemousKey();
					this.add(this.keyView);
				}
				this.keyView.restartPage();
				this.keyView.bindOurEvents();
				view = this.keyView;
				break;
			case 'catalog':
				if(!this.catalogView) {
					this.catalogView = new App.views.Catalog();
					this.add(this.catalogView);
				}
				view = this.catalogView;
				break;
			case 'specimen':
				if(params.type == 'history') {
					if(this.simpleSpecimenView == null) {
						this.simpleSpecimenView = new App.views.SimpleSpecimen({
							specimen : params,
							back_name : back_name
						});
						this.add(this.simpleSpecimenView);
					}
					view = this.simpleSpecimenView;
				} else {
					if(this.specimenView == null) {
						this.specimenView = new App.views.Specimen({
							specimen : params,
							back_name : back_name
						});
						this.add(this.specimenView);
					}
					view = this.specimenView;
				}
				view.back_name = back_name;
				view.specimen = params;
				break;
		}
		this.setActiveItem(view);
	},
	initComponent : function() {
		// console.log('init PhoneApp');
		this.tabBar = new Ext.TabBar({
			dock : 'bottom',
			ui : 'dark',
			cls : 'footer',
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
				}
			}, {
				text : 'Catalog',
				iconCls : 'bookmark_black',
				scope : this,
				handler : function() {
					this.navTo('catalog');
				}
			}],
			layout : {
				pack : 'center'
			}
		});

		this.dockedItems = [this.tabBar];

		this.homeView = new App.views.Home();
		this.items = [this.homeView];

		App.PhoneApp.superclass.initComponent.call(this);

		for(var prop in window.specimens) {
			if(window.specimens.hasOwnProperty(prop))
				App.stores.Specimen.add(window.specimens[prop]);
		}
	}
});
