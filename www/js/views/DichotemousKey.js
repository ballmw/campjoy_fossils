App.views.DichotemousKey = Ext.extend(Ext.Panel, {
  layout:'fit',
  cls : 'customPanel',
  fullscreen : true,
  scroll : true,
  tbar: {
  	
  },
  initComponent : function() {
    this.tpl = Ext.XTemplate.from('key');
    
    //alert(App.PhoneApp.tabBar);
    App.views.DichotemousKey.superclass.initComponent.call(this);
    this.update(App.key);
  },
  listeners: {
  	show: function(){
  		App.viewport.hideTabBar();// tabBar.hide();
  	}
  }
});