jQuery(document).ready(function(){
	
	var radios = jQuery(".custom-form input:radio"); 
	for(var a=0;a<radios.length;a++){
		radios[a].className+=" goout";
	}
	var checkboxes = jQuery(".custom-form input:checkbox"); 
	for(var a=0;a<checkboxes.length;a++){
		checkboxes[a].className+=" goout";
		}
	var radiolabels = jQuery(".custom-form input:radio").siblings("label"); 
	for(var a=0;a<radiolabels.length;a++){
		radiolabels[a].className+=" radioarea";
		}
	var checklabels = jQuery(".custom-form input:checkbox").siblings("label"); 
	for(var a=0;a<checklabels.length;a++){
		checklabels[a].className+=" checkboxarea";
		}
		
		
	// for radio input
	jQuery(".custom-form input:radio:checked").siblings("label").removeClass("radioarea").addClass("radioareachecked");
	// for radio
	jQuery(".custom-form input:radio").click(function() {
		if (jQuery(this).siblings("label").hasClass("radioarea")) {
			jQuery(this).siblings("label").removeClass("radioarea").addClass("radioareachecked");
			jQuery(this).parent("div.row").siblings().children("label").removeClass("radioareachecked").addClass("radioarea");
			}
	});
		

	// for checkbox input
	jQuery(".custom-form input:checkbox:checked").siblings("label").removeClass("checkboxarea").addClass("checkboxareachecked");
	// for checkbox
	jQuery(".custom-form input:checkbox").siblings("label").click(function() {
		if (jQuery(this).hasClass("checkboxarea")) {
			jQuery(this).removeClass("checkboxarea").addClass("checkboxareachecked");
			} else {
			jQuery(this).removeClass("checkboxareachecked").addClass("checkboxarea");
			}
	});
	
	
	// for copyright toggle on load
	jQuery(window).bind('load', function() {
	if (jQuery(".custom-form input#copyrighttwo").siblings("label").hasClass("radioareachecked")) {
		jQuery(".copybox1").hide();
		jQuery(".copybox2").show();
	} else {
		jQuery(".copybox2").hide();
		jQuery(".copybox1").show();
	}
	});
	// for copyright toggle on click
	jQuery(".custom-form input#copyrighttwo").siblings("label").click(function () {
			jQuery(this).parent().siblings(".copybox1").slideUp(500);
			jQuery(this).parent().siblings(".copybox2").slideDown(500);
	});
	jQuery(".custom-form input#copyrightsingle").siblings("label").click(function () {
			jQuery(this).parent().siblings(".copybox2").slideUp(500);
			jQuery(this).parent().siblings(".copybox1").slideDown(500);
	});
	
	
	// Upload Button for images
	jQuery('input:button.upload-button.image').click(function() {
		example_image =  jQuery(this).siblings(".example-image");
		upload_text = jQuery(this).siblings(".upload-text");
		tb_show('Upload Media', 'media-upload.php?post_id=&type=image&amp;TB_iframe=true');
		window.send_to_editor = function(html){
			image_url = jQuery(html).attr('href');
			thumb_url = jQuery('img',html).attr('src');
			
			example_image.html('<img src=' + thumb_url + ' />');
			upload_text.val(image_url);
			tb_remove();
		}
		return false;
	});
	
	
	// Upload Button for font
	jQuery('input:button.upload-button.font').click(function() {
		upload_text = jQuery(this).siblings(".upload-text");
		font_family = jQuery(this).parent().siblings().find("#fontadd");
		tb_show('Upload Media', 'media-upload.php?post_id=&type=image&amp;TB_iframe=true');
		window.send_to_editor = function(html){
			font_url = jQuery(html).attr('href');
			upload_text.val(font_url);
			
			jQuery.get(font_url, function(data){
				var start_name = data.indexOf('"font-family":"') + 15;
				var end_name = data.indexOf('"', start_name + 1);
				var font_name = data.substring(start_name, end_name);
				font_family.val(font_name);
				
				tb_remove();
			});
		}
		return false;
	});


	// Accordion
	jQuery("ul.pa-accordion li").each(function(){
		jQuery(this).children(".accordion-content").css('height', function(){ 
			return jQuery(this).height(); 
		});
		
		if(jQuery(this).index() > 0){
			jQuery(this).children(".accordion-content").css('display','none');
		}else{
			jQuery(this).children(".accordion-head").addClass('active');
		}
		
		jQuery(this).children(".accordion-head").bind("click", function(){
			jQuery(this).children().addClass(function(){
				if(jQuery(this).hasClass("active")) return "";
				return "active";
			});
			
			jQuery(this).parent().siblings("li").children(".accordion-content").slideUp();
			jQuery(this).parent().siblings("li").find(".active").removeClass("active");
			jQuery(this).siblings(".accordion-content").slideDown(function(){
				
				jQuery(".custom-form").css('min-height', '540px');
				var a = parseInt(jQuery(".custom-form").height(), 10);
				var b = parseInt(jQuery(".panelsidebar").height(), 10);
				if (b>a) { jQuery(".custom-form").css('min-height', b); }
				else { jQuery(".panelsidebar").css('min-height', b); }
				});
		});
	});
	
	
	jQuery('#welcome-section').show().siblings().hide();
	// Tab
	var tabs = jQuery('ul.tabs');
	tabs.each(function(i) {

		var tab = jQuery(this).find('> li > a');
		tab.click(function(e) {
			
			var contentLocation = jQuery(this).attr('href');
			
			if(contentLocation.charAt(0)=="#") {
				e.preventDefault();
				
				tab.removeClass('active');
				jQuery(this).addClass('active');
				
				jQuery(contentLocation).fadeIn(1000).addClass('active').siblings().hide().removeClass('active');
				
				jQuery(".custom-form").css('min-height', '540px');
				var a = parseInt(jQuery(".custom-form").height(), 10);
				var b = parseInt(jQuery(".panelsidebar").height(), 10);
				if (b>a) { jQuery(".custom-form").css('min-height', b); }
				else { jQuery(".panelsidebar").css('min-height', b); }

			}
		});
	});
	
	
	// sample font creator for header`s
	jQuery(window).bind('load', function() {
		
		// creat javascript element for every cufon font in <head>
		jQuery('#fontfamily-section #font-header select option').each(function(index, element) {
		
			var cufon_font = jQuery(this).val().split('|');
			if (cufon_font[1] == 'cufonfont') {
			
			var address_script = document.createElement('script');
			address_script.type = 'text/javascript';
			address_script.src = cufon_font[2];
			document.getElementsByTagName('head')[0].appendChild(address_script);
			
			}
			
		});
		
		// creat example font viewer on load page
		jQuery('#font').click(function () {
		jQuery('#fontfamily-section select').each(function(index, element) {
		
		var current_font = jQuery(this).find("option:selected").val().split('|');
		
		if (current_font[1] == 'googlefont') {
			
		var current_url = 'http://fonts.googleapis.com/css?family=' + current_font[0];
		jQuery(this).siblings('.font-example').after('<link rel="stylesheet" href="' + current_url + '" type="text/css">');
		jQuery(this).siblings('.font-example').css('font-family', current_font[0]);
		
		} else {
			
			var current_target_id = jQuery(this).parent().parent().attr('id');
			
			if (current_font[0] != '') {
			
			var cufon_script = document.createElement('script');
			cufon_script.innerHTML = 'Cufon.replace("#' + current_target_id + '-example", { fontFamily:"' + current_font[0] + '" })';
			cufon_script.type = 'text/javascript';
			cufon_script.id = current_target_id + '-script';
			document.getElementsByTagName('head')[0].appendChild(cufon_script);
			
			}
		}
		});
		
		});
	});
	
	
	// creat example font viewer on change option
	jQuery('#fontfamily-section select').change(function(){
		
		jQuery(this).siblings('link').remove();
		jQuery('#' + target_id + '-script').remove();
		jQuery(this).siblings('.font-example').children().remove();
		jQuery(this).siblings('.font-example').html('The Sample Text');
		
		var font_family = jQuery(this).find("option:selected").val().split('|');
		
		if (font_family[1] == 'googlefont') {
			
		var url = 'http://fonts.googleapis.com/css?family=' + font_family[0];
		jQuery(this).siblings('link').attr('href', url);
		jQuery(this).siblings('.font-example').css('font-family', font_family[0]);
		jQuery(this).siblings('.font-example').after('<link rel="stylesheet" href="' + url + '" type="text/css">');
		
		} else {
			
			var target_id = jQuery(this).parent().parent().attr('id');
			
			if (font_family[0] != '') {
				
			var cufon_script = document.createElement('script');
			cufon_script.innerHTML = 'Cufon.replace("#' + target_id + '-example", { fontFamily:"' + font_family[0] + '" })';
			cufon_script.type = 'text/javascript';
			cufon_script.id = target_id + '-script';
			document.getElementsByTagName('head')[0].appendChild(cufon_script);
			
			}
		}
	});
	
	
	// call colorpicker for inputs
	jQuery(window).bind('load', function() {
		jQuery('.allcoloring input, input.coloring').bind('focusin', function() {
			jQuery(this).ColorPicker({
				onSubmit: function(hsb, hex, rgb, el) {
					jQuery(el).val('#'+hex);
					jQuery(el).ColorPickerHide();
				},
				onBeforeShow: function () {
					jQuery(this).ColorPickerSetColor(this.value);
				}
			})
		})
		.bind('keyup', function(){
			jQuery(this).ColorPickerSetColor(this.value);
		});
	});
	 
	 
	// for portfolio style properties
	jQuery(window).bind('load', function() {
		jQuery("#port-style select").trigger("change");
	});
	jQuery('#port-style select').change(function(){
		var value = jQuery("#port-style select").val();
		if (jQuery("#port-style select").val() == "simple") {
			jQuery("#portthumbdate-on-off").slideDown(300);
			jQuery("#portstylegal-on-off").slideUp(300);
		} else if (value == "gallery") {
			jQuery("#portthumbdate-on-off").slideUp(300);
			jQuery("#portstylegal-on-off").slideDown(300);
		} else {
			jQuery("#portthumbdate-on-off").slideUp(300);
			jQuery("#portstylegal-on-off").slideUp(300);
		}
	});
	 
	 
	// for post thumbnail type input text
	jQuery(window).bind('load', function() {
		jQuery("#postthumb-type select").trigger("change");
	});
	jQuery('#postthumb-type select').change(function(){
		var value = jQuery("#postthumb-type select").val();
		if (value == "image") {
			jQuery("#postthumb-image").slideDown(300).siblings().slideUp(300);
		} else if (value == "video") {
			jQuery("#postthumb-video").slideDown(300).siblings().slideUp(300);
		} else if (value == "slider") {
			jQuery("#postthumb-slider").slideDown(300).siblings().slideUp(300);
		}
	});
	// for post inside thumbnail type input text
	jQuery(window).bind('load', function() {
		jQuery("#postinthumb-type select").trigger("change");
	});
	jQuery('#postinthumb-type select').change(function(){
		var value = jQuery("#postinthumb-type select").val();
		if (value == "image") {
			jQuery("#postinthumb-image").slideDown(300).siblings().slideUp(300);
		} else if (value == "video") {
			jQuery("#postinthumb-video").slideDown(300).siblings().slideUp(300);
		} else if (value == "slider") {
			jQuery("#postinthumb-slider").slideDown(300).siblings().slideUp(300);
		} else
			jQuery("#postinthumb-image, #postinthumb-video, #postinthumb-slider").slideUp(300);
	});
	
	
	// for portfolio thumbnail type input text
	jQuery(window).bind('load', function() {
		jQuery("#portthumb-type select").trigger("change");
	});
	jQuery('#portthumb-type select').change(function(){
		var value = jQuery("#portthumb-type select").val();
		if (value == "image") {
			jQuery("#portthumb-image").slideDown(300).siblings().slideUp(300);
		} else if (value == "video") {
			jQuery("#portthumb-video").slideDown(300).siblings().slideUp(300);
		} else if (value == "slider") {
			jQuery("#portthumb-slider").slideDown(300).siblings().slideUp(300);
		}
	});
	// for portfolio inside thumbnail type input text
	jQuery(window).bind('load', function() {
		jQuery("#portinthumb-type select").trigger("change");
	});
	jQuery('#portinthumb-type select').change(function(){
		var value = jQuery("#portinthumb-type select").val();
		if (value == "image") {
			jQuery("#portinthumb-image").slideDown(300).siblings().slideUp(300);
		} else if (value == "video") {
			jQuery("#portinthumb-video").slideDown(300).siblings().slideUp(300);
		} else if (value == "slider") {
			jQuery("#portinthumb-slider").slideDown(300).siblings().slideUp(300);
		} else
			jQuery("#portinthumb-image, #portinthumb-video, #portinthumb-slider").slideUp(300);
	});
	// for portfolio thumbnail image url input text
	jQuery(window).bind('load', function() {
		jQuery("#portthumb-image select").trigger("change");
	});
	jQuery('#portthumb-image select').change(function(){
		var value = jQuery("#portthumb-image select").val();
		if (value == "url" || value == "picture" || value == "video") {
			jQuery("#portthumb-imageurl").slideDown(300);
		} else {
			jQuery("#portthumb-imageurl").slideUp(300);
		}
	});
	
	
	// page option effect
	jQuery('#pageoption-section').show().siblings('div').hide();
	// Tab
	var tabs = jQuery('a.pageoptionheader');
	tabs.each(function(i) {

		var tab = jQuery(this);
		tab.click(function(e) {
			
			var contentLocation = jQuery(this).attr('href');
			
			if(contentLocation.charAt(0)=="#") {
				e.preventDefault();
				
				tab.removeClass('active');
				jQuery(this).addClass('active');
				
				jQuery(contentLocation).fadeIn(1000).addClass('active').siblings('div').hide().removeClass('active');

			}
		});
	});
	
	
	// for slider link type
	jQuery(window).bind('load', function() {
		jQuery("#sliderlink-type select").trigger("change");
	});
	jQuery('#sliderlink-type select').change(function(){
		var value = jQuery("#sliderlink-type select").val();
		if (value == "url") {
			jQuery("#sliderlink-url").slideDown(300).siblings().slideUp(300);
		} else if (value == "video") {
			jQuery("#sliderlink-video").slideDown(300).siblings().slideUp(300);
		} else {
			jQuery("#sliderlink-url, #sliderlink-video").slideUp(300);
		}
	});
	
	
	// for sidebar toggle on load
	jQuery(window).bind('load', function() {
		if (jQuery(".custom-form .all-sidebar label.radioareachecked").siblings("input").val()=='right') {
			jQuery(".sidebar-selection-right").show();
			jQuery(".sidebar-selection-left").hide();
		} else if (jQuery(".custom-form .all-sidebar label.radioareachecked").siblings("input").val()=='left') {
			jQuery(".sidebar-selection-right").hide();
			jQuery(".sidebar-selection-left").show();
		} else if (jQuery(".custom-form .all-sidebar label.radioareachecked").siblings("input").val()=='both') {
			jQuery(".sidebar-selection-right, .sidebar-selection-left").show();
		} else {
			jQuery(".sidebar-selection-right, .sidebar-selection-left").hide();
		}
	});
	// for sidebar toggle on click
	jQuery(".custom-form .all-sidebar label").click(function () {
		if (jQuery(this).siblings("input").val()=='right') {
			jQuery(this).parent().siblings(".sidebar-selection").children(".sidebar-selection-right").slideDown(500).siblings().slideUp(500);
		} else if (jQuery(this).siblings("input").val()=='left') {
			jQuery(this).parent().siblings(".sidebar-selection").children(".sidebar-selection-right").slideUp(500).siblings().slideDown(500);
		} else if (jQuery(this).siblings("input").val()=='both') {
			jQuery(this).parent().siblings(".sidebar-selection").children(".sidebar-selection-right, .sidebar-selection-left").slideDown(500);
		} else {
			jQuery(this).parent().siblings(".sidebar-selection").children(".sidebar-selection-right, .sidebar-selection-left").slideUp(500);
		}
	});
	
	
	// hide portfolio size option for 1/3 & 1/4 on load
	jQuery(window).bind('load', function() {
		if (jQuery(".custom-form #pagesidebar label.radioareachecked").siblings("input").val()=='both') {
			// hide portfolio size option for 1/3 & 1/4
			jQuery("#port-size select option[value='13']").hide();
			jQuery("#port-size select option[value='14']").hide();
		}
	});
	// hide portfolio size option for 1/3 & 1/4 on sidebar click
	jQuery(".custom-form #pagesidebar label").click(function () {
		if (jQuery(this).siblings("input").val()=='both') {
			// hide portfolio size option for 1/3 & 1/4
			jQuery("#port-size select option[value='13']").hide();
			jQuery("#port-size select option[value='14']").hide();
		} else {
			// show portfolio size option for 1/3 & 1/4
			jQuery("#port-size select option[value='13']").show();
			jQuery("#port-size select option[value='14']").show();
		}
	});
	
	
	// show/hide page option based on template on load
	jQuery(window).bind('load', function() {
		jQuery("select#page_template").trigger("change");
	});
	// show/hide page option based on template on change
	jQuery("select#page_template").change(function () {
		jQuery("#pageoption-section").fadeIn().siblings('div').not('#pageoption-section').hide();
		jQuery("#pagelength").hide();
			
		if (jQuery(this).val()=='page-portfolio.php') {
			// show portfolio
			jQuery("a[href='#portpageoption-section']").fadeIn().siblings().not('.general').hide();
		}
		else if (jQuery(this).val()=='page-contact.php') {
			// show contact
			jQuery("a[href='#contactpageoption-section']").fadeIn().siblings().not('.general').hide();
		}
		else if (jQuery(this).val()=='page-gallery.php') {
			// show gallery
			jQuery("a[href='#gallerypageoption-section']").fadeIn().siblings().not('.general').hide();
		}
		else if (jQuery(this).val()=='page-blog.php') {
			// show blog
			jQuery("a[href='#blogpageoption-section']").fadeIn().siblings().not('.general').hide();
		}
		else if (jQuery(this).val()=='page-sitemap.php') {
			// show general
			jQuery("a[href='#pageoption-section']").fadeIn().siblings().not('.general').hide();
		}
		else {
			// show general
			jQuery("#pagelength").show();
			jQuery("a[href='#pageoption-section']").fadeIn().siblings().not('.general').hide();
		}
	});
	
	
	// Create Sidebar item
	jQuery("div#add-sidebar").click(function(){
		
		var clone_item = jQuery(this).siblings('#added-sidebar-wrapper').find('.sample-sidebar-item').clone(true);
		var clone_val = jQuery(this).siblings('input#sidebaradd').val();
		if (clone_val == '') return;
		
		var a = jQuery(this).siblings('input#sidebaraddvalues').val();
		a = a + clone_val + '|' ;
		jQuery(this).siblings('input#sidebaraddvalues').val(a);
		
		if (clone_val == '') return;
		clone_item.removeClass('sample-sidebar-item').addClass('added-sidebar-item');
		clone_item.find('input').attr('name',function(){
			return jQuery(this).attr('id');
		});
		clone_item.find('input').attr('value', clone_val);
		clone_item.find('.added-sidebar-item-title').html(clone_val);
		jQuery("#added-sidebar-wrapper").append(clone_item);
		jQuery(".added-sidebar-item").slideDown();
		
		jQuery(this).siblings('input#sidebaradd').val('');
	});
	jQuery(".added-sidebar-item").css('display','block');
	jQuery(".added-sidebar-item-del").click(function(){
	
		var elem = jQuery(this);
			jQuery.confirm({
			'title'	  : 'Delete Confirmation',
			'message'	: 'You are about to delete this item. <br />It cannot be restored at a later time! Continue?',
			'buttons'	: {
			'Yes'		: {
			'class'	  : 'confirm-yes',
			'action'	 : function(){
				
								var a = elem.siblings('input').val() + '|';
								var b = elem.parent().parent().siblings('input#sidebaraddvalues').val();
								var c = b.replace(a,'');
								elem.parent().parent().siblings('input#sidebaraddvalues').val(c);
								
								elem.parents("#sidebar-item").slideUp("200",function(){
									jQuery(this).remove();
								});
							}
						},
			'No'		 : {
			'class'	  : 'confirm-no',
			'action'	 : function(){}	// Nothing to do in this case. You can as well omit the action property.
				}
			}
		});
	});
	
	
	// Create font item
	jQuery("div#add-font").click(function(){
		
		var clone_item = jQuery(this).siblings('#added-font-wrapper').find('.sample-font-item').clone(true);
		var clone_val = jQuery(this).siblings('input#fontadd').val();
		var clone_path = jQuery(this).parent().siblings().find('input#fontaddpath').val();
		
		var a = jQuery(this).siblings('input#fontaddvalues').val();
		var b = clone_val + '~' + clone_path + '|';
		a = a + b;
		jQuery(this).siblings('input#fontaddvalues').val(a);
		
		if(clone_val == '') return;
		clone_item.removeClass('sample-font-item').addClass('added-font-item');
		clone_item.find('input').attr('name',function(){
			return jQuery(this).attr('id');
		});
		clone_item.find('input').attr('value', b);
		clone_item.find('.added-font-item-title').html(clone_val);
		jQuery("#added-font-wrapper").append(clone_item);
		jQuery(".added-font-item").slideDown();
		
		jQuery(this).siblings('input#fontadd').val('');
		jQuery(this).parent().siblings().find('input#fontaddpath').val('');
	});
	jQuery(".added-font-item").css('display','block');
	jQuery(".added-font-item-del").click(function(){
	
		var elem = jQuery(this);
			jQuery.confirm({
			'title'	  : 'Delete Confirmation',
			'message'	: 'You are about to delete this item. <br />It cannot be restored at a later time! Continue?',
			'buttons'	: {
			'Yes'		: {
			'class'	  : 'confirm-yes',
			'action'	 : function(){
				
								var a = elem.siblings('input').val();
								var b = elem.parent().parent().siblings('input#fontaddvalues').val();
								var c = b.replace(a,'');
								elem.parent().parent().siblings('input#fontaddvalues').val(c);
								
								elem.parents("#font-item").slideUp("200",function(){
									jQuery(this).remove();
								});
							}
						},
			'No'		 : {
			'class'	  : 'confirm-no',
			'action'	 : function(){}	// Nothing to do in this case. You can as well omit the action property.
				}
			}
		});
	});
	
	

	
});