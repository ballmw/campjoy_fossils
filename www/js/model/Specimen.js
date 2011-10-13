Ext.regModel('Specimen', {
  fields : [
        {name: 'id', type: 'string'}
    ]
});
CinJUG.stores.Specimen = new Ext.data.Store({
  model : "Specimen",
  sorters : {property:'id',direction:'DESC'}    
});