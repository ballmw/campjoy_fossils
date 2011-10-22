App.views.Specimen = Ext.extend(Ext.Panel, {
	layout : 'fit',
	cls : 'customPanel',
	//fullscreen : true,
	dockedItems : [{
		xtype : 'toolbar',
		ui : 'light',
		items : [{
			text : 'Back',
			ui : 'back',
			handler : function() {
				App.viewport.navTo('catalog');
				App.viewport.tabBar.show();
			}
		}, {
			text : 'Home',
			handler : function() {
				App.viewport.navTo('home');
			    App.viewport.tabBar.show();
			}
		}],
		dock : 'top'
	}],
	initComponent : function() {
		this.tpl = Ext.XTemplate.from('specimen');
		this.update(this.specimen);

		App.views.Specimen.superclass.initComponent.call(this);
		//    this.update(App.Info);
	},
	listeners : {
		show : function() {
			
			//App.viewport.hideTabBar();
			this.update(this.specimen);
			
		}
	}
});
