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

    $("#rotate-range").change(function() {
        var val = $("#rotate-range").get(0).value;
        var radians = val * (Math.PI / 180);
        var position = moveCamera.position || {
            x: 0,
            y: 0,
            ratio: 0.9,
            angle: 0
        };
        position.angle = radians;
        moveCamera(position);
    });

    $("#scale-range").change(function() {
        var val = $("#scale-range").get(0).value;
        var position = moveCamera.position || {
            x: 0,
            y: 0,
            ratio: 0.9,
            angle: 0
        };
        position.ratio = 1 / parseFloat(val);
        moveCamera(position);
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


    $("#curve-edges-checkbox").click(function() {
        var checkBox = document.getElementById('curve-edges-checkbox');
        var edges = sigmaInstance.graph.edges();
        if(checkBox.checked) {
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
            doubleClickEnabled: false,
            defaultEdgeType: "arrow",
            minArrowSize: 7,
            borderSize: 2,
            sideMargin: 10,
            zoomMin: 0.1,
            zoomMax: 5,
            zoomingRatio: 1.5

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

    // sigma.plugins.highlightNeighbors(s);
    sigma.plugins.dragNodes(sigmaInstance, sigmaInstance.renderers[0]);

    sigmaInstance.bind('doubleClickNode', function(e) {
        console.log(e.type, e.data.node.id, e.data.captor);
        generateOverlay(e.data.node.id, sigmaInstance);
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
}

function changeGraphLayout() {
    var select = $("#layout-select").get(0);
    var selectedLayout = select.options[select.selectedIndex].value;
    if (sigmaInstance.isForceAtlas2Running()) {
        sigmaInstance.stopForceAtlas2();
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
            break;
    }
}

function moveCamera(position) {
    this.position = position;
    // there is a property for this in Sigma lib, but as far as I can judge it's not implemented yet
    sigmaInstance.camera.isAnimated = true;
    sigmaInstance.camera.goTo(this.position);
}

function onDisciplineClicked(element) {
    var nodeId = element.getAttribute("data-node-id");
    $(".overlay").removeClass("shown");
    setTimeout('generateOverlay("' + nodeId + '", sigmaInstance)', 400);
}

function generateOverlay(nodeId, sigInst) {
    var overlay = $('<div class="overlay shown"></div>');
    var closeButton = $('<a href="#" class="close-button" id="overlay-close-button"><span class="glyphicon glyphicon-remove" ></span></a>');
    var content = $('<article class="content"></article>');
    var disciplineName = $('<h4 class="discipline-name"></h4>');
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
    disciplines = disciplines.substring(0, disciplines.length - 2) + ".";
    console.log(disciplines);

    $('body').append(overlay
        .append(closeButton.click(function() {
            $(".overlay").removeClass("shown");
        }))
        .append(content
            .append(disciplineName.append(discipline["label"]))
            .append(disciplineBasics.append(disciplines))
            .append(disciplineThemes.append("Eugene, please, add this info to JSON")))); // ask Eugene to make this field in JSON 
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