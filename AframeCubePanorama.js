//------------------------------
var IsMobile      = false;
var HeadSetActive = false;
var StartScreen;
var QRScreen;
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

 IsMobile      = AFRAME.utils.device.isMobile();
 IsHeadSet     = AFRAME.utils.device.checkHeadsetConnected ();
    
 $('.btn').click(function(){OnBtnClicked(this)});
 $('.btn').hover(function(){OnBtnHover(this)});  
    
 $(QRScreen).addClass('hidden');
 $(StartScreen).addClass('visible');
    
 PrevScreenState = ScreenStates.LOADING;
 Screenstate.current = ScreenStates.STARTSCREEN;  
  
}
//------------------------------
function ChangeScreen(_state,_direction)
{
    var screen = null;
    
    switch(_state)
    {
        case ScreenStates.STARTSCREEN:
        screen = StartScreen;
        break;
        case ScreenStates.QRSCREEN:
        screen = QRScreen;
        break;
        case ScreenStates.MONOVIEW:
        StopAnimation();
        break
        case ScreenStates.STEREOVIEW:
        StopAnimation();
        break;
        default:
        console.log(PrevScreenState);
        break;
    } 
    
    if(_direction==="in")
    {
        $(screen).fadeIn("slow",function()
     {
        ToggleWindow(screen);
     });
    }
    else if(_direction==="out")
    {
       $(screen).fadeOut("slow",function()
     {
        ToggleWindow(screen);
     });
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
          document.querySelector('a-scene').enterVR();  
        }
        else
        {
            Screenstate.current = ScreenStates.QRSCREEN;
            ToggleWindow($("#QRCodeWindow"));       
        }    
    }
    if($(_obj).attr("id")=="backBtn")
    {
       Screenstate.current = ScreenStates.STARTSCREEN;
       ToggleWindow($("#StartScreen"));
    }  
}
//------------------------------
function ToggleWindow(_window){
    if($(_window).attr('visible'))
    {
        $(_window).removeClass('vissible');
        $(_window).addClass('hidden');     
    }
    else
    {
        $(_window).removeClass('hidden');
        $(_window).addClass('visible');
    }
}
//------------------------------
function OnBtnHover(_obj){
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
Init();
