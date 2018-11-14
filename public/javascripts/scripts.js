function affichequizz(){
    
 $.ajax({
  type :'GET',
  url : '/api/affiche',
  success : function(data){
   $('#liste').html('');
   $('#liste').append('<h1>Liste des adhérents</h1>');
   for (var i=0;i<data.length;i++){
    $('#liste').append('<h3>Fiche n° : '+(i+1)+'</h3>');
    $('#liste').append('<p>Nom : '+data[i].nom+'</p>');
    $('#liste').append('<p>Prénom : '+data[i].prenom+'</p>');
    $('#liste').append('<p>Age : '+data[i].age+'</p>');
    $('#liste').append('<p>Genre : '+data[i].sexe+'</p>');
    $('#liste').append('<br>');
   }
  }
 })

}