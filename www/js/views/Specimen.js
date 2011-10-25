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
			}
		},{
			xtype: 'spacer'
		},{
			text : 'More Info',
			width: 120,
			scope:this,
			handler: function(btn){
			  var specimenDetailPanel = new Ext.Panel({
        	    hidden: true,
		        tpl: Ext.XTemplate.from('specimenDetail'),
	            floating: true,
                modal: true,
                centered: true,
                scroll: true,
                styleHtmlContent: true
      	      });
      	      specimenDetailPanel.update(App.viewport.specimenView.specimen);
      	      specimenDetailPanel.setWidth(App.viewport.modalWidth);
      	      specimenDetailPanel.setHeight(App.viewport.modalHeight);
			  specimenDetailPanel.show();
			}
		},{
			xtype: 'spacer'
		},{
			text : 'Home',
			handler : function() {
				App.viewport.navTo('home');
			}
		}],
		dock : 'top'
	}],
	initComponent : function() {
		this.specimenPanel = new Ext.Panel({
			
		});
		
		this.items = [this.specimenPanel];
		
		App.views.Specimen.superclass.initComponent.call(this);
	},
	refresh: function(){
		this.specimenPanel.doLayout();
	},
	getIllustrationHtml: function(){
		var illustrations = '';
		if (this.specimen.drawing_image && this.specimen.drawing_image.length > 0) {
			illustrations += '<br /><br />Illustration(s):';
		}
		Ext.each(this.specimen.drawing_image, function(item){
			illustrations += '<br /><img src="images/' + item + '" onload="App.viewport.specimenView.refresh();" width="200px" />';
		});
		return illustrations;
	},
	getSpecimenPanel: function(){
		if (typeof(this.specimen.photo_image) == 'string' || this.specimen.photo_image.length === 1) {
			return {
				html: '<img id="imgSpecimen" onload="App.viewport.specimenView.refresh();" src="images/' + ((this.specimen.photo_image.length === 1) ? this.specimen.photo_image[0] : this.specimen.photo_image) + '" width="200px" />'
			}
		}
		
		// There are multiple photo_images.  Build a panel with back button, the main image,
		// and forward button layed out horizontally.
		var me = this;
		var imageCount = this.specimen.photo_image.length;
		var currentImageIndex = 0;
		
		// Handler for back and forward buttons to cycle through the images
		var toggleImage = function(direction){
			currentImageIndex += direction;
			if (currentImageIndex < 0) {
				currentImageIndex = imageCount - 1;
			}
			currentImageIndex %= imageCount;
			Ext.fly('imgSpecimen').dom.src = 'images/' + me.specimen.photo_image[currentImageIndex];
		};
		
		return new Ext.Panel({
			items: [new Ext.Panel({
				layout: 'hbox',
				width: '100%',
				items: [new Ext.Button({
					text: '&lt;',
					ui: 'back',
					//height: 60,
					flex: 1,
					handler: function(){
						toggleImage(-1);
					}
				}), new Ext.Panel({
						width: 216,
						style: 'text-align:center;',
						html: '<img id="imgSpecimen" onload="App.viewport.specimenView.refresh();" src="images/' + this.specimen.photo_image[0] + '" height="120" width="200px" />'
					}), new Ext.Button({
					ui: 'forward',
					text: '&gt;',
					//height: 60,
					flex: 1,
					handler: function(){
						toggleImage(1);
					}
				})]
			})]
		});
	},
	getShortDescriptionHtml: function(){
		if (!this.specimen.short_description) {
			return '';
		}
		return '<br />' + (this.specimen.short_description || '');
	},
	listeners : {
		show : function() {
			this.specimenPanel.removeAll();
			
			// Bug fix: force scroll to the top
			this.scroller.scrollTo({x:0, y:0});
			
			// Main specimen name
			this.specimenPanel.add(new Ext.Container({
				html: this.specimen.name
			}));
			
			// Image(s).  If multiple photo_images are found, back and 
			// forward buttons allow navigation through each image.
			this.specimenPanel.add(this.getSpecimenPanel());
			
			// short_description and any illustrations
			this.specimenPanel.add({
				html: '<div style="padding-right:10px;">' + this.getShortDescriptionHtml() + this.getIllustrationHtml() + '</div>'
			});
			
			this.specimenPanel.doLayout();
		}
	}
});
