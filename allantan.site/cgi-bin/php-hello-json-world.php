<?php 
    header("Cache-Control: no-cache");
    header("Content-type: application/json");
    $myObj->message = "Hello World";
    $myObj->date = date(r);
    $myObj->currentIp = $_SERVER['REMOTE_ADDR'];
    echo json_encode($myObj);
?>