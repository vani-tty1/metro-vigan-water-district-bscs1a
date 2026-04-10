//joshua luzano is gay

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(36, 39, 58, 0.92)'; 
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
            } else {
              header.style.background = '#24273a'; 
              header.style.backdropFilter = 'none';
              header.style.boxShadow = 'none';
            }
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    const track = document.getElementById('track');
    const dots = document.querySelectorAll('.carousel-dot');
    const items = document.querySelectorAll('.screenshot-item'); 
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    
    let current = 0;
    const totalSlides = items.length;

    function goTo(idx) {
        if (totalSlides === 0) return;
        
        current = (idx + totalSlides) % totalSlides;
        
        if (track) {
            track.style.transform = `translateX(calc(-${current * 100}% - ${current * 20}px))`;
        }
        
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goTo(i));
    });

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    let timer = setInterval(() => goTo(current + 1), 4500);
    if (track && track.parentElement) {
        track.parentElement.addEventListener('mouseenter', () => clearInterval(timer));
        track.parentElement.addEventListener('mouseleave', () => {
            clearInterval(timer);
            timer = setInterval(() => goTo(current + 1), 4500);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.feature-card, .install-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity .4s ${i * 60}ms, transform .4s ${i * 60}ms`;
      observer.observe(el);
    });
});