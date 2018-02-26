/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs 
  */
$(function() {
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation();

    $("#demo_mail input,#demo_mail textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // something to have when submit produces an error ?
            // Not decided if I need it yet
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var mail = $("input#email").val();
            $.ajax({
                url: "/send_mail_demo",
                type: "GET",
                data: {"mail":mail,"from_":document.referrer,},
                cache: false,
                success: function() {
                    // Success message
                    $("#mail_div").hide();
                    $("#done").hide();
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    // $('#demo_mail').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry! It seems that our mail server is not responding...<br></strong> Could you please contact us directly to <b><i>contact@artfact-online.fr</i></b>? Sorry for the inconvenience!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
