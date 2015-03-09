(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  sigma.utils.pkg('sigma.plugins');

  var _id = 0,
      _cache = {};

  /**
   * This function will change size for all nodes depending to their degree
   *
   * @param  {sigma}   s       		The related sigma instance.
   * @param  {object}  initialSize 	Start size property
   */
  sigma.plugins.relativeSize = function(s, initialSize) {
    var nodes = s.graph.nodes();

    for(var i = 0; i < nodes.length; i++) {
      var degree = s.graph.degree(nodes[i].id);
      nodes[i].size = initialSize * Math.sqrt(degree);
      console.log("degree: " + degree);
    }
    s.refresh();
  };
  sigma.plugins.absoluteSize = function(s, size) {
    var nodes = s.graph.nodes();

    for(var i = 0; i < nodes.length; i++) {
      nodes[i].size = size;
    }
    s.refresh();
  };
}).call(window);
