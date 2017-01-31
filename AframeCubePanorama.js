$('.Close').click(function(){OnClose(this)});
$('.btn').hover(function(){OnButtonHover(this)});

 $("#QRCodeWindow").addClass('hidden');
 $("#StartScreen").addClass('visible');

//------------------------------


function OnClose(_obj)
{
    var parentWindow = $("#"+$(_obj).attr("parentID"));
 
     $(parentWindow).fadeOut("slow",function()
     {
        ToggleWindow(parentWindow);
     });


    if($(_obj).attr("id")=="startBtn")
    {
       $('#camAnimation').attr('mixin',"stopRotation");
    }
    if($(_obj).attr("id")=="vrBtn")
    {
        if(AFRAME.utils.device.isMobile ()||AFRAME.utils.device.checkHeadsetConnected ())
        {
          $('#camAnimation').attr('mixin',"stopRotation");  
          document.querySelector('a-scene').enterVR();  
        }
        else
        {
            ToggleWindow($("#QRCodeWindow"));       
        }    
    }
    if($(_obj).attr("id")=="backBtn")
    {
       console.log("back to start");
       ToggleWindow($("#StartScreen"));
    }
    
}

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


function OpenQRCodeWindow()
{
    
}

function OnButtonHover(_obj){
    $(_obj).find(".Icon").toggleClass("inverted");
}


