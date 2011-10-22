App.views.Catalog = Ext.extend(Ext.Panel, {
    layout:'fit',
    initComponent: function(){
      this.store = App.stores.Specimen;
	    this.list = new Ext.List({
	        fullscreen: true,
	        defaults: {
	            scope: this
	        },
	        scroll: "vertical",
	        title: this.title,
	        store: this.store,
	        emptyText: this.emptyText,
	        itemTpl: new Ext.XTemplate('<div><h2>{name}</h2><h3>{description}</h3></div>')
	    });
	    this.items = [this.list];
	    App.views.Catalog.superclass.initComponent.call(this);
	    this.list.on('itemtap', this.onItemTap, this);
    },
    doShow: function(){
    },
    onItemTap: function(dv, index, item, e){
        var dataStore = dv.getStore();
        var record = dataStore.getAt(index).data;
        App.viewport.navTo('Specimen', record);
//         
        // this.popup = new Ext.Panel({
            // floating: true,
            // modal: true,
            // centered: true,
            // scroll: true,
            // width: App.viewport.modalWidth,
            // height: App.viewport.modalHeight,
            // styleHtmlContent: true,
            // tpl: Ext.XTemplate.from('eventDetails'),
            // dockedItems: [{
                // dock: 'top',
                // xtype: 'toolbar',
                // title: event.title
            // }]
        // });
        
        // this.popup.update(event);
        // this.popup.show('pop');
        
    }
    
});
