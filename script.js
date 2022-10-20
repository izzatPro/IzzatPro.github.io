window.addEventListener('load',function(){
    const mouseCircle = document.querySelector('.mouse-circle');
    const mouseDot = document.querySelector('.mouse-dot');
    //Mouse Circle
    const mouseCircleFn = (x,y) => {
        mouseCircle.style.cssText = `top:${y}px;left:${x}px;opacity:1;`;
        mouseDot.style.cssText = `top:${y}px;left:${x}px;opacity:1;`;
    };
    document.body.addEventListener('mousemove', function (e) {
        let x = e.clientX;
        let y = e.clientY;
        mouseCircleFn(x,y);
    });
    
    document.body.addEventListener('mouseleave', function (e) {
      mouseCircle.style.opacity = 0;
      mouseDot.style.opacity = 0;
    
    });
});