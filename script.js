const nome = document.getElementById('name');
const aniversario = document.getElementById('birth-date');
const bt = document.querySelector('.botao');
const avisoNome = document.getElementById('aviso-nome');
const avisoData = document.getElementById('aviso-data');
const tabela = document.querySelector('.container-info');
const btEditarNome = document.getElementById('editar-nome');
const btEditarData = document.getElementById('editar-data');

let selectedRow = 0;

window.addEventListener('load', () => {
    for(let i =0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const valor = localStorage.getItem(key);
        const [nome, data] = valor.split('|');
        guardarInfo(nome, data);
    }
});


function guardarInfo(nome, aniversario){
    const tr = document.createElement("tr");
    let tdNome = document.createElement("td");
    let tdData = document.createElement("td");
    tdNome.innerHTML = nome;
    tdData.innerHTML = aniversario;
    tabela.appendChild(tr);
    tr.appendChild(tdNome);
    tr.appendChild(tdData);
}

btEditarNome.addEventListener('click', () => {
    if (selectedRow) {
        const oldName = selectedRow.cells[0].innerHTML;
        const newName = nome.value;
        const date = selectedRow.cells[1].innerHTML;

        if (localStorage.getItem(oldName)) {
            localStorage.removeItem(oldName);
            localStorage.setItem(newName, `${newName}|${date}`);
        }

    }
});

btEditarData.addEventListener('click', () => {
    if (selectedRow) {
        const name = selectedRow.cells[0].innerHTML;
        const newDate = aniversario.value;

        if (localStorage.getItem(name)) {
            localStorage.setItem(name, `${name}|${newDate}`);
        }

        selectedRow.cells[1].innerHTML = newDate;
    }
});

bt.addEventListener('click', (evento) => {
    evento.preventDefault();
    let valorNome = nome.value;
    let valorAniversario = aniversario.value;
    let arrayNome = valorNome.split('');

    if (!valorNome || arrayNome.length < 3 || arrayNome.length > 180 ) {
        avisoNome.innerHTML = 'esse campo precisa ser preenchido com no minimo 3 caracteres e no maximo 180 e apenas letras';
        return false;
    }
    else if(!valorAniversario){
        avisoData.innerHTML = 'esse campo esta vazio';
    }
    else{
        avisoNome.innerHTML = '';
        avisoData.innerHTML = '';
        localStorage.setItem(valorNome, `${valorNome}|${valorAniversario}`);
        guardarInfo(valorNome, valorAniversario);
    }
});
