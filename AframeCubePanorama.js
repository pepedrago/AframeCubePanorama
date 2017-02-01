//------------------------------
var IsMobile      = false;
var HeadSetActive = false;
var StartScreen;
var QRScreen;
var DefaultWidth  = 960;
//------------------------------
var PrevScreenState;
//------------------------------
const ScreenStates =
{
   LOADING     : 0,
   STARTSCREEN : 1,
   QRSCREEN    : 2,
   MONOVIEW    : 3,
   STEREOVIEW  : 4   
}

var Screenstate = {
  current : 0,
  set current (state)
  {
    ChangeScreen(PrevScreenState,"out");
    current = state;  
    ChangeScreen(state,"in");
    PrevScreenState = state;
  },
  get current ()
  {
    return current;
  } 
}
//------------------------------
function Init()
{
 StartScreen = $("#StartScreen");
 QRScreen    = $("#QRCodeWindow");
 MonoView    = $("#MonoView");
    
 $(QRScreen).addClass('hidden');
 $(StartScreen).addClass('hidden');
 $(MonoView).addClass('hidden');
    
 IsMobile      = AFRAME.utils.device.isMobile();
 IsHeadSet     = AFRAME.utils.device.checkHeadsetConnected ();
    
 $('.btn').click(function(){OnBtnClicked(this)});
 $('.btn').hover(function(){OnBtnHover(this)});  
    

    
 PrevScreenState = ScreenStates.LOADING;
 Screenstate.current = ScreenStates.STARTSCREEN;  
 ChangeCanvasSize();
}
//------------------------------
function ChangeScreen(_state,_direction)
{
    var screen = null;
    
    switch(_state)
    {
        case ScreenStates.STARTSCREEN:
        StartAnimation();
        screen = StartScreen;
        break;
        case ScreenStates.QRSCREEN:  
        screen = QRScreen;
        break;
        case ScreenStates.MONOVIEW:
        screen = MonoView;
        StopAnimation();
        break
        case ScreenStates.STEREOVIEW:
        StopAnimation();
        document.querySelector('a-scene').enterVR();  
        break;
        default:
        console.log(PrevScreenState);
        break;
    } 
    if(screen!=null)
    {   ToggleWindow(screen);
        if(_direction==="in")
        {
           console.log("fading in"+ screen); 
            $(screen).fadeIn("slow",function()
         {
          //  onComplete
         });
        }
        else if(_direction==="out")
        {
            console.log("fading out"+ screen); 
           $(screen).fadeOut("slow",function()
         {
         //   onComplete
         });
        }
    }
}
//------------------------------
function OnBtnClicked(_obj)
{
    if($(_obj).attr("id")=="startBtn")
    {
       Screenstate.current = ScreenStates.MONOVIEW;
    }
    if($(_obj).attr("id")=="vrBtn")
    {
        if(IsMobile||IsHeadSet)
        {
          Screenstate.current = ScreenStates.STEREOVIEW;
          
        }
        else
        {
            Screenstate.current = ScreenStates.QRSCREEN;
              
        }    
    }
    if($(_obj).attr("id")=="backBtn")
    {
       Screenstate.current = ScreenStates.STARTSCREEN;
       
    }  
}
//------------------------------
function ToggleWindow(_screen)
{
    if($(_screen).attr('visible'))
    {
        $(_screen).removeClass('vissible');
        $(_screen).addClass('hidden');     
    }
    else
    {
        $(_screen).removeClass('hidden');
        $(_screen).addClass('visible');
    }
}
//------------------------------
function OnBtnHover(_obj)
{
    $(_obj).find(".Icon").toggleClass("inverted");
}
//------------------------------
function StartAnimation()
{
    $('#camAnimation').attr('mixin',"camStartScreenRotation");
}
function StopAnimation()
{
    $('#camAnimation').attr('mixin',"stopRotation");
}
//------------------------------
$( window ).resize(function() {
  ChangeCanvasSize();
});

$( window ).on( "orientationchange", function( event ) {
  ChangeCanvasSize(); 
});

function ChangeCanvasSize()
{
  var newWidth  =  ($( window ).width()/960)*960;
  var newHeight =  540*($( window ).width()/960);
  var AllowScaling = (newWidth<DefaultWidth)?true:(IsMobile)?true:false;
  console.log(document.querySelector('a-camera').object3D);
    if(newWidth<DefaultWidth||IsMobile)
    {
    $('a-scene').css({"width":newWidth.toString()+"px","height":newHeight.toString()+"px"})
    }
  
}
//------------------------------
Init();