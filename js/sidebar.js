function initialize_collapse_button()
{
  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();
}

function customize_side_nav()
{
    $('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
    
}

function show_nav()
{
  // Show sideNav
  $('.button-collapse').sideNav('show');
}

function hide_nav()
{
  // Hide sideNav
  $('.button-collapse').sideNav('hide');
}

function destroy_nav()
{
  // Destroy sideNav
  $('.button-collapse').sideNav('destroy');
}