// Abstract toggles. Without JavaScript every abstract simply shows in full.
//  - Featured paper (job market paper): shows 3 lines + "Read more".
//  - Numbered papers: abstract hidden; an [Abstract] link is added to the link row.
(function () {
  var hash = window.location.hash.slice(1);

  document.querySelectorAll(".abstract").forEach(function (el, i) {
    var paper = el.closest(".paper");
    var startOpen = !!(paper && paper.id && paper.id === hash);
    var compact = !!el.closest(".numbered");
    if (!el.id) el.id = "abstract-" + (i + 1);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-controls", el.id);

    function set(open) {
      if (compact) {
        el.hidden = !open;
      } else {
        el.classList.toggle("clamped", !open);
        btn.textContent = open ? "Show less" : "Read more";
      }
      btn.setAttribute("aria-expanded", String(open));
    }

    if (compact) {
      btn.className = "toggle";
      btn.textContent = "Abstract";
      var links = paper.querySelector(".links");
      if (!links) {
        links = document.createElement("div");
        links.className = "links";
        el.before(links);
      }
      links.prepend(btn);
      btn.addEventListener("click", function () { set(el.hidden); });
    } else {
      btn.className = "abstract-toggle";
      el.after(btn);
      btn.addEventListener("click", function () { set(el.classList.contains("clamped")); });
    }
    set(startOpen);
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
