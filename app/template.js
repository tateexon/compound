let ct_template = {};

/*
 * template storage
 */
ct_template.stored = {};

/*
 * Fill a template, store it if needed
 */
ct_template.fillTemplate = function(templateObject){
	//store template if not stored
	if(ct_template.stored[templateObject.name] == undefined || templateObject.store == true){
		ct_template.stored[templateObject.name] = templateObject.template;
	}
	var o = ct_template.stored[templateObject.name];
	for (var key in templateObject.data){
		o=o.replace(new RegExp('\\['+key+'\\]','g'), templateObject.data[key]);
	}
	return o; 
};

/*
 * Need a way to handle infinite number of sub templates
 * template form:
 * 	{
 * 		name:'template name',
 * 		store:'true or false',
 * 		template:'template string',
 *  	data: [argKey:argValue1,argKey:argValue2,...]
 * 		subtemplate:[
 * 			{templateObject},
 * 			{templateObject}
 * 		]
 * 	}
 * 
 * builds a string named 'sub_template_data' to pass into the data array
 * due to this being a recursive function we can only go about 10 layers deep.
 * 
 * returns filled template object as filled out template string
 */
ct_template.fillTemplateWithSubTemplates = function(templateObject){
	// get sub template and check if it has sub
	var outString = '';
	if(templateObject.sub_template != undefined){
		var i = 0;
		var l = templateObject.sub_template.length;
		while(i < l){
			outString = outString + ct_template.fillTemplateWithSubTemplates(templateObject.sub_template[i++]);
		}
	}
	templateObject.data['sub_template_data'] = outString;
	return ct_template.fillTemplate(templateObject);
};

ct_template.placeFinished = function(template,id,appendBool){
	var d = document.getElementById(id);
	if(d != undefined){
		if(appendBool){
			d.innerHTML = d.innerHTML + template;
		}else{
			d.innerHTML = template + d.innerHTML;
		}
	}
};
ct_template.fillTemplateArray = function(templateArray,templateArgsArray){
	var i = 0;
	var l = templateArray.length;
	while (i < l){
		ct.Template.fillTemplate(templateArray[i],templateArgsArray[i]);
	}
};