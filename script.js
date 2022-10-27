window.addEventListener('load',function(){
        //Mouse Circle
    const mouseCircle = document.querySelector('.mouse-circle');
    const mouseDot = document.querySelector('.mouse-dot');

    const mouseCircleFn = (x,y) => {
        mouseCircle.style.cssText = `top:${y}px;left:${x}px;opacity:1;`;
        mouseDot.style.cssText = `top:${y}px;left:${x}px;opacity:1;`;
    };
        //End of Mouse Circle
        //Animated Circles
    const circles = document.querySelectorAll('.circle');
    const mainImg = document.querySelector('.main-circle img');

    let mX = 0;
    let mY = 0;

    const animateCircles = (e,x,y) =>{
        if(x < mX){
            circles.forEach( (circle) => {
                circle.style.left = `100px`;
            });
            mainImg.style.left = `-100px`;
        } else if (x > mX){
            circles.forEach( (circle) => {
                circle.style.left = `-100px`;
            });
            mainImg.style.left = `-350px`;
        }


        if( y < mY){
            circles.forEach( (circle) => {
                circle.style.top = `100px`;
            });
            mainImg.style.top = `-400px`;
        } else if ( y > mY ) {
            circles.forEach( (circle) => {
                circle.style.top = `-100px`;
            });
            mainImg.style.top = `-200px`;
        }

        mX = e.clientX;
        mY = e.clientY;
    };
        //End of Animated Circles

    document.body.addEventListener('mousemove', function (e) {
        let x = e.clientX;
        let y = e.clientY;
        mouseCircleFn(x,y);
        animateCircles(e,x,y);
    });
    
    document.body.addEventListener('mouseleave', function (e) {
      mouseCircle.style.opacity = 0;
      mouseDot.style.opacity = 0;
    
    });


    // Main button
    const mainBtn = document.querySelectorAll('.main-btn');
    mainBtn.forEach((btn) =>{
        let ripple;
        btn.addEventListener('mouseenter', function(e){
            const left = e.clientX - e.target.getBoundingClientRect().left;
            const top = e.clientY - e.target.getBoundingClientRect().top;
    
            ripple  = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.left = `${left}px`;
            ripple.style.top = `${top}px`;
            btn.prepend(ripple);
        });
        btn.addEventListener('mouseleave', function(){
            btn.removeChild(ripple);
        });
    });

    // End of Main Button


    // About me Text
    const aboutMeText = document.querySelector('.about-me-text');
    const aboutMeTextContent = 'I am an inspired Juniour Frontend Developer with the best user experience & I do not talk much, just contact me :)';
    Array.from(aboutMeTextContent).forEach((char)=>{
        const span = document.createElement('span');
        span.textContent = char;
        aboutMeText.appendChild(span);
        span.addEventListener('mouseenter', function(e){
            e.target.style.animation = "aboutMeTextAnim 10s infinite";
        });
    });
    // End of About Me Text

    // Projects
    const projects = document.querySelectorAll('.project');
    projects.forEach((project)=>{
        project.addEventListener('mouseenter', () => {
            project.firstElementChild.style.top = `-${project.firstElementChild.offsetHeight - project.offsetHeight + 20}px`;
        });
        project.addEventListener('mouseleave', () =>{
            project.firstElementChild.style.top = "2rem";
        });
    });
   
    // End of Projects
});