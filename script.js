document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  // Scroll-spy: highlight the nav link for the section in view
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = Array.prototype.map.call(navLinks, function (a) {
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = '#' + entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // Order form -> WhatsApp handoff
  var form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var spice = document.getElementById('spice').value;
      var qty = document.getElementById('qty').value || '1';
      var notes = document.getElementById('notes').value.trim();

      var msg = "Assalamualaikum, I'd like to order from Zaiqa.\n" +
        "Name: " + (name || '-') + "\n" +
        "Spice: " + spice + "\n" +
        "Quantity: " + qty + " x 200g\n" +
        (notes ? "Notes: " + notes : "");

      var url = "https://wa.me/923043012790?text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
    });
  }
});
