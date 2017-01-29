

    function resizeContainers() {
        var containerWidth = $('.container').width();
        var toolbarWidth = $('.toolbarContainer').width();
        var margin = 10;
        $('.hexContainer').width((containerWidth - toolbarWidth) - margin);
        generateHexGrid();
    }


   $(window).on('resize', function() {
       resizeContainers();
   });

    $(window).on('load', function() {
        resizeContainers();
    });

    $(document).on('ready', function() {
        resizeContainers();
    });


