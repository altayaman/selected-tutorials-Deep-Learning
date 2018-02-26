/*
necessite jQuery
*/
theme ="ui-start";

/*
Google_analytics : code de suivi
==============================*/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-54921687-1', 'auto');
ga('send', 'pageview');
// end analytics



jQuery(document).ready(function(){
	var lang =getLang();
	setNavBar(lang);
	setSocialMedia(lang);
	//search
	//jQuery(".submitBtn").jqxButton({ width: '100px', height: '30px', theme:theme});
});


function contains(text, what){
	var n = text.search(what);
	if(n!=-1) return true;
	else return false;
}

/* return la langue du site : french ou english*/
function getLang(){
var url=window.location.href;
var lang=contains(url, 'english') ? 'english':'french';
return lang;
}

//***************************************************
//Barre de navigation tout en haut
//changement du texte en fonction de la langue
//***************************************************
function setNavBar(lang){
	
	var menu='<span><a href="'+PATH_TO_ROOT+'/"><i class="fa fa-home"></i>&nbsp;HOME</a></span>\
					<span><a href="'+PATH_TO_ROOT+'/download/category-3+ebooks.php"><i class="fa fa-folder-open"></i>&nbsp;BOOKS</a></span>\
                    <span><a href="'+PATH_TO_ROOT+'/wiki/r-software"><i class="fa fa-area-chart"></i>&nbsp;R/STATISTICS</a></span>\
                    <span><a href="'+PATH_TO_ROOT+'/rsthda"><i class="fa fa-cogs"></i>&nbsp;STAT SOFTWARES</a></span>\
                    <span><a href="'+PATH_TO_ROOT+'/contact/"><i class="fa fa-envelope"></i>&nbsp;CONTACT</a></span>';
	if(lang=="french"){
		 menu =  '<span><a href="'+PATH_TO_ROOT+'/"><i class="fa fa-home"></i>&nbsp;ACCUEIL</a></span>\
		 			<span><a href="'+PATH_TO_ROOT+'/download/category-7+ebooks.php"><i class="fa fa-folder-open"></i>&nbsp;LIVRES</a></span>\
                    <span><a href="'+PATH_TO_ROOT+'/wiki/logiciel-r"><i class="fa fa-area-chart"></i>&nbsp;R/STATISTIQUES</a></span>\
                    <span><a href="'+PATH_TO_ROOT+'/rsthda"><i class="fa fa-cogs"></i>&nbsp;LOGICIEL STATS</a></span>\
                    <span><a href="'+PATH_TO_ROOT+'/contact/"><i class="fa fa-envelope"></i>&nbsp;CONTACT</a></span>';
	}
	jQuery("#navigation-menu").html(menu);
}


//***************************************************
//Modification du lien des réseaux sociaux
//***************************************************
function setSocialMedia(lang){
	if(lang=="french"){
		jQuery('.facebook').attr('href', 'https://www.facebook.com/779075225462381');
		jQuery('.google').attr('href', 'https://plus.google.com/+sthda-fr/posts');
	}
}


/*
Cette fonction est utilisée pour afficher un block demandant aux visiteurs de participer
voir templates module wiki
*/
function setGetInvolvedBlock(lang){
	
var involved='<strong><i class="fa fa-2x fa-group"></i>&nbsp;Get involved : </strong><br/>\
		<i class="fa fa-share fa-2x"></i>&nbsp;\
			Click to <b>follow us</b> on <a href="https://www.facebook.com/1570814953153056" class="facebook" target="_blank">Facebook</a> and \
			 <a href="https://plus.google.com/108962828449690000520" rel="publisher">Google+</a> : \
			 <a href="https://www.facebook.com/1570814953153056" class="facebook" target="_blank"><i class="fa fa-facebook-square fa-2x"></i></a>&nbsp;&nbsp;\
			<a href="https://plus.google.com/108962828449690000520" rel="publisher" class="google" target="_blank"><i class="fa fa-google-plus-square fa-2x"></i></a><br/>\
		 <i class="fa fa-comment fa-2x"></i>&nbsp; <b>Comment this article</b> by clicking on "Discussion" button (top-right position of this page)<br/>\
		 <i class="fa fa-user fa-2x"></i>&nbsp; <a href="../user/registration/">Sign up as a member</a> and post <a href="how-to-contribute-to-sthda-web-site">news and articles</a> on STHDA web site.<br/>\
	 ';
if(lang=="french"){
		 involved='<strong><i class="fa fa-2x fa-group"></i>&nbsp;Contibuez au site STHDA : </strong><br/>\
		<i class="fa fa-share fa-2x"></i>&nbsp;\
			Cliquez pour <b>nous suivre</b> on <a href="https://www.facebook.com/779075225462381" class="facebook" target="_blank">Facebook</a> and \
			 <a href="https://plus.google.com/+sthda-fr/posts" rel="publisher">Google+</a> : \
			 <a href="https://www.facebook.com/779075225462381" class="facebook" target="_blank"><i class="fa fa-facebook-square fa-2x"></i></a>&nbsp;&nbsp;\
			<a href="https://plus.google.com/+sthda-fr/posts" rel="publisher" class="google" target="_blank"><i class="fa fa-google-plus-square fa-2x"></i></a><br/>\
		 <i class="fa fa-comment fa-2x"></i>&nbsp; <b>Commentez cet article</b> en cliquant sur le bouton "Discussion" (position haut-droite de cette page)<br/>\
		 <i class="fa fa-user fa-2x"></i>&nbsp; <a href="../user/registration/">Enregistrez vous</a> et postez <a href="comment-contribuer-au-site-sthda">des news et articles</a> sur STHDA.<br/>\
		';
	}
	jQuery(".get_involved").html(involved);
}
