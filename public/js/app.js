const address = document.getElementById('address');
const form = document.querySelector('form');
const result = document.querySelector('h3');

const getAddress = () => {

    result.innerText = 'Loading...';

    fetch(`/weather?address=${address.value}`)
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            result.innerText = data.error;
        } else {
            result.innerHTML = `Forecast for: <i>${data.location}</i>. <br> <br>${data.forecast}`;
        }
    })

    address.value = '';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getAddress();
})