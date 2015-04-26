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
    sigma.plugins.sortNodesToLines(nodes) {
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
}).call(window);