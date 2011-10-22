Ext.regModel('Specimen', {
  fields : [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});
App.stores.Specimen = new Ext.data.Store({
  model : "Specimen",
  sorters : {property:'id',direction:'DESC'},
  data: [{
      id: 1,
      name: "Dunbarella PELECYPOD",
      photo_image: "test_photo_image",
      drawing_image: "test_drawing_image",
      description: "This is a test description"
   }, {
   	  id: 2,
      name: "Glycimeris PELECYPOD",
      photo_image: "test_photo_image",
      drawing_image: "test_drawing_image",
      description: "This is a test description"
   }, {
   	  id: 3,
      name: "Lima PELECYPOD",
      photo_image: "test_photo_image",
      drawing_image: "test_drawing_image",
      description: "This is a test description"
    }]   
});