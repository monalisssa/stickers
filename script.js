const colors =
       {1: '#C3FBD8',
        2: '#F6FFF8',
        3: '#FFFADD',
        4: '#B5F2EA',
        5: '#DEF7FE',
        6: '#C3FBD8',
        7: '#C6D8FF',
        8: '#E7ECFF',
        9: '#FED6BC'}

const designes =
    {1: ['footprints.png', 'Лапки'],
        2: ['hearts.png', "Сердечки"],
        3: ['cat.png', "Котик"],
        4: ['stars.png', "Звёздочки"]}

const positions_of_designs =
    {
        1: ['bottom', "right"],
        2: ['bottom', "left"]}
const openModal = () =>
{
    const modal = document.querySelector('.modal')
    modal.classList.add('visible')
    addColorsToSelect()
    addDesignsToSelect()

}
const closeModal = () =>
{
    const modal = document.querySelector('.modal')
    const textSticker = document.getElementsByName('comment').item(0);
    textSticker.value = ""
    modal.classList.remove('visible')

}
const addSticker = () =>
{

    const main = document.getElementsByTagName('main').item(0);
    main.appendChild(createSticker())

}

const createSticker = () =>
{

    const sticker = document.createElement('div');
    const textBlock = document.createElement('p');
    const textSticker = document.getElementsByName('comment').item(0);
    const deleteButton = document.createElement('img')

    sticker.className = 'sticker'
    sticker.style.backgroundColor = document.getElementsByTagName('select').item(0).value
    sticker.style.transform = `translateY(${randomPosition()}px) rotate(${randomRotate()}deg)`

    deleteButton.className = 'delete-btn'
    deleteButton.src = "../static/delete-icon.png"
    deleteButton.addEventListener('click', function() {
        deleteSticker(sticker);
    });
    sticker.appendChild(deleteButton)

    textBlock.innerText = textSticker.value
    sticker.appendChild(textBlock)

    addDesignToSticker(sticker)

    return sticker

}


const randomRotate = () =>
{
    return (Math.random() - .5) * 10
}

const randomPosition = () =>
{
    return (Math.random() - .5) * 60
}


const deleteSticker = (sticker) =>
{
    const main = document.getElementsByTagName('main').item(0);
    main.removeChild(sticker)
}

const addColorsToSelect = () =>
{
    const select = document.getElementsByTagName('select').item(0)
    const hasElements = Array.from(select.childNodes).some(node => node.nodeType === Node.ELEMENT_NODE);
    select.style.backgroundColor = colors[1]
    if(!(hasElements)) {
        for (let colorsKey in colors) {
            let option = document.createElement('option')
            option.value = colors[colorsKey]
            option.style.backgroundColor = colors[colorsKey]

            select.addEventListener('change', function () {
                select.style.backgroundColor = select.value
            })
            select.appendChild(option)
        }
    }
}

const addDesignsToSelect = () =>
{
    const select = document.getElementsByTagName('select').item(1)
    const hasElements = Array.from(select.childNodes).some(node => node.nodeType === Node.ELEMENT_NODE);
    if(!(hasElements)) {
        for (let designKey in designes) {
            let option = document.createElement('option')
            option.value = `designs/${designes[designKey][0]}`
            option.text = designes[designKey][1]
            select.appendChild(option)
        }
    }

}

const addDesignToSticker = (sticker) => {
    const image = document.createElement('img');
    const select = document.getElementsByTagName('select').item(1);
    image.src = select.value;
    image.className = 'design-image';

    const randomPosition = Math.floor(Math.random() * Object.keys(positions_of_designs).length) + 1;
    const position = positions_of_designs[randomPosition];
    image.style = `${position[0]}: 0; ${position[1]}: 0;`;
    sticker.appendChild(image);
};

