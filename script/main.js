  var data = {
    nodes: nodes,
    edges: edges
  };

    // create a network
  var container = document.getElementById('mynetwork');
  var network = new vis.Network(container, data, options);
  
  var sortCheckbox = document.getElementById("sortByCourses");
  sortCheckbox.onclick = function() {
    if(options.hierarchicalLayout == undefined) {
      options.hierarchicalLayout = {
        nodeSpacing: 100,
        direction: "DU",
        enabled: true
      }
    } else {
      options.hierarchicalLayout = undefined;
    }
    network.destroy;
    network = new vis.Network(container, data, options);
  }

  network.on('select', function(params){
    //nodes[network.getSelection()[0]].group = "required";
    console.log("In event listner");
    var curNodeId = params.nodes[0];

    /* Search for node object */
    for(var i in nodes) {
      if(nodes[i].id == curNodeId) {
        console.log(nodes[i].id);
        nodes[i].group = 'required';
        break;
      }
    }

    /* Search for edges from this node */
    for(var i in edges) {
      if(edges[i].from == curNodeId) {
        console.log(edges[i]);
      }
    }

    // network.setData({nodes: nodes, edges: edges}, true);
    //network.redraw();
  });
