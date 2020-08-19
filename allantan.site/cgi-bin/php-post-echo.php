<?php
  header("Cache-Control: no-cache");
  header("Content-type: text/html");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>POST Message Body</title>
</head>
<body>
  <header>
    <h1>POST Message Body</h1>
  </header>
  <hr />

  <p>Message Body: </p>
  <?php
    foreach($_POST as $item => $item_val) {
      if($item_val) {
        echo $item . ": " . $item_val;
        echo "<br />";
      }
    }
  ?>
</body>
</html>