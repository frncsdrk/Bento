// Search
// Functions to setup Search widget
(function() {
    const searchBlock  = document.querySelector('.searchBlock');
    const inputElement = document.querySelector('.searchInput');
    
    const cfg = CONFIG.search;
    
    if (cfg.enabled) {
        createEventListeners();
        searchBlock.classList.remove('hide');
    }
    
    function createEventListeners() {
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13) {
                document.location.href = `${cfg.queryUrl}${encodeURIComponent(inputElement.value)}`;
            }
        });
    }
}());
