function make_sliders() {
  $(".te_slide_left").live("click", function () {
    return slide_left($(this).attr("href"));
  });
  $(".te_slide_right")live("click", function() {
    return slide_right($(this).attr("href"));
  });
}

function cleanup_slide_left() {
  $('.viewport_offstage_left').remove(); 
  $(".on_stage").removeClass("viewport_offstage_right");
  $(".on_stage").addClass("viewport_body");
  $(".viewport_body").removeClass("on_stage");
  make_sliders();
}

function cleanup_slide_right() {
  $('.viewport_offstage_right').remove(); 
  $(".on_stage").removeClass("viewport_offstage_left");
  $(".on_stage").addClass("viewport_body");
  $(".viewport_body").removeClass("on_stage");
  make_sliders();
}

function append_offstage_div(side) {
  $("body").append("<div class='viewport_offstage_" + side + "'></div>");
}

function slide_left(href) {
  append_offstage_div("right");
  $(".viewport_offstage_right").load(href, function(r) {
    $(".viewport_offstage_right > .viewport_body").removeClass("viewport_body");
    $(".viewport_body").addClass("viewport_offstage_left");
    $(".viewport_offstage_right").addClass("on_stage");
    setTimeout(cleanup_slide_left, 1000);
  });
  return false;
}

function slide_right(href) {
  append_offstage_div("left");
  $(".viewport_offstage_left").load(href, function(r) {
    $(".viewport_offstage_left > .viewport_body").removeClass("viewport_body");
    $(".viewport_body").addClass("viewport_offstage_right");
    $(".viewport_offstage_left").addClass("on_stage");
    setTimeout(cleanup_slide_right, 1000);
  });
  return false;
}

//a goofy workaround because the toggle object seems to get two click events
// per actual click
function make_toggles() {
  $('.toggle').toggle(
    function() {
      $(this).attr("value", ($(this).attr("value") == 'OFF' ? 'ON' : 'OFF'));
      $(this).attr("toggled", $(this).attr("value") == 'ON');
      var hidden_selector = "#" + $(this).attr("id").replace("_toggle", "");
      $(hidden_selector).attr("value", $(this).attr("value"));
      return false;
    }, 
    function() {});
}

// Let's listen to the click events of all the DOM events we care about
function init_listiners() {
	// Let's keep track of all the _replace
	$("a[target='_replace']").live("click", 
		function(event){
			// prevent link from actuall clicking
			event.preventDefault(); 
			var link_elememt = $(this);			
			//Make the link blue			
			$(link_elememt).attr("selected", "progress");

			$.get($(this).attr('href'), function(data){
				// Turn off the ajax loading gif
				$(link_elememt).removeAttr('selected');
				// Append the data
				$(link_elememt).parent().parent().append(data);
				// Remove the the selected
				$(link_elememt).parent().remove();
				// Attach the HTML
				$(link_elememt).parent().html(data);
			});
		}
	);
}

// Stolen from iui.  We need to pre-load the preloader image
function preloadImages()
{
    var preloader = document.createElement("div");
    preloader.id = "preloader";
    document.body.appendChild(preloader);
}

function init() {
  make_sliders();
  make_toggles();
	init_listiners();
	preloadImages();
}

$(function() {
  init();
});