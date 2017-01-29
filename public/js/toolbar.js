$('.toolbarTool').on('click', function() {
    $('.toolbarTool').removeClass('active');
    $(this).addClass('active');
    
    
    var currTime = getDateTime();
    var nodetype = getType(this);
    console.log(nodetype);
    
    
    //creates a json object when a button is selected, ready to be assigned to the database
//    var json_created = {
//        "creator" : "Gwen",
//        "direction" : "DOWN",
//        "editor" : ["Gwen"],
//        "pulsePerBeat" : 1,
//        "time_created" : currTime,
//        "time_edited" : currTime,
//        "type_name" : type
//    };
//    assigns this to currSelectedNode (global variable)
//    currSelectedNode = json_created;
//    console.log(currSelectedNode);
    
    //DEBUG PURPOSE
    debugCodeThatHardCodesAndAddToDB(this, currTime,nodetype);
});

var debugCodeThatHardCodesAndAddToDB = function(thisClass, currTime, nodetype) {
    //for ease, now when we click on a button is sets it to a predefined coordinate
    if($(thisClass).hasClass("startNode")) {
        var json_created = {
            "creator" : "Gwen",
            "direction" : "UP",
            "editor" : ["Gwen"],
            "pulsePerBeat" : 1,
            "time_created" : currTime,
            "time_edited" : currTime,
            "type_name" : nodetype
        };

        currSelectedNode = json_created;
        console.log(currSelectedNode);
        
        
    
        addTile("6,3", json_created);
    } else if($(thisClass).hasClass("stopNode")) {
        var json_created = {
            "creator" : "Gwen",
            "direction" : "DOWN",
            "editor" : ["Gwen"],
            "pulsePerBeat" : 1,
            "time_created" : currTime,
            "time_edited" : currTime,
            "type_name" : nodetype
        };

        currSelectedNode = json_created;
        console.log(currSelectedNode);
        addTile("6,-3", json_created);
    } else if($(thisClass).hasClass("ricochetNode")) {
        var json_created = {
            "creator" : "Gwen",
            "direction" : "UPPERLEFT",
            "editor" : ["Gwen"],
            "pulsePerBeat" : 1,
            "time_created" : currTime,
            "time_edited" : currTime,
            "type_name" : nodetype
        };

        currSelectedNode = json_created;
        console.log(currSelectedNode);
        addTile("6,-1", json_created);
    }
}

var getType = function(thisClass) {
    var type = "";
    
    if($(thisClass).hasClass("startNode")) {
        type = "Start";
    } else if($(thisClass).hasClass("stopNode")) {
        type = "Stop";
    } else if($(thisClass).hasClass("ricochetNode")) {
        type = "Richochet";
    }
    
    return type;
}

var getDateTime = function() {
    var date = new Date();
    var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    var formatD = dformat = [d.getFullYear(),
                            (d.getMonth()+1).padLeft(),
                             d.getDate().padLeft()
                            ].join('/') +' ' +
                            [d.getHours().padLeft(),
                             d.getMinutes().padLeft(),
                             d.getSeconds().padLeft()].join(':');
    return formatD;
}

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}