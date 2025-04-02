/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

/**
 * Portfolio isotope and filter
 */
window.addEventListener('load', () => {
  let portfolioContainer = select('.portfolio-container');
  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      filter: '.filter-images' // Default filter applied to images
    });

    let portfolioFilters = select('#portfolio-flters li', true);

    // Set default active filter class to Images
    portfolioFilters.forEach(function(el) {
      if (el.getAttribute('data-filter') === '.filter-images') {
        el.classList.add('filter-active'); // Add filter-active to Images filter
      } else {
        el.classList.remove('filter-active'); // Remove filter-active from other filters
      }
    });

    on('click', '#portfolio-flters li', function(e) {
      e.preventDefault();
      portfolioFilters.forEach(function(el) {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      portfolioIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
      portfolioIsotope.on('arrangeComplete', function() {
        AOS.refresh();
      });
    }, true);
  }
});

/**
 * Initiate portfolio lightbox
 */
const portfolioLightbox = GLightbox({
  selector: '.portfolio-lightbox'
});

/**
 * Portfolio details slider
 */
new Swiper('.portfolio-details-slider', {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
});

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

// Define an array containing details of each portfolio sample
const portfolioDetails = {
  sample1: {
    title: "Tiara B",
    category: "Web Design",
    client: "Tiara B",
    projectDate: "August 5, 2023",
    Country :"UAE",
    images: [
      "assets/img/portfolio/Tiara_B1.JPG",
      // "assets/img/portfolio/Tiara_B2.JBG",
      // Add more image URLs as needed
    ]
  },
  sample2: {
    title: "Carat Jewellery",
    category: "Social Media",
    client: "Carat Jewellery",
    projectDate: "September 10, 2023",
    Country : "Lebanon",
    images: [
      "assets/img/portfolio/Carat1.JPG",
    ]
    // description: "Details of Sample 2."
  },
  sample3: {
    title: "Crazy Nuts",
    category: "Social Media",
    client: "Crazy Nuts",
    projectDate: "August 18, 2023",
    Country : "Lebanon",
    images: [
      "assets/img/portfolio/Crazynuts2.JPG",
    ]
    // description: "Details of Sample 2."
  },
  sample4: {
    title: "Crazy Nuts",
    category: "Social Media",
    client: "Crazy Nuts",
    projectDate: "July 16, 2023",
    Country: "UAE",
    video: [
      "assets/img/portfolio/Crazyvideo.mp4",
      // "assets/img/portfolio/sample1-image2.jpg",
      // Add more image URLs as needed
    ]
    // description: "Details of Sample 2."
  },
  sample5: {
    title: "D'aqua",
    category: "Social Media",
    client: "D'aqua",
    projectDate: "August 22, 2023",
    Country: "Lebanon",
    video: [
      "assets/img/portfolio/daqua1.mp4",
      // "assets/img/portfolio/sample1-image2.jpg",
      // Add more image URLs as needed
    ]

    // description: "Details of Sample 2."
  },
  sample6: {
    title: "Zeus",
    category: "Social Media",
    client: "Zeus",
    projectDate: "October 25,2023",
    Country: "Lebanon",
    video: [
      "assets/img/portfolio/Zeus Reel 1.mp4",
      // "assets/img/portfolio/sample1-image2.jpg",
      // Add more image URLs as needed
    ]

    // description: "Details of Sample 2."
  },
  sample7: {
    title: "Poule d'or",
    category: "Social Media",
    client: "Poule d'or",
    projectDate: "October 28,2023",
    Country: "Lebanon",
    video: [
      "assets/img/portfolio/Poule d_or 2.mp4",
      // "assets/img/portfolio/sample1-image2.jpg",
      // Add more image URLs as needed
    ]

    // description: "Details of Sample 2."
  },
  sample8: {
    title: "Artmaze",
    category: "Social Media",
    client: "Artmaze",
    projectDate: "November 14,2023",
    Country: "Lebanon",
    video: [
      "assets/img/portfolio/Artmaze 5.mp4",
      // "assets/img/portfolio/sample1-image2.jpg",
      // Add more image URLs as needed
    ]

    // description: "Details of Sample 2."
  },
  sample9: {
    title: "Oakland",
    category: "Social Media",
    client: "Oakland",
    projectDate: "July 12,2023",
    Country: "Lebanon",
    video: [
      "assets/img/portfolio/oakland 1.mp4",
      // "assets/img/portfolio/sample1-image2.jpg",
      // Add more image URLs as needed
    ]

    // description: "Details of Sample 2."
  }
  // Add more samples as needed
};

// Function to extract parameter from URL
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Retrieve the sample ID from the URL
const sampleId = getParameterByName('sample');

// Retrieve the details of the chosen sample
const sampleDetails = portfolioDetails[sampleId];

// Display the details on the page
if (sampleDetails) {
  // Update the title of the selected sample
  const sampleTitleElement = document.getElementById('sample-title');
  if (sampleTitleElement) {
    sampleTitleElement.textContent = sampleDetails.title;
  }

  // Update the list item text
  const sampleTitleLiElement = document.getElementById('sample-title-li');
  if (sampleTitleLiElement) {
    sampleTitleLiElement.textContent = sampleDetails.title;
  }

  // Update other details based on the selected sample
  const portfolioInfoElement = document.querySelector('.portfolio-info ul');
  if (portfolioInfoElement) {
    portfolioInfoElement.innerHTML = `
      <li><strong>Category</strong>: ${sampleDetails.category}</li>
      <li><strong>Client</strong>: ${sampleDetails.client}</li>
      <li><strong>Project date</strong>: ${sampleDetails.projectDate}</li>
      <li><strong>Country</strong>: ${sampleDetails.Country}</li>
    `;
  }

  // const portfolioDescriptionElement = document.querySelector('.portfolio-description');
  // if (portfolioDescriptionElement) {
  //   portfolioDescriptionElement.innerHTML = `
  //     <h2>Project details</h2>
  //     <p>${sampleDetails.details}</p>
  //   `;
  // }

  // Update images
  const swiperWrapperElement = document.querySelector('.swiper-wrapper');
  if (swiperWrapperElement && sampleDetails.images) {
    swiperWrapperElement.innerHTML = '';
    sampleDetails.images.forEach(image => {
      swiperWrapperElement.innerHTML += `
        <div class="swiper-slide">
          <img src="${image}" alt="">
        </div>
      `;
    });
   } else if (sampleDetails.video) {
    console.log(sampleDetails.video);
    sampleDetails.video.forEach(video => {
      swiperWrapperElement.innerHTML += `
        <div class="swiper-slide">
          <video class="img-fluid" controls >
            <source src="${video}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      `;
    });
  }
} else {
  console.error('Sample not found.');
}


