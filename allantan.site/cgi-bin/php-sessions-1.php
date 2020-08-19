<?php
  header("Cache-Control: no-cache");
  header("Content-type: text/html");
  if(empty($_SESSION)) {
    session_start();
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PHP Sessions</title>
</head>
<body>
  <h1>PHP Sessions Page 1</h1>
  <?php
    if(empty($_SESSION)) {
      $_SESSION["name"] = $_POST["username"];
    }
    $name = "You do not have a name set";
    if($_SESSION["name"]) {
      $name = $_SESSION["name"];
    }
    echo "<p><b>Name: </b>" . $name . "</p>"
    echo "<br />"
  ?>
  <a href="./php-sessions-2.php">Session Page 2</a>
  <a href="../php-cgiform.html">PHP CGI Form</a>
  <br />
  <form action="./php-destroy-session.php" method="get">
    <button type="submit">Destroy Session</button>
  </form>
</body>
</html>