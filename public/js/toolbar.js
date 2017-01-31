
$('.toolbarTool').on('click', function() {
    $('.toolbarTool').removeClass('active');
    $(this).addClass('active');
    
    
    var currTime = getDateTime();
    var nodetype = getType(this);
    console.log(nodetype);
    
    //show description
    var desc = getDescription(this);
    $('.descriptionSection .descTitle').html("<h4>" + desc.title + "</h4>");
    $('.descriptionSection .descDesc').html(desc.desc);
    
    
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
            "direction" : "u",
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
            "direction" : "d",
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
            "direction" : "ul",
            "editor" : ["Gwen"],
            "pulsePerBeat" : 1,
            "time_created" : currTime,
            "time_edited" : currTime,
            "type_name" : nodetype
        };

        currSelectedNode = json_created;
        console.log(currSelectedNode);
        addTile("6,-1", json_created);
    } else if($(thisClass).hasClass("splitNode")) {
        var json_created = {
            "creator" : "Gwen",
            "direction" : "d",
            "editor" : ["Gwen"],
            "pulsePerBeat" : 1,
            "time_created" : currTime,
            "time_edited" : currTime,
            "type_name" : nodetype
        };

        currSelectedNode = json_created;
        console.log(currSelectedNode);
    
        addTile("6,0", json_created);

        currSelectedNode = json_created;
        console.log(currSelectedNode);
    } else if($(thisClass).hasClass("teleportInNode")) {
        var json_created = {
            "creator" : "Gwen",
            "direction" : "ur",
            "editor" : ["Gwen"],
            "pulsePerBeat" : 1,
            "time_created" : currTime,
            "time_edited" : currTime,
            "type_name" : nodetype
        };

        currSelectedNode = json_created;
        console.log(currSelectedNode);
    
        addTile("6,-2", json_created);
    } else if($(thisClass).hasClass("teleportOutNode")) {
        var json_created = {
            "creator" : "Gwen",
            "direction" : "ur",
            "editor" : ["Gwen"],
            "pulsePerBeat" : 1,
            "time_created" : currTime,
            "time_edited" : currTime,
            "type_name" : nodetype
        };

        currSelectedNode = json_created;
        console.log(currSelectedNode);
    
        addTile("8,-4", json_created);
    } else if($(thisClass).hasClass("rotateNode")) {
        var json_created = {
            "creator" : "Gwen",
            "direction" : "u",
            "editor" : ["Gwen"],
            "pulsePerBeat" : 1,
            "time_created" : currTime,
            "time_edited" : currTime,
            "type_name" : nodetype
        };

        currSelectedNode = json_created;
        console.log(currSelectedNode);
    
        addTile("8,0", json_created);
    }
}

var getType = function(thisClass) {
    var type = "";
    
    if($(thisClass).hasClass("startNode")) {
        type = "Start";
    } else if($(thisClass).hasClass("stopNode")) {
        type = "Stop";
    } else if($(thisClass).hasClass("ricochetNode")) {
        type = "Ricochet";
    } else if($(thisClass).hasClass("splitNode")) {
        type = "Split";
    } else if($(thisClass).hasClass("teleportInNode")) {
        type = "TeleportIn";
    } else if($(thisClass).hasClass("teleportOutNode")) {
        type = "TeleportOut";
    } else if($(thisClass).hasClass("rotateNode")) {
        type = "Rotate";
    }
    
    return type;
}

var getDescription = function(thisClass) {
    desc = {title:"", desc:""};
    if($(thisClass).hasClass("startNode")) {
        desc.title = "Start Node";
        desc.desc = "This node plays a note and starts a pulse of sound in the chosen direction";
    } else if($(thisClass).hasClass("stopNode")) {
        desc.title = "Stop Node";
        desc.desc = "This node plays a note and stops the pulse from continuing on";
    } else if($(thisClass).hasClass("ricochetNode")) {
        desc.title = "Ricochet Node";
        desc.desc = "This node redirects the pulse in a chosen direction";
    } else if($(thisClass).hasClass("splitNode")) {
        desc.title = "Split Node";
        desc.desc = "This node splits node into 5 different directions";
    } else if($(thisClass).hasClass("teleportInNode")) {
        desc.title = "Teleport In Node";
        desc.desc = "This node, when used with the Teleport Out node allows us to redirect the pulse from part of the map.";
    } else if($(thisClass).hasClass("teleportOutNode")) {
        desc.title = "Teleport Out Node";
        desc.desc = "This node, when used with the Teleport In node redirects the pulse to any part of the map.";
    } else if($(thisClass).hasClass("rotateNode")) {
        desc.title = "Rotate Node";
        desc.desc = "This node redirects the pulse to a different place everytime it is hit. The direction changes in a clockwork fashion";
    }
    
    return desc;
};


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

$('.toolbarTool').on('click', function() {
    globalNodeType = $(this).data('node');
});


