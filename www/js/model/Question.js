Ext.regModel('Question', {
    fields: [
        {name: 'id', type: 'string'}
    ]
});

App.stores.Question = new Ext.data.Store({
  model: 'Question'
});