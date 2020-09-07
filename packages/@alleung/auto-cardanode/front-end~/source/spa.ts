import { render } from './components/App';

render();

module.hot?.accept('./components/App', () => {
    require('./components/App').render();
});

module.hot?.accept((err) => {
    console.log("reloading self");
    window.location.reload();
});