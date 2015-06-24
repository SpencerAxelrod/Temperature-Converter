var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var BUTTONS = require('controls/buttons');

var labelStyle = new Style( { font: "25px", color:"white" } );


var bigText = new Style({font:"bold 25px", color:"#0808EE"});

var buttonBehavior = function(content, data){
	BUTTONS.ButtonBehavior.call(this, content, data);
}
buttonBehavior.prototype = Object.create(BUTTONS.ButtonBehavior.prototype, {
	onTap: { value:  function(button){
		//trace("Button was tapped.\n");
		
		field_C.scroller.label.string = "";
		field_C.scroller.hint.string = "Tap to add Celsius";
		field_C.scroller.hint.visible = true;
		
		field_F.scroller.label.string = "";
		field_F.scroller.hint.string = "Tap to add Fahrenheit";
		field_F.scroller.hint.visible = true;
		
		field_K.scroller.label.string = "";
		field_K.scroller.hint.string = "Tap to add Kelvin";
		field_K.scroller.hint.visible = true;
		
	}}
});

var myButtonTemplate = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:0, right:0, skin: C_All,
	contents:[
		new Label({left:0, right:0, height:25, string:$.textForLabel, style:bigText})
	],
	behavior: new buttonBehavior
}});

var button = new myButtonTemplate({textForLabel:"CLEAR ALL"});




var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'white',});
var fieldStyle = new Style({ color: '#FFFF33', font: 'bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5, });
var whiteS = new Skin({fill:"white"});
var C_S = new Skin({fill: "#0808EE"}); //85A3FF
var F_S = new Skin({fill:"#111199"}); //3366FF
var K_S = new Skin({fill:"#111152"}); //1A3380
var C_All = new Skin({fill:"#1111529"}); //1A3380
							
var C_Field = Container.template(function($) { return { 
	width: 250, height: 36, skin: nameInputSkin, contents: [
		Scroller($, { 
			left: 4, right: 4, top: 4, bottom: 4, active: true, name: "scroller",
			behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
				Label($, { 
					left: 0, top: 0, bottom: 0, name: "label", skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
					editable: true, string: $.name,
				 	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
				 		onEdited: { value: function(label){
				 			var data = this.data;
							data.name = label.string;
							label.container.hint.visible = ( data.name.length == 0 );	
							
							
							if (label.string == "-"){
													
								var doNothing = true;					
							
							}
							
							else if (isNaN(label.string)){
								//trace("AAA");
								
								
								label.string = "";
								data.name = label.string;
								
								label.container.hint.string = "Enter a valid number";
								
								label.container.hint.visible = true;
			
							}
							
							else if (label.string.length > 0){
								if(Number(label.string) >= -273.15){
									var val_C = Number(label.string);
									
									var val_K = val_C + 273.15;
									
									var val_F = val_C * (9/5) + 32;
								
									if (val_K >= 0){
										field_K.scroller.label.string = val_K.toString();
										field_K.scroller.hint.visible = false;
										}
									
									
									else {
										field_K.scroller.label.string = "";
										field_K.scroller.hint.string = "K out of range";
										field_K.scroller.hint.visible = true;
									}
									
									
									if (val_F >= -459.66){
										field_F.scroller.label.string = val_F.toString();
										field_F.scroller.hint.visible = false;
									}
									
									else {
										field_F.scroller.label.string = "";
										field_F.scroller.hint.string = "F out of range";
										field_F.scroller.hint.visible = true;
									}
								} 
								
								else{
									label.string = "";
									data.name = label.string;
								
									label.container.hint.string = "C out of range";
								
									label.container.hint.visible = true;
										
								
								}
							}
							
							
							
				 		}}
				 	}),
				 }),
				 Label($, {
	 			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to add " + $.hintName, name:"hint"
				 })
			]
		})
	]
}});

var F_Field = Container.template(function($) { return { 
	width: 250, height: 36, skin: nameInputSkin, contents: [
		Scroller($, { 
			left: 4, right: 4, top: 4, bottom: 4, active: true, name: "scroller",
			behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
				Label($, { 
					left: 0, top: 0, bottom: 0, name: "label", skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
					editable: true, string: $.name,
				 	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
				 		onEdited: { value: function(label){
				 			var data = this.data;
							data.name = label.string;
							label.container.hint.visible = ( data.name.length == 0 );	
							
							if (label.string == "-"){
							
								
								var doNothing = true;
								
							
							}
							
							else if (isNaN(label.string)){
								//trace("AAA");
								
								label.string = "";
								data.name = label.string;
								
								label.container.hint.string = "Enter a valid number";
								
								label.container.hint.visible = true;
								
			
							}
							
							else if (label.string.length > 0){
								if(Number(label.string) >= -459.66){
									var val_F = Number(label.string);
									
									var val_C = (val_F - 32) * (5/9);
									
									var val_K = (val_F - 32) * (5/9) + 273.15; 
									
									if (val_C >= -273.15){
										field_C.scroller.label.string = val_C.toString();
										field_C.scroller.hint.visible = false;
									}
									
									else{
										field_C.scroller.label.string = "";
										field_C.scroller.hint.string = "C out of range";
										field_C.scroller.hint.visible = true;
									}
									
									if (val_K >= 0){
										field_K.scroller.label.string = val_K.toString();
										field_K.scroller.hint.visible = false;
										}
									
									
									else {
										field_K.scroller.label.string = "";
										field_K.scroller.hint.string = "K out of range";
										field_K.scroller.hint.visible = true;
									}
								}
								else{
									label.string = "";
									data.name = label.string;
								
									label.container.hint.string = "F out of range";
								
									label.container.hint.visible = true;
										
								}
								
							}
				 		}}
				 	}),
				 }),
				 Label($, {
	 			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to add " + $.hintName, name:"hint"
				 })
			]
		})
	]
}});

var K_Field = Container.template(function($) { return { 
	width: 250, height: 36, skin: nameInputSkin, contents: [
		Scroller($, { 
			left: 4, right: 4, top: 4, bottom: 4, active: true, name: "scroller",
			behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
				Label($, { 
					left: 0, top: 0, bottom: 0, name: "label", skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'NAME',
					editable: true, string: $.name,
				 	behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
				 		onEdited: { value: function(label){
				 			var data = this.data;
							data.name = label.string;
							label.container.hint.visible = ( data.name.length == 0 ); 
							
							if (label.string == "-"){
							
								//trace("AAA")
								
								label.string = "";
								data.name = label.string;
							
								//var doNothing = true;
								
								label.container.hint.string = "K out of range";
								
								label.container.hint.visible = true;
								
							
							}
							
							else if (isNaN(label.string)){
								//trace("AAA");
								
								label.string = "";
								data.name = label.string;
								
								label.container.hint.string = "Enter a valid number";
								
								label.container.hint.visible = true;
			
							}
							
							else if (label.string.length > 0){
							
								var val_K = Number(label.string);
								
								var val_C = val_K - 273.15;
								
								var val_F = (val_K - 273.15) * (9/5) + 32;
							
								field_C.scroller.label.string = val_C.toString();
								field_C.scroller.hint.visible = false;
								
								field_F.scroller.label.string = val_F.toString();
								field_F.scroller.hint.visible = false;
							
							}
				 		}}
				 	}),
				 }),
				 Label($, {
	 			 	left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Tap to add " + $.hintName, name:"hint"
				 })
			]
		})
	]
}});


var ColCon = new Column({left:0, right:0, top:0, bottom:0, skin: whiteS});

var MainCon = Container.template(function($) { return {
	left: 0, right: 0, top: 0, bottom: 0, skin: $.bColor, active: true, contents:[
		new Label({left:292, right:0, height: 20, string: $.ggg, style: labelStyle})],
	behavior: Object.create(Container.prototype, {
		onTouchEnded: { value: function(content){
			KEYBOARD.hide();
			content.focus();
			
			if (field_C.scroller.hint.string == "Enter a valid number"){
				field_C.scroller.hint.string = "Tap to add Celsius";
				field_C.scroller.hint.visible = true;
			}
			
			if (field_F.scroller.hint.string == "Enter a valid number"){
				field_F.scroller.hint.string = "Tap to add Fahreneheit";
				field_F.scroller.hint.visible = true;
			}
			
			if (field_K.scroller.hint.string == "Enter a valid number"){
				field_K.scroller.hint.string = "Tap to add Kelvin";
				field_K.scroller.hint.visible = true;
			}
			
			
			
		}}
	})
}});


var field_C = new C_Field({ name: "", hintName: "Celsius" });
var field_F = new F_Field({ name: "", hintName: "Fahrenheit" });
var field_K = new K_Field({ name: "", hintName: "Kelvin" });

var main = new MainCon({ bColor: C_S, ggg: "C" });
var main2 = new MainCon({ bColor: F_S, ggg: "F" });
var main3 = new MainCon({ bColor: K_S, ggg: "K" });
var main4 = new MainCon({ bColor: C_All }) 

application.add(ColCon);
ColCon.add(main);
ColCon.add(main2);
ColCon.add(main3);
ColCon.add(main4);
main.add(field_C);
main2.add(field_F);
main3.add(field_K);
main4.add(button);

//field_C.scroller.label.string = "HI";




