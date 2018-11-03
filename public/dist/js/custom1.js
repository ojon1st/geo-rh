/* -------------------- fill breadcrumbs --------------------- */
$('.elem').click(function(e){
  e.preventDefault();
  var classroom = $(this).closest('ul').closest('li').closest('ul').closest('li').closest('ul').closest('li').data('val');
  var matiere = $(this).closest('ul').closest('li').closest('ul').closest('li').data('val');
  var chapitre = $(this).closest('ul').closest('li').data('val');
  var contenu = $(this).closest('li').data('val');
  var val = classroom + '-' + matiere + '-' + chapitre + '-' + contenu;
  url ='admin/contenu-admin/cours'
  url += '?p=' + val;
  window.location = url;
 });

/* -------------------- load url to get parameters --------------------- */        
$(document).ready(function() {
    if(url('query')){
    var res = url('?p').split("-");
        var newli = '<li><i class="icon-home"></i><a href="#">Accueil</a></li>';
        for(i=0; i<res.length; i++){
            newli += '<li><i class="icon-angle-right"></i><a>' + res[i] + '</a></li>';            
        }
    $('.breadcrumb').html(newli);

    }
});


