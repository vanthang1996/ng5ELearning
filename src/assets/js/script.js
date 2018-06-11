$(document).ready(function(){
	$("#select-role").change(function(){
		$(this).find("option:selected").each(function(){
			var optionValue = $(this).attr("value");
			if(optionValue){
				$(".sidebar-box").not("." + optionValue).hide();
				$("." + optionValue).show();
			} else{
				$(".sidebar-box").hide();
			}
		});
	}).change();
});

function openSide() {
	$('#sidebar-page').css("display", "block");
	// $('#sidebar-page').slideDown( "slow" );
	$('#btn-openSide').css("display", "none");
}

function closeSide() {
  // $('#sidebar-page').slideUp();
  $('#sidebar-page').css("display", "none");
	$('#btn-openSide').css("display", "block");
}
