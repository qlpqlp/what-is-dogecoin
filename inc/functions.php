<?php
/**
*   File: Functions used on the Doge Nodes Map
*   Author: https://twitter.com/inevitable360 and all #Dogecoin friends and familly helped will try to find a way to put all names eheh!
*   Description: Real use case of the dogecoin.com CORE Wallet connected by RCP Calls using Old School PHP Coding with easy to learn steps (I hope lol)
*   License: Well, do what you want with this, be creative, you have the wheel, just reenvent and do it better! Do Only Good Everyday
*/
// PDO DB Connection
    $db = 'mysql:host='.$dbhost.';dbname='.$dbname;
    $opt = [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false, ];
    try {
      $pdo = new PDO($db, $dbuser, $dbpass, $opt);
      }
    catch (PDOException $e) {
      echo '<br>DB Error: ' . $e->getMessage() . '<br><br>'; echo '<br>This page will auto refresh in 5 seconds to check if the issue is resolved!'; header("Refresh:5"); exit();
     };

// This functions is to get the visitor real IP to trey to detect if he has any Doge Coin Node on the MAP
   function getIPAddress() {
   //whether ip is from the share internet
    if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }
    //whether ip is from the proxy
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
     }
    //whether ip is from the remote address
    else{
        $ip = $_SERVER['REMOTE_ADDR'];
    }
     return $ip;
   }

// This is to get the vitiroe IP
    $real_ip = getIPAddress();

// This is to get the an IP Adress from the URL exemple: https://what-is-dogecoin.com/nodes?DogeNodeIp=1.1.1.1 to try to find a specific IP on the MAP
    $real_ip = explode(":",$_GET["DogeNodeIp"]);

// Now we filter if its really an valid IP because of the Hacks and also non IP's submited
    if (filter_var($real_ip[0], FILTER_VALIDATE_IP)) {
        $real_ip = $real_ip[0];
    } else {
        $real_ip = "";
    }
?>