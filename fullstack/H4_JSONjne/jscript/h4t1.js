async function getHouses() {
    let url = 'talotiedot.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } 
    catch (error) {
        console.log(error);
    }
};

async function renderHouses() {
    let houses = await getHouses();
    console.log(houses);

    let housediv = document.getElementById("houses");

    houses.forEach(house => {

        housecontainer = document.createElement('div');
        housecontainer.className = 'houseContainer';

        let image = document.createElement('img');
        image.src = house.image;
        image.className = 'houseImage';

        let header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = house.address;

        let size = document.createElement('p');
        size.innerHTML = house.size + " m2";

        let text = document.createElement('p');
        text.className = 'text';
        text.innerHTML = house.text;

        let price = document.createElement('p');
        transformed_price = new Intl.NumberFormat('fi-FI').format(house.price);
        price.innerHTML = transformed_price + " euroa";

        housecontainer.appendChild(image);
        housecontainer.appendChild(header);
        housecontainer.appendChild(size);
        housecontainer.appendChild(text);
        housecontainer.appendChild(price);

        housediv.appendChild(housecontainer); 
    });    
}

