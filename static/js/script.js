(function ($) {
  "use strict";

  //Hide Loading Box (Preloader)
  function handlePreloader() {
    if ($(".loader-wrap").length) {
      $(".loader-wrap").delay(1000).fadeOut(500);
    }
  }

  if ($(".preloader-close").length) {
    $(".preloader-close").on("click", function () {
      $(".loader-wrap").delay(200).fadeOut(500);
    });
  }

  //Update Header Style and Scroll to Top
  function headerStyle() {
    if ($(".main-header").length) {
      var windowpos = $(window).scrollTop();
      var siteHeader = $(".main-header");
      var scrollLink = $(".scroll-top");
      if (windowpos >= 110) {
        siteHeader.addClass("fixed-header");
        scrollLink.addClass("open");
      } else {
        siteHeader.removeClass("fixed-header");
        scrollLink.removeClass("open");
      }
    }
  }

  headerStyle();

  //Submenu Dropdown Toggle
  if ($(".main-header li.dropdown ul").length) {
    $(".main-header .navigation li.dropdown").append(
      '<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'
    );
  }

  //Mobile Nav Hide Show
  if ($(".mobile-menu").length) {
    $(".mobile-menu .menu-box").mCustomScrollbar();

    var mobileMenuContent = $(".main-header .menu-area .main-menu").html();
    $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);
    $(".sticky-header .main-menu").append(mobileMenuContent);

    //Dropdown Button
    $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
      $(this).toggleClass("open");
      $(this).prev("ul").slideToggle(500);
    });
    //Dropdown Button
    $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
      $(this).prev(".megamenu").slideToggle(900);
    });
    //Menu Toggle Btn
    $(".mobile-nav-toggler").on("click", function () {
      $("body").addClass("mobile-menu-visible");
    });

    //Menu Toggle Btn
    $(".mobile-menu .menu-backdrop,.mobile-menu .close-btn").on(
      "click",
      function () {
        $("body").removeClass("mobile-menu-visible");
      }
    );
  }

  // Scroll to a Specific Div
  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        1000
      );
    });
  }

  // Elements Animation
  if ($(".wow").length) {
    var wow = new WOW({
      mobile: false,
    });
    wow.init();
  }

  //Contact Form Validation
  if ($("#contact-form").length) {
    $("#contact-form").validate({
      rules: {
        username: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        phone: {
          required: true,
        },
        subject: {
          required: true,
        },
        message: {
          required: true,
        },
      },
    });
  }

  //Fact Counter + Text Count
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text(),
          }).animate(
            {
              countNum: n,
            },
            {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              },
            }
          );
        }
      },
      { accY: 0 }
    );
  }

  //LightBox / Fancybox
  if ($(".lightbox-image").length) {
    $(".lightbox-image").fancybox({
      openEffect: "fade",
      closeEffect: "fade",
      helpers: {
        media: {},
      },
    });
  }

  //   // Sayfadaki sekmeli arayüzü kontrol etmek için JavaScript kodu

  //   // Eğer sayfada en az bir "tabs-box" sınıfına sahip bir öğe varsa devam et
  //   if ($(".tabs-box").length) {
  //     // Sekme başlıklarının tıklama olaylarına dinleyici eklenir
  //     $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
  //       // Tıklama olayının varsayılan davranışını engelle
  //       e.preventDefault();

  //       // Tıklanan sekmeye ait hedef içeriği belirle
  //       var target = $($(this).attr("data-tab"));

  //       // Eğer hedef içerik zaten görünür durumdaysa hiçbir şey yapma
  //       if ($(target).is(":visible")) {
  //         return false;
  //       } else {
  //         // Tüm sekmelerin başlıklarından "active-btn" sınıfını kaldır
  //         target
  //           .parents(".tabs-box")
  //           .find(".tab-buttons")
  //           .find(".tab-btn")
  //           .removeClass("active-btn");

  //         // Tıklanan sekmeye "active-btn" sınıfını ekle
  //         $(this).addClass("active-btn");

  //         // Tüm sekmelerin içeriklerini gizle
  //         target
  //           .parents(".tabs-box")
  //           .find(".tabs-content")
  //           .find(".tab")
  //           .fadeOut(0);

  //         // Tüm sekmelerin içeriklerinden "active-tab" sınıfını kaldır
  //         target
  //           .parents(".tabs-box")
  //           .find(".tabs-content")
  //           .find(".tab")
  //           .removeClass("active-tab");

  //         // Seçilen sekmeye ait içeriği görünür kıl
  //         $(target).fadeIn(100);

  //         // Seçilen sekmeye "active-tab" sınıfını ekle
  //         $(target).addClass("active-tab");
  //       }
  //     });
  //   }

  //Accordion Box
  if ($(".accordion-box").length) {
    $(".accordion-box").on("click", ".acc-btn", function () {
      var outerBox = $(this).parents(".accordion-box");
      var target = $(this).parents(".accordion");

      if ($(this).hasClass("active") !== true) {
        $(outerBox).find(".accordion .acc-btn").removeClass("active");
      }

      if ($(this).next(".acc-content").is(":visible")) {
        return false;
      } else {
        $(this).addClass("active");
        $(outerBox).children(".accordion").removeClass("active-block");
        $(outerBox).find(".accordion").children(".acc-content").slideUp(300);
        target.addClass("active-block");
        $(this).next(".acc-content").slideDown(300);
      }
    });
  }

  // banner-carousel
  if ($(".banner-carousel").length) {
    $(".banner-carousel").owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      active: true,
      smartSpeed: 1000,
      autoplay: 6000,
      navText: [
        '<span class="fal fa-angle-left"></span>',
        '<span class="fal fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        800: {
          items: 1,
        },
        1024: {
          items: 1,
        },
      },
    });
  }

  // single-item-carousel
  if ($(".single-item-carousel").length) {
    $(".single-item-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoplay: 1000,
      navText: [
        '<span class="fal fa-angle-left"></span>',
        '<span class="fal fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 1,
        },
        600: {
          items: 1,
        },
        800: {
          items: 1,
        },
        1200: {
          items: 1,
        },
      },
    });
  }

  // two-item-carousel
  if ($(".two-item-carousel").length) {
    $(".two-item-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoplay: 1000,
      navText: [
        '<span class="fal fa-angle-left"></span>',
        '<span class="fal fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 1,
        },
        600: {
          items: 1,
        },
        800: {
          items: 2,
        },
        1200: {
          items: 2,
        },
      },
    });
  }

  // three-item-carousel
  if ($(".three-item-carousel").length) {
    $(".three-item-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoplay: 1000,
      navText: [
        '<span class="fal fa-angle-left"></span>',
        '<span class="fal fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 1,
        },
        600: {
          items: 2,
        },
        800: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });
  }

  // four-item-carousel
  if ($(".four-item-carousel").length) {
    $(".four-item-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoplay: 1000,
      navText: [
        '<span class="fal fa-angle-left"></span>',
        '<span class="fal fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 1,
        },
        600: {
          items: 2,
        },
        800: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
  }

  // five-item-carousel
  if ($(".five-item-carousel").length) {
    $(".five-item-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoplay: 1000,
      navText: [
        '<span class="fal fa-angle-left"></span>',
        '<span class="fal fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 2,
        },
        600: {
          items: 3,
        },
        800: {
          items: 4,
        },
        1200: {
          items: 5,
        },
      },
    });
  }

  // project-carousel
  if ($(".project-carousel").length) {
    $(".project-carousel").owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      smartSpeed: 500,
      autoplay: 1000,
      navText: [
        '<span class="fal fa-angle-left"></span>',
        '<span class="fal fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 1,
        },
        600: {
          items: 2,
        },
        800: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
  }

  // project-carousel-2
  if ($(".project-carousel-2").length) {
    $(".project-carousel-2").owlCarousel({
      loop: true,
      margin: 50,
      nav: true,
      smartSpeed: 500,
      autoplay: 1000,
      navText: [
        '<span class="fal fa-angle-left"></span>',
        '<span class="fal fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 1,
        },
        600: {
          items: 1,
        },
        800: {
          items: 1,
        },
        1200: {
          items: 1,
        },
      },
    });
  }

  if ($(".theme_carousel").length) {
    $(".theme_carousel").each(function (index) {
      var $owlAttr = {},
        $extraAttr = $(this).data("options");
      $.extend($owlAttr, $extraAttr);
      $(this).owlCarousel($owlAttr);
    });
  }

  //Add One Page nav
  if ($(".scroll-nav").length) {
    $(".scroll-nav").onePageNav();
  }

  //Sortable Masonary with Filters
  function enableMasonry() {
    if ($(".sortable-masonry").length) {
      var winDow = $(window);
      // Needed variables
      var $container = $(".sortable-masonry .items-container");
      var $filter = $(".filter-btns");

      $container.isotope({
        filter: "*",
        masonry: {
          columnWidth: ".masonry-item.small-column",
        },
        animationOptions: {
          duration: 500,
          easing: "linear",
        },
      });

      // Isotope Filter
      $filter.find("li").on("click", function () {
        var selector = $(this).attr("data-filter");

        try {
          $container.isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false,
            },
          });
        } catch (err) {}
        return false;
      });

      winDow.on("resize", function () {
        var selector = $filter.find("li.active").attr("data-filter");

        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false,
          },
        });
      });

      var filterItemA = $(".filter-btns li");

      filterItemA.on("click", function () {
        var $this = $(this);
        if (!$this.hasClass("active")) {
          filterItemA.removeClass("active");
          $this.addClass("active");
        }
      });
    }
  }

  enableMasonry();

  //Price Range Slider
  if ($(".price-range-slider").length) {
    $(".price-range-slider").slider({
      range: true,
      min: 120,
      max: 500,
      values: [120, 300],
      slide: function (event, ui) {
        $("input.property-amount").val(ui.values[0] + " - " + ui.values[1]);
      },
    });

    $("input.property-amount").val(
      $(".price-range-slider").slider("values", 0) +
        " - $" +
        $(".price-range-slider").slider("values", 1)
    );
  }

  // Progress Bar
  if ($(".count-bar").length) {
    $(".count-bar").appear(
      function () {
        var el = $(this);
        var percent = el.data("percent");
        $(el).css("width", percent).addClass("counted");
      },
      { accY: -50 }
    );
  }

  // page direction
  function directionswitch() {
    if ($(".page_direction").length) {
      $(".direction_switch button").on("click", function () {
        $("body").toggleClass(function () {
          return $(this).is(".rtl, .ltr") ? "rtl ltr" : "rtl";
        });
      });
    }
  }

  //Search Popup
  if ($("#search-popup").length) {
    //Show Popup
    $(".search-toggler").on("click", function () {
      $("#search-popup").addClass("popup-visible");
    });
    $(document).keydown(function (e) {
      if (e.keyCode === 27) {
        $("#search-popup").removeClass("popup-visible");
      }
    });
    //Hide Popup
    $(".close-search,.search-popup .overlay-layer").on("click", function () {
      $("#search-popup").removeClass("popup-visible");
    });
  }

  //nice select
  $(document).ready(function () {
    $("select:not(.ignore)").niceSelect();
  });

  //Jquery Spinner / Quantity Spinner
  if ($(".quantity-spinner").length) {
    $("input.quantity-spinner").TouchSpin({
      verticalbuttons: true,
    });
  }

  // Date picker
  function datepicker() {
    if ($("#datepicker").length) {
      $("#datepicker").datepicker();
    }
  }

  /* 9. ScrollAnimations */
  var $containers = $(
    "[data-animation]:not([data-animation-text]), [data-animation-box]"
  );
  $containers.scrollAnimations();

  // Scroll top button
  $(".scroll-top-inner").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });

  function handleScrollbar() {
    const bHeight = $("body").height();
    const scrolled = $(window).innerHeight() + $(window).scrollTop();

    let percentage = (scrolled / bHeight) * 100;

    if (percentage > 100) percentage = 100;

    $(".scroll-top-inner .bar-inner").css("width", percentage + "%");
  }

  if ($(".timer").length) {
    $(function () {
      $("[data-countdown]").each(function () {
        var $this = $(this),
          finalDate = $(this).data("countdown");
        $this.countdown(finalDate, function (event) {
          $this.html(event.strftime("%D days %H:%M:%S"));
        });
      });
    });

    $(".cs-countdown")
      .countdown("")
      .on("update.countdown", function (event) {
        var $this = $(this).html(
          event.strftime(
            '<div class="count-col"><span>%D</span><h6>days</h6></div> <div class="count-col"><span>%H</span><h6>Hours</h6></div> <div class="count-col"><span>%M</span><h6>Mins</h6></div> <div class="count-col"><span>%S</span><h6>Secs</h6></div>'
          )
        );
      });
  }

  /*	=========================================================================
	When document is Scrollig, do
	========================================================================== */

  jQuery(document).on("ready", function () {
    (function ($) {
      // add your functions
      directionswitch();
      datepicker();
    })(jQuery);
  });

  /* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */

  $(window).on("scroll", function () {
    headerStyle();
    handleScrollbar();
    if ($(window).scrollTop() > 200) {
      $(".scroll-top-inner").addClass("visible");
    } else {
      $(".scroll-top-inner").removeClass("visible");
    }
  });

  /* ==========================================================================
   When document is loaded, do
   ========================================================================== */

  $(window).on("load", function () {
    handlePreloader();
    enableMasonry();
  });
})(window.jQuery);

//Devam Et Buton Fonksiyon
let ac = false;
let ac1 = false;
let ac2 = false;

function toggleContent() {
  const content = document.getElementById("tab-11");
  const content2 = document.getElementById("tab-12");
  const content3 = document.getElementById("tab-1");
  const content4 = document.getElementById("tab-2");
  ac = !ac;

  if (ac) {
    content.classList.remove("active-btn");
    content2.classList.add("active-btn");
    content3.classList.remove("active-tab");
    content4.classList.add("active-tab");
  }
  ac = !ac;
}

function toggleContent2() {
  const content = document.getElementById("tab-12");
  const content2 = document.getElementById("tab-13");
  const content3 = document.getElementById("tab-2");
  const content4 = document.getElementById("tab-3");
  ac1 = !ac1;

  if (ac1) {
    content.classList.remove("active-btn");
    content2.classList.add("active-btn");
    content3.classList.remove("active-tab");
    content4.classList.add("active-tab");
  }
  ac1 = !ac1;
}

function toggleContent3() {
  const content = document.getElementById("tab-13");
  const content2 = document.getElementById("tab-11");
  const content3 = document.getElementById("tab-3");
  const content4 = document.getElementById("tab-1");
  ac2 = !ac2;

  if (ac2) {
    content.classList.remove("active-btn");
    content2.classList.add("active-btn");
    content3.classList.remove("active-tab");
    content4.classList.add("active-tab");
  }
  ac2 = !ac2;
}

let aclogin = false;

function toggleLogin() {
  const content = document.getElementById("login");
  const content2 = document.getElementById("signin");
  aclogin = !aclogin;

  if (aclogin) {
    content.classList.remove("kapat");
    content.classList.add("form-holder");
    content2.classList.remove("form-holder");
    content2.classList.add("kapat");
  }
  aclogin = !aclogin;
}

let acsignin = false;

function toggleSignin() {
  const content = document.getElementById("login");
  const content2 = document.getElementById("signin");
  acsignin = !acsignin;

  if (acsignin) {
    content.classList.remove("form-holder");
    content.classList.add("kapat");
    content2.classList.remove("kapat");
    content2.classList.add("form-holder");
  }
  acsignin = !acsignin;
}

// isletme okul ev secim
let acisletme = false;

function toggleIsletme() {
  const uyetip = document.getElementById("uyetip");
  const isletme = document.getElementById("isletme");
  acisletme = !acisletme;

  if (acisletme) {
    uyetip.classList.remove("uyetip");
    uyetip.classList.add("kapat");
    isletme.classList.remove("kapat");
    isletme.classList.add("form-content");
  }
  acisletme = !acisletme;
}

let acokul = false;

function toggleOkul() {
  const uyetip = document.getElementById("uyetip");
  const okul = document.getElementById("okul");
  acokul = !acokul;

  if (acokul) {
    uyetip.classList.remove("uyetip");
    uyetip.classList.add("kapat");
    okul.classList.remove("kapat");
    okul.classList.add("form-content");
  }
  acokul = !acokul;
}

let acev = false;

function toggleEv() {
  const uyetip = document.getElementById("uyetip");
  const ev = document.getElementById("ev");
  acev = !acev;

  if (acev) {
    uyetip.classList.remove("uyetip");
    uyetip.classList.add("kapat");
    ev.classList.remove("kapat");
    ev.classList.add("form-content");
  }
  acev = !acev;
}

let geriislet = false;

function geriisletme() {
  const uyetip = document.getElementById("uyetip");
  const isletme = document.getElementById("isletme");
  geriislet = !geriislet;

  if (geriislet) {
    uyetip.classList.remove("kapat");
    uyetip.classList.add("uyetip");
    isletme.classList.remove("form-content");
    isletme.classList.add("kapat");
  }
  geriislet = !geriislet;
}

let geriok = false;

function geriokul() {
  const uyetip = document.getElementById("uyetip");
  const okul = document.getElementById("okul");
  geriok = !geriok;

  if (geriok) {
    uyetip.classList.remove("kapat");
    uyetip.classList.add("uyetip");
    okul.classList.remove("form-content");
    okul.classList.add("kapat");
  }
  geriok = !geriok;
}

let gerie = false;

function geriev() {
  const uyetip = document.getElementById("uyetip");
  const ev = document.getElementById("ev");
  gerie = !gerie;

  if (gerie) {
    uyetip.classList.remove("kapat");
    uyetip.classList.add("uyetip");
    ev.classList.remove("form-content");
    ev.classList.add("kapat");
  }
  gerie = !gerie;
}

function submitForm(formId) {
  var form = document.getElementById(formId);

  var ad = form.querySelector('[name="ad"]').value;
  var soyad = form.querySelector('[name="soyad"]').value;
  var mail = form.querySelector('[name="mail"]').value;
  var telefon = form.querySelector('[name="telefon"]').value;
  var adres = form.querySelector('[name="adres"]').value;
  var sifre = form.querySelector('[name="sifre"]').value;
  var kt = form.querySelector('[name="kt"]').value;
  var rol = form.querySelector('[name="rol"]').value;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/submit_user", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          // Kullanıcıyı loginsign.html sayfasına yönlendir
          window.location.href = '/loginSign.html';
      }
  };

  var data = "ad=" + encodeURIComponent(ad) + "&soyad=" + encodeURIComponent(soyad) + 
             "&mail=" + encodeURIComponent(mail) + "&telefon=" + encodeURIComponent(telefon) +
             "&adres=" + encodeURIComponent(adres) + "&sifre=" + encodeURIComponent(sifre) +
             "&kt=" + encodeURIComponent(kt) + "&rol=" + encodeURIComponent(rol); 
  xhr.send(data);
}


var powerState = false; // Başlangıçta priz kapalı

function togglePower() {
  powerState = !powerState;

  fetch('/toggle-power', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state: powerState ? 1 : 0 }),
  })
  .then(response => response.json())
  .then(data => {
    console.log("Sunucu yanıtı:", data);  // Sunucudan gelen yanıtı logla
    var powerStatus = document.getElementById('powerStatus');
    powerStatus.textContent = data.power ? 'Priz Açık' : 'Priz Kapalı';
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


/*Logout*/
// Logout butonuna tıklanınca oturumu kapatma işlemi
function logout() {
  // Tarayıcıda JavaScript ile bir HTTP isteği göndererek oturumu kapatma işlemi
  fetch('/logout', { method: 'GET' })
      .then(response => {
          if (response.redirected) {
              // Oturum kapatma işlemi başarılı olduysa yönlendirilen sayfaya git
              window.location.href = response.url;
          }
      })
      .catch(error => console.error('Oturum kapatma hatası:', error));
}

// Logout fonksiyonunu butona tıklanınca çağır
document.getElementById('logoutButton').addEventListener('click', logout);


/***********************************************************CİHAZ*****************************************************************/

function addProduct(element) {
  if (!chosenHouseId) {
    showMessage('Lütfen ev seçiniz', 'warning');
    setTimeout(function() {
      document.getElementById('message-container3').style.display = 'none';
    }, 3000); // 3 saniye sonra uyarıyı kaldır
    return;
  }

  var widgetBox = $(element).closest('.widgetBox');
  var productName = widgetBox.find('.textWidget').text().trim().split('\n')[0];
  
  // Cihaz adına göre seri numarasını belirle
  var serialNumberMapping = {
    'Cihaz 1': '1',
    'Cihaz 2': '2',
    'Cihaz 3': '3',
    'Cihaz 4': '4'
  };
  var serialNumber = serialNumberMapping[productName] || '0'; // Bilinmeyen cihazlar için varsayılan

  var formData = {
    'ProductName': productName,
    'SerialNumber': serialNumber,
    'chosenHouseId': chosenHouseId
  };

  $.ajax({
    url: '/add-product',
    type: 'POST',
    data: formData,
    success: function(response) {
      showMessage('Ürün başarıyla eklendi.', 'success');
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    },
    error: function(xhr) {
      var response = JSON.parse(xhr.responseText);
      var message = xhr.status == 409 ? response.message : 'Ürün eklenemedi: ' + response.message;
      showMessage(message, 'danger');
    }
  });
}

function toggleImageForButtonCihaz() {
  var items = document.getElementsByClassName('scrollItemUrun');
  for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('selectedcihaz');
  }

  var buttonItems = document.getElementsByClassName('scrollItemUruncihazlar1');
  for (var j = 0; j < buttonItems.length; j++) {
      if (buttonItems[j].style.display === 'block') {
          buttonItems[j].style.display = 'none';
      } else {
          buttonItems[j].style.display = 'block';
      }
  }
}

function selectCihaz(button) {
  var scrollItemCihaz = button.closest('.scrollItemCihaz');
  if (!scrollItemCihaz) {
      console.error('ScrollItemCihaz elementi bulunamadı.');
      return;
  }

  // Seri numarasını al
  var serinoElements = scrollItemCihaz.getElementsByClassName('kurkulad');
  if (serinoElements.length < 2) {
      console.error('Seri numarası elementi bulunamadı.');
      return;
  }
  var serino = serinoElements[1].innerText;

  $.ajax({
      url: '/delete-product',
      type: 'POST',
      data: { 'SerialNumber': serino },
      success: function(response) {
          showMessage('Cihaz başarıyla silindi.', 'success');
          setTimeout(function() {
              window.location.reload();
          }, 1000);
      },
      error: function(xhr) {
          var message = 'Cihaz silinemedi: ' + xhr.responseText;
          showMessage(message, 'danger');
      }
  });
}



function showMessage(message, type) {
  var messageContainer = document.getElementById('message-container3');
  messageContainer.innerHTML = '<div class="alert alert-' + type + '">' + message + '</div>';
  messageContainer.style.display = 'block';
}


/*****************************************************EV*************************************************************/
var selectedImageId = null; // Seçilen evin resminin ID'sini tutmak için değişken

function selectHouse(event, houseName, imageId, houseId) {
  event.preventDefault();

  var image = document.getElementById(imageId);
  var selectedHouseDiv = document.getElementById("selectedHouse");
  var secilenEvIdInput = document.getElementById("secilenEvId");

  var evSecildi = false;

  if (imageId === selectedImageId) {
    // Mevcut seçimi kaldır
    image.src = "../static/images/icons/select1.png";
    selectedHouseDiv.textContent = "";
    selectedImageId = null;
    secilenEvIdInput.value = "";
    document.getElementById('kullaniciListesi').innerHTML = "";
  } else {
    // Yeni bir ev seç
    if (selectedImageId) {
      var previousImage = document.getElementById(selectedImageId);
      previousImage.src = "../static/images/icons/select1.png";
    }
    
    image.src = "../static/images/icons/select.png";
    selectedHouseDiv.textContent = "Seçilen Ev: " + houseName;
    selectedImageId = imageId;
    secilenEvIdInput.value = houseId;

    evSecildi = true;  // Yeni bir ev seçildiğini işaret et
  }

  // Yeni bir ev seçildiyse, kullanıcı listesini güncelle
  if (evSecildi) {
    $.ajax({
      type: "POST",
      url: "/listele_kullanicilar", // Kullanıcıları listeleme endpoint'i
      data: { secilenEvId: houseId }, // Gönderilecek data
      dataType: "html", // Yanıt tipi HTML olacak
      success: function(response) {
        // Kullanıcı listesi div'ini sunucudan gelen yanıt ile güncelle
        console.log(response); // Log the HTML response to console to check its content
        document.getElementById('kullaniciListesi').innerHTML = response;
      },
      error: function(error) {
        // Hata durumunda konsola hata mesajını yaz
        console.error("Hata oluştu: ", error);
      }
    });
  }
}

// function kullaniciEkleOnSubmit() {
//   var secilenEvId = document.getElementById('secilenEvId').value;
  
//   if (secilenEvId === "") {
//     alert("Ev seçiniz");
//     return false; // Formun gönderilmesini engelleyin
//   }
  
//   // Eğer secilenEvId dolu ise formu gönder
//   return true;
// }

var isCustomImageActive = false; // Özel resim modunun durumunu takip etmek için

function toggleImageForButton1() {
  var image = document.getElementById('myImageee');
  var buttons = document.querySelectorAll('.scrollItemUrun21');

  // Resmi değiştir
  if (image.src.includes('select1white.png')) {
    image.src = '../static/images/icons/selectwhite.png';
  } else {
    image.src = '../static/images/icons/select1white.png';
  }

  // Butonların davranışını değiştir
  buttons.forEach(function(button) {
    var imgElement = button.querySelector('img');

    if (!isCustomImageActive) {
      // Özel resim modunu etkinleştir
      imgElement.src = '../static/images/icons/delete.png'; // Özel resminizi buraya ekleyin
      button.onclick = function(event) {
        event.preventDefault(); // Orjinal selectHouse fonksiyonunun çalışmasını engelle
      
        var houseId = this.getAttribute('data-house-id');
      
        $.ajax({
          type: "POST",
          url: "/ev_sil/" + houseId,
          success: function(response) {
              // Mesajı sayfada göster
              var messageDiv = document.getElementById('message-container'); // Mesajların gösterileceği div'in ID'si
              var newMessage = '<div class="alert alert-warning">' + response.message + '</div>';
              messageDiv.innerHTML = newMessage;

              // Birkaç saniye bekle ve sonra sayfayı yenile
              setTimeout(function() {
                location.reload();
              }, 1000); // 3 saniye sonra sayfayı yeniler
          },
          error: function(xhr, status, error) {
              // Hata mesajını göster
              var messageDiv = document.getElementById('message-container');
              var errorMessage = '<div class="alert alert-danger">Bir hata oluştu.</div>';
              messageDiv.innerHTML = errorMessage;

              // Birkaç saniye bekle ve sonra sayfayı yenile
              setTimeout(function() {
                location.reload();
              }, 1000); // 3 saniye sonra sayfayı yeniler
          }
        });
      };
    } else {
      // Özel resim modunu devre dışı bırak
      imgElement.src = '../static/images/icons/select1.png'; // Orjinal resme geri dön
      // selectHouse fonksiyonunu orijinal parametreler ile geri yükle
      button.onclick = function(event) {
        var houseName = button.getAttribute('data-house-name');
        var imageId = button.getAttribute('data-image-id');
        var houseId = button.getAttribute('data-house-id');
        selectHouse(event, houseName, imageId, houseId);
      };
    }
  });

  isCustomImageActive = !isCustomImageActive; // Modun durumunu değiştir
}


function toggleImageForButton2() {
  var image = document.getElementById('myImagee');
  if (image.src.includes('select1white.png')) {
      image.src = '../static/images/icons/selectwhite.png';
      showOrHideButtons(true); // Butonları göster
  } else {
      image.src = '../static/images/icons/select1white.png';
      showOrHideButtons(false); // Butonları gizle
  }
}

function showOrHideButtons(show) {
  var buttons = document.getElementsByClassName('scrollItemUrun24');
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.display = show ? 'block' : 'none'; // Butonları göster veya gizle
  }
}

function silKullanici(userId) {
  Swal.fire({
    title: 'Emin misiniz?',
    text: "Bu kullanıcıyı silmek istediğinizden emin misiniz?",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonClass: 'swal2-cancel',
    confirmButtonColor: '#6bc531',
    cancelButtonColor: '#ef0307',
    confirmButtonText: 'Evet, Sil!',
    cancelButtonText: 'Hayır, Silme!' // Bu satırı değiştirin
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/kullanici_sil/' + userId,
        method: 'POST',
        success: function(response) {
          var messageDiv = document.getElementById('message-container');
          var newMessage = '<div class="alert alert-success">' + response.message + '</div>';
          messageDiv.innerHTML = newMessage;

          setTimeout(function() {
              location.reload();
          }, 1000);
        },
        error: function(error) {
          var messageDiv = document.getElementById('message-container');
          var errorMessage = '<div class="alert alert-danger">Kullanıcı silinirken bir hata oluştu!</div>';
          messageDiv.innerHTML = errorMessage;

          setTimeout(function() {
              location.reload();
          }, 1000);
        }
      });
    }
  })
}

/***********************************************************KURUM**********************************************************/

var isCustomImageActive1 = false; // Özel resim modunun durumunu takip etmek için

function toggleImageForButtonKurum() {
  var image = document.getElementById('myImagekurum');
  var buttons = document.querySelectorAll('.scrollItemUrunkurumlar1');

  // Resmi değiştir
  if (image.src.includes('select1white.png')) {
    image.src = '../static/images/icons/selectwhite.png';
  } else {
    image.src = '../static/images/icons/select1white.png';
  }

  // Butonların davranışını değiştir
  buttons.forEach(function(button) {
    var imgElement = button.querySelector('img');

    if (!isCustomImageActive1) {
      // Özel resim modunu etkinleştir
      imgElement.src = '../static/images/icons/delete.png'; // Özel resminizi buraya ekleyin
      button.onclick = function(event) {
        event.preventDefault(); // Orjinal selectHouse fonksiyonunun çalışmasını engelle
      
        var HouseId = this.getAttribute('data-house-id');
      
        $.ajax({
          type: "POST",
          url: "/kurum_sil/" + HouseId,
          success: function(response) {
              // Mesajı sayfada göster
              var messageDiv = document.getElementById('message-container1'); // Mesajların gösterileceği div'in ID'si
              var newMessage = '<div class="alert alert-warning">' + response.message + '</div>';
              messageDiv.innerHTML = newMessage;

              // Birkaç saniye bekle ve sonra sayfayı yenile
              setTimeout(function() {
                location.reload();
              }, 1000); // 3 saniye sonra sayfayı yeniler
          },
          error: function(xhr, status, error) {
              // Hata mesajını göster
              var messageDiv = document.getElementById('message-container1');
              var errorMessage = '<div class="alert alert-danger">Bir hata oluştu.</div>';
              messageDiv.innerHTML = errorMessage;

              // Birkaç saniye bekle ve sonra sayfayı yenile
              setTimeout(function() {
                location.reload();
              }, 1000); // 3 saniye sonra sayfayı yeniler
          }
        });
      };
    } else {
      // Özel resim modunu devre dışı bırak
      imgElement.src = '../static/images/icons/select1.png'; // Orjinal resme geri dön
      // selectHouse fonksiyonunu orijinal parametreler ile geri yükle
      button.onclick = function(event) {
        var houseName = button.getAttribute('data-house-name');
        var imageId = button.getAttribute('data-image-id');
        var houseId = button.getAttribute('data-house-id');
        selectKurum(event, houseName, imageId, houseId);
      };
    }
  });

  isCustomImageActive1 = !isCustomImageActive1; // Modun durumunu değiştir
}

var selectedImageId1 = null; // Seçilen evin resminin ID'sini tutmak için değişken

function selectKurum(event, houseName, imageId, houseId) {
  event.preventDefault();

  var image = document.getElementById(imageId);
  var selectedHouseDiv = document.getElementById("selectedKurum");
  var secilenEvIdInput = document.getElementById("secilenKurumId");

  var evSecildi = false;

  if (imageId === selectedImageId1) {
    // Mevcut seçimi kaldır
    image.src = "../static/images/icons/select1.png";
    selectedHouseDiv.textContent = "";
    selectedImageId1 = null;
    secilenEvIdInput.value = "";
    document.getElementById('kullaniciListesi1').innerHTML = "";
  } else {
    // Yeni bir ev seç
    if (selectedImageId1) {
      var previousImage = document.getElementById(selectedImageId1);
      previousImage.src = "../static/images/icons/select1.png";
    }
    
    image.src = "../static/images/icons/select.png";
    selectedHouseDiv.textContent = "Seçilen Kurum: " + houseName;
    selectedImageId1 = imageId;
    secilenEvIdInput.value = houseId;

    evSecildi = true;  // Yeni bir ev seçildiğini işaret et
  }

  // Yeni bir ev seçildiyse, kullanıcı listesini güncelle
  if (evSecildi) {
    $.ajax({
      type: "POST",
      url: "/listele_kullanicilar1", // Kullanıcıları listeleme endpoint'i
      data: { secilenKurumId: houseId }, // Gönderilecek data
      dataType: "html", // Yanıt tipi HTML olacak
      success: function(response) {
        // Kullanıcı listesi div'ini sunucudan gelen yanıt ile güncelle
        console.log(response); // Log the HTML response to console to check its content
        document.getElementById('kullaniciListesi1').innerHTML = response;
      },
      error: function(error) {
        // Hata durumunda konsola hata mesajını yaz
        console.error("Hata oluştu: ", error);
      }
    });
  }
}

function toggleImageForButtonKurum1() {
  var image = document.getElementById('myImagekurum1');
  var items = document.getElementsByClassName('scrollItemUrunkurum');

  if (image.src.includes('select1white.png')) {
      image.src = '../static/images/icons/selectwhite.png';
      showOrHideButtons1(true); // Butonları göster
      for (var i = 0; i < items.length; i++) {
          items[i].classList.add('selectedkurum'); // 'selected' class'ını ekle
      }
  } else {
      image.src = '../static/images/icons/select1white.png';
      showOrHideButtons1(false); // Butonları gizle
      for (var i = 0; i < items.length; i++) {
          items[i].classList.remove('selectedkurum'); // 'selected' class'ını kaldır
      }
  }
}

function showOrHideButtons1(show) {
  var buttons = document.getElementsByClassName('scrollItemUrunkurums1');
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.display = show ? 'block' : 'none'; // Butonları göster veya gizle
  }
}

function silKullanici1(userId) {
  Swal.fire({
    title: 'Emin misiniz?',
    text: "Bu kullanıcıyı silmek istediğinizden emin misiniz?",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonClass: 'swal2-cancel',
    confirmButtonColor: '#6bc531',
    cancelButtonColor: '#ef0307',
    confirmButtonText: 'Evet, Sil!',
    cancelButtonText: 'Hayır, Silme!' // Bu satırı değiştirin
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/kullanici_sil1/' + userId,
        method: 'POST',
        success: function(response) {
          var messageDiv = document.getElementById('message-container1');
          var newMessage = '<div class="alert alert-success">' + response.message + '</div>';
          messageDiv.innerHTML = newMessage;

          setTimeout(function() {
              location.reload();
          }, 1000);
        },
        error: function(error) {
          var messageDiv = document.getElementById('message-container1');
          var errorMessage = '<div class="alert alert-danger">Kullanıcı silinirken bir hata oluştu!</div>';
          messageDiv.innerHTML = errorMessage;

          setTimeout(function() {
              location.reload();
          }, 1000);
        }
      });
    }
  })
}

/**************************************************OKUL*******************************************/

var isCustomImageActive2 = false; // Özel resim modunun durumunu takip etmek için

function toggleImageForButtonOkul() {
  var image = document.getElementById('myImageokul');
  var buttons = document.querySelectorAll('.scrollItemUrunokullar1');

  // Resmi değiştir
  if (image.src.includes('select1white.png')) {
    image.src = '../static/images/icons/selectwhite.png';
  } else {
    image.src = '../static/images/icons/select1white.png';
  }

  // Butonların davranışını değiştir
  buttons.forEach(function(button) {
    var imgElement = button.querySelector('img');

    if (!isCustomImageActive2) {
      // Özel resim modunu etkinleştir
      imgElement.src = '../static/images/icons/delete.png'; // Özel resminizi buraya ekleyin
      button.onclick = function(event) {
        event.preventDefault(); // Orjinal selectHouse fonksiyonunun çalışmasını engelle
      
        var HouseId = this.getAttribute('data-house-id');
      
        $.ajax({
          type: "POST",
          url: "/okul_sil/" + HouseId,
          success: function(response) {
              // Mesajı sayfada göster
              var messageDiv = document.getElementById('message-container2'); // Mesajların gösterileceği div'in ID'si
              var newMessage = '<div class="alert alert-warning">' + response.message + '</div>';
              messageDiv.innerHTML = newMessage;

              // Birkaç saniye bekle ve sonra sayfayı yenile
              setTimeout(function() {
                location.reload();
              }, 1000); // 3 saniye sonra sayfayı yeniler
          },
          error: function(xhr, status, error) {
              // Hata mesajını göster
              var messageDiv = document.getElementById('message-container2');
              var errorMessage = '<div class="alert alert-danger">Bir hata oluştu.</div>';
              messageDiv.innerHTML = errorMessage;

              // Birkaç saniye bekle ve sonra sayfayı yenile
              setTimeout(function() {
                location.reload();
              }, 1000); // 3 saniye sonra sayfayı yeniler
          }
        });
      };
    } else {
      // Özel resim modunu devre dışı bırak
      imgElement.src = '../static/images/icons/select1.png'; // Orjinal resme geri dön
      // selectHouse fonksiyonunu orijinal parametreler ile geri yükle
      button.onclick = function(event) {
        var houseName = button.getAttribute('data-house-name');
        var imageId = button.getAttribute('data-image-id');
        var houseId = button.getAttribute('data-house-id');
        selectOkul(event, houseName, imageId, houseId);
      };
    }
  });

  isCustomImageActive2 = !isCustomImageActive2; // Modun durumunu değiştir
}

var selectedImageId2 = null; // Seçilen evin resminin ID'sini tutmak için değişken

function selectOkul(event, houseName, imageId, houseId) {
  event.preventDefault();

  var image = document.getElementById(imageId);
  var selectedHouseDiv = document.getElementById("selectedOkul");
  var secilenEvIdInput = document.getElementById("secilenOkulId");

  var evSecildi = false;

  if (imageId === selectedImageId2) {
    // Mevcut seçimi kaldır
    image.src = "../static/images/icons/select1.png";
    selectedHouseDiv.textContent = "";
    selectedImageId2 = null;
    secilenEvIdInput.value = "";
    document.getElementById('kullaniciListesi2').innerHTML = "";
  } else {
    // Yeni bir ev seç
    if (selectedImageId2) {
      var previousImage = document.getElementById(selectedImageId2);
      previousImage.src = "../static/images/icons/select1.png";
    }
    
    image.src = "../static/images/icons/select.png";
    selectedHouseDiv.textContent = "Seçilen Okul: " + houseName;
    selectedImageId2 = imageId;
    secilenEvIdInput.value = houseId;

    evSecildi = true;  // Yeni bir ev seçildiğini işaret et
  }

  // Yeni bir ev seçildiyse, kullanıcı listesini güncelle
  if (evSecildi) {
    $.ajax({
      type: "POST",
      url: "/listele_kullanicilar2", // Kullanıcıları listeleme endpoint'i
      data: { secilenOkulId: houseId }, // Gönderilecek data
      dataType: "html", // Yanıt tipi HTML olacak
      success: function(response) {
        // Kullanıcı listesi div'ini sunucudan gelen yanıt ile güncelle
        console.log(response); // Log the HTML response to console to check its content
        document.getElementById('kullaniciListesi2').innerHTML = response;
      },
      error: function(error) {
        // Hata durumunda konsola hata mesajını yaz
        console.error("Hata oluştu: ", error);
      }
    });
  }
}

function toggleImageForButtonOkul1() {
  var image = document.getElementById('myImageokul1');
  var items = document.getElementsByClassName('scrollItemUrunokul');

  if (image.src.includes('select1white.png')) {
      image.src = '../static/images/icons/selectwhite.png';
      showOrHideButtons2(true); // Butonları göster
      for (var i = 0; i < items.length; i++) {
          items[i].classList.add('selectedokul'); // 'selected' class'ını ekle
      }
  } else {
      image.src = '../static/images/icons/select1white.png';
      showOrHideButtons2(false); // Butonları gizle
      for (var i = 0; i < items.length; i++) {
          items[i].classList.remove('selectedokul'); // 'selected' class'ını kaldır
      }
  }
}

function showOrHideButtons2(show) {
  var buttons = document.getElementsByClassName('scrollItemUrunokuls1');
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.display = show ? 'block' : 'none'; // Butonları göster veya gizle
  }
}

function silKullanici2(userId) {
  Swal.fire({
    title: 'Emin misiniz?',
    text: "Bu kullanıcıyı silmek istediğinizden emin misiniz?",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonClass: 'swal2-cancel',
    confirmButtonColor: '#6bc531',
    cancelButtonColor: '#ef0307',
    confirmButtonText: 'Evet, Sil!',
    cancelButtonText: 'Hayır, Silme!' // Bu satırı değiştirin
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/kullanici_sil2/' + userId,
        method: 'POST',
        success: function(response) {
          var messageDiv = document.getElementById('message-container2');
          var newMessage = '<div class="alert alert-success">' + response.message + '</div>';
          messageDiv.innerHTML = newMessage;

          setTimeout(function() {
              location.reload();
          }, 1000);
        },
        error: function(error) {
          var messageDiv = document.getElementById('message-container2');
          var errorMessage = '<div class="alert alert-danger">Kullanıcı silinirken bir hata oluştu!</div>';
          messageDiv.innerHTML = errorMessage;

          setTimeout(function() {
              location.reload();
          }, 1000);
        }
      });
    }
  })
}

// /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
// function toggleDropdown() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     for (var i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }

var chosenHouseId; // Seçilen evin ID'sini saklamak için

function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function updateButtonLabel(event, houseId, houseName) {
  document.getElementById("houseSelectButton").textContent = houseName; // Buton üzerindeki metni güncelle
  chosenHouseId = houseId; // Seçilen evin ID'sini sakla

  // Dropdown'ı kapat
  var dropdowns = document.getElementsByClassName("dropdown-contenta");
  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}

// Dışarıya tıklandığında dropdown'ı kapat
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-contenta");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}




/******************************************************************CONTROL******************************************************/

function myFunction() {
  document.getElementById("myDropdown5").classList.toggle("show");
}

function updateButtonLabel2(event, houseId, houseAd) {
  document.getElementById("dropdownButton").innerText = houseAd; // Dropdown metnini günceller
  closeDropdowns(); // Dropdown menüsünü kapat
  // Burada evin ID'si ile ilgili diğer işlemleri yapabilirsiniz
}

function closeDropdowns() {
  var dropdowns = document.getElementsByClassName("dropdown-content5");
  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}

// Dropdown dışında bir yere tıklanırsa, menüyü kapat
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn5')) {
    closeDropdowns();
  }
}



function myFunction1() {
  document.getElementById("myDropdown6").classList.toggle("show");
}

function updateButtonLabel3(event, houseId, houseAd) {
  document.getElementById("dropdownButton2").innerText = houseAd; // Dropdown metnini günceller
  closeDropdowns(); // Dropdown menüsünü kapat
  // Burada evin ID'si ile ilgili diğer işlemleri yapabilirsiniz
}

function closeDropdowns2() {
  var dropdowns = document.getElementsByClassName("dropdown-content6");
  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}

// Dropdown dışında bir yere tıklanırsa, menüyü kapat
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn6')) {
    closeDropdowns();
  }
}


// Global değişken olarak seçilen evin ID'sini saklayın
var selectedHouseId5 = null;

function updateButtonLabel2(event, houseId, houseAd) {
  selectedHouseId5 = houseId; // Seçilen evin ID'sini sakla
  document.getElementById("dropdownButton").innerText = houseAd;
  closeDropdowns();

  // Seçilen ev ID'si ile kullanıcıları yükle
  loadUsersForHouse(selectedHouseId5);
}

function loadUsersForHouse(houseId) {
  fetch('/get_users/' + houseId)
    .then(response => response.json())
    .then(users => {
      var userDropdown = document.getElementById("myDropdown6");
      userDropdown.innerHTML = ''; // Önceki kullanıcıları temizle

      users.forEach(function(user) {
        var span = document.createElement('span');
        span.className = 'dropbtna1';
        span.innerText = user.ad;
        span.onclick = function() { updateButtonLabel3(user.id, user.ad); };  // Tıklama olayı ekleme
        userDropdown.appendChild(span);
      });
    });
}

function updateButtonLabel3(userId, userAd) {
  document.getElementById("dropdownButton2").innerText = userAd; // Dropdown metnini günceller
  closeDropdowns2(); // Dropdown menüsünü kapat
  // Burada kullanıcının ID'si ile ilgili diğer işlemleri yapabilirsiniz
  // Örneğin, seçilen kullanıcının ID'sini saklamak için bir kod ekleyebilirsiniz
}
