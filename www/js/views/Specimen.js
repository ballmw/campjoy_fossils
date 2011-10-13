App.views.Specimen = Ext.extend(Ext.Panel, {
  layout:'fit',
  cls : 'customPanel',
  fullscreen : true,
  scroll : true,
  initComponent : function() {
    this.tpl = Ext.XTemplate.from('specimen'),

    App.views.Specimen.superclass.initComponent.call(this);
//    this.update(App.Info);
  }
});