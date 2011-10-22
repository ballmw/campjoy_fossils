App.views.Specimen = Ext.extend(Ext.Panel, {
	cls : 'customPanel',
	back_name : 'home',
	fullscreen : false,
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
		},{
			xtype: 'spacer'
		},{
			text : 'More Info',
			width: 120,
			handler: function(btn){
				App.viewport.specimenView.specimenDetailPanel.setWidth(App.viewport.modalWidth);
				App.viewport.specimenView.specimenDetailPanel.setHeight(App.viewport.modalHeight);					
				App.viewport.specimenView.specimenDetailPanel.show();
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
		//modal window
		this.specimenDetailPanel = new Ext.Panel({
			hidden: true,
			tpl: Ext.XTemplate.from('specimenDetail'),
		    floating: true,
            modal: true,
            centered: true,
            scroll: true,
            styleHtmlContent: true
      	});
      	
		this.items = [this.specimenPanel];
		
		App.views.Specimen.superclass.initComponent.call(this);
	},
	listeners : {
		show : function() {
			this.specimenPanel.update(this.specimen);
			this.specimenDetailPanel.update(this.specimen);
		}
	}
});
