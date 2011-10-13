Ext.regModel('Question', {
    fields: [
        {name: 'id', type: 'string'}
    ]
});

CinJUG.stores.Question = new Ext.data.Store({
  model: 'Question'
});