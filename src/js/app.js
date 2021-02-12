import '../sass/style.scss';

import '@fortawesome/fontawesome-free/js/all.min';
import 'regenerator-runtime/runtime';

import elements from './modules/elements';
import update from './modules/document';

(() => {
  function run(cityName) {
    update(cityName);
    setInterval(() => update(cityName), (60000 * 10));
  }
  run('homs');

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    run(elements.search.value);
  });
})();
