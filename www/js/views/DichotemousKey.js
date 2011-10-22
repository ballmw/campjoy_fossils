App.views.DichotemousKey = Ext.extend(Ext.Panel, {
	layout : 'fit',
	cls : 'customPanel',
	fullscreen : true,
	scroll : true,
	dockedItems : [{
		dock : 'top',
		xtype : 'toolbar',
		ui : 'light',
		items : [{
			text : 'Back',
			handler : function() {
				if(App.viewport.keyView.gameStack.length == 1){
					return;
				} else {
					App.viewport.keyView.gameStack.pop();
					var statementId =  App.viewport.keyView.seekTopGameStack()[0].key_pair;
					var questions = fossil_key.find_statement_pair(statementId);
			    	var questionHtml = App.viewport.keyView.getQuestionHtml(questions);
			    	App.viewport.keyView.update(questionHtml)
				}
			}
		}]
	}],
	//holds the selected data
	gameStack: new Array(),
	
	checkKeyAlreadyOnStack: function(num){
		var questions = this.seekTopGameStack();
		if(questions == false){
			return false;
		}
		return (questions[0].key_pair == num);
	},
	
	startGame: function(){
		var firstKey = fossil_key.start();
		this.gameStack.push(firstKey);
	},
	getQuestionHtml: function(questions){
		var questionTemplate = Ext.XTemplate.from('keyOptions');
		return questionTemplate.apply(questions);
	},
	seekTopGameStack: function() {
		if(this.gameStack.length == 0){
			return null;
		}
		return this.gameStack[this.gameStack.length-1];
	},
	getNextStatement: function(index){
		var top = this.seekTopGameStack();
		var selected = top[index];
		return selected.next_statement_pair;
	},
	initComponent : function() {
		App.views.DichotemousKey.superclass.initComponent.call(this);
		this.gameStack = new Array();
		//this.update(App.key);
		this.startGame();
		var questions = this.seekTopGameStack();
		var questionHtml = this.getQuestionHtml(questions);
		this.html = questionHtml;
	},
	
	getSpecimen: function(index){
		var question = this.seekTopGameStack()[index];
		return question.specimen;
	},

	
	listeners : {
		show : function() {
			App.viewport.hideTabBar();
		},

		afterlayout : function() { 
			console.log('afterrender fired');
			$('.key-option').click( function(event) {
				var nextStatementId = event.target.getAttribute('data-selectedoption');
				if(nextStatementId == false){
					var specimenIndex = event.target.getAttribute('data-index');
					if(App.viewport.keyView.checkKeyAlreadyOnStack(-1) == false){
						var specimen = App.viewport.keyView.getSpecimen(specimenIndex-1);
						App.viewport.keyView.gameStack.push([{key_pair: -1}]);	
						App.viewport.keyView.update(specimen.name);
					}
					return;
				}
				var nextStatementId = parseInt(nextStatementId);
				console.log('next statement is ' + nextStatementId);
				var questions = fossil_key.find_statement_pair(nextStatementId);
				if(App.viewport.keyView.checkKeyAlreadyOnStack(nextStatementId) == false){
					App.viewport.keyView.gameStack.push(questions);	
				}
			    var questionHtml = App.viewport.keyView.getQuestionHtml(questions);
			    App.viewport.keyView.update(questionHtml)
			});
		}
	}
});