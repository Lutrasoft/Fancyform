$(function(){
	$(":input").filter(function(){
		return !$( this ).closest( "#tristate" ).length || !$( this ).is(":checkbox");
	}).fancyform( );
	
	$("#tristate :checkbox").fancyform({
		cbr : {
			tristate : true
		}
	});
	/* 
	==============
		Others
	==============
	*/
	prettyPrint();
	
	$("#changelogAll").click(function(e){
		e.preventDefault();
		$("#changelog").slideToggle();
	});
});