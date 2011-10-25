App.views.Catalog = Ext.extend(Ext.Panel, {
	layout : 'fit',
	scroll : true,
	initComponent : function() {
		this.store = App.stores.Specimen;
		this.list = new Ext.List({
			fullscreen : true,
			defaults : {
				scope : this
			},
			scroll : "vertical",
			title : this.title,
			store : this.store,
			emptyText : this.emptyText,
			itemTpl : Ext.XTemplate.from('specimen-list')
		});
		this.items = [this.list];
		App.views.Catalog.superclass.initComponent.call(this);
		this.list.on('itemtap', this.onItemTap, this);
	},
	doShow : function() {
	},
	onItemTap : function(dv, index, item, e) {
		var dataStore = dv.getStore();
		var record = dataStore.getAt(index).data;
		App.viewport.navTo('specimen', record, 'catalog');

	}
});
