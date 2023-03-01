function nuevoAjax(){
var xmlhttp=false;
 try {
  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
 } catch (e) {
  try {
   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (E) {
   xmlhttp = false;
  }
 }

if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
  xmlhttp = new XMLHttpRequest();
}
return xmlhttp;
}

function enviarMail(){
	c = document.getElementById('resultado_mensaje');
	
	nom=document.enviar_email.customer[first_name].value;
	ape=document.enviar_email.customer[last_name].value;
	mail=document.enviar_email.customer[email].value;
	con=document.enviar_email.customer[password].value;
	
	ajax=nuevoAjax();
	c.innerHTML = '<p style="text-align:center;"><img src="loading1.gif"/></p>';
	ajax.open("POST", "envia_mail.php",true);
	ajax.onreadystatechange=function() {
		if (ajax.readyState==4) {
			c.innerHTML = ajax.responseText
		}
		borrarCampos()
	}
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax.send("customer[first_name]="+nom+"&customer[last_name]="+ape+"&customer[email]="+mail+"&customer[password]="+con);
}

function borrarCampos(){
	document.enviar_email.customer[first_name].value="";
	document.enviar_email.customer[last_name].value="";
	document.enviar_email.customer[email].value="";
	document.enviar_email.customer[password].value="";
	document.enviar_email.customer[first_name].focus();
}