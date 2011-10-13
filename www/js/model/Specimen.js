Ext.regModel('Specimen', {
  fields : [
        {name: 'id', type: 'string'}
    ]
});
App.stores.Specimen = new Ext.data.Store({
  model : "Specimen",
  sorters : {property:'id',direction:'DESC'}    
});