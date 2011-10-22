App.views.Specimen = Ext.extend(Ext.Panel, {
	cls : 'customPanel',
	back_name : 'home',
	//fullscreen : true,
	dockedItems : [{
		xtype : 'toolbar',
		ui : 'light',
		cls: 'header',
		items : [{
			text : 'Back',
			ui : 'back',
			scope : this,
			handler : function() {
				App.viewport.navTo(App.viewport.specimenView.back_name);
				App.viewport.tabBar.show();
			}
		},{
			xtype: 'spacer'
		},{
			text : 'More Info',
			width: 120,
			handler: function(btn){
				if (App.viewport.specimenView.specimenDetailPanel.hidden) {
					App.viewport.specimenView.specimenDetailPanel.show();
					btn.setText('Less Info');
				}
				else {
					App.viewport.specimenView.specimenDetailPanel.hide();
					btn.setText('More Info');
				}
				App.viewport.specimenView.doComponentLayout();
			}
		},{
			xtype: 'spacer'
		},{
			text : 'Home',
			handler : function() {
				App.viewport.navTo('home');
			    App.viewport.tabBar.show();
			}
		}],
		dock : 'top'
	}],
	initComponent : function() {
		this.specimenPanel = new Ext.Panel({
			tpl: Ext.XTemplate.from('specimen')
		});
		
		this.specimenDetailPanel = new Ext.Panel({
			hidden: true,
			tpl: Ext.XTemplate.from('specimenDetail')
		});
		
	    this.items = [this.specimenPanel, this.specimenDetailPanel];
		
		App.views.Specimen.superclass.initComponent.call(this);
	},
	listeners : {
		show : function() {
			this.specimenPanel.update(this.specimen);
			this.specimenDetailPanel.update(this.specimen);
		}
	}
});
