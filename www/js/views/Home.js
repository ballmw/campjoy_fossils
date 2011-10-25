App.views.Home = Ext.extend(Ext.Panel, {
	//layout:'fit',
	cls : 'customPanel',
	//fullscreen : true,
	//scroll : true,
	initComponent : function() {
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
			this.body.on('touchstart', function() {
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
