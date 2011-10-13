App.views.Home = Ext.extend(Ext.Panel, {
  layout:'fit',
  cls : 'customPanel',
  fullscreen : true,
  scroll : true,
  initComponent : function() {
    this.tpl = Ext.XTemplate.from('info'),

    App.views.Home.superclass.initComponent.call(this);
    this.update(App.Info);
  }
});