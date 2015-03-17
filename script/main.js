$(document).ajaxError(function(a, b, c, d) {
    console.log("error" + d);
});

$(document).ready(function() {
    // $.getJSON('/data/data_for_sigma.json', function(json) {
    //     console.log(json);
    //     init(json);
    // });
    init(data);
    initMenu();
});

//var s;  // sigma example 

function initMenu() {
    document.getElementById('toggle-menu').addEventListener('click', function() {
        var checkBox = document.getElementById('toggle-menu');
        var aside = document.getElementById('settings');
        if (!checkBox.checked) {
            aside.style.left = '0';
            console.log('Visible');
        } else {
            aside.style.left = '-350px';
            console.log('InVisible');
        }
    }, false);

    document.getElementById('info_button').addEventListener('click', function() {
        var checkBox = document.getElementById('toggle-menu');
        checkBox.click();
        var overlay = document.getElementById('overlay');
        overlay.style.top = 0;
        overlay.style.opacity = 1;
    }, false);

    document.getElementById('overlay-close').addEventListener('click', function() {
        var overlay = document.getElementById('overlay');
        overlay.style.top = '-100vh';
        overlay.style.opacity = 0;
    }, false);
}

function init(json) {
    var nodes = json.nodes;
    preformatData(json);
    initGraph(json);

    // sortNodesToCircle(nodes);
    // sortNodesToLines(nodes);

    s.startForceAtlas2();
    setTimeout(function(){
        s.stopForceAtlas2();
    }, 3 * 1000);

    document.getElementById('snapshot-button').addEventListener('click', function() {
        s.renderers[0].snapshot({
            download: true,
            labels: true
        });
    }, false);

    document.getElementById('relative-nodes-checkbox').addEventListener('click', function() {
        var checkBox = document.getElementById('relative-nodes-checkbox');
        if (checkBox.checked) {
            sigma.plugins.relativeSize(s, 1);
        } else {
            sigma.plugins.absoluteSize(s, 1);
        }
    }, false);
}

function initGraph(json) {
    sigma.renderers.def = sigma.renderers.canvas;
    sigma.classes.graph.addMethod('neighbors', function(nodeId) {
        var k,
            neighbors = {},
            index = this.allNeighborsIndex[nodeId] || {};

        for (k in index)
            neighbors[k] = this.nodesIndex[k];

        return neighbors;
    });

    s = new sigma({
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

    sigma.plugins.highlightNeighbors(s);
    var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
}

function preformatData(json) {
    var edges = json.edges;
    for (var i = 0; i < edges.length; i++) {
        edges[i].id = i + "";
    }
}

function sortNodesToCircle(nodes) {
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].x = 50 * Math.cos(2 * i * Math.PI / nodes.length);
        nodes[i].y = 50 * Math.sin(2 * i * Math.PI / nodes.length);
        nodes[i].size = 2;
    }
}

function sortNodesToLines(nodes) {
    var mem = nodes.reduce(function(memo, item) {
        if (!memo[item.level]) memo[item.level] = [];
        memo[item.level].push(item);
        return memo;
    }, []);

    var MAX_WIDTH = 50;
    var MAX_HEIGHT = 50;

    var stepY = MAX_HEIGHT / Object.keys(mem).length;
    for (var i in mem) {    
        var stepX = MAX_WIDTH / mem[i].length;
        for (var j = 0; j < mem[i].length; j++) {           
            mem[i][j].x = stepX * j;
            mem[i][j].y = stepY * i;
            mem[i][j].size = 2;
        }
    }
}
