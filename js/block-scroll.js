(function( $ ) {

  $.fn.blockScroll = function(options) {
    var settings = $.extend({
      // These are the defaults.
      startDiv : 1,
      fadeDuration : "slow",
      paddingRatio : 0.05,
      triggerRatio : 0.005,
      scrollDuration: "fast",
      fadeBlocks: true
    }, options );

    if(settings.triggerRatio > settings.paddingRatio*.95) { settings.triggerRatio = settings.paddingRatio*.95 }

    var theDivs = this.children().filter("div");
    var activeDiv = settings.startDiv-1; //Active did is 0-index, settings is 1-index
    var windowHeight;
    var paddingHeight;
    var triggerHeight;
    var currentDownTrigger;
    var currentUpTrigger;
    var totalDivs = theDivs.length;
    var lastScrollPos;
    var activelyScrolling = false;
    var activeBackground= 0;

    // Ensure that all of the elements are hidden just in case the css is not setup properly
    if(settings.fadeBlocks)
    {
      this.children().each(function() {
        $(this).css('opacity','0');
      });
    }

    arrange();
    // Fade in the first div
    $(theDivs[activeDiv]).animate({opacity: 1},settings.fadeDuration,'linear', function() {
      $(window).scrollTop(0);
      calcTriggers();
      bindEvents();
      lastScrollPos = $(window).scrollTop();
    });

    function bindEvents()
    {
      $(window).on('scroll', function(e) {
        var scrollPosition = $(window).scrollTop();
        var scrollDistance = $(window).height();
        var indexOfClosest = 0;

        theDivs.each(function(index, element) {
          var $this = $(this);
          var topPosition = $this.offset().top;
          var newScrollDistance = Math.abs(scrollPosition - topPosition);
          if(newScrollDistance < scrollDistance)
          {
            indexOfClosest = index;
            scrollDistance = newScrollDistance;
          }
        });
        gotoDiv(indexOfClosest);
      }, 250);

      $(window).resize(function() {
        arrange();
      });

      //$("#block-up-arrow").click(function() {
      //  goUp();
      //});

      //$("#block-down-arrow").click(function() {
      //  goDown();
      //});
	    
	    
      $(".previous").click(function() {
        goUp();
      });

      $(".next").click(function() {
        goDown();
      });


      $(document).keydown(function(e){
          if (e.keyCode == 37 || e.keyCode == 38) {
             goUp();
             return false;
          }

          if (e.keyCode == 39 || e.keyCode == 40) {
             goDown();
             return false;
          }
      });
	    
      $('input').keypress(function(e){
     	var keycode = (event.keyCode ? event.keyCode : event.which);
    	if(keycode == '13') {
	     goDown();
             return false;	
              alert('You pressed a "enter" key in input');  
    	}
      });
		$(window).bind('mousewheel', function(e){
			if(e.originalEvent.wheelDelta > 119) {
				goUp();
				// Add or Remove active-div class
				$(theDivs[activeDiv]).addClass("active-div");
	                        $(theDivs[activeDiv+1]).removeClass("active-div");
			}
			else if (e.originalEvent.wheelDelta < -119) {
				goDown();
				// Add or Remove active-div class
				$(theDivs[activeDiv]).addClass("active-div");
				$(theDivs[activeDiv-1]).removeClass("active-div");
			}
		});
		$(window).bind('DOMMouseScroll', function(e){
			if(e.originalEvent.detail < 0) {
				goUp();
				// Add or Remove active-div class
				$(theDivs[activeDiv]).addClass("active-div");
	                        $(theDivs[activeDiv+1]).removeClass("active-div");
			}
			else if (e.originalEvent.detail > 0) {
				goDown();
				// Add or Remove active-div class
				$(theDivs[activeDiv]).addClass("active-div");
				$(theDivs[activeDiv-1]).removeClass("active-div");
			}
		});
    }

    function goUp()
    {
      if(activeDiv > 0 && !activelyScrolling)
      {
        gotoDiv(activeDiv-1);
	$(theDivs[activeDiv]).addClass("active-div");
	$(theDivs[activeDiv+1]).removeClass("active-div");
      }
    }

    function goDown()
    {
      if(activeDiv < totalDivs - 1 && !activelyScrolling)
      {
        gotoDiv(activeDiv+1);
	$(theDivs[activeDiv]).addClass("active-div");
	$(theDivs[activeDiv-1]).removeClass("active-div");
	//if ($(".active-div input, .active-div textarea").not(':button').valid()) {
        //    $('.active-div .next').prop('disabled', false);  
        //} else {
        //   $('.active-div .next').prop('disabled', 'disabled');
        //}
      }
    }

    function gotoDiv(number)
    {
      if(number == 0)
        //$("#block-up-arrow").hide();
	  $("#block-up-arrow").show();
      else
        $("#block-up-arrow").show();
      if(number == totalDivs-1)
        $("#block-down-arrow").hide();
      else
        $("#block-down-arrow").show();
      activeDiv = number;
      activelyScrolling = true;
      $('html, body').animate({scrollTop: $(theDivs[activeDiv]).offset().top}, settings.scrollDuration, 'linear', function() {
        $(theDivs[activeDiv]).animate({opacity: 1}, settings.fadeDuration,'linear', function() {
          setTimeout(function(){
            activelyScrolling = false; lastScrollPos = $(window).scrollTop();
          },50);
        });
      });
      calcTriggers();
    }

    function calcTriggers()
    {
      if (activeDiv < totalDivs -1)
      {
        currentDownTrigger = $(theDivs[activeDiv+1]).offset().top;
      } else {
        currentDownTrigger = -1;
      }

      if (activeDiv > 0) {
        currentUpTrigger = $(theDivs[activeDiv-1]).offset().top;
      } else {
        currentUpTrigger = -1;
      }
    }

    function calcDims()
    {
      windowHeight = $(window).height();
      paddingHeight = windowHeight * settings.paddingRatio;
      triggerHeight = windowHeight * settings.triggerRatio;
    }


    function arrange()
    {
      calcDims();
      theDivs.each(function(index, element) {
        var $this = $(this);
        $this.height('auto');
        if($this.height() < windowHeight)
        {
          var margin = windowHeight/2 - $this.height()/2;
          $this.height(windowHeight-margin);
          $this.css('padding-top', margin + "px");
          var $innerDiv = $($this.children().filter('div')[0]);
          // $innerDiv.css('padding-top', margin + "px");
        }
        if(index != totalDivs - 1)
        {
          //$this.css('padding-bottom',paddingHeight + 'px');
        }
      });
      gotoDiv(activeDiv);
    }

    var gotoView = function(number)
    {
      gotoDiv(number-1);
    }

    return {
      goto: gotoView
    };
  }

}( jQuery ));

;(function ($) {
    var on = $.fn.on, timer;
    $.fn.on = function () {
        var args = Array.apply(null, arguments);
        var last = args[args.length - 1];

        if (isNaN(last) || (last === 1 && args.pop())) return on.apply(this, args);

        var delay = args.pop();
        var fn = args.pop();

        args.push(function () {
            var self = this, params = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(self, params);
            }, delay);
        });

        return on.apply(this, args);
    };
}(this.jQuery || this.Zepto));
