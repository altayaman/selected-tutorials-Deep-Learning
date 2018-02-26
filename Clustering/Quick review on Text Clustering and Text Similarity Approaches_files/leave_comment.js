/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs 
  */
$(function() {

    $("#leave_comment input,#leave_comment textarea").jqBootstrapValidation();

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$(function() {

    $("#blog_login input,#blog_login textarea").jqBootstrapValidation();

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$(function() {

    $("#blog_signup input,#blog_signup textarea").jqBootstrapValidation();

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

