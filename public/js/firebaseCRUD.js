var getTableData = function(currTable, callback) {
    firebase.database().ref('/'+currTable).once('value').then(function(snapshot) {
      callback(snapshot.val());
    });
}