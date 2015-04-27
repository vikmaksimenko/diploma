(function() {
    'use strict';

    if (typeof sigma === 'undefined') {
        throw 'sigma is not declared';
    }

    sigma.utils.pkg('sigma.plugins');

    var _id = 0,
        _cache = {};

    /**
     * This function draw graph in form of a circle
     *
     * @param  {sigma}   s            The related sigma instance.
     */
    sigma.plugins.sortNodesToCircle(s) {
        var nodes = s.graph.nodes();

        for (var i = 0; i < nodes.length; i++) {
            nodes[i].x = 50 * Math.cos(2 * i * Math.PI / nodes.length);
            nodes[i].y = 50 * Math.sin(2 * i * Math.PI / nodes.length);
            nodes[i].size = 2;
        }
    }
}).call(window);