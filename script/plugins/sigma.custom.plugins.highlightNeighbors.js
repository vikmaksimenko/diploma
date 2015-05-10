(function() {
    'use strict';

    if (typeof sigma === 'undefined') {
        throw 'sigma is not declared';
    }

    sigma.utils.pkg('sigma.plugins');

    var _id = 0,
        _cache = {};

    /**
     * This function will highlight neighbours of node
     *
     * @param  {sigma}   s            The related sigma instance.
     * @param  {object}  initialSize  Start size property
     */
    sigma.plugins.highlightNeighbors = function(s) {
        s.graph.nodes().forEach(function(n) {
            n.originalColor = n.color;
        });
        s.graph.edges().forEach(function(e) {
            e.originalColor = e.color;
        });

        console.log(s.graph);

        s.bind('clickNode', function(e) {
            var nodeId = e.data.node.id,
                toKeep = s.graph.neighbors(nodeId);
            toKeep[nodeId] = e.data.node;
            s.graph.nodes().forEach(function(n) {
                if (toKeep[n.id]) {
                    n.color = n.originalColor;
                } else {
                    n.color = '#888';
                }
                // n.size = n.size + 20;
            });
            s.graph.edges().forEach(function(e) {
                if (toKeep[e.source] && toKeep[e.target]) {
                    e.color = e.originalColor;
                } else {
                    e.color = '#888';
                }
            });
            s.refresh();

        });

        s.bind('clickStage', function(e) {
            s.graph.nodes().forEach(function(n) {
                n.color = n.originalColor;
            });
            s.graph.edges().forEach(function(e) {
                e.color = e.originalColor;
            });
            s.refresh();
        });
    }
}).call(window);