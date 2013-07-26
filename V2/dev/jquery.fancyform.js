/*!
* Fancyform - jQuery Plugin
* Simple and fancy form styling alternative
*
* Examples and documentation at: https://github.com/Lutrasoft/Fancyform
* 
* Copyright (c) 2010-2013 - Lutrasoft
* 
* Version: 2.2.0
* Requires: jQuery v1.6.1+ 
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/
(function ($) {
	// ShortCut to functions
	var s = {
		// Times used for efficiencie
		
		// Functions
		lc 	: "toLowerCase", 	// 1 : Text to Lower case
		
		// Shortcuts
		c	: "checkbox",		// 2 : checkbox
		r	: "radio",			// 2 : radio
		b	: "trans-element-"	// 1 : Base class of fancyform
	};
	
	function Fancyform( domEl, settings )
	{
		var _me 		= this,
			_dom 		= domEl,
			_el 		= $( _dom ).hide( ), // Make jQuery and hide
			_html,
			_settings 	= settings,
			
			// What kind of element are we dealing with
			_tag 		= (_dom.tagName == "INPUT" ? _el.attr("type") : _dom.tagName)[ s.lc ]( ),
			_isCheckbox = _tag == s.c,
			_isRadio 	= _tag == s.r,
			
			// Radio / Checkbox
			_RCClasses = [ "checked", "unchecked", "disabled" ];
		
		/**
		*	Set property of an element, depending on the element it will handle the Fancyform functionality
		*/
		_me.prop = function( name, value, _internalCall )
		{
			// Set new value
			_el.prop( name, value );
			
			// Note: Make array when more than 1
			if( name == "checked" )
			{
				_el.change( )
			}
			
			// Update Radio or Checkbox
			if( _isRadio || _isCheckbox )
			{
				// Set right Classes
				_me._setRCClass( );
				
				// Update tri-state
				if( !_internalCall )
				{
					_me._tristate( );
				}
			}	
		}
		
	
/**
*
*	RADIO AND CHECKBOX
*
*/
		/**
		*	Handle tri-state ( :checkbox )
		*/
		_me._tristate = function( )
		{	
			if( _settings.cbr.tristate )
			{
				// Toggle all children to be the same as _el
				_el.closest( "li" ).find("[type=checkbox]").fancyform( "prop", _RCClasses[ 0 ], _el.is( "checked" ), 1 );
				
				// set right tristate class
				$( "[name='" + _dom.name + "']" ).each(function(){
					var cb = $(this);
					
				});
			}
		}
		
		/**
		*	Update the image of a :radio or :checkbox
		*/
		_me._setRCClass = function( )
		{			
			_html
				// Remove all classes
				.removeClass( _RCClasses.join("  ") )
				
				// Add new class
				.addClass( 
						(_dom.disabled ? _RCClasses[ 2 ] : "") + " " + (_dom.checked ? _RCClasses[ 0 ] : _RCClasses[ 1 ] ) // checked || unchecked
				);
		}
		
		/**
		*	Radio-checkbox element click
		*/
		_me._RCElClick = function( )
		{
			// When not disabled
			if( !_html.hasClass( _RCClasses[ 2 ] ) )
			{
				var checked = _el.is( ":checked" );
				
				// Toggle when possible
				if( _settings.toggle || _isCheckbox || ( _isRadio && !checked ) )
				{
					_me.prop( _RCClasses[ 0 ], !checked, 1 ); // Checked
				}
				
				// Radio needs to update all images with the same name
				if( _isRadio )
				{
					$( "[name='" + _dom.name + "']" ).fancyform( "prop", _RCClasses[ 0 ], 0, 1 ); // Checked
				}
				
				// Update tri-state
				_me._tristate( );
			}
		}
		
		/**
		*	Initialize :radio and :checkbox
		*/		
		_me._initRC = function(){
			// Wrap with span
			_el.wrap( "<span class='" + s.b + ( _isCheckbox ? s.c : s.r ) + "' />" ); // base + checkbox/radio
			_html = _el.parent( );
			
			// Update image
			_me._setRCClass( );
			
			// Bind click
			( _settings.trigger ? _el.closest( _settings.trigger ) : _html ).click( _me._RCElClick );
		}
		
/**
*
*	INIT
*
*/
		if( _isRadio || _isCheckbox )
		{
			_me._initRC( );
		}		
	}
	
	$.fancyform = {
		defaults : {
			// Checkbox and radio settings
			cbr : {
				trigger 	: 0, 	// null = self, if filled its .closest( VALUE ), for example LI

				// Radio only
				toggle		: 0,	// Make it possible for a radio to only select 1 but you can toggle 1 off
				
				// Checkbox only
				tristate	: 0		// Possible to use tri-state
			}
		}
	};

	
	/**
	*
	*	INIT:
	*	(:input).fancyform( SETTINGS )
	*
	*	Multi INIT:
	*	(:parent).fancyform( SETTINGS )
	*	
	*	Get setting:
	*	(:input).fancyform( KEY )
	*
	*	Set settings:
	*	(:input).fancyform( KEY, VALUE )
	*
	*	Mutli set settings:
	*	(:parent).fancyform( KEY, VALUE )
	*
	*	Call function
	*	(:input).fancyform( FNNAME )
	*
	*	Multi call function:
	*	(:parent).fancyform( FNNAME )
	*
	*/
	$.fn.fancyform = function( settings, value ){
		return this.each( function(){
			var _this = $( this ),
				t, sl = _this.data( "ff" );
			
			// If it's an input type, go and do your job
			if( _this.is(":input") )
			{
				if( sl )
				{
					t = sl[ settings ];
					if( typeof t == "function" )
					{
						return t.apply( this, arguments );
					}
					if( value )
					{
						sl.settings[ settings ] = value;
					}
					//return sl.settings[ settings ];
				}
				else
				{
					_this.data( "ff", new Fancyform( _this[0], $.extend( { }, $.fancyform.defaults, settings ) ) );
				}
			}
			// Otherwise find input fields to fancyform
			else
			{
				_this.find(":input").fancyform( settings, value );
			}
		} );
	};
})(jQuery);
