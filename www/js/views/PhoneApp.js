App.defaultAnim = Ext.is.Android ? false : 'slide';

App.PhoneApp = Ext.extend(Ext.TabPanel, {
  fullscreen : true,
  layout : 'card',
  modalWidth : 300,
  modalHeight : 300,
  tabBar : {
    dock : 'bottom',
    ui : 'dark',
    layout : {
      pack : 'center'
    }
  },
  cardSwitchAnimation : {
    type : 'slide',
    cover : true
  },
  defaults : {
    scroll : 'vertical'
  },

  initComponent : function() {
    console.log('init PhoneApp');
    this.homeView = new App.views.Home({
      iconCls: 'home',
      title: 'Home'
    });
    
    this.keyView = new App.views.DichotemousKey({
      iconCls: 'maps',
      title: 'Dichotemous Key'
    });
    this.catalogView = new App.views.Catalog({
      iconCls: 'catalog',
      title: "Catalog"
    });

    this.items = [ this.homeView, this.keyView, this.catalogView];

    App.PhoneApp.superclass.initComponent.call(this);
    console.log("initted PhoneApp");
  },
  displayPortrait : function() {
  },
  displayLandscape : function() {
  }

});
