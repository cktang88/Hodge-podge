$(document).ready(function() {
  //alert(url)
  //shim to get around x-window display issue
  url = url.replace("watch?v=", "v/");
  //alert(url);
  $('#video').attr({'src': url + time});
});
