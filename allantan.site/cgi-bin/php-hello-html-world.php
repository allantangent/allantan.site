<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello, PHP!</title>
</head>
<body>
  <h1>Hello, PHP!</h1>
  <?php 
    print "Current time: ";
    print date();
    echo "<br />";
    print "Your IP Address: ";
    print $_SERVER['REMOTE_ADDR'];
  ?>
</body>
</html>