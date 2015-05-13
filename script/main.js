var sigmaInstance; // sigma instane 
var ANIMATIONS_TIME = 1000;

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
    $('[data-toggle="tooltip"]').tooltip();

    $("#settings-button").click(function() {
        $("#settings-button-icon").toggleClass("clicked");
        $(".settings").toggleClass("settings-hidden");
    });

    $("#more-info-button").click(function() {
        $(".settings").addClass("settings-hidden");
        $("#settings-button-icon").removeClass("clicked");
        $("#about").addClass("shown");
    });

    $("#overlay-close-button").click(function() {
        $("#about").removeClass("shown");
    });

    $("#default-button").click(doDefaultSettings);

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

    $("#rotate-range").change(function() {
        var val = $("#rotate-range").get(0).value;
        var radians = val * (Math.PI / 180);
        var camera = sigmaInstance.camera;
        var position = {
            x: camera.x,
            y: camera.y,
            ratio: camera.ratio,
            angle: radians
        };
        sigma.misc.animation.camera(camera, position, {
            duration: sigmaInstance.settings['animationsTime'] || ANIMATIONS_TIME
        });
    });

    $("#scale-range").change(function() {
        var val = $("#scale-range").get(0).value;
        var camera = sigmaInstance.camera;
        var position = {
            x: camera.x,
            y: camera.y,
            ratio: 1 / parseFloat(val),
            angle: camera.angle
        };
        sigma.misc.animation.camera(camera, position, {
            duration: sigmaInstance.settings['animationsTime'] || ANIMATIONS_TIME
        });
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

    // $("#show-labels-checkbox").click(function() {
    //     sigmaInstance.settings.labelThreshold = 1;
    //     sigmaInstance.refresh();
    // });    

    $("#curve-edges-checkbox").click(function() {
        var checkBox = document.getElementById('curve-edges-checkbox');
        var edges = sigmaInstance.graph.edges();
        if (checkBox.checked) {
            for (var i = 0; i < edges.length; i++) {
                edges[i].type = 'curvedArrow';
            }
        } else {
            for (var i = 0; i < edges.length; i++) {
                edges[i].type = '';
            }
        }
        sigmaInstance.refresh();
    });
}

function initGraph(json) {
    var nodes = json.nodes;
    preformatData(json);
    setGraphConfigs(json);
    changeGraphLayout();
}

function setGraphConfigs(json) {
    changeSigma();
    sigma.renderers.def = sigma.renderers.canvas;
    sigmaInstance = new sigma({
        container: document.getElementById('container'),
        graph: json,
        settings: {
            labelThreshold: 10,
            doubleClickEnabled: false,
            defaultEdgeType: "arrow",
            minArrowSize: 7,
            animationsTime: ANIMATIONS_TIME,
            sideMargin: 10,
            zoomMin: 0.1,
            zoomMax: 5,
            zoomingRatio: 1.5,

            nableEdgeHovering: true,
            edgeHoverSizeRatio: 2,

            // edge hovering settings. Maybe they'll help someday
            //doubleClickZoomingRatio: 2,
            //enableEdgeHovering: true,
            //edgeHoverColor: 'edge',
            //edgeHoverSizeRatio: 1,
            //edgeHoverExtremities: true,
            //minEdgeSize: 0.5,
            //maxEdgeSize: 4
        }
    });

    var dragNodesListener = sigma.plugins.dragNodes(sigmaInstance, sigmaInstance.renderers[0]);
    sigma.plugins.highlightNeighbors(sigmaInstance);

    sigmaInstance.bind('doubleClickNode', function(e) {
        var node = e.data.node;
        moveCameraToNode(node, sigmaInstance);
        generateOverlay(node.id, sigmaInstance);
    });

    sigmaInstance.bind('coordinatesUpdated', function() {
        // $("#scale-range").val(coordinates.ratio);
        // $("#rotate-range").val(coordinates.angle);  
        console.log("hello");
    });

    //sigmaInstance.bind('doubleClickEdge', function(e) {
    //    console.log(e.type, e.data.edge, e.data.captor);
    //});
    //
    //sigmaInstance.bind('overEdge', function(e) {
    //    console.log(e.type, e.data.edge, e.data.captor);
    //});
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
    for (var node in sigmaInstance.graph.nodes()) {
        node.x = node[prefix + "_x"];
        node.y = node[prefix + "_y"];
    }
}

function changeGraphLayout() {
    var select = $("#layout-select").get(0);
    var selectedLayout = select.options[select.selectedIndex].value;
    if (sigmaInstance.isForceAtlas2Running()) {
        sigmaInstance.stopForceAtlas2();
    }

    if (selectedLayout == "forceAtlas") {
        $(".force-atlas-controls").removeClass("no-display");
    } else {
        $(".force-atlas-controls").addClass("no-display");
    }

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
            $(".force-atlas-controls").removeClass("no-display");
            break;
    }
}

function onDisciplineClicked(element) {
    var nodeId = element.getAttribute("data-node-id");
    $(".overlay").removeClass("shown");
    moveCameraToNode(getNodeById(nodeId), sigmaInstance);
    generateOverlay(nodeId, sigmaInstance);
}

function generateOverlay(nodeId, sigInst) {
    if (document.getElementById(nodeId)) {
        document.getElementById(nodeId).className += " shown";
        return;
    }

    var overlay = $('<div class="overlay" id="' + nodeId + '"></div>');
    var closeButton = $('<a href="#" class="close-button" id="overlay-close-button"><span class="glyphicon glyphicon-remove" ></span></a>');
    var content = $('<article class="content mCustomScrollbar"></article>');
    var disciplineName = $('<h4 class="discipline-name logo"></h4>');
    var disciplineBasics = $('<p class"basics">Basic themes: </p>');
    var disciplineThemes = $('<p class"themes">Disciline themes: </p>');

    var discipline = getNodeById(nodeId);
    var neighboars = sigInst.graph.neighborhood(discipline["id"]);
    var basics = neighboars.edges.filter(function(element) {
        return element.target == discipline["id"];
    });

    var disciplines = basics.reduce(function(memo, item) {
        for (var i = 1; i < neighboars.nodes.length; i++) {
            des = neighboars.nodes[i];
            if (des["id"] == item.source) {
                var a = "<a href='#' class='link' onclick='onDisciplineClicked(this)' data-node-id='" + des["id"] + "'>" + des["label"] + "</a>";
                memo += a + " (" + item["label"] + "), ";
                break;
            }
        }
        return memo;
    }, "");
    disciplines = disciplines.substring(0, disciplines.length - 2);
    $('body').append(overlay
        .append(closeButton.click(function() {
            $(".overlay").removeClass("shown");
        }))
        .append(disciplineName.append(discipline["label"]))
        .append(content
            .append(disciplineThemes.append("Eugene, please, add this info to JSON")))); // ask Eugene to make this field in JSON

    if (disciplines != "") {
        content.append(disciplineBasics.append(disciplines + "."))
    }

    // kostyl', epta =) 
    setTimeout(function() {
        document.getElementById(nodeId).className += " shown";
    }, 0);
}

function moveCameraToNode(node, sigmaInstance) {
    var camera = sigmaInstance.camera;
    var position = {
        x: node[camera.readPrefix + 'x'],
        y: node[camera.readPrefix + 'y'],
        ratio: 0.1,
        angle: camera.angle
    };
    sigma.misc.animation.camera(camera, position, {
        duration: sigmaInstance.settings['animationsTime'] || ANIMATIONS_TIME
    });
}

function getNodeById(nodeId) {
    var discipline;
    sigmaInstance.graph.nodes().some(function(curVal) {
        if (curVal["id"] == nodeId) {
            return discipline = curVal;
        }
    });
    return discipline;
}

function changeSigma() {
    sigma.classes.graph.addMethod('neighbors', function(nodeId) {
        var k,
            neighbors = {},
            index = this.allNeighborsIndex[nodeId] || {};

        for (k in index)
            neighbors[k] = this.nodesIndex[k];

        return neighbors;
    });

    // var sigmaCameraGoTo = sigma.misc.animation.camera;
    // sigma.misc.animation.camera = function(camera, val, options) {
    //     sigmaCameraGoTo(camera, val, options);
    //     var ratio = Math.round(camera.ratio * 100) / 100;
    //     $("#scale-range").val(1 / ratio);
    //     console.log(camera.ratio);
    // }
}

function doDefaultSettings() {
    $("#layout-select").val("circle").trigger("change");

    sigma.misc.animation.camera(camera, position, {
        duration: sigmaInstance.settings['animationsTime'] || ANIMATIONS_TIME
    });      
    var camera = sigmaInstance.camera;
    var position = {
        x: 0,
        y: 0,
        ratio: 1,
        angle: 0
    };
}
