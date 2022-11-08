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
            e.target.style.animation = "aboutMeTextAnim 10s 0s infinite";
        });
    });
    // End of About Me Text

    // Projects
    const container = document.querySelector('.container');
    const projects = document.querySelectorAll('.project');
    const projectHideBtn = document.querySelector('.project-hide-btn');
    const demo = document.querySelector('.demo');
    projects.forEach((project, i)=>{
        project.addEventListener('mouseenter', () => {
            project.firstElementChild.style.top = `-${project.firstElementChild.offsetHeight - project.offsetHeight + 20}px`;
        });
        project.addEventListener('mouseleave', () =>{
            project.firstElementChild.style.top = "2rem";
        });

        //Big Project
        project.addEventListener('click',() =>{
            const bigImgWrapper = document.createElement("div");
            bigImgWrapper.className = "project-img-wrapper";
            container.appendChild(bigImgWrapper);
            const bigImg =  document.createElement("img");
            bigImg.className = "project-img";
            const imgPath = project.firstElementChild.getAttribute("src").split('.')[0];
            demo.onclick = function(){
                const demoDescr = project.firstElementChild.getAttribute("descr");
                switch(demoDescr){
                    case 'phone': demo.setAttribute("href", "#"); break;
                    case 'consulting': demo.setAttribute("href", "#"); break;
                    case 'cars': demo.setAttribute("href", "#"); break;
                    case 'design': demo.setAttribute("href", "#"); break;
                    case 'food': demo.setAttribute("href", "#"); break;
                    case 'paypal': demo.setAttribute("href", "#"); break;
                    case 'web': demo.setAttribute("href", "#"); break;
                    case 'ballon': demo.setAttribute("href", "#"); break;
                    case 'wine': demo.setAttribute("href", "#"); break;
                    case 'house': demo.setAttribute("href", "#"); break;
                }
            };
           
            
            bigImg.setAttribute("src",`${imgPath}-big.jpg`);
            bigImgWrapper.appendChild(bigImg);
            document.body.style.overflowY = "hidden";


            projectHideBtn.classList.add("change");
            demo.classList.add('change');
            projectHideBtn.onclick = () => { 
            projectHideBtn.classList.remove("change");
            demo.classList.remove('change');
            bigImgWrapper.remove();
            document.body.style.overflowY = "scroll";
            } ;
        });
        //End of //Big Project

        
        i >=6 && (project.style.cssText = "display:none; opacity: 0 " ) ;
        
    });
    // End of Projects
    // Projects Button
    const projectsBtn = document.querySelector('.projects-btn');
    const projectsBtnText = document.querySelector('.projects-btn span');
    let showHideBool = true ;
    projectsBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");
        projects.forEach((project, i) =>{
            if ( i >= 6) {
                if(showHideBool){
                    project.style.display = "flex";
                    project.style.opacity = "1";
                    projectsBtnText.textContent = 'Show Less';
                } else {
                    project.style.display = "none";
                    project.style.opacity = "0";
                    projectsBtnText.textContent = 'Show More';
                }
            }
        });
        showHideBool = !showHideBool;
    });
    // End of Projects Button
});