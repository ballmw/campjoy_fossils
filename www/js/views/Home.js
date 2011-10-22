App.views.Home = Ext.extend(Ext.Panel, {
  //layout:'fit',
  cls : 'customPanel',
  //fullscreen : true,
  //scroll : true,
  initComponent : function() {
    this.items = [{
    	html: '<div class="greenBorder" style="display: table; height: 400px; #position: relative; overflow: hidden;">' +
    '<div style=" #position: absolute; #top: 50%;display: table-cell; vertical-align: middle;">' +
      '<div style=" #position: relative; width:100%; margin-left:70px; #top: -50%">' +
      	'<div style="margin:0 auto;">'+
          '<div style="text-align:center; height:150px; width:150px; border-radius: 100px; border: solid 3px black"><div style="margin-top:60px;">Start</div></div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'
    	//html: '<div style="display: table; height: 420px; vertical-align:middle;"><div style="text-align:center; height:150px; width:150px; border-radius: 100px; border: solid 3px black"><div style="margin-top:60px;">Start</div></div></div>'
    }];
    App.views.Home.superclass.initComponent.call(this);
  },
  listeners: {
  	afterlayout: function(){
		this.body.on('click', function(){
			App.viewport.navTo('key');
		});
  	}
  }
});