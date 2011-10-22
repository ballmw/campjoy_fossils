App.views.Specimen = Ext.extend(Ext.Panel, {
  layout:'fit',
  cls : 'customPanel',
  fullscreen : true,
  scroll : true,
  dockedItems: [{
      xtype: 'toolbar',
      ui: 'light',
      items: [{
	  	text: 'Back',
	  	ui: 'back',
	  	handler:function()
	  	{
	  		App.viewport.navTo('catalog');
	  		App.viewport.tabBar.show();
	  	}
	  }, {
	  	text: 'Home',
	  	handler: function(){
	  		App.viewport.navTo('home');
	  	}
	  }],
	  dock: 'top'
  }],
  initComponent : function() {
  	this.tpl = Ext.XTemplate.from('specimen');
  	this.update(this.specimen);

    App.views.Specimen.superclass.initComponent.call(this);
//    this.update(App.Info);
  },
  listeners: {
  	show: function(){
  		this.update(this.specimen);
  		App.viewport.hideTabBar();
  	}
  }
});