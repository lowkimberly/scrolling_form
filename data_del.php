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
	$sql = "delete from Person where pname=\"" . $_POST["name"] . "\" and ssn=" . $_POST["ssn"] . " and bdate=\"" . $_POST["birth"] . "\" and income=\"" . $_POST["money"] . "\" ;";
	echo $sql;
	$ret = mysql_query( $sql, $conn );

	if(!$ret) {
		die('Failed Delete: ' . mysql_error());
	}
	echo mysql_error();
	return mysql_error();
?>