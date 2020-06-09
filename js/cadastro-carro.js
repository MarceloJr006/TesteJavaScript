const nome = document.getElementById('nome')
const especie = document.getElementById('especie')
const raça = document.getElementById('raça')
const formulario = document.getElementById('formulario')
const resposta = document.getElementById('resposta')

let especies = []
let registros = []

carregarEspecies()

carregarRegistros()

formulario.onsubmit = event => {
  event.preventDefault()

  if (!validarRaça() | !validarEspecie() | !validarNome()) return

  const pet = {
    nome: nome.value.trim(),
    especie: especie.value,
    raça: raça.value.trim()
  }

  registros.push(pet)
  localStorage.setItem('pets', JSON.stringify(registros))

  nome.value = ''
  especie.value = ''
  raça.value = ''

  exibirRegistros()
}

function carregarEspecies() {
  especies = [
    { codigo: '1', texto: 'Cachorro' },
    { codigo: '2', texto: 'Gato' },
    { codigo: '3', texto: 'Peixe' },
    { codigo: '4', texto: 'Camaleão' },
    { codigo: '5', texto: 'Outros' }
  ]

  for (let item of especies) {
    const option = document.createElement('option')
    option.value = item.codigo
    option.textContent = item.texto
    especie.append(option)
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
      <th>Espécie</th>
      <th>Raça</th>
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
    td2.textContent = especies.find(
      item => item.codigo === registro.especie
    ).texto
    tr.append(td2)

    const td3 = document.createElement('td')
    td3.textContent = registro.raça
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
    resposta.textContent = 'Campo "Nome" é obrigatório!'
    resposta.className = 'error'
    nome.classList.add('error')
    nome.focus()
    return false
  }

  nome.classList.remove('error')
  return true
}

function validarEspecie() {
  if (!especie.value) {
    resposta.textContent = 'A marca do veiculo é obrigatório!'
    resposta.className = 'error'
    especie.classList.add('error')
    especie.focus()
    return false
  }

  especie.classList.remove('error')
  return true
}

function validarRaça() {
  raça.value = raça.value.trim()

  if (!raça.value) {
    resposta.textContent = 'Campo "Raça" é obrigatório!'
    resposta.className = 'error'
    raça.classList.add('error')
    raça.focus()
    return false
  }

  raça.classList.remove('error')
  return true
}
