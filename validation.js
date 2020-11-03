//Kimberly Low
//klow1@binghamton.edu

function doValidateName(myName) {
	var re = /[^A-Za-z\s]+/i; //find something BESIDES alphabet character or whitespace
	var format_re = /[A-Z-a-z][A-Za-z\s]*/i; //at least a letter
	if(re.test(myName) == true) {
		alert("Letters and spaces only, please!");
		return false; //We found non alphabet character.
	}
	else if (format_re.test(myName) == false){ //no letters at the beginning
		alert("Names must start with letters");
		return false;
	}
	
	else return true;
}

function doValidateSSN(mySSN) {
	var format_re = /^((\d{3}-\d{2}-\d{4})|(\d{9}))$/; //is right format?
	if (format_re.test(mySSN) == false){ //right characters. Is it the right format?
		alert("Format: ###-##-#### (dashes optional)");
		return false;
	}
	else return true;
	
}

function doValidateBirth(myBirth) {
//	var format_re = /^(((0[1-9])|10|11|12)\/((0[1-9])|((1|2)\d)|(3(0|1)))\/\d{2})$/; 
//	var format_re= /^(((04|06|09|11)\/((0[1-9])|((1|2)\d)|30))|((01|03|05|07|08|10|12)\/((0[1-9])|((1|2)\d)|3(0|1)))|(02\/((0[1-9])|((1|2)\d))))\/(19\d{2})|(200\d)|(201[1-4])$/;
	var format_re= /^(((04|06|09|11)\/((0[1-9])|((1|2)\d)|30))|((01|03|05|07|08|10|12)\/((0[1-9])|((1|2)\d)|3(0|1)))|(02\/((0[1-9])|((1|2)\d{1}))))\/((19\d{2})|(200\d)|(201[0-4]))$/;

var thisdate = new Date();
//today = thisdate.getMonth() + "/" + thisdate.getDate() + "/" + thisdate.getFullYear();
var aNum = thisdate.getMonth()+1+"/";
if (aNum.length<3) aNum = "0" + aNum;
today=aNum;

aNum = thisdate.getDate() +"/";
if (aNum.length<3) aNum = "0" + aNum;
today += aNum;
today +=thisdate.getFullYear();

	if (format_re.test(myBirth) == false){ //Does not match format
		alert("Format: MM/DD/YYYY Valid dates only");
		return false;
	}
	else if (myBirth >= today && myBirth.substring(6,10) > 2013){ //past date?
		alert("Past date please");		
		return false;
	}
	else return true;
}

function doValidateMoney(myMoney) {
	var format_re = /^(\$[1-9]+((,\d{3})+|\d*)(\.\d{2})?)$/; //at least 1-9, and either more numbers including 0, or take into account comma. Cents optional.
	if (format_re.test(myMoney) == false){ //Does not match format
		alert("Format: $###.##");
		return false;
	}
	else return true;
}

function doValidate() {
	//these are the only things on the page with this name
	var myName = document.getElementsByName("namei")[0].value;
	var mySSN = document.getElementsByName("ssni")[0].value;
	var myBirth = document.getElementsByName("birthi")[0].value;
	var myMoney = document.getElementsByName("xxxxi")[0].value;
	
	if (doValidateName(myName) == false) return false;
	if (doValidateSSN(mySSN) == false) return false;
	if (doValidateBirth(myBirth) == false) return false;
	if (doValidateMoney(myMoney) == false) return false;
	return true;
}
