App.views.Specimen = Ext.extend(Ext.Panel, {
	cls : 'customPanel',
	back_name : 'home',
	fullscreen : true,
	scroll:true,
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
		},{xtype: 'spacer'}, {
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
		
		var me = this;
		
		var showMoreButton = new Ext.Button({
			text: 'More Info',
			width: 120,
			handler: function(btn){
				if (me.specimenDetailPanel.hidden) {
					me.specimenDetailPanel.show();
					showMoreButton.setText('Less Info');
				}
				else {
					me.specimenDetailPanel.hide();
					showMoreButton.setText('More Info');
				}
				me.doComponentLayout();
			}
		});
		
		this.items = [this.specimenPanel, this.specimenDetailPanel, showMoreButton];
		
		App.views.Specimen.superclass.initComponent.call(this);
	},
	listeners : {
		show : function() {
			this.specimenPanel.update(this.specimen);
			this.specimenDetailPanel.update(this.specimen);
		}
	}
});
