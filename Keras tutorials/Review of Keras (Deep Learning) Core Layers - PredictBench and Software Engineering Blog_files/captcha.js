/* Super simple invisible captcha, may need to replace with something smarter if still get through */
jQuery(function() {  
  jQuery('form').append('<input class="form-hp-company" type="text" style="position:relative;left:-10000px;" value=""></input>')
  
  var start = new Date().getTime();
  var expdelay = 1500;
  jQuery('.wpcf7-submit').on('click', function() {	
	var end = new Date().getTime();
	var hp = jQuery('.form-hp-company').val();
	var enabled = (end - start) > expdelay && !hp;	
	start = end;
	expdelay = 1000;	
	return enabled;
  });
});