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
	$sql = "select * from Person";
	$ret = mysql_query( $sql, $conn );

	if(!$ret) {
		die('Could not get data: ' . mysql_error());
	}

	$fin_xml="";
	//go through all the rows and get all the people
	while ($row = mysql_fetch_array($ret)) {
		$temp_xml = "<person>
<name>".$row["pname"]."</name>
<ssn>".$row["ssn"]."</ssn>
<bdate>".$row["bdate"]."</bdate>
<income>".$row["income"]."</income>
</person>		
";
		$fin_xml .= $temp_xml;
	}
	echo $fin_xml;
	// if null ?
	if (is_null($row[0]))
	{
		return "";
	}
	return $fin_xml;
?>