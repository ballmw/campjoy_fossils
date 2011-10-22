App.views.Specimen = Ext.extend(Ext.Panel, {
	cls : 'customPanel',
	back_name : 'home',
	fullscreen : false,
	scroll:true,
	dockedItems : [{
		xtype : 'toolbar',
		ui : 'light',
		cls: 'header',
		items : [{
			text : 'Back',
			ui : 'back',
			scope : this,
			handler : function() {
				App.viewport.navTo(App.viewport.specimenView.back_name);
				App.viewport.tabBar.show();
			}
		},{
			xtype: 'spacer'
		},{
			text : 'More Info',
			width: 120,
			handler: function(btn){
				App.viewport.specimenView.specimenDetailPanel.setWidth(App.viewport.modalWidth);
				App.viewport.specimenView.specimenDetailPanel.setHeight(App.viewport.modalHeight);
				App.viewport.specimenView.specimenDetailPanel.show();
				App.viewport.specimenView.specimenDetailPanel.scroller.scrollTo({x:0,y:0});					
				App.viewport.specimenView.doComponentLayout();
			}
		},{
			xtype: 'spacer'
		},{
			text : 'Home',
			handler : function() {
				App.viewport.navTo('home');
			    App.viewport.tabBar.show();
			}
		}],
		dock : 'top'
	}],
	initComponent : function() {
		this.specimenPanel = new Ext.Panel({
			//scroll: true
		});
		//modal window
		this.specimenDetailPanel = new Ext.Panel({
			hidden: true,
			tpl: Ext.XTemplate.from('specimenDetail'),
		    floating: true,
            modal: true,
            centered: true,
            scroll: true,
            styleHtmlContent: true
      	});
      	
		this.items = [this.specimenPanel];
		
		App.views.Specimen.superclass.initComponent.call(this);
	},
	listeners : {
		show : function() {
			this.specimenDetailPanel.update(this.specimen);
			
			this.scroller.scrollTo({x:0, y:0});
			
			// Main specimen name and image(s)
			this.specimenPanel.removeAll();
			
			this.specimenPanel.add({
				html: this.specimen.name
			});
			
			var toggleImagePanel = new Ext.Panel({
				width: 200,
				html: '<img src="images/' + this.specimen.photo_image[0] + '" height="120" width="200px" />'
			});
			
			if (typeof(this.specimen.photo_image) == 'string' || this.specimen.photo_image.length === 1) {
				this.specimenPanel.add({
					html: '<img src="images/' + ((this.specimen.photo_image.length === 1) ? this.specimen.photo_image[0] : this.specimen.photo_image) + '" width="200px" />'
				});
			}
			else {
				var me = this;
				var imageCount = this.specimen.photo_image.length;
				var currentImageIndex = 0;
				
				var toggleImage = function(direction){
					currentImageIndex += direction;
					if (currentImageIndex < 0) {
						currentImageIndex = imageCount - 1;
					}
					currentImageIndex %= imageCount;
					toggleImagePanel.update('<img src="images/' + me.specimen.photo_image[currentImageIndex] + '" height="120" width="200px" />');
					me.specimenPanel.doComponentLayout();
				};
				
				this.specimenPanel.add(new Ext.Panel({
					items: [new Ext.Panel({
						layout: 'hbox',
						width: '100%',
						items: [new Ext.Button({
							text: '&lt;',
							height: 30,
							padding:4,
							flex: 1,
							handler: function(){
								toggleImage(-1);
							}
						}), toggleImagePanel, new Ext.Button({
							text: '&gt;',
							height: 30,
							padding:4,
							flex: 1,
							handler: function(){
								toggleImage(1);
							}
						})]
					})]
				}));
			}
			
			this.specimenPanel.add({
				html: '<br /><div style="padding-right:10px;">' + (this.specimen.short_description || '') + '</div>'
			});
			
			this.specimenPanel.doLayout();
		}
	}
});
