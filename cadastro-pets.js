const nome = document.getElementById('nome')
const marca = document.getElementById('marca')
const ano = document.getElementById('ano')
const formulario = document.getElementById('formulario')
const resposta = document.getElementById('resposta')

let marcas = []
let registros = []

carregarmarcas()

carregarRegistros()

formulario.onsubmit = event => {
  event.preventDefault()

  if (!validarAno() | !validarmarca() | !validarNome()) return

  const pet = {
    nome: nome.value.trim(),
    marca: marca.value,
    ano: ano.value.trim()
  }

  registros.push(pet)
  localStorage.setItem('pets', JSON.stringify(registros))

  nome.value = ''
  marca.value = ''
  ano.value = ''

  exibirRegistros()
}

function carregarmarcas() {
  marcas = [
    { codigo: '1', texto: 'Bmw' },
    { codigo: '2', texto: 'Chevrolet' },
    { codigo: '3', texto: 'Ford' },
    { codigo: '4', texto: 'Volkswagen' },
    { codigo: '5', texto: 'Outros' }
  ]

  for (let item of marcas) {
    const option = document.createElement('option')
    option.value = item.codigo
    option.textContent = item.texto
    marca.append(option)
  }
}

function carregarRegistros() {
  registros = JSON.parse(localStorage.getItem('pets')) || []
  exibirRegistros()
}

function exibirRegistros() {
  resposta.textContent = ''
  resposta.className = ''

  if (!registros.length) return

  const table = document.createElement('table')
  table.innerHTML = `
    <tr>
      <th>Nome</th>
      <th>Marca</th>
      <th>Ano</th>
      <th class="actions"></th>
    </tr>`
  resposta.append(table)

  for (let registro of registros) {
    const tr = document.createElement('tr')
    table.append(tr)

    const td1 = document.createElement('td')
    td1.textContent = registro.nome
    tr.append(td1)

    const td2 = document.createElement('td')
    td2.textContent = marcas.find(
      item => item.codigo === registro.marca
    ).texto
    tr.append(td2)

    const td3 = document.createElement('td')
    td3.textContent = registro.ano
    tr.append(td3)

    const td4 = document.createElement('td')
    td4.className = 'actions'
    tr.append(td4)

    const excluir = document.createElement('button')
    td4.append(excluir)
    excluir.textContent = '✖'
    excluir.className = 'delete'

    excluir.onclick = excluirRegistro.bind(this, registro)
  }
}

function excluirRegistro(registro) {
  const i = registros.findIndex(pet => pet === registro)

  if (i > -1) {
    registros.splice(i, 1)
    localStorage.setItem('pets', JSON.stringify(registros))
  }

  exibirRegistros()
}

function validarNome() {
  nome.value = nome.value.trim()

  if (!nome.value) {
    resposta.textContent = 'O nome é obrigatório!'
    resposta.className = 'error'
    nome.classList.add('error')
    nome.focus()
    return false
  }

  nome.classList.remove('error')
  return true
}

function validarmarca() {
  if (!marca.value) {
    resposta.textContent = 'A marca é obrigatório!'
    resposta.className = 'error'
    marca.classList.add('error')
    marca.focus()
    return false
  }

  marca.classList.remove('error')
  return true
}

function validarAno() {
    ano.value = ano.value.trim()

  if (!ano.value) {
    resposta.textContent = 'O ano do veiculo é obrigatório!'
    resposta.className = 'error'
    ano.classList.add('error')
    ano.focus()
    return false
  }

  ano.classList.remove('error')
  return true
}
