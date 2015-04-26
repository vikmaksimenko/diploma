var sigmaInstance; // sigma instane 

$(document).ajaxError(function(a, b, c, d) {
    console.log("error" + d);
});

$(document).ready(function() {
    // $.getJSON('/data/data_for_sigma.json', function(json) {
    //     console.log(json);
    //     init(json);
    // });
    initGraph(data);
    // initForceAtlasControls();
    initMenu();
});

function initForceAtlasControls() {
    document.getElementById('stop-force-atlas').addEventListener('click', function() {
        sigmaInstance.stopForceAtlas2();
    }, false);

    document.getElementById('start-force-atlas').addEventListener('click', function() {
        sigmaInstance.startForceAtlas2();
    }, false);
}

function initMenu() {
    $("#settings-button").click(function() {
        $("#settings-button-icon").toggleClass("clicked");
        $(".settings").toggleClass("settings-hidden");
    });

    $("#more-info-button").click(function() {
        $(".settings").addClass("settings-hidden");
        $(".overlay").addClass("shown");
    });

    $("#overlay-close-button").click(function() {
        $(".overlay").removeClass("shown");
    });

    $("#download-snapshot").click(function() {
        console.log("onclick");
        var select = $("#snapshot-format").get(0);
        console.log(select.options);
        console.log(select.selectedIndex);
        var selectedFormat = select.options[select.selectedIndex].value;
        if(selectedFormat == "svg") {
            sigmaInstance.toSVG({download: true});
        } else {
            sigmaInstance.renderers[0].snapshot({
                download: true, 
                format: selectedFormat
            });
        }
    });
}

function initGraph(json) {
    var nodes = json.nodes;
    preformatData(json);

    console.log(json);

    setGraphConfigs(json);

    // sortNodesToCircle(nodes);
    // sortNodesToLines(nodes);

    // s.startForceAtlas2();s

    console.log(json);

    // document.getElementById('snapshot-button').addEventListener('click', function() {
    //     s.renderers[0].snapshot({
    //         download: true,
    //         labels: true
    //     });
    // }, false);

    // document.getElementById('relative-nodes-checkbox').addEventListener('click', function() {
    //     var checkBox = document.getElementById('relative-nodes-checkbox');
    //     if (checkBox.checked) {
    //         sigma.plugins.relativeSize(s, 1);
    //     } else {
    //         sigma.plugins.absoluteSize(s, 1);
    //     }
    // }, false);
}

function setGraphConfigs(json) {

    // todo add this to separate method

    sigma.renderers.def = sigma.renderers.canvas;
    // sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    //     var k,
    //         neighbors = {},
    //         index = this.allNeighborsIndex[nodeId] || {};

    //     for (k in index)
    //         neighbors[k] = this.nodesIndex[k];

    //     return neighbors;
    // });



    sigmaInstance = new sigma({
        container: document.getElementById('container'),
        graph: json,
        settings: {
            labelThreshold: 10,
            defaultEdgeType: "arrow",
            minArrowSize: 7,
            borderSize: 2,
            sideMargin: 10,
            zoomMin: 0.1,
            zoomMax: 1,
            zoomingRatio: 1.5,
            doubleClickZoomingRatio: 2
        }
    });

    // sigma.plugins.highlightNeighbors(s);
    var dragListener = sigma.plugins.dragNodes(sigmaInstance, sigmaInstance.renderers[0]);
}

function preformatData(json) {
    var edges = json.edges;
    for (var i = 0; i < edges.length; i++) {
        edges[i].id = i + "";
    }
    var nodes = json.nodes;
    console.log(json);
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].x = Math.random() * 100;
        nodes[i].y = Math.random() * 100;
        nodes[i].size = 1;
    }
    console.log(json);
}