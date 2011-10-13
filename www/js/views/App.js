CinJUG.defaultAnim = Ext.is.Android ? false : 'slide';

CinJUG.App = Ext.extend(Ext.TabPanel, {
  fullscreen : true,
  layout : 'card',
  tabBar : {
    dock : 'bottom',
    ui : 'light',
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

    this.twitterView = new Uselect.views.Twitter({
            iconCls: 'twitter',
            title: 'Tweets',
            store: Uselect.stores.Tweets,
            emptyText: "No Tweets to Display",
            template: "tweet",
            screen_name: Uselect.School.twitter_screen_name
        });
        this.mapView = new Uselect.views.Map({
            iconCls: 'maps',
            title: 'Map'
        });
        this.eventsView = new Uselect.views.RssEvents({
            store: CinJUG.stores.RSSEvents,
            iconCls: 'rss',
            title: "Events",
            emptyText: "No Events found.",
            template: 'event'
        });
    this.infoView = new Uselect.views.Info({
      text : 'Info',
      title : 'Info',
      iconCls:'info'

    });
    this.items = [ this.infoView,this.twitterView, this.mapView, this.eventsView];

    CinJUG.App.superclass.initComponent.call(this);

  }
});
