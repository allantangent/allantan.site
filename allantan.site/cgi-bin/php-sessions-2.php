<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PHP Sessions</title>
</head>
<body>
  <h1>PHP Sessions Page 2</h1>
  <?php
    if(!isset($_SESSION["name"])) {
      $_SESSION["name"] = $_POST['username'];
      $name = $_SESSION["name"];
    }
    if(!isset($name)) {
      $name = "You do not have a name set";
    }
    echo "<p><b>Name: </b>" . $name . "</p>";
    echo "<br />";
  ?>
  <a href="./php-sessions-1.php">Session Page 1</a>
  <br />
  <a href="../php-cgiform.html">PHP CGI Form</a>
  <br />
  <br />
  <form action="./php-destroy-session.php" method="get">
    <button type="submit">Destroy Session</button>
  </form>
</body>
</html>