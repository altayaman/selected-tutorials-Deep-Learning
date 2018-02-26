// JavaScript Document

//HTML5 Ad Template JS from DoubleClick by Google

//Declaring elements from the HTML i.e. Giving them Instance Names like in Flash - makes it easier

//Function to run with any animations starting on load, or bringing in images etc

init = function()
{
	
	//Assign All the elements to the element on the page
	content = document.getElementById('content_dc');
	bgExit = document.getElementById('background_exit_dc');
	//Bring in listeners i.e. if a user clicks or rollovers
	listeners();
	//Show Ad
	content.style.display = "block";

		TweenMax.set(endOffer, {css:{transformStyle:"preserve-3d"}});
		TweenMax.set(endOffer, {scale:.6, opacity:0});
	if(frame1_active){
	//BordersIn();
	frame1Active();	
	}else if(frame2_active){
	BordersIn();
	frame2Active();		
	}else{
	AnimationEndFrame();	
	}

};

function frame1Active()
{
	TweenMax.to( frame1, 0.5, { left:12, ease:Power4.easeOut, delay: .2});
	TweenMax.to(frame1, 0.1, {textShadow:"3px 0px 2px #fff"});
	TweenMax.to(frame1, 0.1, {textShadow:"0px 0px 0px #fff", delay: .3});
	TweenMax.to( img1, 0.5, { left:12, ease:Power4.easeOut, delay: .2});
	TweenLite.to( img1, 0.5, { left:-300, ease:Power4.easeOut, delay: 2});
	TweenLite.to( frame1, 0.5, { left:-300, ease:Power4.easeOut, delay: 2, onComplete:nextFrame});
	if(!frame2_active){
	//BordersOut()
	}
}

function nextFrame()
{

	if(frame2_active){
	nextNum=2;	
	}else{
	nextNum=3;		
	}
	if(nextNum==2){
	frame2Active();	
	}
	if(nextNum==3){
	AnimationEndFrame();	
	}
	
}

function frame2Active()
{
	//BordersOut();
	TweenMax.to( frame2, 0.5, { left:12, ease:Power4.easeOut, delay: .2});
	TweenMax.to(frame2, 0.1, {textShadow:"3px 0px 2px #fff"});
	TweenMax.to(frame2, 0.1, {textShadow:"0px 0px 0px #fff", delay: .3});
	TweenMax.to( img2, 0.5, { left:12, ease:Power4.easeOut, delay: .2});
	TweenLite.to( img2, 0.5, { left:-300, ease:Power4.easeOut, delay: 2});
	//TweenLite.to( frame2, 0.5, { left:-300, ease:Power4.easeOut, delay: 2, onComplete:AnimationEndFrame()});
	TweenLite.to( frame2, 0.5, { left:-300, ease:Power4.easeOut, delay: 2});
	TweenLite.set(shine, {left:-120, opacity:.7});
	setTimeout (function(){AnimationEndFrame()}, 2000);
	
	
}


function BordersIn()
{
	TweenMax.to( "#borders", 0.5, { left:12, ease:Power4.easeOut, delay: .2});
}

function BordersOut()
{
	TweenMax.to( "#borders", 0.5, { left:-300, ease:Power4.easeOut, delay: 2});
}

function AnimationEndFrame()
{
	

	TweenMax.to( hEnd, 0.3, { left:20, ease:Power4.easeOut, delay: .1});

	TweenMax.to( shEnd, 0.3, { left:20,ease:Power4.easeOut, delay: 1});
	//console.log(price.innerHTML);
	if(price.innerHTML>0){
	TweenMax.to( endOffer, 1, { scale:1, opacity:1, transformPerspective:1000, ease:Sine.easeOut, delay: 2});
	}
	TweenMax.to( WhiteBorder, 0.5, { opacity:1, ease:Sine.easeOut, delay: 2.5});
	TweenMax.to( lastmsg, 0.5, { opacity:1, ease:Sine.easeOut, delay: 2.8});
	TweenMax.to( ctaDate, 0.5, { opacity:0, ease:Sine.easeOut, delay: 3.5});
	TweenMax.to( ctaBG, 0.5, { opacity:1, ease:Sine.easeOut, delay: 3.5});
	TweenMax.to( ctaCopy, 0.5, { opacity:1, ease:Sine.easeOut, delay: 3.5});
	TweenMax.to( shine, 0.45, {  left:120, ease:Sine.easeIn, delay: 4.6});
	TweenMax.to( shine, 0, { left:-120, ease:Sine.easeOut, delay: 5});
	setTimeout (function(){addShadowAnimation()}, 2000);
	

}

function listeners(){
        content.addEventListener('mouseenter', ctaOver, false);
        content.addEventListener('mouseleave', ctaOut, false);
        bgExit.addEventListener('click', bgExitHandler, false);
}
    
function ctaOver(){
	TweenLite.to(shine, .45, {left:120, ease:Sine.easeIn});
	TweenLite.to(shine, 0, {delay:.5,left:-120, ease:Sine.easeIn});	
}

function ctaOut(){
   	TweenLite.to(shine, 0, {left:-120, ease:Sine.easeIn});
}

function addShadowAnimation(){

	document.getElementById('currency').classList.add( "shadowT" );
	document.getElementById('price').classList.add ("shadowT");
	document.getElementById('cents').classList.add("shadowT");
}


bgExitHandler = function(e)
{
	//Call Exits
	Enabler.exitOverride('HTML5_Background_Clickthrough', Exit_URL);
};



init();


