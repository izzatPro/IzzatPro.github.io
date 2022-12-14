window.addEventListener('load',function(){

    if (window.matchMedia("(max-width: 1000px)").matches){
    // Circle hover
        const hoverCircle = document.querySelector('.main-circle-hover');
        hoverCircle.classList.remove('main-circle-hover');
        console.log(hoverCircle);
        // hoverCircle.classList.remove("main-circle-hover")   ;
    //Mouse Circle
    const mouseCircle = document.querySelector('.mouse-circle');
    const mouseDot = document.querySelector('.mouse-dot');
    let mouseCircleBool = true ;
    // const mouseCircleFn = (x,y) => {
    //     mouseCircleBool && ( mouseCircle.style.cssText = `top:${y}px;left:${x}px;opacity:1;`);    
    //     mouseDot.style.cssText = `top:${y}px;left:${x}px;opacity:1;`;
    // };
        //End of Mouse Circle


    let hoveredElPosition = [];
    const stickyElement = (x, y, hoveredEl) => {
    // Sticky Element
    if (hoveredEl.classList.contains('sticky')) {
     hoveredElPosition.length < 1 &&  ( hoveredElPosition = [hoveredEl.offsetTop , hoveredEl.offsetLeft]);
     hoveredEl.style.cssText = `top: ${y}px; left:${x}px`;
   if(
       hoveredEl.offsetTop <= hoveredElPosition[0]- 100 ||
       hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
       hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
       hoveredEl.offsetLeft >= hoveredElPosition[1] + 100 
       ){
       hoveredEl.style.cssText = "";
       hoveredElPosition = [];
        }
        hoveredEl.onmouseleave = () =>{
           hoveredEl.style.cssText = "";
           hoveredElPosition = [];
        };
}
// End of Sticky Element
};

    // Mouse Circle Transform
    const mouseCircleTransform = (hoveredEl) =>{
        if (hoveredEl.classList.contains("pointer-enter")){
            hoveredEl.onmousemove = () => {
                mouseCircleBool = false ;
                mouseCircle.style.cssText = `
                width: ${hoveredEl.getBoundingClientRect().width}px;
                height: ${hoveredEl.getBoundingClientRect().height}px;
                top: ${hoveredEl.getBoundingClientRect().top}px;
                left: ${hoveredEl.getBoundingClientRect().left}px;
                opacity: 1;
                transform: translate(0,0);
                animation: none;
                border-radius:${this.getComputedStyle(hoveredEl).borderBottomLeftRadius};
                transition: width .5s, height .5s, top .5s, left .5s, transform .5s, border-radius .5s;
                `;
            };
            hoveredEl.onmouseleave = () => {
                mouseCircleBool = true;
            };
            document.onscroll = () =>{
                if (!mouseCircleBool){
                    mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`;
                }
            };
        }
    };
    // End of Mouse Circle Transform

    document.body.addEventListener('mousemove', function (e) {
        let x = e.clientX;
        let y = e.clientY;
        mouseCircleFn(x,y);
        animateCircles(e,x,y);
        const hoveredEl = document.elementFromPoint(x,y);
        stickyElement(x, y, hoveredEl);
        mouseCircleTransform(hoveredEl);
          
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
    // Progress Bar
    const sections = document.querySelectorAll('section');
    const progressBar= document.querySelector('.progress-bar');
    const halfCircles = document.querySelectorAll('.half-circle'); 
    const halfCircleTop = document.querySelector('.half-circle-top');
    const progressBarCircle = document.querySelector('.progress-bar-circle');

    let scrolledPortion = 0;
    let scrollBool = false ;
    let imageWrapper = false ; 
    const progressBarFn = (bigImgWrapper) => {
        imageWrapper = bigImgWrapper ;
        let pageHeight = 0; 
        const pageViewportHeight = window.innerHeight; //?????????????? ?? ???????? ????????????

        if(!imageWrapper) {
            pageHeight = document.documentElement.scrollHeight; //???????????? ?????????? ?????????? 
            scrolledPortion = window.pageYOffset;  //?????????????? ?? ?????????????????? ???????????? ???? ??????????
        } else {
            pageHeight = imageWrapper.firstElementChild.scrollHeight; //???????????? ?????????? ?????????? 
            scrolledPortion = imageWrapper.scrollTop;  //?????????????? ?? ?????????????????? ???????????? ???? ??????????
        }


        const scrolledPortionDegree = (scrolledPortion / (pageHeight - pageViewportHeight) ) * 360;
        halfCircles.forEach(el => {
            el.style.transform = `rotate(${scrolledPortionDegree}deg)`;

            if(scrolledPortionDegree >= 180){
                halfCircles[0].style.transform = "rotate(180deg)";
                halfCircleTop.style.opacity = "0";
            } else {
                halfCircleTop.style.opacity = "1";
            }

        });
        //???????????????? ?????? ?? ???????????????? 
        if (bigImgWrapper){
            if (scrolledPortion > 1100){
                scrollBool = true;
            } else {
                scrollBool = false;
            }        
        } else { 
            scrollBool = scrolledPortion + pageViewportHeight == pageHeight;
        };

        scrollBool = scrolledPortion + pageViewportHeight == pageHeight;
        // console.log(scrollBool);
       
    // Arrow Rotation
    if(scrollBool){
        progressBarCircle.style.transform = "rotate(180deg)";
    } else {
        progressBarCircle.style.transform = "rotate(0)";
    }
    // End of Arrow Rotation
    };
    //Progress Bar Click
    progressBar.addEventListener( 'click', (e) => {
    e.preventDefault();
    if(!imageWrapper){
        const sectionPositions = Array.from(sections).map( (section) => scrolledPortion  + section.getBoundingClientRect().top);
        const position = sectionPositions.find((sectionPosition) =>{ return sectionPosition > scrolledPortion });
        scrollBool ? window.scrollTo(0,0) :  window.scrollTo(0 , position);
    } else {
        scrollBool ? imageWrapper.scrollTo(0, 0) : imageWrapper.scrollTo(0, imageWrapper.scrollHeight);
    }

});
// End of Progress Bar Click

    progressBarFn();
    // End of Progress Bar


    // Navigation
    const menuIcon = document.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');
    const scrollFn = () => {
        menuIcon.classList.add('show-menu-icon');
        navbar.classList.add('hide-navbar');
        if (window.scrollY === 0){
            menuIcon.classList.remove('show-menu-icon');
            navbar.classList.remove('hide-navbar');
        }
        progressBarFn();
    };
    document.addEventListener('scroll', scrollFn);

    menuIcon.addEventListener('click', () =>{
        menuIcon.classList.remove('show-menu-icon');
        navbar.classList.remove('hide-navbar');
    });
    // End of Navigation

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

        //Big Project Image
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
                    case 'phone': demo.setAttribute("href", "https://ibiza-create.netlify.app/"); break;
                    case 'consulting': demo.setAttribute("href", "https://sportpit.netlify.app/"); break;
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
           
            document.removeEventListener('scroll', scrollFn);
            
            
            mouseCircle.style.opacity = 0;

    
            progressBarFn(bigImgWrapper);
            bigImgWrapper.onscroll = () => {
                progressBarFn(bigImgWrapper);
            };
            projectHideBtn.classList.add("change");
            demo.classList.add('change');
            projectHideBtn.onclick = () => { 
            projectHideBtn.classList.remove("change");
            demo.classList.remove('change');
            bigImgWrapper.remove();
            document.body.style.overflowY = "scroll";


            document.addEventListener('scroll', scrollFn);
            progressBarFn();
            } ;
        });
        //End of //Big Project

        
        i >=6 && (project.style.cssText = "display:none; opacity: 0 " ) ;
        
    });
    // End of Projects
    // Projects Button
    const section3 = document.querySelector('.section-3');
    const projectsBtn = document.querySelector('.projects-btn');
    const projectsBtnText = document.querySelector('.projects-btn span');
    let showHideBool = true ;

    const showProjects = (project , i) => {
        setTimeout(() =>{
            project.style.display = "flex";
            section3.scrollIntoView({block: "end"});
        }, 600);
        setTimeout(()=>{
            project.style.opacity = "1";
        }, i * 200);
    };

    const hideProjects = (project, i) => {
        setTimeout(() =>{
            project.style.display = "none";
            section3.scrollIntoView({block: "start"});
        },1200);
       setTimeout(() =>{
        project.style.opacity = "0";
       },i * 100);
    };

    projectsBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");
        showHideBool ? ( projectsBtnText.textContent = 'Show Less') : (  projectsBtnText.textContent = 'Show More');
        projects.forEach((project, i) => {
             i >= 6 && ( showHideBool ? showProjects(project, i): hideProjects(project, i));
            });
        showHideBool = !showHideBool;
    });
    // End of Projects Button
    // End of Projects

    // Section 4
     document.querySelectorAll('.service-btn').forEach((service , i) =>{
        service.addEventListener('click', (e) =>{
            e.preventDefault();
            const serviceText = service.nextElementSibling;
            serviceText.classList.toggle('change');
            const rightPosition = serviceText.classList.contains('change') ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})` : 0 ;
            service.firstElementChild.style.right = rightPosition;
            console.log(serviceText.getAttribute('id'));
            if (serviceText.classList.contains('change')){
                switch (serviceText.getAttribute('id') ){
                    case "first": serviceText.style.height = '39rem' ; break;
                    case "second": serviceText.style.height = '32rem'; break;
                }
            } else {
                switch (serviceText.getAttribute('id') ){
                    case "first": serviceText.style.height = '0' ; break;
                    case "second": serviceText.style.height = '0'; break;
                }
            }
        });
     });
    // End of Section 4
    // Section 5
    //  Form
    const formHeading = document.querySelector('.form-heading');
    const formInputs = document.querySelectorAll('.contact-form-input');
    formInputs.forEach((input) => {
        input.addEventListener('focus', () => {
            formHeading.style.opacity = `0`;
            this.setTimeout(() =>{
                formHeading.textContent = `Your ${input.placeholder}`;
                formHeading.style.opacity = 1 ;
            }, 300);
       
        });
    });
    formInputs.forEach((input) => {
        input.addEventListener('blur', () => {
            formHeading.style.opacity = `0`;
            this.setTimeout(() =>{
                formHeading.textContent = `Let's Talk`;
                formHeading.style.opacity = 1 ;
            }, 300);
       
        });
    });
    // End of Form

    // Slideshow
    const slideshow = document.querySelector('.slideshow');
    setInterval(() => {
        const firstIcon = slideshow.firstElementChild;
        firstIcon.classList.add('faded-out');
        const thirdIcon = slideshow.children[3];
        thirdIcon.classList.add('light');
        thirdIcon.previousElementSibling.classList.remove('light')
        setTimeout(()=>{
            slideshow.removeChild(firstIcon);
            slideshow.appendChild(firstIcon);
        setTimeout(() =>{
                firstIcon.classList.remove('faded-out');
            }, 500); 
        }, 500);
      

    }, 3000);
    // End of Slideshow

     // Form validation
     const form = document.querySelector('.contact-form');
     const username = this.document.getElementById("name");
     const email = this.document.getElementById('email');
     const subject = this.document.getElementById('subject');
     const message = this.document.getElementById("message");
     const messages = this.document.querySelectorAll('.message');
     // Function to the error message
     const error = (input, message) => {
         input.nextElementSibling.classList.add('error');
         input.nextElementSibling.textContent = message;
     };
     const success = (input) => {
         input.nextElementSibling.classList.remove('error');
     };
     //Function to check empty fields   
     const checkRequiredFields = (inputArr) => {
         inputArr.forEach( input => {
             if(input.value.trim() === ""){
                 error(input, `${input.id} is required`);
             } 
         });
     };
     // Function length of the fields 
     const checkLength = (input, min) => {
         if(input.value.trim().length < min){
             error(input, `${input.id} must be at least ${min} characters`);
         } else {success(input)};
     };
     // Function to check the truth of email
     const checkEmail = (input) =>{
         const regEx =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if(regEx.test(input.value.trim())){
             success(input);
         } else {
             error(input, "Email is not valid");
         }
     };
 
 
     form.addEventListener('submit',(e) =>{
         checkLength(username, 5);
         checkLength(subject, 5);
         checkLength(message, 20);
         checkEmail(email);
         checkRequiredFields([username,email,subject,message]);
         
         const notValid = Array.from(messages).find((message) =>{ return message.classList.contains('error')});
         notValid && e.preventDefault();
     });
     // End of Form Validation
    // End of Section 5
    } 
    
    
    
    
    
    
    
    else

    {
        
            //Mouse Circle
    const mouseCircle = document.querySelector('.mouse-circle');
    const mouseDot = document.querySelector('.mouse-dot');
    let mouseCircleBool = true ;
    const mouseCircleFn = (x,y) => {
        mouseCircleBool && ( mouseCircle.style.cssText = `top:${y}px;left:${x}px;opacity:1;`);    
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

    let hoveredElPosition = [];
    const stickyElement = (x, y, hoveredEl) => {
    // Sticky Element
    if (hoveredEl.classList.contains('sticky')) {
     hoveredElPosition.length < 1 &&  ( hoveredElPosition = [hoveredEl.offsetTop , hoveredEl.offsetLeft]);
     hoveredEl.style.cssText = `top: ${y}px; left:${x}px`;
   if(
       hoveredEl.offsetTop <= hoveredElPosition[0]- 100 ||
       hoveredEl.offsetTop >= hoveredElPosition[0] + 100 ||
       hoveredEl.offsetLeft <= hoveredElPosition[1] - 100 ||
       hoveredEl.offsetLeft >= hoveredElPosition[1] + 100 
       ){
       hoveredEl.style.cssText = "";
       hoveredElPosition = [];
        }
        hoveredEl.onmouseleave = () =>{
           hoveredEl.style.cssText = "";
           hoveredElPosition = [];
        };
}
// End of Sticky Element
};

    // Mouse Circle Transform
    const mouseCircleTransform = (hoveredEl) =>{
        if (hoveredEl.classList.contains("pointer-enter")){
            hoveredEl.onmousemove = () => {
                mouseCircleBool = false ;
                mouseCircle.style.cssText = `
                width: ${hoveredEl.getBoundingClientRect().width}px;
                height: ${hoveredEl.getBoundingClientRect().height}px;
                top: ${hoveredEl.getBoundingClientRect().top}px;
                left: ${hoveredEl.getBoundingClientRect().left}px;
                opacity: 1;
                transform: translate(0,0);
                animation: none;
                border-radius:${this.getComputedStyle(hoveredEl).borderBottomLeftRadius};
                transition: width .5s, height .5s, top .5s, left .5s, transform .5s, border-radius .5s;
                `;
            };
            hoveredEl.onmouseleave = () => {
                mouseCircleBool = true;
            };
            document.onscroll = () =>{
                if (!mouseCircleBool){
                    mouseCircle.style.top = `${hoveredEl.getBoundingClientRect().top}px`;
                }
            };
        }
    };
    // End of Mouse Circle Transform

    document.body.addEventListener('mousemove', function (e) {
        let x = e.clientX;
        let y = e.clientY;
        mouseCircleFn(x,y);
        animateCircles(e,x,y);
        const hoveredEl = document.elementFromPoint(x,y);
        stickyElement(x, y, hoveredEl);
        mouseCircleTransform(hoveredEl);
          
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
    // Progress Bar
    const sections = document.querySelectorAll('section');
    const progressBar= document.querySelector('.progress-bar');
    const halfCircles = document.querySelectorAll('.half-circle'); 
    const halfCircleTop = document.querySelector('.half-circle-top');
    const progressBarCircle = document.querySelector('.progress-bar-circle');

    let scrolledPortion = 0;
    let scrollBool = false ;
    let imageWrapper = false ; 
    const progressBarFn = (bigImgWrapper) => {
        imageWrapper = bigImgWrapper ;
        let pageHeight = 0; 
        const pageViewportHeight = window.innerHeight; //?????????????? ?? ???????? ????????????

        if(!imageWrapper) {
            pageHeight = document.documentElement.scrollHeight; //???????????? ?????????? ?????????? 
            scrolledPortion = window.pageYOffset;  //?????????????? ?? ?????????????????? ???????????? ???? ??????????
        } else {
            pageHeight = imageWrapper.firstElementChild.scrollHeight; //???????????? ?????????? ?????????? 
            scrolledPortion = imageWrapper.scrollTop;  //?????????????? ?? ?????????????????? ???????????? ???? ??????????
        }


        const scrolledPortionDegree = (scrolledPortion / (pageHeight - pageViewportHeight) ) * 360;
        halfCircles.forEach(el => {
            el.style.transform = `rotate(${scrolledPortionDegree}deg)`;

            if(scrolledPortionDegree >= 180){
                halfCircles[0].style.transform = "rotate(180deg)";
                halfCircleTop.style.opacity = "0";
            } else {
                halfCircleTop.style.opacity = "1";
            }

        });
        //???????????????? ?????? ?? ???????????????? 
        if (bigImgWrapper){
            if (scrolledPortion > 1100){
                scrollBool = true;
            } else {
                scrollBool = false;
            }        
        } else { 
            scrollBool = scrolledPortion + pageViewportHeight == pageHeight;
        };

        scrollBool = scrolledPortion + pageViewportHeight == pageHeight;
        // console.log(scrollBool);
       
    // Arrow Rotation
    if(scrollBool){
        progressBarCircle.style.transform = "rotate(180deg)";
    } else {
        progressBarCircle.style.transform = "rotate(0)";
    }
    // End of Arrow Rotation
    };
    //Progress Bar Click
    progressBar.addEventListener( 'click', (e) => {
    e.preventDefault();
    if(!imageWrapper){
        const sectionPositions = Array.from(sections).map( (section) => scrolledPortion  + section.getBoundingClientRect().top);
        const position = sectionPositions.find((sectionPosition) =>{ return sectionPosition > scrolledPortion });
        scrollBool ? window.scrollTo(0,0) :  window.scrollTo(0 , position);
    } else {
        scrollBool ? imageWrapper.scrollTo(0, 0) : imageWrapper.scrollTo(0, imageWrapper.scrollHeight);
    }

});
// End of Progress Bar Click

    progressBarFn();
    // End of Progress Bar


    // Navigation
    const menuIcon = document.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');
    const scrollFn = () => {
        menuIcon.classList.add('show-menu-icon');
        navbar.classList.add('hide-navbar');
        if (window.scrollY === 0){
            menuIcon.classList.remove('show-menu-icon');
            navbar.classList.remove('hide-navbar');
        }
        progressBarFn();
    };
    document.addEventListener('scroll', scrollFn);

    menuIcon.addEventListener('click', () =>{
        menuIcon.classList.remove('show-menu-icon');
        navbar.classList.remove('hide-navbar');
    });
    // End of Navigation

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

        //Big Project Image
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
                    case 'phone': demo.setAttribute("href", "https://ibiza-create.netlify.app/"); break;
                    case 'consulting': demo.setAttribute("href", "https://sportpit.netlify.app/"); break;
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
           
            document.removeEventListener('scroll', scrollFn);
            
            
            mouseCircle.style.opacity = 0;

    
            progressBarFn(bigImgWrapper);
            bigImgWrapper.onscroll = () => {
                progressBarFn(bigImgWrapper);
            };
            projectHideBtn.classList.add("change");
            demo.classList.add('change');
            projectHideBtn.onclick = () => { 
            projectHideBtn.classList.remove("change");
            demo.classList.remove('change');
            bigImgWrapper.remove();
            document.body.style.overflowY = "scroll";


            document.addEventListener('scroll', scrollFn);
            progressBarFn();
            } ;
        });
        //End of //Big Project

        
        i >=6 && (project.style.cssText = "display:none; opacity: 0 " ) ;
        
    });
    // End of Projects
    // Projects Button
    const section3 = document.querySelector('.section-3');
    const projectsBtn = document.querySelector('.projects-btn');
    const projectsBtnText = document.querySelector('.projects-btn span');
    let showHideBool = true ;

    const showProjects = (project , i) => {
        setTimeout(() =>{
            project.style.display = "flex";
            section3.scrollIntoView({block: "end"});
        }, 600);
        setTimeout(()=>{
            project.style.opacity = "1";
        }, i * 200);
    };

    const hideProjects = (project, i) => {
        setTimeout(() =>{
            project.style.display = "none";
            section3.scrollIntoView({block: "start"});
        },1200);
       setTimeout(() =>{
        project.style.opacity = "0";
       },i * 100);
    };

    projectsBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");
        showHideBool ? ( projectsBtnText.textContent = 'Show Less') : (  projectsBtnText.textContent = 'Show More');
        projects.forEach((project, i) => {
             i >= 6 && ( showHideBool ? showProjects(project, i): hideProjects(project, i));
            });
        showHideBool = !showHideBool;
    });
    // End of Projects Button
    // End of Projects

    // Section 4
     document.querySelectorAll('.service-btn').forEach((service , i) =>{
        service.addEventListener('click', (e) =>{
            e.preventDefault();
            const serviceText = service.nextElementSibling;
            serviceText.classList.toggle('change');
            const rightPosition = serviceText.classList.contains('change') ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})` : 0 ;
            service.firstElementChild.style.right = rightPosition;
            console.log(serviceText.getAttribute('id'));
            if (serviceText.classList.contains('change')){
                switch (serviceText.getAttribute('id') ){
                    case "first": serviceText.style.height = '39rem' ; break;
                    case "second": serviceText.style.height = '32rem'; break;
                }
            } else {
                switch (serviceText.getAttribute('id') ){
                    case "first": serviceText.style.height = '0' ; break;
                    case "second": serviceText.style.height = '0'; break;
                }
            }
        });
     });
    // End of Section 4
    // Section 5
    //  Form
    const formHeading = document.querySelector('.form-heading');
    const formInputs = document.querySelectorAll('.contact-form-input');
    formInputs.forEach((input) => {
        input.addEventListener('focus', () => {
            formHeading.style.opacity = `0`;
            this.setTimeout(() =>{
                formHeading.textContent = `Your ${input.placeholder}`;
                formHeading.style.opacity = 1 ;
            }, 300);
       
        });
    });
    formInputs.forEach((input) => {
        input.addEventListener('blur', () => {
            formHeading.style.opacity = `0`;
            this.setTimeout(() =>{
                formHeading.textContent = `Let's Talk`;
                formHeading.style.opacity = 1 ;
            }, 300);
       
        });
    });
    // End of Form

    // Slideshow
    const slideshow = document.querySelector('.slideshow');
    setInterval(() => {
        const firstIcon = slideshow.firstElementChild;
        firstIcon.classList.add('faded-out');
        const thirdIcon = slideshow.children[3];
        thirdIcon.classList.add('light');
        thirdIcon.previousElementSibling.classList.remove('light')
        setTimeout(()=>{
            slideshow.removeChild(firstIcon);
            slideshow.appendChild(firstIcon);
        setTimeout(() =>{
                firstIcon.classList.remove('faded-out');
            }, 500); 
        }, 500);
      

    }, 3000);
    // End of Slideshow
    // Form validation
    const form = document.querySelector('.contact-form');
    const username = this.document.getElementById("name");
    const email = this.document.getElementById('email');
    const subject = this.document.getElementById('subject');
    const message = this.document.getElementById("message"); 
    const messages = this.document.querySelectorAll('.message');
    // Function to the error message
    const error = (input, message) => {
        input.nextElementSibling.classList.add('error');
        input.nextElementSibling.textContent = message;
    };
    const success = (input) => {
        input.nextElementSibling.classList.remove('error');
    };
    //Function to check empty fields   
    const checkRequiredFields = (inputArr) => {
        inputArr.forEach( input => {
            if(input.value.trim() === ""){
                error(input, `${input.id} is required`);
            } 
        });
    };
    // Function length of the fields 
    const checkLength = (input, min) => {
        if(input.value.trim().length < min){
            error(input, `${input.id} must be at least ${min} characters`);
        } else {success(input) };
    };
    // Function to check the truth of email
    const checkEmail = (input) =>{
        const regEx =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regEx.test(input.value.trim())){
            success(input);
        } else {
            error(input, "Email is not valid");
        }
    };
   

    form.addEventListener('submit',(e) =>{
        checkLength(username, 5);
        checkLength(subject, 5);
        checkLength(message, 20);
        checkEmail(email);
        checkRequiredFields([username,email,subject,message]);
        const notValid = Array.from(messages).find((message) =>{return message.classList.contains('error')});
        notValid && e.preventDefault();
    });
    // End of Form Validation
    // End of Section 5
    }

});