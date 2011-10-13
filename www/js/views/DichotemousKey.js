App.views.DichotemousKey = Ext.extend(Ext.Panel, {
  layout:'fit',
  cls : 'customPanel',
  fullscreen : true,
  scroll : true,
  initComponent : function() {
    this.tpl = Ext.XTemplate.from('key'),

    App.views.DichotemousKey.superclass.initComponent.call(this);
    this.update(App.key);
  }
});