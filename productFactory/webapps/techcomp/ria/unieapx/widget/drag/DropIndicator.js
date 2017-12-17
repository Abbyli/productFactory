dojo.provide("unieapx.widget.drag.DropIndicator");

dojo.require("unieapx.widget.drag.AreaManager");

dojo.declare(
	"unieapx.widget.drag.DropIndicator",
	null,
{
	// summary:
	//		DropIndicator managment for DnD.

	// node: DOMNode
	//		the drop indicator node
	node : null,
		
	constructor: function(){
		//console.log("acap.widget.drag.DropIndicator ::: constructor");
		var dropIndicator = document.createElement("div");
		var subDropIndicator = document.createElement("div");
		dropIndicator.appendChild(subDropIndicator);
		dojo.addClass(dropIndicator, "dropIndicator");
		this.node = dropIndicator;
	},
	
	place: function(/*Node*/area, /*Node*/nodeRef, /*Object*/size){
		// summary:
		//		Place the DropIndicator in the right place
		// area:
		//		the dnd targer area node
		// nodeRef:
		//		node where the dropIndicator have to be placed into the area
		// dragNode:
		//		the node which is dragged
		// returns:
		//		the node inserted or null if it crashes

		//console.log("acap.widget.drag.DropIndicator ::: place");
		if(size){
			this.node.style.height = size.h + "px";
		}
		try{
			if(nodeRef){
				area.insertBefore(this.node, nodeRef);
			}
			else{
				// empty target area or last node => appendChild
				area.appendChild(this.node);
			}
			return this.node;	// DOMNode
		}catch(e){
			return null;
		}
	},
	
	remove: function(){
		// summary:
		//		remove the DropIndicator (not destroy)

		//console.log("acap.widget.drag.DropIndicator ::: remove");
		if(this.node){
			//FIX : IE6 problem
			this.node.style.height = "";
			if(this.node.parentNode){
				this.node.parentNode.removeChild(this.node);
			}
		}
	},
	 
	destroy: function(){
		// summary:
		//		destroy the dropIndicator

		//console.log("acap.widget.drag.DropIndicator ::: destroy");
		if(this.node){
			if(this.node.parentNode){
				this.node.parentNode.removeChild(this.node);
			}
			dojo._destroyElement(this.node);
			delete this.node;
		}
	}
});

(function(){
	unieapx.widget.drag.areaManager()._dropIndicator = new unieapx.widget.drag.DropIndicator();
}());
