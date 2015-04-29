var sigmaInstance; // sigma instane 

$(document).ajaxError(function(a, b, c, d) {
    console.log("error" + d);
});

$(document).ready(function() {
    // DO NOT REMOVE!!!1
    // geting graph data from JSON
    //
    // $.getJSON('/data/data_for_sigma.json', function(json) {
    //     console.log(json);
    //     init(json);
    // });
    initGraph(data);
    initMenu();
});

function initMenu() {
    $("#settings-button").click(function() {
        $("#settings-button-icon").toggleClass("clicked");
        $(".settings").toggleClass("settings-hidden");
    });

    $("#more-info-button").click(function() {
        $(".settings").addClass("settings-hidden");
        $("#settings-button-icon").removeClass("clicked");
        $(".overlay").addClass("shown");
    });

    $("#overlay-close-button").click(function() {
        $(".overlay").removeClass("shown");
    });

    $("#download-snapshot").click(function() {
        var select = $("#snapshot-format").get(0);
        var selectedFormat = select.options[select.selectedIndex].value;
        if (selectedFormat == "svg") {
            sigmaInstance.toSVG({
                download: true
            });
        } else {
            sigmaInstance.renderers[0].snapshot({
                download: true,
                format: selectedFormat
            });
        }
    });

    $("#layout-select").change(changeGraphLayout);

    $("#stop-force-atlas").click(function() {
        sigmaInstance.stopForceAtlas2();
    });

    $("#start-force-atlas").click(function() {
        sigmaInstance.startForceAtlas2();
    });

    $("#relative-nodes-checkbox").click(function() {
        var checkBox = document.getElementById('relative-nodes-checkbox');
        if (checkBox.checked) {
            sigma.plugins.relativeSize(sigmaInstance, 10);
        } else {
            sigma.plugins.absoluteSize(sigmaInstance, 1);
        }
    });
}

function initGraph(json) {
    var nodes = json.nodes;
    preformatData(json);
    setGraphConfigs(json);
    changeGraphLayout();
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
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].x = 1;
        nodes[i].y = 1;
        nodes[i].size = 1;
    }
}

function animate(s, prefix) {
    sigma.plugins.animate(
        s, {
            x: prefix + '_x',
            y: prefix + '_y'
        }, {
            nodes: sigmaInstance.graph.nodes(),
            easing: 'cubicInOut',
            duration: 1000
        }
    );
}

function changeGraphLayout() {
    var select = $("#layout-select").get(0);
    var selectedLayout = select.options[select.selectedIndex].value;
    if(sigmaInstance.isForceAtlas2Running()) { sigmaInstance.stopForceAtlas2(); }
    switch (selectedLayout) {
        case "circle":
            sigma.plugins.putNodesToCircle(sigmaInstance);
            animate(sigmaInstance, "circle");
            break;
        case "semester":
            sigma.plugins.putNodesToLines(sigmaInstance);
            animate(sigmaInstance, "lines");
            break;
        case "random":
            sigma.plugins.putNodesRandom(sigmaInstance);
            animate(sigmaInstance, "random");
            break;
        case "forceAtlas":
            sigmaInstance.startForceAtlas2();
            break;
    }
}
