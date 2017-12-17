dojo.provide("unieapx.widget.drag.Moveable");

dojo.declare(
	"unieapx.widget.drag.Moveable",
	null,
{
	// summary:
	//		Allow end-users to track a DOM node into the web page

	// handle: DOMNode
	//		The node on which the user clicks to drag the main node.
	handle: null,
	
	// skip: Boolean
	// 		A flag to control a drag action if a form element has been focused.
	//		If true, the drag action is not executed.
	skip: true,

	// dragDistance: Integer
	//		The user clicks on the handle, but the drag action will really begin
	//		if he tracks the main node to more than 3 pixels.
	dragDistance: 3,
	
	constructor: function(/*Object*/params, /*DOMNode*/node){
		// summary:
		// 		Configure parameters and listen to mousedown events from handle
		//		node.
		// params:
		//		Hash of parameters
		// node:
		//		The draggable node

		//console.log("unieap.widget.drag.Moveable ::: constructor");
		this.node = dojo.byId(node);
		
		this.d = this.node.ownerDocument;
		
		if(!params){ params = {}; }
		this.handle = params.handle ? dojo.byId(params.handle) : null;
		if(!this.handle){ this.handle = this.node; }
		this.skip = params.skip;
		//console.debug(this.handle)
		//this.handle此时指向的就是widget控件
		this.events = [
			dojo.connect(this.handle, "onmousedown", this, "onMouseDown")
		];
		if(unieapx.widget.drag.autoScroll){
			this.autoScroll = unieapx.widget.drag.autoScroll;
		}
		
	},
	
	isFormElement: function(/*DOMEvent*/ e){
		// summary:
		//		identify the type of target node associated with a DOM event.
		// e:
		//		a DOM event
		// returns:
		//		if true, the target is one of those specific nodes.

		//console.log("unieap.widget.drag.Moveable ::: isFormElement");
		var t = e.target;
		if(t.nodeType == 3 /*TEXT_NODE*/){
			t = t.parentNode;
		}
		return " a button textarea input select option ".indexOf(" " + t.tagName.toLowerCase() + " ") >= 0;	// Boolean
	},
	
	onMouseDown: function(/*DOMEvent*/e){
		// summary:
		//		Occurs when the user clicks on the handle node.
		//		Skip the drag action if a specific node is targeted.
		//		Listens to mouseup and mousemove events on to the HTML document.
		// e:
		//		a DOM event
		// tags:
		//		callback

		//console.log("unieap.widget.drag.Moveable ::: onMouseDown");
		if(this._isDragging){ return;}
		var isLeftButton = (dojo.isIE&&dojo.isIE<9) ? (e.button == 1) : (e.which == 1);
		if(!isLeftButton){
			return;
		}
		if(this.skip && this.isFormElement(e)){ return; }
		if(this.autoScroll){
			this.autoScroll.setAutoScrollNode(this.node);
			this.autoScroll.setAutoScrollMaxPage();
		}
		//console.debug(this.d)
		//console.debug(this.d==window.document)
		this.events.push(dojo.connect(this.d, "onmouseup", this, "onMouseUp"));
		this.events.push(dojo.connect(this.d, "onmousemove", this, "onFirstMove"));
		//阻止选中控件事件，比如选中文本等
		this._selectStart = dojo.connect(dojo.body(), "onselectstart", dojo.stopEvent);
		//初次按下鼠标时的(x,y)坐标信息
		this._firstX = e.clientX;
		this._firstY = e.clientY;
		dojo.stopEvent(e);
	},
	
	onFirstMove: function(/*DOMEvent*/e){
		// summary:
		//		Occurs when the user moves the mouse after clicking on the
		//		handle.
		//		Determinate when the drag action will have to begin (see
		//		dragDistance).
		// e:
		//		A DOM event
		// tags:
		//		callback

		//console.log("unieap.widget.drag.Moveable ::: onFirstMove");
		dojo.stopEvent(e);
		var d = (this._firstX - e.clientX) * (this._firstX - e.clientX)
				+ (this._firstY - e.clientY) * (this._firstY - e.clientY);
		//检测是否进行了拖拽，判断两个坐标之间距离是否大于3*3
		if(d > this.dragDistance * this.dragDistance){
			this._isDragging = true;
			//清除之前绑定过的onmousemove事件，然后重新绑定
			dojo.disconnect(this.events.pop());
			dojo.style(this.node, "width", dojo.contentBox(this.node).w + "px");
			this.initOffsetDrag(e);
			this.events.push(dojo.connect(this.d, "onmousemove", this, "onMove"));
		}
	},
	
	initOffsetDrag: function(/*DOMEvent*/e){
		// summary:
		//		Initialize the gap between main node coordinates and the clicked point.
		//		Call the onDragStart method.
		// e:
		//		A DOM event

		//console.log("unieap.widget.drag.Moveable ::: initOffsetDrag");
		this.offsetDrag = { 'l': e.pageX, 't': e.pageY };
		var s = this.node.style;
		var position = dojo.position(this.node, true);
		/*if(s.position == "relative" || s.position == ""){
			s.position = "absolute"; // enforcing the absolute mode
		}*/
		this.offsetDrag.l = position.x - this.offsetDrag.l;
		this.offsetDrag.t = position.y - this.offsetDrag.t;
		var coords = {
			'x': position.x,
			'y': position.y
		};
		this.size = {
			'w': position.w,
			'h': position.h
		};
		// method to catch
		this.onDragStart(this.node, coords, this.size);
	},
	
	onMove: function(/*DOMEvent*/e){
		// summary:
		//		Occurs when the user moves the mouse.
		//		Calls the onDrag method.
		// e:
		//		a DOM event
		// tags:
		//		callback

		//console.log("unieap.widget.drag.Moveable ::: onMove");
		dojo.stopEvent(e);
		// hack to avoid too many calls to onMove in IE8 causing sometimes slowness
		if(dojo.isIE == 8 && new Date() - this.date < 20){
			return;
		}
		if(this.autoScroll){
			this.autoScroll.checkAutoScroll(e);
		}
		var coords = {
			'x': this.offsetDrag.l + e.pageX,
			'y': this.offsetDrag.t + e.pageY
		};
		var s = this.node.style;
		s.left = coords.x + "px";
		s.top = coords.y + "px";
		
		// method to catch
		this.onDrag(this.node, coords, this.size, {'x':e.pageX, 'y':e.pageY});
		if(dojo.isIE == 8){
			this.date = new Date();
		}
	},
	
	onMouseUp: function(/*DOMEvent*/e){
		// summary:
		//		Occurs when the user releases the mouse
		//		Calls the onDragEnd method.
		// e:
		//		a DOM event

		if (this._isDragging){
			dojo.stopEvent(e);
			this._isDragging = false;
			if(this.autoScroll){
				this.autoScroll.stopAutoScroll();
			}
			delete this.onMove;
			this.onDragEnd(this.node);
			this.node.focus();
 		}
		dojo.disconnect(this.events.pop());
		dojo.disconnect(this.events.pop());
	},
	
	onDragStart: function(/*DOMNode*/node, /*Object*/coords, /*Object*/size){
		// summary:
		//		Stub function.
		//		Notes : border box model
		// node:
		//		a DOM node
		//	coords:
		//		absolute position of the main node
		// size:
		//		an object encapsulating width an height values
		// tags:
		//		callback

	},
	
	onDragEnd: function(/*DOMNode*/node){
		// summary:
		//		Stub function
		//		Notes : Coordinates don't contain margins
		// node:
		//		a DOM node
		// tags:
		//		callback

	},
	
	onDrag: function(/*DOMNode*/node, /*Object*/coords, /*Object*/size, /*Object*/mousePosition){
		// summary:
		//		Stub function.
		//		Notes : border box model for size value, margin box model for coordinates
		// node:
		//		a DOM node
		// coords:
		//		position of the main node (equals to css left/top properties)
		// size:
		//		an object encapsulating width and height values
		// mousePosition:
		//		coordiantes of mouse
		// tags:
		//		callback

	},

	destroy: function(){
		// summary:
		//		Delecte associated events

		// console.log("unieap.widget.drag.Moveable ::: destroy");
		dojo.forEach(this.events, dojo.disconnect);
		this.events = this.node = null;
	}
});
