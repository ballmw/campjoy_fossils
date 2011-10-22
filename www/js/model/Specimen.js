Ext.regModel('Specimen', {
  fields : [
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});
App.stores.Specimen = new Ext.data.Store({
  model : "Specimen",
  sorters : {property:'name',direction:'DESC'}
});