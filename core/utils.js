$(document).ready(function () {
    $.getJSON("https://zelflor.fr/core/current-version.json")
      .done(function (data) {
        if (data.version) {
          $("#current-gblade-v").text("v " + data.version);
        } else {
          console.warn("Version' key not found in JSON.");
        }
      })
      .fail(function (jqxhr, textStatus, error) {
        console.error("Error loading version :", textStatus, error);
      });
  });

  document.addEventListener('wheel', function(e) {
    let el = e.target;

    while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowX = style.overflowX;
        const overflowY = style.overflowY;

        const hasHorizontalScroll = el.scrollWidth > el.clientWidth;
        const hasVerticalScroll = el.scrollHeight > el.clientHeight;

        if (
            hasHorizontalScroll &&
            !hasVerticalScroll &&
            (overflowX === 'auto' || overflowX === 'scroll') &&
            (overflowY !== 'scroll' && overflowY !== 'auto')
        ) {
            e.preventDefault();

            el.scrollLeft += e.deltaY * 3;
            return;
        }

        el = el.parentElement;
    }
}, { passive: false });




function initThemeModule() {
  document.body.id = getPreferredColorScheme();
}

function getPreferredColorScheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
}

initThemeModule();