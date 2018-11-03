/*Sidebar Collapse Animation*/
/*	var sidebarNavCollapse = $('.fixed-sidebar-left .side-nav  li .collapse');
	var sidebarNavAnchor = '.fixed-sidebar-left .side-nav  li a';
	$(document).on("click",sidebarNavAnchor,function (e) {
		if ($(this).attr('aria-expanded') === "false")
				$(this).blur();
		$(sidebarNavCollapse).not($(this).parent().parent()).collapse('hide');
	});*/
$(document).on("click", '#toggle_nav_btn', function (e) {
    if ($('.page-wrapper1').css('margin-left') === "225px") {
        $(".page-wrapper1").css("margin-left", "46px");
    } else {
        $(".page-wrapper1").css("margin-left", "225px");
    }

});


/*                   Table des Questions / Réponses Quizz                                  */
/*var $TABLE = $('#table');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');*/


// A few jQuery helpers for exporting only //
/*
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
    var $rows = $TABLE.find('tbody tr:not(:hidden)');
    var headers = [];
    var data = [];
    var tabrep = [];
    headers.push('question', 'choices', 'correctAnswer');

    var h = {};
    h[headers[0]] = $('#table tr').find('td:eq(0)').text();
    
    $rows.each(function () {
        var $td = $(this).find('td');
        alert($td.eq(1).text())
        tabrep.push($td.eq(1).text())
        
    });
    h[headers[1]] = tabrep;
        h[headers[2]] = $('input[name=radioreponse1]:checked').val();
    
    data.push(h);
    $EXPORT.text(JSON.stringify(data));

});
*/

/*                   Table des Questions / Réponses Quizz                                  */


$(".matiere_row").click(function(){
    var thematiere = $(this).attr('data-class');
    thematiere += "-enfant";
    $('.'+thematiere).toggle();
});


$(window).load(function() {
   $('.enfant').toggle();
   //$('#table').toggle();
});

/* -------------------- generate quizz form --------------------- */
function generate_quizz(){
    
    
    var nb_questions = $( "#nb_questions" ).val();
    var nb_responses = $( "input[type=radio][name=radioreponsesquizz]:checked" ).val();
    
   /* for (i=0, i < nb_questions, i++){
        zone_table.append(table)
    }*/
    
    //creates table
    var zone_table = $('#table');
    var table = $('<table></table>');
    
    var tr1 = $('<tr><td contenteditable="true">Intitulé Question<td contenteditable="true">Réponse N°1</td><td><span class="radio radio-info"><input id="radioreponse11" type="radio" name="radioreponse1" value="a"/></td></tr>') //creates row
    var tr = $('<tr><td contenteditable="false"><td contenteditable="true">Réponse N°2</td><td><span class="radio radio-info"><input id="radioreponse12" type="radio" name="radioreponse1" value="b"/><label for="radioreponse12">B</label></span></td></td></tr>') //creates row

    var header = $('<tr><th>QUESTION N°1</th><th>RÉPONSES</th><th>CHOISIR LA BONNE RÉPONSE</th></tr>') //creates header row

    //attaches header row
    table.append($('<thead></thead>').append(header))
    
    //creates 
    var tbody = $('<tbody></tbody>')
    table.append(tbody).append(tr1).append(tr2)
    
}