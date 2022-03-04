// VALIDATE
$(document).ready(function() {
	
var oid ="00D5j000008zN11";
$("input[name=oid]").val(oid);	
	$("#msform").validate({

// SUBMIT
submitHandler: function(form) {
var prod ="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";	
console.log('valid form submission');

    $.ajax({
        url: prod,
        type: 'post',
        dataType: 'jsonp',
        jsonp: '$callback',
        data: $('#msform *').serialize()
        //success: function(data) {
        //    $('#msform').hide();
        //    $("#success-message").show();
	//    console.log('Show success');
        //}
    });

	//console.log("Submitted");

        $('#msform').hide();
        $('#success-message').fadeIn(750);

    return false;
},

// Other Validate Options
		
	  ignore: [],

rules: {
          name: {
              required: true,
              minlength: 3
          },
          address: {
              required: true,
              minlength: 3
          },
          suburb: {
              required: true,
              minlength: 3
          },
          state: {
              required: true,
              minlength: 2
          },
          postcode: {
              required: true,
              minlength: 4
          },
          phone: {
              required: true,
              minlength: 4
          },
          email: {
              required: true,
              email: true
          },
    	  contactpreference: {
      		required: true
    	  },
	  fundraise: {
      		required: true
    	  },
	  fundraise_pack: {
    	  },
	  event_title: {
    	  },
	  venue: {
    	  },
	  start_date: {
    	  },
	  start_day: {
		digits: true,
		maxlength: 2
    	  },
	  start_month: {
		digits: true,
		maxlength: 2
    	  },
	  start_year: {
		digits: true
    	  },
	  finish_date: {
    	  },
	  finish_day: {
		digits: true,
		maxlength: 2
    	  },
	  finish_month: {
		digits: true,
		maxlength: 2
    	  },
	  finish_year: {
		digits: true
    	  },
          time: {
    	  },
	  participants: {
		digits: true
    	  },
	  fundraising_activity: {
    	  },
	  fundraise_destination: {
    	  },
	  insurance: {
    	  },
	  guidelines: {
    	  },
	  declaration: {
    	  }
      },

    // Change name of error class that is assigned to input fields and placement
	errorPlacement:
	function( error, element ){
	  if(element.is( ":radio" )){
	  // error append here
	  error.prepend('.active-div div.action-wrapper');
	  }
	  else {
	  error.insertAfter(element);
	  }
	}
});
  
   $('#conditional input[type="radio"]').click(function() {
    if($(this).attr('id') == 'checkbox-online') {
    $('#submit-form-11').fadeIn('slow');
    $('#continue-form-11').fadeOut('slow');
    $('.conditional-section').hide();
	    
    // Disable required for path 2
    $("input[name='fundraise_pack']").attr("required", false);
    $("input[name='event_title']").attr("required", false);
    $("input[name='venue']").attr("required", false);
    $("input[name='start_date']").attr("required", false);
    $("input[name='start_day']").attr("required", false);
    $("input[name='start_month']").attr("required", false);
    $("input[name='start_year']").attr("required", false);
    $("input[name='finish_date']").attr("required", false);
    $("input[name='finish_day']").attr("required", false);
    $("input[name='finish_month']").attr("required", false);
    $("input[name='finish_year']").attr("required", false);
    $("input[name='time']").attr("required", false);
    $("input[name='participants']").attr("required", false);
    $("input[name='fundraising_activity']").attr("required", false);
    $("input[name='fundraising_destination']").attr("required", false);
    $("input[name='insurance']").attr("required", false);
    $("input[name='guidelines']").attr("required", false);
    $("input[name='declaration']").attr("required", false);

  } else {
    // Enable required for path 2
    $("input[name='fundraise_pack']").attr("required", true);
    $("input[name='event_title']").attr("required", true);
    $("input[name='venue']").attr("required", true);
    $("input[name='start_date']").attr("required", true);
    $("input[name='start_day']").attr("required", true);
    $("input[name='start_month']").attr("required", true);
    $("input[name='start_year']").attr("required", true);
    $("input[name='finish_date']").attr("required", true);
    $("input[name='finish_day']").attr("required", true);
    $("input[name='finish_month']").attr("required", true);
    $("input[name='finish_year']").attr("required", true);
    $("input[name='time']").attr("required", true);
    $("input[name='participants']").attr("required", true);
    $("input[name='fundraising_activity']").attr("required", true);
    $("input[name='fundraising_destination']").attr("required", true);
    $("input[name='insurance']").attr("required", true);
    $("input[name='guidelines']").attr("required", true);
    $("input[name='declaration']").attr("required", true);

    $('#submit-form-11').fadeOut('slow');
    $('#continue-form-11').fadeIn('slow');
    $('.conditional-section:not("#declaration")').show();
  }
});  
  
// TYPING VALIDATION
//setup before functions
var typingTimer;                // timer identifier
var doneTypingInterval = 500;  // time in ms, 0.5 second for example
var $input = $('input, textarea');

//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
  if ($(".active-div input, .active-div textarea").not(':button').valid()) {
    $('.active-div .next').prop('disabled', false);
  } else {
    $('.active-div .next').prop('disabled', 'disabled');
  }
}
  
// Enable or Disable Next Button
    $('input[type=time]').on('blur', function() {
        if ($(".active-div input[type=time]").valid()) {
            $('.active-div .next').prop('disabled', false);
        } else {
            $('.active-div .next').prop('disabled', 'disabled');
        }
    });  

});
