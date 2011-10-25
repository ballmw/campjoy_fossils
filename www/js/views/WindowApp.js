/*
 * This is very out of date, but when we want to support tablets this needs to be updated.
 */

App.WindowApp = Ext.extend(Ext.Panel, {
  fullscreen : true,
  layout : 'card',
  modalWidth : 400,
  modalHeight : 300,
  cls : 'windowPanel',
  monitorOrientation : true,
  cardSwitchAnimation : {
    type : 'slide',
    cover : true
  },
  defaults : {
    scroll : false
  },
  
  initComponent : function() {
    
    
    
    
    this.homeView = new App.views.Home({
      iconCls: 'home',
      title: 'Home'
    });
    this.keyView = new App.views.DichotemousKey({
      iconCls: 'maps',
      title: 'Dichotemous Key'
    });
    this.catalogView = new App.views.Catalog({
      iconCls: 'rss',
      title: "Catalog"
    });
    
    var data = [ {
      text : 'Home',
      card : this.homeView
    }, {
      text : 'Dichotemous Key',
      card : this.keyView
    }, {
      text : 'Catalog',
      card : this.catalogView
      }];
      Ext.regModel('ListItem', {
        fields : [ {
          name : 'text'
          } ]
        });
        var store = new Ext.data.Store({
          model : 'ListItem',
          data : data
        });
        this.navigationPanel = new Ext.List({
          cls : 'navigationPanel',
          store : store,
          dock : 'left',
          hidden : false,
          width : 276,
          height : 215,
          itemTpl : Ext.XTemplate.from('nav')
        });
        this.navigationButton = new Ext.Button({
          text : 'Menu',
          handler : this.onNavButtonTap,
          scope : this
        });
        
        this.toolbar = new Ext.Toolbar({
          dock : 'top',
          items : [ this.navigationButton ]
        });
        //console.log(App.orientation);
        this.dockedItems = App.orientation === 'landscape' ? [ this.navigationPanel ] : [ this.toolbar ];
        
        
        
        this.items = [ this.homeView, this.keyView, this.catalogView];
        
        App.WindowApp.superclass.initComponent.call(this);
        
        // this.on('orientationchange', this.handleOrientationChange);
        // this.on('beforeorientationchange', this.handleBeforeOrientationChange);
        this.navigationPanel.on('itemtap', this.onMenuSelect, this);
        if (App.orientation == 'portrait')
        this.displayPortrait();
        else
        this.displayLandscape();
      },
      onNavButtonTap : function() {
        //console.log('show nav panel');
        this.navigationPanel.showBy(this.navigationButton, 'fade');
      },
      onMenuSelect : function(dv, index, item, e) {
        var dataStore = dv.getStore();
        var menuItem = dataStore.getAt(index).data;
        App.viewport.setActiveItem(menuItem.card);
        if (App.orientation === 'portrait') {
          this.navigationPanel.hide();
        }
      },
      
      displayPortrait : function() {
        //console.log('displayPortrait');
        this.navigationPanel.setFloating(true);
        this.navigationPanel.setHeight(215);
        this.navigationPanel.addCls('portraitNav');
        this.removeDocked(this.navigationPanel, false);
        this.navigationButton.show(false);
        this.insertDocked(0, this.toolbar);
      },
      displayLandscape : function() {
        //console.log('displayLandscape');
        this.navigationPanel.setFloating(false);
        this.navigationPanel.removeCls('portraitNav');
        this.navigationPanel.setHeight(window.innerHeight - 1);
        this.navigationPanel.show(false);
        this.navigationButton.hide(false);
        this.removeDocked(this.toolbar, false);
        this.insertDocked(0, this.navigationPanel);
      }
      
    });
