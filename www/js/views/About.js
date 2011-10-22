App.views.About = Ext.extend(Ext.Panel, {
  layout:'fit',
  cls : 'customPanel',
  fullscreen : true,
  scroll : true,
  initComponent : function() {
    this.items = [new Ext.Panel({
    	html: 'This is our text'    	
    })];
    App.views.Home.superclass.initComponent.call(this);
  }
});