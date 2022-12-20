
/**
 * Lazy load a script
 * @param {any} src the script source ex: https://cdn.ckeditor.com/4.11.2/standard-all/ckeditor.js
 * @param {any} existsFunction function to check if script is loaded already ex: () => window['CKEDITOR']
 */
 window.injectScript = (src, existsFunction) => {
    function ready(fn) {
        if (document.readyState !== 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    return new Promise((resolve, _) => {
        ready(() => {
            existsFunction = existsFunction || (() => false);
            if (existsFunction()) {
                resolve(true);
            } else {
                ready(() => {
                    let script = document.createElement('script');
                    script.src = src;

                    document.body.appendChild(script);
                    script.addEventListener('load', resolve);
                });
            }
        });
    });
}