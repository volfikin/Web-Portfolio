(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
  
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "80px 0px -10% 0px" // helps with your fixed nav
    });
  
    els.forEach((el) => io.observe(el));
  })();