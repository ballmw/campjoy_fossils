App.views.DichotemousKey = Ext.extend(Ext.Panel, {
	layout : 'fit',
	//cls : 'customPanel',
	fullscreen : true,
	scroll : true,
	dockedItems : [{
		dock : 'top',
		xtype : 'toolbar',
		ui : 'light',
		cls : 'header',
		items : [{
			text : 'Back',
			ui : 'back',
			handler : function() {
				if(App.viewport.keyView.gameStack.length == 1) {
					return;
				} else {
					//tranisition
					App.viewport.keyView.transitionPage();
					App.viewport.keyView.gameStack.pop();
					var statementId = App.viewport.keyView.seekTopGameStack()[0].key_pair;
					var questions = fossil_key.find_statement_pair(statementId);
					App.viewport.keyView.updatePage(questions);
				}
			}
		}, {
			xtype : 'spacer'
		}, {
			text : 'Home',
			handler : function() {
				App.viewport.navTo('home');
			}
		}]
	}],
	//holds the selected data
	gameStack : new Array(),

	restartPage : function() {
		this.startGame();
		var questions = this.seekTopGameStack();
		this.updatePage(questions);
	},
	updatePage : function(questions) {
		var questionHtml = this.getQuestionHtml(questions);
		this.update(questionHtml);
		this.fireEvent('show');
	},
	checkKeyAlreadyOnStack : function(num) {
		var questions = this.seekTopGameStack();
		if(questions == false) {
			return false;
		}
		return (questions[0].key_pair == num);
	},
	startGame : function() {
		var firstKey = fossil_key.start();
		this.gameStack = new Array();
		this.gameStack.push(firstKey);
	},
	getQuestionHtml : function(questions) {
		var questionTemplate = Ext.XTemplate.from('keyOptions');
		return questionTemplate.apply(questions);
	},
	seekTopGameStack : function() {
		if(this.gameStack.length == 0) {
			return null;
		}
		return this.gameStack[this.gameStack.length - 1];
	},
	getNextStatement : function(index) {
		var top = this.seekTopGameStack();
		var selected = top[index];
		return selected.next_statement_pair;
	},
	initComponent : function() {
		this.startGame();
		var questions = this.seekTopGameStack();
		var questionHtml = this.getQuestionHtml(questions);
		this.html = questionHtml;

		App.views.DichotemousKey.superclass.initComponent.call(this);
	},
	getSpecimen : function(index) {
		var question = this.seekTopGameStack()[index];
		return question.specimen;
	},
	listeners : {
		afterlayout : function() {
			//console.log('afterlayout fired');
			this.bindOurEvents();
		},
		show : function() {
			//console.log('show');
			this.bindOurEvents();
		}
	},
	transitionPage : function() {
		App.viewport.keyView.update('<div class="transition-key"> ... </div> ');
	},
	bindOurEvents : function() {
		$('.key-option').bind('touchstart', function(event) {
			var specimenDiv = $(event.target).closest(".key-option")[0];

			$(specimenDiv).css('background-color', '#888');
		});

		$('.key-option').bind('tap', function(event) {
			var specimenDiv = $(event.target).closest(".key-option")[0];
			if(specimenDiv != undefined) {
				var nextStatementId = specimenDiv.getAttribute('data-selectedoption');

				$(specimenDiv).css('background-color', '');

				if(!nextStatementId) {
					var specimenIndex = specimenDiv.getAttribute('data-index');
					var specimen = App.viewport.keyView.getSpecimen(specimenIndex - 1);
					App.viewport.navTo('specimen', specimen, 'key');
					return;
				}

				//transition
				App.viewport.keyView.transitionPage();

				var nextStatementId = parseInt(nextStatementId);

				var questions = fossil_key.find_statement_pair(nextStatementId);
				if(App.viewport.keyView.checkKeyAlreadyOnStack(nextStatementId) == false) {
					App.viewport.keyView.gameStack.push(questions);
				}

				App.viewport.keyView.updatePage(questions);
			}
		});
	}
});
