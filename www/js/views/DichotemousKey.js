App.views.DichotemousKey = Ext.extend(Ext.Panel, {
	layout : 'fit',
	cls : 'customPanel',
	fullscreen : true,
	scroll : true,
	dockedItems : [{
		xtype : 'toolbar',
		ui : 'light',
		items : [{
			text : 'Back',
			ui : 'back',
			handler : function() {
				App.viewport.navTo('home');
				App.viewport.tabBar.show();
			}
		}],
		dock : 'top'
	}],
	initComponent : function() {
		this.tpl = Ext.XTemplate.from('key');

		//alert(App.PhoneApp.tabBar);
		App.views.DichotemousKey.superclass.initComponent.call(this);
		this.update(App.key);
	},
	listeners : {
		show : function() {
			//App.viewport.hideTabBar();
			// tabBar.hide();
		}
	}
});
