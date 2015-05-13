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
     */
    sigma.plugins.putNodesToLines = function(s) {
        var nodes = s.graph.nodes();

        var mem = nodes.reduce(function(memo, item) {
            if (!memo[item.level]) memo[item.level] = [];
            memo[item.level].push(item);
            return memo;
        }, []);

        var MAX_WIDTH = 100;
        var MAX_HEIGHT = 100;

        var stepY = MAX_HEIGHT / Object.keys(mem).length;
        for (var i in mem) {
            var stepX = MAX_WIDTH / mem[i].length;
            for (var j = 0; j < mem[i].length; j++) {
                mem[i][j].lines_x = stepX * j;
                mem[i][j].lines_y = stepY * i;
                // mem[i][j].size = 2;
            }
        }
    }
}).call(window);