document.addEventListener('DOMContentLoaded', () => {
    
// 1. Настоящий Глитч-эффект логотипа
    const logo = document.getElementById('glitch-logo');
    if (logo) {
        const glitchImages = [
            'images/x1.jpg', 
            'images/x2.jpg', 
            'images/x3.jpg', 
            'images/x4.jpg', 
            'images/x5.jpg'
        ];
        
        let currentIdx = 0;

        function triggerGlitch() {
            // Быстрое дерганое переключение кадров (эффект поломки)
            setTimeout(() => logo.src = glitchImages[(currentIdx + 1) % glitchImages.length], 40);
            setTimeout(() => logo.src = glitchImages[(currentIdx + 2) % glitchImages.length], 90);
            setTimeout(() => logo.src = glitchImages[(currentIdx + 3) % glitchImages.length], 150);
            
            // Фиксируем следующий основной кадр
            currentIdx = (currentIdx + 1) % glitchImages.length;
            setTimeout(() => logo.src = glitchImages[currentIdx], 220);
        }

        // Логотип спокойно висит 3-4 секунды, а потом делает резкий глитч
        setInterval(() => {
            triggerGlitch();
        }, 3500);
    }

    // 2. Умная анимация появления при скролле (Intersection Observer)
    const elementsToAnimate = document.querySelectorAll('.section-title, .direction-card, .tech-card, .stat-item, .about-content, .about-image');
    
    // Автоматически добавляем класс для подготовки к анимации
    elementsToAnimate.forEach(el => el.classList.add('fade-up'));

    const observerOptions = {
        threshold: 0.1, // Анимация срабатывает, когда видно 10% блока
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Запускаем CSS-анимацию
                entry.target.classList.add('visible');
                // Отключаем слежку, чтобы анимация была только 1 раз
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Подключаем Observer ко всем элементам
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 3. Инициализация слайдера для кейсов
    if (typeof Swiper !== 'undefined') {
        const casesSwiper = new Swiper('.casesSwiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 0,
                stretch: -20,
                depth: 100,
                modifier: 2,
                slideShadows: true,
            },
            navigation: {
                nextEl: '.swiper-button-next.custom-next',
                prevEl: '.swiper-button-prev.custom-prev',
            },
            loop: true,
        });
    }

    // 4. Попап для кейсов (Модальное окно)
    const caseSlides = document.querySelectorAll('.case-slide');
    const popup = document.getElementById('casePopup');
    const closePopupBtn = document.getElementById('closePopup');
    const popupImg = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupText = document.getElementById('popupText');

    if (popup) {
        // Открытие
        caseSlides.forEach(slide => {
            slide.addEventListener('click', () => {
                popupTitle.textContent = slide.getAttribute('data-title');
                popupText.textContent = slide.getAttribute('data-text');
                popupImg.src = slide.querySelector('img').src;
                popup.classList.add('active');
            });
        });

        // Закрытие по крестику
        closePopupBtn.addEventListener('click', () => popup.classList.remove('active'));
        
        // Закрытие по клику вне окна
        popup.addEventListener('click', (e) => {
            if (e.target === popup) popup.classList.remove('active');
        });
    }

    // Попап «Заказать мерч» (Есть идея?)
    const orderBtn = document.querySelector('.dock-bar .btn-pink');
    const orderPopup = document.getElementById('orderPopup');
    const closeOrderBtn = document.getElementById('closeOrderPopup');

    if (orderBtn && orderPopup) {
        orderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            orderPopup.classList.add('active');
        });

        if (closeOrderBtn) {
            closeOrderBtn.addEventListener('click', () => {
                orderPopup.classList.remove('active');
            });
        }

        orderPopup.addEventListener('click', (e) => {
            if (e.target === orderPopup) {
                orderPopup.classList.remove('active');
            }
        });
    }

    // Автоматическая привязка предлогов (неразрывный пробел после слов из 1-2 букв)
document.querySelectorAll('p, h1, h2, h3, h4, .stat-text').forEach(el => {
    el.innerHTML = el.innerHTML.replace(/(^|\s)([а-яА-Яa-zA-Z]{1,2})\s+/g, '$1$2&nbsp;');
});

// 5. Мобильное меню (бургер в док-баре)
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            burgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Закрываем меню при клике на любую ссылку внутри него
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Закрываем меню при клике в любое место вне меню
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
                burgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // 6. Переворот карточек «Направления» по тапу на телефоне
    document.querySelectorAll('.direction-card').forEach(card => {
        card.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                card.classList.toggle('mobile-flipped');
            }
        });
    });
});