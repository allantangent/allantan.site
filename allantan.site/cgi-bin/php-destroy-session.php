<?php
  header("Cache-Control: no-cache");
  header("Content-type: text/html");
  session_unset();
  session_destroy();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PHP Session Destroyed</title>
</head>
<body>
  <h1>Session Destroyed</h1>
  <a href="../php-cgiform.html">Back to the PHP CGI Form</a>
  <br />
  <a href="./php-sessions-1.php">Back to Page 1</a>
  <br />
  <a href="./php-sessions-2.php">Back to Page 2</a>
</body>
</html>