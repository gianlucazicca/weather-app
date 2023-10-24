/*
onMounted(async () => {
    const container = document.getElementById('container');
    let lastScrollTop = 0;
    container.addEventListener('scroll', () => {
        const currentWeatherContainer = document.getElementById('current-weather');
        const actualStyle = window.getComputedStyle(currentWeatherContainer.children[0]).getPropertyValue('opacity')
        const opacity = parseFloat(actualStyle) * 100

        console.log(container.scrollTop)
        if (container.scrollTop > 20) {
            if (lastScrollTop > container.scrollTop) {
                console.log('scroll up')
                currentWeatherContainer.children[0].style.opacity = (opacity + container.scrollTop) / 100
            } else {
                console.log('scroll down')
                currentWeatherContainer.children[0].style.opacity = (opacity - container.scrollTop) / 100

            }
        }

        lastScrollTop = container.scrollTop;
    });

});
*/
