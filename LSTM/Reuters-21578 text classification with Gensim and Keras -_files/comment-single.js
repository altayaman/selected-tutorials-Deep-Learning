
jQuery(window).load(function(){

    var heightcontent =  jQuery('#tz-component').outerHeight();
    var heightSidebar =  jQuery('#sidebar-left').outerHeight();
    var sidebarright  =  jQuery('#sidebar-right').outerHeight();
    var $return       =  Math.max( heightcontent, heightSidebar, sidebarright ) ;
    jQuery('#tz-content').css("height",$return+"px");
    jQuery('#sidebar-left').css("height",$return+"px");
    jQuery('#sidebar-right').css("height",$return+"px");
});
