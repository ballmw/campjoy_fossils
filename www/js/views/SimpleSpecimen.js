App.views.SimpleSpecimen = Ext.extend(Ext.Carousel, {
	cls : 'customPanel',
	back_name : 'home',
	fullscreen : true,
	indicator : true,
	scroll : true,
	layout : 'fit',
	defaults : {
		flex : 1
	},

	initComponent : function() {
		this.dockedItems = [{
			xtype : 'toolbar',
			ui : 'light',
			cls : 'header',
			scope : this,
			items : [{
				text : 'Back',
				ui : 'back',
				scope : this,
				handler : function() {
					App.viewport.navTo(this.back_name);
				}
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'spacer'
			}, {
				text : 'Home',
				handler : function() {
					App.viewport.navTo('home');
				}
			}],
			dock : 'top'
		}];
		App.views.SimpleSpecimen.superclass.initComponent.call(this);
		this.updateCarousel();
	},
	refresh : function() {
		this.doLayout();

	},
	listeners : {
		show : function() {
			//this.scroller.scrollTo({
			//	x : 0,
			//	y : 0
			//});
			//this.carousel.removeAll();

			// Bug fix: force scroll to the top
			this.updateCarousel();
		}
	},
	updateCarousel : function() {

		var carouselItems = [];

		this.removeAll();

		Ext.each(this.specimen.photo_image, function(item) {
			carouselItems.push(new Ext.Panel({
				html : '<img src="images/' + item + '">'
			}));
		});
		var carousel = this;
		Ext.each(carouselItems, function(item) {
			carousel.add(item);
		});

		this.doLayout();
	}
});
