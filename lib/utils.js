export const getHeight = () => {
  if( typeof( window.innerWidth ) == 'number' ) {
    return window.innerHeight;
  } else if(document.documentElement &&
           (document.documentElement.clientWidth ||
            document.documentElement.clientHeight)) {
    return document.documentElement.clientHeight;
  } else if(document.body &&
           (document.body.clientHeight ||
            document.body.clientHeight)) {
    return document.body.clientHeight;
  }
};


export const getWidth = () => {
  if( typeof( window.innerWidth ) == 'number' ) {
    return window.innerWidth;
  } else if(document.documentElement &&
           (document.documentElement.clientWidth ||
            document.documentElement.clientHeight)) {
    return document.documentElement.clientWidth;
  } else if(document.body &&
           (document.body.clientWidth ||
            document.body.clientHeight)) {
    return document.body.clientWidth;
  }
};


export const calculateIntersection = (rect1, rect2, x, y) => {
  // prevent x|y from being null||undefined
  x = x || 0; y = y || 0;

  // first we have to calculate the
  // center of each rectangle and half of
  // width and height
  var dx, dy, r1={}, r2={};
  r1.cx = rect1.x + x + (r1.hw = (rect1.width /2));
  r1.cy = rect1.y + y + (r1.hh = (rect1.height/2));
  r2.cx = rect2.x + (r2.hw = (rect2.width /2));
  r2.cy = rect2.y + (r2.hh = (rect2.height/2));

  dx = Math.abs(r1.cx-r2.cx) - (r1.hw + r2.hw);
  dy = Math.abs(r1.cy-r2.cy) - (r1.hh + r2.hh);

  if (dx < 0 && dy < 0) {
    return {width:-dx,height:-dy};
  } else {
    return null;
  }
};

export const getBounds = (obj) => {
    var bounds={x:Infinity,y:Infinity,width:0,height:0};
    if ( obj instanceof createjs.Container ) {
      bounds.x2 = -Infinity;
      bounds.y2 = -Infinity;
      var children = obj.children, l=children.length, cbounds, c;
      for ( c = 0; c < l; c++ ) {
        cbounds = getBounds(children[c]);
        if ( cbounds.x < bounds.x ) bounds.x = cbounds.x;
        if ( cbounds.y < bounds.y ) bounds.y = cbounds.y;
        if ( cbounds.x + cbounds.width > bounds.x2 ) bounds.x2 = cbounds.x + cbounds.width;
        if ( cbounds.y + cbounds.height > bounds.y2 ) bounds.y2 = cbounds.y + cbounds.height;
        //if ( cbounds.x - bounds.x + cbounds.width  > bounds.width  ) bounds.width  = cbounds.x - bounds.x + cbounds.width;
        //if ( cbounds.y - bounds.y + cbounds.height > bounds.height ) bounds.height = cbounds.y - bounds.y + cbounds.height;
      }
      if ( bounds.x == Infinity ) bounds.x = 0;
      if ( bounds.y == Infinity ) bounds.y = 0;
      if ( bounds.x2 == Infinity ) bounds.x2 = 0;
      if ( bounds.y2 == Infinity ) bounds.y2 = 0;

      bounds.width = bounds.x2 - bounds.x;
      bounds.height = bounds.y2 - bounds.y;
      delete bounds.x2;
      delete bounds.y2;
    } else {
      var gp,gp2,gp3,gp4,imgr={},sr;
      if ( obj instanceof createjs.Bitmap ) {
        sr = obj.sourceRect || obj.image;

        imgr.width = sr.width;
        imgr.height = sr.height;
      } else if ( obj instanceof createjs.Sprite ) {
        if ( obj.spriteSheet._frames && obj.spriteSheet._frames[obj.currentFrame] && obj.spriteSheet._frames[obj.currentFrame].image ) {
          var cframe = obj.spriteSheet.getFrame(obj.currentFrame);
          imgr.width =  cframe.rect.width;
          imgr.height =  cframe.rect.height;
          imgr.regX = cframe.regX;
          imgr.regY = cframe.regY;
        } else {
          bounds.x = obj.x || 0;
          bounds.y = obj.y || 0;
        }
      } else {
        bounds.x = obj.x || 0;
        bounds.y = obj.y || 0;
      }

      imgr.regX = imgr.regX || 0; imgr.width  = imgr.width  || 0;
      imgr.regY = imgr.regY || 0; imgr.height = imgr.height || 0;
      bounds.regX = imgr.regX;
      bounds.regY = imgr.regY;

      gp  = obj.localToGlobal(0         -imgr.regX,0          -imgr.regY);
      gp2 = obj.localToGlobal(imgr.width-imgr.regX,imgr.height-imgr.regY);
      gp3 = obj.localToGlobal(imgr.width-imgr.regX,0          -imgr.regY);
      gp4 = obj.localToGlobal(0         -imgr.regX,imgr.height-imgr.regY);

      bounds.x = Math.min(Math.min(Math.min(gp.x,gp2.x),gp3.x),gp4.x);
      bounds.y = Math.min(Math.min(Math.min(gp.y,gp2.y),gp3.y),gp4.y);
      bounds.width = Math.max(Math.max(Math.max(gp.x,gp2.x),gp3.x),gp4.x) - bounds.x;
      bounds.height = Math.max(Math.max(Math.max(gp.y,gp2.y),gp3.y),gp4.y) - bounds.y;
    }
    return bounds;
};
