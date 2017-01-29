var getTableData = function(currTable, callback) {
    firebase.database().ref('/'+currTable).once('value').then(function(snapshot) {
      callback(snapshot.val());
    });
}

var onTableDataChange = function(child, callback) {
    var dbRef = firebase.database().ref().child(child);
    
    dbRef.on("value", function(snapshot){
        console.log("value changed in tiles!");
        console.log(snapshot.val());
        callback(snapshot.val());
    })
}


//REPLACES EVERYTHING IN THE TABLE WITH THIS DATA PROVIDED!
var setTableData = function(currTable, data) {
    return firebase.database().ref('/'+currTable).set(data);
}

//adds tiles to the preexisting list
var addTile = function(coordinates, data) {
    var currTable = 'Tiles';
    var newPostKey = firebase.database().ref().child(currTable).push().key;
    var updates = {};
    
    updates['/'+currTable+'/'+coordinates] = data;
    firebase.database().ref('/'+currTable+'/'+coordinates).set(data);
    return firebase.database().ref().update(updates);
}