$(function() {

    function resizeContainers() {
        var containerWidth = $('.container').width();
        var toolbarWidth = $('.toolbarContainer').width();
        var margin = 10;
        $('.hexContainer').width((containerWidth - toolbarWidth) - margin);
        generateHexGrid();
        pulseContainer.setBounds(0, 0, globalCanvasWidth, globalCanvasHeight);
        nodeContainer.setBounds(0, 0, globalCanvasWidth, globalCanvasHeight);
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

    $(document).on('load', function() {
        resizeContainers();
    });







});