  var options = {
    nodes: {
      shape: "dot"
    },
    edges: {
      style: 'arrow',
      arrowScaleFactor: 0.5
    }, 
    // smoothCurves: {
    // 	dynamic: false,
    // 	type: "descrete",
    // 	roundness: 0,
    // },
    groups: {
	  required: {
	    shape: 'circle',
	    color: {
	      border: 'black',
	      background: 'white',
	      highlight: {
	        border: 'yellow',
	        background: 'orange'
	      }
	    },
	    fontColor: 'red',
	    fontSize: 18
	  }
	},
	dataManipulation: {
      enabled: true,
      initiallyVisible: false
    },
  };