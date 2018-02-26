/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs 
  */
  
// $(function() {

    // $("#contactForm input,#contactForm textarea").jqBootstrapValidation();

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
// });


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
