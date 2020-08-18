<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello, PHP!</title>
</head>
<body>
  <?php 
    header("Cache-Control: no-cache");
    header("Content-type: application/json");
    $myObj->message = "Hello World";
    $myObj->date = date(r);
    $myObj->currentIp = $_SERVER['REMOTE_ADDR'];
    echo json_encode($myObj);
  ?>
</body>
</html>