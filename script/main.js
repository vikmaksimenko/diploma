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

    function init(json) {
        var nodes = json.nodes;
        preformatData(json);
        sortNodesToCircle(nodes);
        // sortNodesToLines(nodes);
        initGraph(json);
    }

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
        sortNodesToCircle(nodes);
        // sortNodesToLines(nodes);
        initGraph(json);


        document.getElementById('snapshot-button').addEventListener('click', function() {
            s.renderers[0].snapshot({
                download: true
            });
        }, false);
    }

    function initGraph(json) {
        sigma.renderers.def = sigma.renderers.canvas;
        s = new sigma({
            container: document.getElementById('container'),
            graph: json,
            settings: {
                labelThreshold: 10
            }
        });

        // Initialize the dragNodes plugin:
        var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
        //s.startForceAtlas2({worker: true, barnesHutOptimize: false});
    }

    function preformatData(json) {
        var edges = json.edges;
        for (var i = 0; i < edges.length; i++) {
            edges[i].id = i + "";
            edges[i].type = "arrow";
        }

    }

    function sortNodesToCircle(nodes) {
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].x = 100 * Math.cos(2 * i * Math.PI / nodes.length);
            nodes[i].y = 100 * Math.sin(2 * i * Math.PI / nodes.length);
            nodes[i].size = 2;
        }

    }

    var mem;

    function sortNodesToLines(nodes) {
        mem = nodes.reduce(function(memo, item) {
            if (!memo[item.level]) memo[item.level] = [];
            memo[item.level].push(item);
            return memo;
        }, {});
        console.log(mem);

        for (var i in mem) {
            var row = mem[i];
            for (var j in row) {
                row[j].x = (row.length + 1) / j;
                row[j].y = (mem.length + 1) / i;
            }
        }
        console.log(mem);
    }