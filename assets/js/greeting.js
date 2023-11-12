// ┌─┐┬─┐┌─┐┌─┐┌┬┐┬┌┐┌┌─┐┌─┐
// │ ┬├┬┘├┤ ├┤  │ │││││ ┬└─┐
// └─┘┴└─└─┘└─┘ ┴ ┴┘└┘└─┘└─┘
// Function to set Greetings
(function() {
    const today = new Date();
    const hour = today.getHours();
    const name = CONFIG.name;

    const greeter = document.getElementById('greetings');

    const cfg = CONFIG.greetings;
    
    let greeting = getGreeting(hour);
    if (cfg.showName) {
        greeting += `,\xa0${name}`;
    }

    greeter.innerText = `${greeting}!`;

    function getGreeting(hour) {
        if (hour >= 23 || hour < 6) {
     	    return cfg.night;
        } else if (hour >= 6 && hour < 12) {
        	return cfg.morning;
        } else if (hour >= 12 && hour < 17) {
        	return cfg.afternoon;
        } else {
        	return cfg.evening;
        }
    }
}());
