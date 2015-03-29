//Charactery Stuff
var character = [];
var tempCharacter = [];
var characterCount = 0;
var isDrawingCharacter = false;
//Status Messagey Stuff
var statusMessageText = 'Tiny Hands Running';
var statusMessage = new PointText({
	point : new Point(10,view.size.height-10),
	content : statusMessageText,
	justification : 'left',
	fontSize : 15
});
//Eye Stuff
var eyes = [];
var eyes2 = [];
var eyeCount = 0;
var isDrawingEye = false;
var joiningLine = new Path.Line();
joiningLine.strokeWidth = 2;
joiningLine.dashArray = [10, 12];
joiningLine.strokeCap = 'round';
joiningLine.strokeColor = '#f00'; 
var blinkDirection = 0;


function onFrame(){
	if(isDrawingCharacter){
		RefillCanvas();

		//do nothing
	} 
	if(!isDrawingCharacter){
		//Handle Drawing of Face
		RefillCanvas();
		for(i=0;i<characterCount;i++){
			//character[i].position+=new Point(-5+Math.random()*2.5,-5+Math.random()*2.5);
			for(j=0;j<tempCharacter[i].segments.length;j++){
				tempCharacter[i].segments[j].point = character[i].segments[j].point + new Point(Math.random()*5,Math.random()*5);
			}
		}
		//Handle Drawing of Text
	}
	if(!isDrawingEye){
		for(i=0;i<eyeCount;i++){
			//console.log(eye[])
			eyes[i].segments[1].point.y += 2*Math.pow(-1,blinkDirection);
			eyes[i].segments[3].point.y += -2*Math.pow(-1,blinkDirection);
			eyes2[i].segments[1].point.y += 2*Math.pow(-1,blinkDirection);
			eyes2[i].segments[3].point.y += -2*Math.pow(-1,blinkDirection);
			if(eyes[i].segments[1].point.y > eyes[i].segments[3].point.y){
				eyes[i].segments[1].point.y+=20;
				eyes[i].segments[3].point.y-=20;
				eyes2[i].segments[1].point.y+=20;
				eyes2[i].segments[3].point.y-=20;
			}
		}
	}
}

function onKeyDown(event){
	switch(event.character){
		case 'd':
			statusMessageText = 'Drawing Mode On \n' + statusMessageText;
			statusMessage.content = statusMessageText;
			isDrawingCharacter = true;
			character[characterCount]= new Path({
				strokeColor : '#2B2827'
				//closed : true
			});
			characterCount++;
			break;
		case 'D':
			statusMessageText = 'Drawing Mode Off \n' + statusMessageText;
			statusMessage.content = statusMessageText;
			character[characterCount-1].closed = true;
			character[characterCount-1].simplify();
			character[characterCount-1].visible = false;
			tempCharacter[characterCount-1]=character[characterCount-1].clone();
			tempCharacter[characterCount-1].visible = true;
			//character[characterCount-1].selected=true;
			isDrawingCharacter = false;
			break;
		case 'h':
			statusMessageText = 'hiding character 0 \n' + statusMessageText;
			statusMessage.content = statusMessageText;
			character[0].visible = false;
			break;
		case 'H':
			statusMessageText = 'showing character 0 \n' + statusMessageText;
			statusMessage.content = statusMessageText;
			character[0].visible = true;
			break;
		case 'e':
			statusMessageText = 'Drawing Eyes \n' + statusMessageText;
			statusMessage.content = statusMessageText;
			isDrawingEye = true;
			break;
		case 'E':
			statusMessageText = 'Finished Drawing Eyes \n' + statusMessageText;
			statusMessage.content = statusMessageText;
			isDrawingEye = false;
			eyeCount++;
			break;
		case 'x':
			eyes[0].selected=true;
			break;
	}
}

function onMouseDrag(event){
	if(isDrawingCharacter){
		character[characterCount-1].add(event.point);
	}
	if(isDrawingEye){
		//console.log('drawing eye and dragging'+event.point);
		joiningLine.segments[0].point = eyes[eyeCount].position;
		joiningLine.segments[1].point = event.point;
	}
}

function onMouseDown(event){
	if(isDrawingEye){
		//console.log('drawig eye mousedown');
		eyes[eyeCount] = new Path.Ellipse(event.point,new Size(30,40));
		eyes[eyeCount].fillColor = '#000';
	}
}

function onMouseUp(event){
	if(isDrawingEye){
		//console.log('drawig eye mouseup');
		eyes2[eyeCount] = new Path.Ellipse(event.point,new Size(30,40));
		eyes2[eyeCount].fillColor = '#000';
		joiningLine.segments[0].point = new Point(0,0);
		joiningLine.segments[1].point = new Point(0,0);
	}
}

function RefillCanvas(){
	//var rect = new Path.Rectangle(new Point(0,0),view.size);
	//rect.fillColor = '#FDFDFD';
}

//makes the character seem alive by redrawing each of its segment in a slightly different location
function wiggleCharacter(character){
	var tempCharacter = character.clone(true);
	for(j=0;j<character.segments.length;j++){
		tempCharacter.segments[j].point = character.segment[j].point + Point(-1+2*Math.random(),-1+2*Math.random());
	}
}