$(function(){
	/*
		================
		Transform a radio button
		================			
	*/
	$("input:radio").transformRadio({
		checked : "img/chk_on.png",
		unchecked : "img/chk_off.png",
		disabledChecked: "/images/content/filterBoxCheckboxDisabledChecked.jpg",
		disabledUnchecked: "/img/webshop/checkbox2_disabled.png",
	});
	
	/*
		================
		Transform a checkbox
		================			
	*/
	$("input:checkbox:not(.tri)").transformCheckbox({
		checked : "img/chk_on.png",
		unchecked : "img/chk_off.png"	
	});
	$("input.tri:checkbox").transformCheckbox({
		checked : "img/chk_on.png",
		unchecked : "img/chk_off.png",
		tristateHalfChecked : "img/chk_tri.png",
		tristate : true
	});
	
	/*
		================
		Transform a select
		================			
	*/
	$("#select").transformSelect();
	$("#select2").transformSelect({acceptManualInput : true, showFirstItemInDrop : false});
	$("#select3").transformSelect({ showFirstItemInDrop : false });
	/*
		================
		Transform a textarea
		================			
	*/
	$("textarea").transformTextarea();
	
	// Add the slider
	$( "#slider" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 100,
			slide: function( event, ui ) {
				// Top = 0
				var perc = 100 - ui.value;
				$("textarea").transformTextarea("scrollToPercentage", perc);
			}
		});
	
	$("textarea").bind("scrollToPx", function(e, px, percentage){
		$( "#slider" ).slider("option", "value", 100 - percentage);
		$("#percentage").val(percentage);
		$("#px").val(px);		
	});
	
	// Activate the textarea functions below the textarea itself
	$("#percentage").keyup(function(e){
		if(e.which == 13)
		{
			$("textarea").transformTextarea("scrollToPercentage", $(this).val());
		}
	});
	$("#px").keyup(function(e){
		if(e.which == 13)
		{
			$("textarea").transformTextarea("scrollToPx", $(this).val());
		}
	});
	
	$("#apply").click(function(){
		$("textarea").transformTextarea();	
	});
	$("#remove").click(function(){
		$("textarea").transformTextarea("remove");	
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