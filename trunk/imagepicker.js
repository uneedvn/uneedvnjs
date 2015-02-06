
 
jQuery(document).ready(function(){ 	

	// Decide to show select-image-none element for each image chooser
	jQuery('.image-picker').each(function(){
		if(jQuery(this).find('#selected-image ul').children().size() > 1 ){
			jQuery(this).find('#selected-image-none').css('display','none');
		}
	});
	
	// Confirm for delete image button
	jQuery('.unpick-image').click(function(){
		jQuery(this).bindImagePickerUnpick();
	});
	jQuery.fn.bindImagePickerUnpick = function(){
		
		var elem = jQuery(this);
			jQuery.confirm({
			'title'	  : 'Delete Confirmation',
			'message'	: 'You are about to delete this item. <br />It cannot be restored at a later time! Continue?',
			'buttons'	: {
			'Yes'		: {
			'class'	  : 'confirm-yes',
			'action'	 : function(){
								
								elemparents = elem.parents('.meta-body');
								elem.parents('li').fadeOut('200',function(){
									jQuery(this).remove();
									
									var a = '';
									elemparents.find(".ui-sortable > li.slider-image-init > input").each(function(){
										a = a + jQuery(this).val() + ',';
									});
									elemparents.siblings('input').val(a);
								
								});
								if ( elem.parents('#image-picker').find('#selected-image ul').children().size() == 2 ){
									elem.parents('#image-picker').find('#selected-image-none').fadeIn();
								}
								elem.parents('#image-picker').find('input#slider-num').attr('value',function(){
									return parseInt(jQuery(this).attr('value')) - 1;
								});
							}
						},
			'No'		 : {
			'class'	  : 'confirm-no',
			'action'	 : function(){}	// Nothing to do in this case. You can as well omit the action property.
				}
			}
		});
	};
	
	// Bind the navigation bar and call server using ajax to get the media for each page
	jQuery('div.selected-image ul').sortable({ tolerance: 'pointer', forcePlaceholderSize: true, placeholder: 'slider-placeholder', cancel: '.slider-detail-wrapper', update: function() {
		var a = '';
		jQuery(this).parents('.meta-body').find(".ui-sortable > li.slider-image-init > input").each(function(){
			a = a + jQuery(this).val() + ',';
		});
		jQuery(this).parents('.meta-body').siblings('input').val(a); } 
	});
	
	jQuery('.media-gallery-nav ul li').click(function(){
		jQuery(this).bindImagePickerClickPage();
	});
	jQuery.fn.bindImagePickerClickPage = function(){
		var image_picker = jQuery(this).parents('#image-picker');
		var current_gallery = image_picker.find('#media-image-gallery');
		var paged = jQuery(this).attr('rel');
		current_gallery.slideUp('200');
		image_picker.find('#show-media-image').addClass('loading-media-image');
		jQuery.post(ajaxurl,{ action:'get_media_image', page: paged },function(data){
			paged='';
			current_gallery.html(data);
			current_gallery.find('ul li img').bind('click',function(){
				jQuery(this).bindImagePickerChooseItem();
			});
			current_gallery.find('#media-gallery-nav ul li').bind('click',function(){
				jQuery(this).bindImagePickerClickPage();
			});
			current_gallery.slideDown('200');
			image_picker.find('#show-media-image').removeClass();
		});
	}
	
	// Bind the image when user choose item
	jQuery('.image-picker').find('#media-image-gallery').find('ul li img').click(function(){
		jQuery(this).bindImagePickerChooseItem();
	});
	jQuery.fn.bindImagePickerChooseItem = function(){
		var clone = jQuery(this).parents('#image-picker').find('#default').clone(true);
		clone.find('input, textarea, select').attr('name',function(){
			return jQuery(this).attr('id');
		});
		clone.attr('id','slider-image-init');
		clone.attr('class','slider-image-init');
		clone.css('display','none');
		clone.find('.slider-image-url').attr('value', jQuery(this).attr('attid'));
		clone.find('img').attr('src',jQuery(this).attr('rel'));
		jQuery(this).parents('#image-picker').find('#selected-image-none').fadeOut();
		jQuery(this).parents('#image-picker').find('#selected-image ul').append(clone);
		jQuery(this).parents('#image-picker').find('#selected-image ul li').not('#default').fadeIn('200');
		jQuery(this).parents('#image-picker').find('input#slider-num').attr('value',function(){
			return parseInt(jQuery(this).attr('value')) + 1;
		});
				    
		var a = '';
		jQuery(this).parents('.meta-body').find(".ui-sortable > li.slider-image-init > input").each(function(){
			a = a + jQuery(this).val() + ',';
		});
		jQuery(this).parents('.meta-body').siblings('input').val(a);
		
	}
	
});