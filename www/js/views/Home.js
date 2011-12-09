App.views.Home = Ext.extend(Ext.Panel, {
	//layout:'fit',
	cls : 'customPanel',
	//fullscreen : true,
	//scroll : true,
	initComponent : function() {
		//this.toolbar =
		this.dockedItems = [{
		xtype : 'toolbar',
		ui : 'dark',
		cls: 'header',
		items : [{
			text : 'About',
			scope : this,
			handler : function() {
				var popup = new Ext.Panel({
        	    hidden: true,
		        tpl: Ext.XTemplate.from('aboutApp'),
	            floating: true,
                modal: true,
                centered: true,
                scroll: true,
                styleHtmlContent: true,
                width: App.viewport.modalWidth,
                height: App.viewport.modalHeight
      	      });
      	      popup.update(App.Config);
      	      popup.show();
			}
		}]}];
		this.items = [{
			html : '<div class="homeContainer">' + 
			         '<div class="homeAbsolute">' + 
			           '<div class="homeRelative">' + 
			             '<div style="margin:0 auto;">' + 
			               '<div class="homeCircle"><div style="margin-top:60px;">Start</div></div>' + 
			             '</div>' + 
			           '</div>' + 
			         '</div>' + 
			       '</div>'
		}];
		App.views.Home.superclass.initComponent.call(this);
	},
	restartPage : function() {
		$('.homeCircle').removeClass('highlight-on');
		$('.homeCircle').addClass('highlight-off');
	},
	listeners : {
		afterlayout : function() {
			this.body.on('tap', function() {
				App.viewport.navTo('key');
			});
			$('.homeCircle').removeClass('highlight-on');
			$('.homeCircle').addClass('highlight-off');
			$('.homeCircle').bind('touchstart mousedown', function(event) {
				$(".homeCircle").addClass("highlight-on");
				$(".homeCircle").removeClass("highlight-off");
			});
		}
	}
});
