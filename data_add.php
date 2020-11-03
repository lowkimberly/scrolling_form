<?php

//modified from Database Systems class code
function db_connect() {
	$host = 'bigyellowcat.cs.binghamton.edu:3306';
	$user = 'low';
	$pass = 'low0607';
	$conn = mysql_connect($host, $user, $pass);
	if(! $conn ) {
	  die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("low");
	return $conn;
}

	$conn = db_connect();
	$sql = "insert into Person values('0',\"" . $_POST["name"] . "\"," . $_POST["ssn"] . ",\"" . $_POST["birth"] . "\",\"" . $_POST["money"] . "\");";
	echo $sql;
	$ret = mysql_query( $sql, $conn );

	if(!$ret) {
		die('Failed insert: ' . mysql_error());
	}
	echo mysql_error();
	return mysql_error();
?>