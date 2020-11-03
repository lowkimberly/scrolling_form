//Keep track of variables
var formArray = new Array();

//index numbers for scrolling box
var lowerBound=0;
var upperBound=0;

//on load, fill up the scrolling boxes
function getPeople() {
	var XMLHolder=""; //xmlHttp.responseText
	var newHTMLHolder="	<table width=\"page\">"
+"					<tbody><tr>"
+"						<td align=\"center\">delete</td>"
+"						<td align=\"center\">Name</td>"
+"						<td align=\"center\">SSN</td>"
+"						<td align=\"center\">Data of Birth</td>"
+"						<td align=\"center\">Monthly Income</td>"
+"						<td></td>"
+"					</tr>";

	var xmlHttp = new XMLHttpRequest(); 
   
   //BEGIN FUNCTION
	xmlHttp.onreadystatechange= function () { 
		if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") { 
			XMLHolder=xmlHttp.responseText;
			
			while(XMLHolder.indexOf("<name>") >= 0) {
				//go through XML and fill in array
				var newPNameBegin = XMLHolder.indexOf("<name>") + 6;
				var newPNameEnd = XMLHolder.indexOf("</name>") ;
				var newSSNBegin = XMLHolder.indexOf("<ssn>") + 5;
				var newSSNEnd = XMLHolder.indexOf("</ssn>") ;
				var newBDateBegin = XMLHolder.indexOf("<bdate>") + 7;
				var newBDateEnd = XMLHolder.indexOf("</bdate>") ;
				var newMoneyBegin = XMLHolder.indexOf("<income>") + 8;
				var newMoneyEnd = XMLHolder.indexOf("</income>") ;

				formArray.push([ XMLHolder.substring(newPNameBegin,newPNameEnd), XMLHolder.substring(newSSNBegin,newSSNEnd), XMLHolder.substring(newBDateBegin,newBDateEnd), XMLHolder.substring(newMoneyBegin,newMoneyEnd) ]);

				XMLHolder=XMLHolder.substring(newMoneyEnd+1);
			}
			
			//form array all filled! Now we should fix the html below.
			var i = 0;
			var j = 5;
			if (formArray.length <5 && formArray.length >0) i = 0;
			else if (formArray.length >=5) i = formArray.length-5;
			lowerBound=i;

			for(; i < formArray.length;i++){
				newHTMLHolder = newHTMLHolder + "					<tr>"
+"						<td><input name=\"del\" type=\"radio\" onClick=\"deleteRow()\"></td>"
+"						<td><input name=\"name\" type=\"text\" value=\""+formArray[i][0]+"\" readonly></td>"
+"						<td><input name=\"ssn\" type=\"text\" value=\""+formArray[i][1]+"\" readonly></td>"
+"						<td><input name=\"birth\" type=\"text\" value=\""+formArray[i][2]+"\" readonly></td>"
+"						<td><input name=\"xxxx\" type=\"text\" value=\""+formArray[i][3]+"\" readonly></td>";
				if (i==lowerBound) newHTMLHolder = newHTMLHolder  + "						<td><input name=\"up\" value=\"Scroll Up\" type=\"button\" onClick=\"scrollUp()\"></td>";
				else if (i>=formArray.length-1 && formArray.length >= 5) newHTMLHolder = newHTMLHolder  + "						<td><input name=\"down\" value=\"Scroll Down\" type=\"button\" onClick=\"scrollDown()\"></td>";
				newHTMLHolder = newHTMLHolder + "					</tr>";
			}
			
			//only if there's less than 5
			for(; i < 5;i++){
				newHTMLHolder = newHTMLHolder + "					<tr>"
+"						<td><input name=\"del\" type=\"radio\" onClick=\"deleteRow()\"></td>"
+"						<td><input name=\"name\" type=\"text\"  readonly></td>"
+"						<td><input name=\"ssn\" type=\"text\"  readonly></td>"
+"						<td><input name=\"birth\" type=\"text\"  readonly></td>"
+"						<td><input name=\"xxxx\" type=\"text\"  readonly></td>";
				if (i==lowerBound) newHTMLHolder = newHTMLHolder  + "						<td><input name=\"up\" value=\"Scroll Up\" type=\"button\" onClick=\"scrollUp()\"></td>";
				else if (i>=4) newHTMLHolder = newHTMLHolder  + "						<td><input name=\"down\" value=\"Scroll Down\" type=\"button\" onClick=\"scrollDown()\"></td>";
				newHTMLHolder = newHTMLHolder + "					</tr>";
			}
			
			//fill in the new HTML
			upperBound = formArray.length-1;
			newHTMLHolder = newHTMLHolder + "</tbody></table>";
			document.getElementsByName("myForm")[0].innerHTML=newHTMLHolder;
		   
		 } 
	}; 
	//END FUNCTION

   xmlHttp.open("GET","data_load.php",true);
   xmlHttp.send(null);
}

//add to db
function addPeople(myName,mySSN,myBirth,myMoney) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open('POST', 'data_add.php', true);
	xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	xmlHttp.onreadystatechange= function () {
		if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") { 
			alert("Added"); //hope that this is always a success
		}
	};
	xmlHttp.send("name="+myName+"&ssn="+mySSN+"&birth="+myBirth+"&money="+myMoney);
}

function delPeople(myName,mySSN,myBirth,myMoney) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open('POST', 'data_del.php', true);
	xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	xmlHttp.onreadystatechange= function () {
		if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") { 
			alert("Removed");
		}
	};
	xmlHttp.send("name="+myName+"&ssn="+mySSN+"&birth="+myBirth+"&money="+myMoney); //I hope this is a candidate key
}

//From first project
//add a row
function addRow() {
	if (doValidate() == false) return false;
	var myName = document.getElementsByName("namei")[0].value;
	var mySSN = document.getElementsByName("ssni")[0].value;
	var myBirth = document.getElementsByName("birthi")[0].value;
	var myMoney = document.getElementsByName("xxxxi")[0].value;

	var HTMLIndex = 0;

	var aRow = new Array(myName, mySSN, myBirth, myMoney);
	formArray[formArray.length] = aRow;

	if (upperBound>=5) lowerBound++;

	//if we have a full scrollbox
	if (formArray.length>=5) {
		//jump to the end
		lowerBound=formArray.length-5;
		upperBound=formArray.length-1;
	}

	for(var i = lowerBound; i < upperBound; i++) {
		document.getElementsByName("name")[HTMLIndex].value =  formArray[i][0];
		document.getElementsByName("ssn")[HTMLIndex].value =   formArray[i][1];
		document.getElementsByName("birth")[HTMLIndex].value = formArray[i][2];
		document.getElementsByName("xxxx")[HTMLIndex].value = formArray[i][3];
		HTMLIndex+=1;
	}

	//fill in last slot with new info
	document.getElementsByName("name")[HTMLIndex].value = myName;
	document.getElementsByName("ssn")[HTMLIndex].value = mySSN;
	document.getElementsByName("birth")[HTMLIndex].value = myBirth;
	document.getElementsByName("xxxx")[HTMLIndex].value = myMoney;

	if (formArray.length < 5)upperBound++; //added one
	addPeople(myName,mySSN,myBirth,myMoney);
//index correct?
}

//scrolling
function scrollUp() {
	var HTMLIndex=0;
	//if we're all the way at the top, we can't go further.
	if (lowerBound>0) {
		//fill in whatever's already in there.
		//copy item above into current spot.
		for(var i = lowerBound; i <upperBound+1; i++) {
			document.getElementsByName("name")[HTMLIndex].value =  formArray[i-1][0];
			document.getElementsByName("ssn")[HTMLIndex].value =   formArray[i-1][1];
			document.getElementsByName("birth")[HTMLIndex].value = formArray[i-1][2];
			document.getElementsByName("xxxx")[HTMLIndex].value = formArray[i-1][3];
			HTMLIndex+=1;
		}
		lowerBound--;
		upperBound--;
	}
}


function scrollDown() {
	var HTMLIndex=0;
	if (upperBound<formArray.length-1) {
		//fill in whatever's already in there.
		//copy the data one box down, into current spot
		for(var i = lowerBound+1; i <= upperBound+1; i++) {
			document.getElementsByName("name")[HTMLIndex].value =  formArray[i][0];
			document.getElementsByName("ssn")[HTMLIndex].value =   formArray[i][1];
			document.getElementsByName("birth")[HTMLIndex].value = formArray[i][2];
			document.getElementsByName("xxxx")[HTMLIndex].value = formArray[i][3];
			HTMLIndex+=1;
		}
		lowerBound++;
		upperBound++;
	}
}


//deletion
function deleteRow() {
	var delButton = false;
	var delIndex=0;
	var HTMLIndex=0;

	for(var i = 0; i < 4; i++) {
		//find the button, and calculate where in the array it is (delIndex)
		if (document.getElementsByName("del")[i].checked && delButton==false) {
			delButton=true;
			delIndex=lowerBound+i + 1; //offset. Thing to delete.
			HTMLIndex=i; //box within html to delete
			break;
		}
	}
	

	delPeople(document.getElementsByName("name")[HTMLIndex].value, document.getElementsByName("ssn")[HTMLIndex].value, document.getElementsByName("birth")[HTMLIndex].value, document.getElementsByName("xxxx")[HTMLIndex].value);
	//take everything below, then overwrite this entry (so partial scroll down)
	
	for(var i=delIndex; HTMLIndex < 4; i++) {
		//clear out the old values
		document.getElementsByName("name")[HTMLIndex].value =  "";
		document.getElementsByName("ssn")[HTMLIndex].value =   "";
		document.getElementsByName("birth")[HTMLIndex].value = "";
		document.getElementsByName("xxxx")[HTMLIndex].value = "";

		document.getElementsByName("name")[HTMLIndex].value =  formArray[i][0];
		document.getElementsByName("ssn")[HTMLIndex].value =   formArray[i][1];
		document.getElementsByName("birth")[HTMLIndex].value = formArray[i][2];
		document.getElementsByName("xxxx")[HTMLIndex].value = formArray[i][3];
		HTMLIndex+=1;
	}
	


	//we stop when i = 4, so we need to fill in the blank
	//upperBound was less than length. That means we can fill in one more item.
	if (upperBound < formArray.length) {
		document.getElementsByName("name")[HTMLIndex].value =  formArray[upperBound][0];
		document.getElementsByName("ssn")[HTMLIndex].value =   formArray[upperBound][1];
		document.getElementsByName("birth")[HTMLIndex].value = formArray[upperBound][2];
		document.getElementsByName("xxxx")[HTMLIndex].value =  formArray[upperBound][3];
		formArray.splice(delIndex-1,1); //array is 1 shorter
	}
	//upperBound was equal to length. That means whatever we just deleted, leaves a blank space in the last slot.
	else if (upperBound>=formArray.length) {
		document.getElementsByName("name")[HTMLIndex].value =  "";
		document.getElementsByName("ssn")[HTMLIndex].value =   "";
		document.getElementsByName("birth")[HTMLIndex].value = "";
		document.getElementsByName("xxxx")[HTMLIndex].value = "";
		formArray.splice(delIndex-1,1); //array is 1 shorter
	}
}
