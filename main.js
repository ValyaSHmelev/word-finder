let result = shuffle(glossary)

function renderList() {
    const list = document.createElement('ul');

    let count = 0;
    for (const word of result) {
        if (count >= 10) {
            break;
        }

        const listItem = document.createElement('li');
        listItem.textContent = word;
        list.appendChild(listItem);

        count++;
    }

    document.getElementById('count').innerText = result.length
    const resultList = document.getElementById('result-list');
    resultList.innerHTML = '';
    resultList.appendChild(list);
}

renderList()

function search() {
    try {
        result = shuffle(glossary)
        const mask = document.getElementById('mask').value || ''
        const letterHas = document.getElementById('letter-has').value || ''
        const letterHasnt = document.getElementById('letter-hasnt').value || ''

        if (mask) {
            result = result.filter(word => {
                if (word.length != mask.length) return false
                for (let i = 0; i < word.length; i++) {
                    if (mask[i] != '*' && word[i] != mask[i]) return false
                }
                return true
            })
        }

        if (letterHas) {
            result = result.filter(word => letterHas.split('').every(letter => word.includes(letter)))
        }

        if (letterHasnt) {
            result = result.filter(word => !letterHasnt.split('').some(letter => word.includes(letter)))
        }

        renderList()

    } catch (error) {
        alert(error.message)
        console.error(error)
    }

}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', search);
});

//---------------------------------------------------------------------//

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}