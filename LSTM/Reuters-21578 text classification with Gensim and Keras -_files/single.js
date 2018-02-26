jQuery(document).ready(function() {
    jQuery('#slider').flexslider({
        animation: "fade",
        slideshowSpeed: 3800,
        animationSpeed: 1000,
        controlNav: false,
        animationLoop: true,
        smoothHeight:true,
        slideshow: true,
        sync: "#carousel"
    });

});


