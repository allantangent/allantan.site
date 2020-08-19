<?php
  header("Cache-Control: no-cache");
  header("Content-type: text/html");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>General Request Echo</title>
</head>
<body>
  <header>
    <h1>General Request Echo</h1>
</header>
<hr />

<?php
  $reqMethod = $_SERVER['REQUEST_METHOD'];
  echo "<p><b>HTTP Protocol: </b>" . $_SERVER['SERVER_PROTOCOL'] . "</p>";
  echo "<p><b>HTTP Method: </b>" . $reqMethod . "</p>";
  echo "<p><b>Query String: </b>" . $_SERVER['QUERY_STRING'] . "</p>";
  echo "<p><b>Message Body: </b></p>";
  $reqArr = $_GET;
  if($reqMethod === 'POST') {
    $reqArr = $_POST;
  }
  foreach($reqArr as $item => $item_val) {
    if($item_val) {
      echo $item . ": " . $item_val;
      echo "<br />";
    }
  }
?>
  
</body>
</html>