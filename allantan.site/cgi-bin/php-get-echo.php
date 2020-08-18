<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GET Echo</title>
</head>
<body>
  <?php
    $qString = $_SERVER['QUERY_STRING'];
    echo "Raw query string: " . $qString;
    echo "<br />";
    echo "Formatted Query String: ";
    parse_str($qString, $result);
    foreach($result as $item => $item_val) {
      echo $item . ": " . $item_val;
    }
  ?>
</body>
</html>