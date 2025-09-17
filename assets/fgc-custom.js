  $(document).ready(function () {
    //custom position ymq app
    // let moved = false;
    // const interval = setInterval(function () {
    //   const $options = $('#ymq-box .fgc-custom-ymq-1');
    //   const $target = $('#tab-2');

    //   if (!moved && $options.length > 0 && $target.length > 0) {
    //     $options.insertAfter($target);
    //     moved = true;
    //   }
    // }, 300);

    // setTimeout(() => clearInterval(interval), 5000);

    $('#AddToCart').insertAfter('.product-meta__price-list-container');

    setTimeout(function () {
      $('.contact-us-text').insertAfter('#AddToCart');
    }, 300);
    // end custom position ymq app

    // move 
     setTimeout(function () {
    $('.fgc-custom-ymq-variants').insertBefore('.fgc-custom-system-position');
     }, 300);
    
    // Underline effect for the menu.
    function applyUnderlineEffect() {
      $('.mm-title').each(function () {
        if ($(this).find('.underline-effect').length === 0) {
          $(this).append('<div class="underline-effect"></div>');
        }
      });
    }

    setTimeout(applyUnderlineEffect, 500);

    $(document).on('mouseenter', '.mm-title', function () {
      if ($(this).find('.underline-effect').length === 0) {
        $(this).append('<div class="underline-effect"></div>');
      }
      $(this).find('.underline-effect').css('transform', 'scaleX(1)');
    });

    $(document).on('mouseleave', '.mm-title', function () {
      $(this).find('.underline-effect').css('transform', 'scaleX(0)');
    });

    //source code for update price on the sticky footer
    // Function to get the current price HTML from the main price area
    function getCurrentPriceHtml() {
      // Replace '.price.price--large' with the correct selector for your main price area
      var mainPrice = $('.product-meta__price-list-container .price.price--large').html();
      return mainPrice ? mainPrice : '';
    }
  
    // Function to update the sticky price
    function updateStickyPrice() {
      var $stickyPrice = $('#fgc__sticky-price');
      if ($stickyPrice.length) {
        $stickyPrice.html(getCurrentPriceHtml());
      }
    }
  
    // Listen for changes on variant/option selectors
    $(document).on('change', 'select, input', function(e) {
      setTimeout(updateStickyPrice, 200); // Wait for the app to update the main price before getting it
    });
  
    // Initial update when the page loads
    updateStickyPrice();
    //end source code for update price on the sticky footer

    //custom text for ymq app
    setTimeout(function () {
    const labelMap = {
      'Colour Case': 'Colour Case',
      // 'Storage': 'Add Storage',
      'CPU': 'Change CPU',
      'GPU': 'Change GPU',
      'PSU': 'Change PSU',
      'RAM': 'Change RAM'
    };

    $('.fgc-custom-ymq-1 .ymq_lable').each(function () {
      const currentText = $(this).text().trim();
      if (labelMap[currentText]) {
        $(this).text(labelMap[currentText]);
      }
    });
  }, 100); // delay wait ymq app render

    setTimeout(function () {
    const labelMap = {
      // 'Storage Display': 'Storage ',
      'GPU Display': 'GPU',
      'CPU Intel': 'CPU',
      'CPU AMD': 'CPU',
      'Motherboard Display': 'Motherboard',
      'RAM Display': 'RAM',
      'PSU Display': 'PSU',
    };

    $('.fgc-custom-ymq-2 .ymq_lable').each(function () {
      const currentText = $(this).text().trim();
      if (labelMap[currentText]) {
        $(this).text(labelMap[currentText]);
      }
    });
  }, 100); // delay wait ymq app render
    //end custom text for ymq app
    
  setTimeout(function () {
        if ($('.fgc-custom-ymq-variants').length > 0) {
      setTimeout(function () {
        $('.fgc-custom__separation').insertBefore('.fgc-custom-ymq-variants').show();
      }, 300);
    } else {
      $('.fgc-custom__separation').hide();
    }
  },100);
    
  });

  document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="https://evolvegamingpc.com.au/collections/"]');

    links.forEach(link => {
      link.removeAttribute('target');
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = link.href;
      });
    });
  });

  
//update compare-at-price
let lastTotal = null;

function moneyFormat(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

function getBaseCompareValue() {
  const baseEl =
    document.querySelector('.fgc-custom-compare-price') ||
    document.querySelector('.fgc-custom-compare-price-mobile');
  if (!baseEl) return null;
  return parseFloat((baseEl.textContent || '').replace(/[^0-9.]/g, '')) || 0;
}

function getYmqOptionTotal() {
  const optionEls = document.querySelectorAll('.ymq-option-addon-price .ymq-price-span');
  let total = 0;
  optionEls.forEach(el => {
    const v =
      parseFloat(el.getAttribute('data-ymq-money')) ||
      parseFloat((el.textContent || '').replace(/[^0-9.]/g, '')) ||
      0;
    total += v;
  });
  return total;
}

function updateFgcCompare() {
  const baseValue = getBaseCompareValue();
  if (baseValue === null) return;

  const optionTotal = getYmqOptionTotal();
  const newTotal = baseValue + optionTotal;

  if (newTotal !== lastTotal) {
    lastTotal = newTotal;

    document.querySelectorAll('.fgc-add-new-compare-price, .fgc-add-new-compare-price-mobile')
      .forEach(t => (t.textContent = moneyFormat(newTotal)));
  }
}

updateFgcCompare();
setInterval(updateFgcCompare, 200);

//end update compare-at-price


