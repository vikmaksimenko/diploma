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
    sigma.plugins.sortNodesToCircle(nodes) {
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].x = 50 * Math.cos(2 * i * Math.PI / nodes.length);
            nodes[i].y = 50 * Math.sin(2 * i * Math.PI / nodes.length);
            nodes[i].size = 2;
        }
    }
}).call(window);