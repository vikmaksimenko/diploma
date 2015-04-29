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
    sigma.plugins.putNodesRandom = function(s) {
        var nodes = s.graph.nodes();

        for (var i = 0; i < nodes.length; i++) {
            nodes[i].random_x = Math.random() * 100;
            nodes[i].random_y = Math.random() * 100;
            // nodes[i].size = 1;
        }
    }
}).call(window);
