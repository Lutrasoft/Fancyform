# jQuery Fancyform (Javascript)

Fancyform is a tool that offers a nice and elegant way to transform your HTML elements into custom styled elements. It is build on the Javascript framework jQuery and is easy to implement and customize. The elements you can style are **input:radio**, **input:checkbox**, **input:file**, **select** and **textarea**. You can see a [demo](http://lutrasoft.nl/jQuery/fancyform/) at the website.

##Support the project
<a href='http://www.pledgie.com/campaigns/20044'><img alt='Click here to lend your support to: Fancyform and make a donation at www.pledgie.com !' src='http://www.pledgie.com/campaigns/20044.png?skin_name=chrome' border='0' /></a>

## Example code
### Radio button
You can transform your own radio button into any image you want to use. If an image is clicked the radio button will be checked and the radios `change` event will be triggered.

    $("input:radio").transformRadio({
		base : "images",   // image or class, if class there will be added a span around the radio button, 
						   //                 if image there will be placed an image after the input
        checked : "img/chk_on.png",   // Checked image to show
        unchecked : "img/chk_off.png"	// Unchecked image to show
    });

### Checkbox
You can transform your own checkbox into any image you want to use. If an image is clicked the checkbox will be checked and the `change` event will be triggered.
It is also possible to use the checkboxes as a **Tri-State**, If you enable the tri-state option, you need to use the UL LI structure for the node tree.

    $("input:checkbox").transformCheckbox({
        checked: "/images/content/filterBoxCheckboxChecked.jpg", // Checked image
        unchecked: "/images/content/filterBoxCheckbox.jpg",		// Unchecked image
        disabledChecked : "/images/content/filterBoxCheckboxDisabledChecked.jpg", // Disabled checked image
        disabledUnchecked : "/images/content/filterBoxCheckboxDisabledUnChecked.jpg", // Disabled unchecked image
        tristateHalfChecked : "/images/content/filterBoxCheckboxDisabledUnChecked.jpg", // Tri-state image
        changeHandler: function (is_checked) { }, // handler when checkbox is clicked
        trigger: "self", // Can be self, parent
        tristate : false // Use tri state? need to be ul > li > checkbox // ul > li > ul > li > checkbox
    });

##Select (Dropdown)
The SELECT will be changed into a UL list, it is possible to use the default SELECT, OPTION and OPTGROUP to transform it into something you want. When the SELECT is opened, the opened LI will have a class `.open`, so you can define new styles to an opened dropdown.

    $("SELECT").transformSelect({
        dropDownClass: "transformSelect", 	// Class of the main UL
        showFirstItemInDrop: true, 			// Show or hide the first item within the dropdown (e.g. "Select a country")
        acceptManualInput: false, 			// You want to be able to type your own value? ({name}_backup will be created with a new input {name})
        useManualInputAsFilter : false,		// Use the manual input as a filter (add data-settings='{"alwaysvisible" : true}' to the option if you don't want the element to hide)

        subTemplate: function () { return "<span>" + $(this).text() + "</span>"; }, 	// The template of the LI within the dropdown
        initValue: function () { return $(this).text(); },			// The initial value of the <span></span> of the selected element
        valueTemplate: function () { return $(this).text(); }, 		// The selected value, after initial value	

        ellipsisLength: null // The max length of the selected text
    });

##File
Easily change the file input to a good looking file input.

    $("input:file").transformFile({
        cssClass : "customInput",
        label : "Browse..."
    });

##Textarea
Customize your own textarea like you've never done before! You can add any slider you find on the internet. Below an example with the jQuery UI slider.

    $("textarea").transformTextarea();
	
    // Use a custom slider	
    $( "#slider" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 100,
        slide: function( event, ui ) {
            // Top = 0
            var perc = 100 - ui.value;
		
            // Scroll textarea to given percentage
            $("textarea").transformTextarea("scrollToPercentage", perc);
        }
    });

    // Move the slider to the scrollHeight of the textarea
    $("textarea").bind("scrollToPx", function(e, px, percentage){
        $( "#slider" ).slider("option", "value", 100 - percentage);	
    });

#Licence
Fancyform dual licensed under the [MIT](http://opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.