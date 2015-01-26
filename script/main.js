    //     // create a network
    // var container = document.getElementById('mynetwork');
    // var network = new vis.Network(container, data, options);

    // var sortCheckbox = document.getElementById("sortByCourses");
    // sortCheckbox.onclick = function() {
    //   if(options.hierarchicalLayout == undefined) {
    //     options.hierarchicalLayout = {
    //       nodeSpacing: 100,
    //       direction: "DU",
    //       enabled: true
    //     }
    //   } else {
    //     options.hierarchicalLayout = undefined;
    //   }
    //   network.destroy;
    //   network = new vis.Network(container, data, options);
    // }

    // network.on('select', function(params){
    //   //nodes[network.getSelection()[0]].group = "required";
    //   console.log("In event listner");
    //   var curNodeId = params.nodes[0];

    //   /* Search for node object */
    //   for(var i in nodes) {
    //     if(nodes[i].id == curNodeId) {
    //       console.log(nodes[i].id);
    //       nodes[i].group = 'required';
    //       break;
    //     }
    //   }

    //   /* Search for edges from this node */
    //   for(var i in edges) {
    //     if(edges[i].from == curNodeId) {
    //       console.log(edges[i]);
    //     }
    //   }

    //   // network.setData({nodes: nodes, edges: edges}, true);
    //   //network.redraw();
    // });

   $(document).ajaxError(function(a, b, c, d) {
       console.log("error" + d);
   });



   $(document).ready(function() {
       // $.getJSON('/data/data_for_sigma.json', function(json) {
       //     console.log(json);
       //     init(json);


       // });
      init(data);
   });

    function init(json) {
var nodes = json.nodes;

           for (var i = 0; i < nodes.length; i++) {
               nodes[i].x = 100 * Math.cos(2 * i * Math.PI / nodes.length);
               nodes[i].y = 100 * Math.sin(2 * i * Math.PI / nodes.length);
               nodes[i].size = 2;
           }

           var edges = json.edges;
           for (var i = 0; i < edges.length; i++) {
               edges[i].id = i + "";
               //edges[i].type = "arrow";

           }

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