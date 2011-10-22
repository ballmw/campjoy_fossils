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
	  	ui: 'back'
	  }, {
	  	text: 'Home',
	  	handler: function(){
	  		App.viewport.navTo('home');
	  	}
	  }],
	  dock: 'top'
  }],
  initComponent : function() {
  	this.update('hello');

    App.views.Specimen.superclass.initComponent.call(this);
//    this.update(App.Info);
  },
  listeners: {
  	show: function(){
  		App.viewport.hideTabBar();
  	}
  }
});