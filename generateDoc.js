var fs = require('fs');


docObjects = {};
cString = "";

var docStringArray = fs.readFileSync('docString.txt').toString().split("\n");

docStringArray.forEach(function(docString) {
	docString = docString.trim();
	if(docString.indexOf("=") > -1 && docString.indexOf("OpenXmlUnknownElement") == -1) {
		if(docString.indexOf("new") > -1) {
			var theName = docString.slice(docString.indexOf(" ")+1, docString.indexOf("=")-1);
			if(docObjects[theName] == undefined) { docObjects[theName] = { "appends": []} }
			docObjects[theName]['object'] = docString.slice(docString.indexOf("=")+2, docString.indexOf(")"));
			docObjects[theName]['suffix'] = docString.slice(docString.indexOf("{"), docString.indexOf("}")+1)
		} else if (docString.indexOf("}") == -1) {
			var docObjectName = docString.slice(0, docString.indexOf("."));
			var docProperty = docString.slice(docString.indexOf(".")+1, docString.indexOf("=")-1)
			var docPropertyValue = docString.slice(docString.indexOf("=")+2, -1)
			if(docObjects[docObjectName] == undefined) { console.log(docString+" | Skipped") } else {
				docObjects[docObjectName]['suffix'] = "{ "+docProperty+" = "+docPropertyValue+" }"
			}
		}
	}
	if(docString.indexOf(".Append") > -1) {
        childObject = docString.slice(docString.indexOf(".Append")+8, -2);
        parentObject = docString.slice(0, docString.indexOf(".Append"));
		docObjects[parentObject]["appends"].push(docObjects[childObject]);
  	}
  	if(docString.indexOf(".AddNamespaceDeclaration") > -1) {
  		console.log("AddNamespaceDeclaration is not supported! Skipping -> "+docString)
  	}
})

function appendObject(parentObject, childObject, depth, lastElement) {
	if(childObject == undefined) { return parentObject  += ")" + parentObject['suffix'] }
	depth += 1
	childObject['appends'].forEach(function(chiObject, index) {
		appendObject(childObject, chiObject, depth, index==childObject['appends'].length-1);
	})
	parentObject["object"] += "\n" + "    ".repeat(depth) + childObject['object'];
	if (childObject['appends'].length == 0) { 
		parentObject["object"] += ")" + childObject['suffix']
	} else { parentObject["object"] += "\n" + "    ".repeat(depth) + ")" + childObject['suffix'] }
	if (!lastElement) { parentObject["object"] += "," }
	depth -= 1;
}

function genDocCode() {
	docObjects[Object.keys(docObjects)[0]]["appends"].forEach(function(childObject, index) {
		appendObject(docObjects[Object.keys(docObjects)[0]], childObject, 0, index==docObjects[Object.keys(docObjects)[0]]["appends"].length-1);
	})
	return docObjects[Object.keys(docObjects)[0]]['object'] += "\n)";
}

//genDocCode();

fs.writeFile("docString.txt", genDocCode(), function(err) { console.log("Done"); });