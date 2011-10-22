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
  hideTabBar: function(){
  	this.tabBar.hide(true);
  },
  navigateToDichotomousKey: function(){
  	this.setActiveItem(1);
  },
  history: [],
  navTo: function(dest, params){
  	var index = 0;
  	var showTabBar = true;
  	switch (dest.toLowerCase()) {
  		case 'key':
  			index = 1;
  			showTabBar = false;
  			break;
		case 'specimen':
			index = 3;
			showTabBar = false;
			break;
  	}
  	this.setActiveItem(index);
  	this.tabBar[(showTabBar) ? 'show' : 'hide'](true);
  },
  initComponent : function() {
    // console.log('init PhoneApp');
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
    this.specimenView = new App.views.Specimen({
    	hidden: true,
    	title: 'Specimen'
    });
    
    this.items = [ this.homeView, this.keyView, this.catalogView, this.specimenView];
    
    App.PhoneApp.superclass.initComponent.call(this);
    console.log("initted PhoneApp");
  },
  displayPortrait : function() {
  },
  displayLandscape : function() {
  }

});
