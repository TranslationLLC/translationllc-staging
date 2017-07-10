// ripped from http://stackoverflow.com/questions/15084675/how-to-implement-swipe-gestures-for-mobile-devices
export function detectSwipe(el,func) {
  let swipe_det = {},
      direc = "",
      horizontalSwipeDifference;
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  el.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX;
    swipe_det.sY = t.screenY;
  },false);
  el.addEventListener('touchmove',function(e){
    var t = e.touches[0];
    swipe_det.eX = t.screenX;
    swipe_det.eY = t.screenY;
  },false);
  el.addEventListener('touchend',function(e){
    horizontalSwipeDifference = swipe_det.sX - swipe_det.eX;
    console.log('swipt_det ', swipe_det.sX - swipe_det.eX);
    if (horizontalSwipeDifference > 0 && horizontalSwipeDifference > 80) {
      direc = 'l';
    } else if (horizontalSwipeDifference < 0 && horizontalSwipeDifference < -50) {
      direc = 'r';
    }
    if (direc != "") {
      if(typeof func == 'function') func(el,direc);
    }
    direc = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  },false);
}
