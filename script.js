document.addEventListener("DOMContentLoaded", () => {

    /* PRELOADER */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("hide");
        }, 700);
    });


    /* NAVBAR */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* SCROLL PROGRESS */

    const progress = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percentage = (scrollTop / height) * 100;

        progress.style.width = percentage + "%";

    });


    /* MOUSE GLOW */

    const glow = document.getElementById("mouse-glow");

    document.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });


    /* MOBILE MENU */

    const mobileToggle =
        document.getElementById("mobileToggle");

    const navLinks =
        document.getElementById("navLinks");

    mobileToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });

        });


    /* REVEAL ON SCROLL */

    const revealObserver =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    revealObserver.unobserve(entry.target);
                }

            });

        }, {
            threshold:0.12
        });

    document.querySelectorAll(".reveal")
        .forEach(element => {
            revealObserver.observe(element);
        });


    /* ACCORDION */

    document.querySelectorAll(".acc-header")
        .forEach(button => {

            button.addEventListener("click", () => {

                const item =
                    button.parentElement;

                const parent =
                    item.parentElement;

                parent.querySelectorAll(".acc-item")
                    .forEach(other => {

                        if (other !== item) {
                            other.classList.remove("open");
                        }

                    });

                item.classList.toggle("open");

            });

        });


    /* FAQ */

    document.querySelectorAll(".faq-q")
        .forEach(button => {

            button.addEventListener("click", () => {

                const item =
                    button.parentElement;

                document.querySelectorAll(".faq-item")
                    .forEach(other => {

                        if (other !== item) {
                            other.classList.remove("open");
                        }

                    });

                item.classList.toggle("open");

            });

        });


    /* REGULATION TABS */

    const tabs =
        document.querySelectorAll(".reg-tab");

    const contents =
        document.querySelectorAll(".reg-content");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target =
                tab.dataset.tab;

            tabs.forEach(t =>
                t.classList.remove("active")
            );

            contents.forEach(c =>
                c.classList.remove("active")
            );

            tab.classList.add("active");

            document
                .getElementById("reg-" + target)
                .classList.add("active");

        });

    });


    /* REGULATION SEARCH */

    const search =
        document.getElementById("regSearch");

    search.addEventListener("input", () => {

        const value =
            search.value.toLowerCase().trim();

        document.querySelectorAll(".acc-item")
            .forEach(item => {

                const text =
                    item.innerText.toLowerCase();

                if (!value || text.includes(value)) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

    });


    /* SERVER CODE COPY */

    const copyButton =
        document.getElementById("copyCode");

    const serverCode =
        document.getElementById("serverCode");

    const copyMessage =
        document.getElementById("copyMessage");

    copyButton.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                serverCode.textContent.trim()
            );

            copyButton.textContent =
                "COPIATO ✓";

            copyMessage.textContent =
                "Codice copiato negli appunti";

            setTimeout(() => {

                copyButton.textContent =
                    "COPIA CODICE";

                copyMessage.textContent =
                    "Emergency Hamburg";

            }, 2000);

        } catch {

            copyMessage.textContent =
                "Codice: 8yviakxu";

        }

    });


    /* BACK TO TOP */

    const back =
        document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 700) {
            back.classList.add("show");
        } else {
            back.classList.remove("show");
        }

    });

    back.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });


    /* CARD TILT */

    document.querySelectorAll(
        ".feature-card, .server-card, .staff-card"
    ).forEach(card => {

        card.addEventListener("mousemove", e => {

            if (window.innerWidth < 900) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - .5) * -6;

            const rotateY =
                ((x / rect.width) - .5) * 6;

            card.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* PARTICLES */

    const canvas =
        document.getElementById("particles");

    const ctx =
        canvas.getContext("2d");

    let particles = [];

    function resizeCanvas(){

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    for(let i = 0; i < 70; i++){

        particles.push({

            x:Math.random() * window.innerWidth,

            y:Math.random() * window.innerHeight,

            size:Math.random() * 1.8 + .3,

            speed:Math.random() * .35 + .1,

            opacity:Math.random() * .5 + .1

        });

    }

    function animateParticles(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(p => {

            p.y -= p.speed;

            if(p.y < -10){
                p.y = canvas.height + 10;
                p.x = Math.random() * canvas.width;
            }

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255,255,255,${p.opacity})`;

            ctx.fill();

        });

        requestAnimationFrame(
            animateParticles
        );

    }

    animateParticles();


    /* HERO PARALLAX */

    const hero =
        document.querySelector(".hero-content");

    window.addEventListener("scroll", () => {

        if(window.innerWidth < 700) return;

        const scroll =
            window.scrollY;

        if(scroll < window.innerHeight){

            hero.style.transform =
                `translateY(${scroll * .15}px)`;

            hero.style.opacity =
                Math.max(
                    0,
                    1 - scroll / 700
                );

        }

    });

});