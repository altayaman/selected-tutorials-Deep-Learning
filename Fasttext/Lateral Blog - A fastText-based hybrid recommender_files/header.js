$(function(){

	//STICKY HEADER

	if ($(window).width() > 640) {
		$(document).scroll(function(){
		    if($(this).scrollTop() > 80)
		    {   
		        $('.lateral-blog-header').addClass('show');
		        $('.lateral-header').addClass('show');
		        $('.site-header').addClass('show');
		    }
		    else {
		    	$('.lateral-blog-header').removeClass('show');
		    	$('.lateral-header').removeClass('show');
		    	$('.site-header').removeClass('show');
		    }
		});
	}

	// NEWSLETTER BUTTON

	$('.get-access, .newsletter-mobile').click(function(e) {
	  var top = parseInt($(".nsltr-footer").offset().top, 10);
	  $('html, body').animate({
	    scrollTop: top
	  }, 'slow');
	  $('#fieldEmail').focus();
	  $('.blog-header-wrapper ul').removeClass('show');
	  $('.blog-header-wrapper .menu-icon-show').removeClass('show');
	  $('.blog-header-wrapper .menu-icon-hide').removeClass('show');
	  e.preventDefault();
	});

	$('.lateral-blog-header .search-box').on('focus', 'input', function(){
		this.selectionStart = this.selectionEnd = this.value.length;
	});

	// SHOW SEARCH

	function showSearch() {
		$('.blog-header-wrapper').addClass('show');
		$('.blog-header-wrapper .search-box input').focus();
	}

	function hideSearch() {
		$('.blog-header-wrapper').removeClass('show');
	}

	$('.lateral-blog-header').on('click', '.search-icon-show', showSearch);

	$('.lateral-blog-header').on('click', '.search-icon-hide', hideSearch);

	$('.lateral-blog-header .search-box').on('focus', 'input', function(){
		this.selectionStart = this.selectionEnd = this.value.length;
	});

	if ($('body').hasClass('search')) {
		showSearch();
	}

	// SHOW MOBILE NAV

	function showNav() {
		$('.blog-header-wrapper ul').addClass('show');
		$('.blog-header-wrapper .menu-icon-show').addClass('show');
		$('.blog-header-wrapper .menu-icon-hide').addClass('show');
	}

	function hideNav() {
		$('.blog-header-wrapper ul').removeClass('show');
		$('.blog-header-wrapper .menu-icon-show').removeClass('show');
		$('.blog-header-wrapper .menu-icon-hide').removeClass('show');
	}

	$('.lateral-blog-header').on('click', '.menu-icon-show', showNav);

	$('.lateral-blog-header').on('click', '.menu-icon-hide', hideNav);

});

// $(function(){
// 	$(document).scroll(function(){
// 	    if($(this).scrollTop() > 80)
// 	    {   
// 	        $('.lateral-blog-header').addClass('show');
// 	        $('.site-header').addClass('show');
// 	    }
// 	    else {
// 	    	$('.lateral-blog-header').removeClass('show');
// 	    	$('.site-header').removeClass('show');
// 	    }
// 	});
// });

// $(function(){
// 	$(document).scroll(function(){
// 	    if($(this).scrollTop() > 80)
// 	    {   
// 	        $('.lateral-blog-header').removeClass('show');
// 	    }
// 	});
// });