// fix sub nav on scroll
    var $win = $(window)
      , $nav = $('.subnav')
      , navTop = $('.subnav').length && $('.subnav').offset().top - 40
      , isFixed = 0

    processScroll()

    // hack sad times - holdover until rewrite for 2.1
    $nav.on('click', function () {
      if (!isFixed) setTimeout(function () {  $win.scrollTop($win.scrollTop() - 47) }, 10)
    })

    $win.on('scroll', processScroll)

function processScroll() {
  nav = $('.subnav');
  var i, scrollTop = $win.scrollTop()
  // alert(scrollTop + '>=' + navTop + '!!' +isFixed)
  if (scrollTop >= navTop && !isFixed) {
    isFixed = 1;
    nav.addClass('subnav-fixed')
  } else if (scrollTop <= navTop && isFixed) {
    isFixed = 0
    nav.removeClass('subnav-fixed')
  }
}

function get_popover_placement(pop, dom_el) {
    var width = window.innerWidth;
    if (width<500) return 'bottom';

    // left or right
    var left_pos = $(dom_el).offset().left;
    if (width - left_pos > (width/2)) return 'right';
    return 'left';
  }

function getWeekDay (weekDay) {
  var weekday=new Array(7);
  weekday[0]="Sunday";
  weekday[1]="Monday";
  weekday[2]="Tuesday";
  weekday[3]="Wednesday";
  weekday[4]="Thursday";
  weekday[5]="Friday";
  weekday[6]="Saturday";

  return weekday[weekDay];
}


$(document).ready(function() {
  $('#slider').slider({
      range: true,
      values: [20000, 50000],
      min: 0,
      max: 100000,
      slide: function (event, ui) {
        $("#slider-start").val(ui.values[0]);
        $("#slider-stop").val(ui.values[1]);
      }
  });
  $("#slider-start").val($("#slider").slider( "values", 0));
  $("#slider-stop").val($("#slider").slider("values", 1));

  $('#slider2').slider({
	    range: true,
	    values: [17, 67]
	});


    $(".click-to-apply").tooltip({placement: 'right', title: 'Click to apply'});
    $("*[popover=popover]").popover({placement: get_popover_placement});
  
    $("#format").buttonset();
    $('#radioset').buttonset();
    $('#radioset2').buttonset();
});

