(() => {
    function clamp(n, min, max) {
      return Math.max(min, Math.min(max, n));
    }
  
    document.querySelectorAll("[data-carousel]").forEach((root) => {
      const track = root.querySelector("[data-track]");
      const slides = Array.from(root.querySelectorAll(".car-slide"));
      const prevBtn = root.querySelector("[data-prev]");
      const nextBtn = root.querySelector("[data-next]");
      const viewport = root.querySelector("[data-viewport]");
  
      // If any required element is missing, stop gracefully
      if (!track || !viewport || slides.length === 0) return;
  
      let index = 0;
      let startX = 0;
      let currentX = 0;
      let dragging = false;
  
      function update() {
        index = clamp(index, 0, slides.length - 1);
        track.style.transition = "transform 240ms ease";
        track.style.transform = `translateX(${-index * 100}%)`;
  
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === slides.length - 1;
      }
  
      function go(delta) {
        index += delta;
        update();
      }
  
      prevBtn?.addEventListener("click", () => go(-1));
      nextBtn?.addEventListener("click", () => go(1));
  
      viewport.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      });
  
      viewport.addEventListener("pointerdown", (e) => {
        dragging = true;
        startX = e.clientX;
        currentX = startX;
        track.style.transition = "none";
        viewport.setPointerCapture(e.pointerId);
      });
  
      viewport.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        currentX = e.clientX;
        const dx = currentX - startX;
        const pct = (dx / viewport.clientWidth) * 100;
        track.style.transform = `translateX(${(-index * 100) + pct}%)`;
      });
  
      function endDrag() {
        if (!dragging) return;
        dragging = false;
  
        const dx = currentX - startX;
        const threshold = viewport.clientWidth * 0.18;
  
        if (dx > threshold) index -= 1;
        if (dx < -threshold) index += 1;
  
        update();
      }
  
      viewport.addEventListener("pointerup", endDrag);
      viewport.addEventListener("pointercancel", endDrag);
      viewport.addEventListener("lostpointercapture", endDrag);
  
      update();
      window.addEventListener("resize", update);
    });
  })();