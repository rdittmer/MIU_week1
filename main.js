// Ryan Dittmer
// Week 1
// MIU 1208

window.addEventListener( "DOMContentLoaded", function(){

	function ge( x ){
		var theElement = document.getElementById( x );
		return theElement;
	}
	
	function makegroup()
	{
		var formTag     = document.getElementsByTagName( "form" ),
			selectLi       = ge( 'group' ),
			makeSelect = document.createElement( 'select' );
			makeSelect.setAttribute( "id", "group" );
		for( var i = 0, j = group.length; i < j; i++ ){
			var makeOption = document.createElement( 'option' );
			var optText  = group[i];
			makeOption.setAttribute( "value", optText );
			makeOption.innerHTML = optText;
			makeSelect.appendChild( makeOption );
		}
		selectLi.appendChild( makeSelect );
	}
//////////////////////////////////	
	function storeData( key )
	{
		if ( !key ) 
		{
			var id     = Math.floor( Math.random() * 10001 );
		}
		else
		{
			id         = key;
		}
		getSelectedRadio();
		var item       = {};
		
		item.group           = ["Group:"  ,           ge( 'group' ).value];
		item.levelName       = ["Level Name:"     ,   ge( 'levelName' ).value];
		item.numberFloors    = ["Number of Floors:" , ge( 'numberFloors' ).value];
		item.difficulty      = ["Difficulty:"   ,     difficultyValue];
		item.date            = ["Date:"   ,           ge( 'date' ).value];
		item.notes           = ["Notes"       ,       ge( 'notes' ).value];
		
		localStorage.setItem( id, JSON.stringify( item ) );
		alert( "Level Added!" );
	}

///////////////////////////////////
	function getSelectedRadio()
	{
		var radios = document.forms[0].difficulty;
		
		for ( var i = 0; i < radios.length; i++ )
		{
			if ( radios[i].checked )
				difficultyValue = radios[i].value;
		}
	}
	///////////////////
	function getData()
	{
		toggleControls( "on" );
		if( localStorage.length === 0 )
		{
			alert( "You currently have no saved Levels. Auto add default Levels." );
			autoFillData();
		}
		var makeDiv  = document.createElement( 'div' );
		makeDiv.setAttribute( "id", "items" );
		var makeList = document.createElement( 'ul' );
		makeDiv.appendChild( makeList );
		document.body.appendChild( makeDiv );
		ge( 'items' ).style.display = "block";
		for( var i = 0, len = localStorage.length; i < len; i++ )
		{
			var makeli      = document.createElement( 'li' );
			var linksLi     = document.createElement( 'li' );
			makeList.appendChild( makeli );
			var key         = localStorage.key( i );
			var value       = localStorage.getItem( key );
			var obj         = JSON.parse( value );
			var makeSubList = document.createElement( 'ul' );
			makeli.appendChild( makeSubList );
			//getImage( obj.group[1], makeSubList );
			for( var n in obj )
			{
				var makeSubli       = document.createElement( 'li' );
				makeSubList.appendChild( makeSubli );
				var optSubText      = obj[n][0] + " " + obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild( linksLi );
			} 
			makeItemLinks( localStorage.key( i ), linksLi );
		}
	}
	
	/*function getImage( catName, makeSubList )
	{
		var imageLi = document.createElement( 'li' );
		makeSubList.appendChild( imageLi );
		var newImg  = document.createElement( 'img' );
		var setSrc  = newImg.setAttribute( "src", "img/" + catName + ".png" );
		imageLi.appendChild( newImg );
	}*/
	
	function autoFillData()
	{
		for ( var n in json )
		{
			var id = Math.floor( Math.random()*10001 );
			localStorage.setItem( id, JSON.stringify( json[n] ) );
		}
	
	}
	
	function makeItemLinks( key, linksLi )
	{
		var editLink         = document.createElement( 'n' );
		editLink.href        = "#";
		editLink.key         = key;
		var editText         = "Edit Levels";
		editLink.addEventListener( "click", editItem );
		editLink.innerHTML   = editText;
		linksLi.appendChild( editLink );
		
		var breakTag         = document.createElement( 'br' );
		linksLi.appendChild( breakTag );
		
		var deleteLink       = document.createElement( 'n' );
		deleteLink.href      = "#";
		deleteLink.key       = key;
		var deleteText       = "Delete Level";
		deleteLink.addEventListener( "click", deleteItem );
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild( deleteLink );
	}
	
	function editItem()
	{
		var value = localStorage.getItem( this.key );
		var item  = JSON.parse( value );
		
		toggleControls( "off" );
		
		ge( 'group' ).value = item.group[1];
		ge( 'levelName' ).value     = item.levelName[1];
		ge( 'numberFloors' ).value = item.numberFloors[1];
		var radios = document.forms[0].difficulty;
		for ( var i = 0; i < radios.length; i++ )
		{
			if ( radios[i].value == "Beginner" && item.difficulty[1] == "Beginner" )
				radios[i].setAttribute( "checked", "checked" );
			else if ( radios[i].value == "Intermediate" && item.difficulty[1] == "Intermediate" )
				radios[i].setAttribute( "checked", "checked" );
			else if ( radios[i].value == "Advanced" && item.difficulty[1] == "Advanced" )
				radios[i].setAttribute( "checked", "checked" );
		}
		ge( 'date' ).value      = item.date[1];
		ge( 'notes' ).value     = item.notes[1];
		
		save.removeEventListener( "click", storeData );
		ge( 'submit' ).value    = "Edit Level";
		var editSubmit         = ge( 'submit' );
		editSubmit.addEventListener( "click", validate );
		editSubmit.key         = this.key;
	}
	
	function deleteItem()
	{
		var ask = confirm( "Are you sure you want to delete this Level?" );
		if (ask)
		{
			localStorage.removeItem( this.key );
			window.location.reload();
			alert( "Level deleted!" );
		}
		else
		{
			alert( "Level not deleted." );
		}
	}
	
	function validate(e)
	{
		var getgroup           = ge( 'group' );
		var getlevelName         = ge( 'levelName' );
		var getnumberFloors = ge( 'numberFloors' );
		
		errMessage.innerHTML           = "";
		getgroup.style.border           = "1px solid black";
		getlevelName.style.border         = "1px solid black";
		getnumberFloors.style.border = "1px solid black";
		
		var messageArray = [];
		
		if ( getgroup.value === "<-Select group->" )
		{
			var optionError             = "Please choose a group.";
			getgroup.style.border = "1px solid red";
			messageArray.push( optionError );
		}
		
		if ( getlevelName.value === "" )
		{
			var levelNameError            = "Please enter a reservsit name.";
			getlevelName.style.border = "1px solid red";
			messageArray.push( levelNameError );
		}
		
		if ( getnumberFloors.value === "" )
		{
			var numberFloorsError          = "Please enter a number of games.";
			getnumberFloors.style.border = "1px solid red";
			messageArray.push( numberFloorsError );
		}
		
		if ( messageArray.length >= 1 )
		{
			for ( var i = 0, j = messageArray.length; i < j; i++ )
			{
				var txt = document.createElement( 'li' );
				txt.innerHTML = messageArray[i];
				errMessage.appendChild( txt );
			}
			e.preventDefault();
			return false;
		}
		else
		{
			storeData( this.key );
		}
	}
	
	function toggleControls( n )
	{
		switch( n )
		{
			case "on":
				ge('levelForm').style.display      = "none";
				ge('clear').style.display           = "inline";
				ge('displayData').style.display = "none";
				ge('addNew').style.display       = "inline";
				break;
				
			case "off":
				ge('levelForm').style.display       = "block";
				ge('clear').style.display            = "inline";
				ge('displayData').style.display  = "inline";
				ge('addNew').style.display        = "none";
				ge('items').style.display           = "none";
				break;
				
			default:
				return false;	
		}
	}
////////////////////////////////	
	function clearLocal(){
		if( localStorage.length === 0 ){
			alert( "You have no saved Levels." );
		}else{
			localStorage.clear();
			alert( "All Levels have been deleted!" );
			window.location.reload();
			return false;
		}
	}
	
	var group = [ "<-Select Level Group->", "Set 1", "Set 2", "Set 3", "Set 4", "Bonus Set" ];
	var difficultyValue;
	var errMessage = ge( 'errors' );
	makegroup();
	
	var displayLink = ge( 'displayData' );
	displayLink.addEventListener( "click", getData );
	var clearLink   = ge( 'clear' );
	clearLink.addEventListener( "click", clearLocal );
	var save        = ge( 'submit' );
	save.addEventListener( "click", validate );
	
});