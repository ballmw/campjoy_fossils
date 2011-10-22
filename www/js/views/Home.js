App.views.Home = Ext.extend(Ext.Panel, {
  layout:'fit',
  cls : 'customPanel',
  //fullscreen : true,
  //scroll : true,
  initComponent : function() {
    this.items = [new Ext.Button({
    	text: 'Start',
    	handler: function(){
    		App.viewport.navigateToDichotomousKey();
    	}
    })];
    App.views.Home.superclass.initComponent.call(this);
  }
});