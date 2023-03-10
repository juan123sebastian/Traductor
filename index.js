const idiomaDesde = document.getElementById('desde')
const idiomaHasta = document.getElementById('hasta')

const textoDesde = document.getElementById('desdeTexto')
const hastaTexto = document.getElementById('hastaTexto')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '36da985f0bmsh1dfd70afbf899dcp1b558ejsnc51a4984864b',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};



fetch('https://text-translator2.p.rapidapi.com/getLanguages', options)
	.then(response => response.json())
	.then(response => response.data.languages.forEach(idioma => {
		idiomaDesde.innerHTML += `<option value=${idioma.code} >${idioma.name} </option>`;
		idiomaHasta.innerHTML += `<option value=${idioma.code} >${idioma.name} </option>`;
	}) )
	.catch(err => console.error(err));

 



//traducir
let anteriorTexto = ''
function rectificar() {
    if (anteriorTexto != textoDesde.value){
        anteriorTexto = textoDesde.value;
        traducir()
    }
}

setInterval(rectificar, 500);

function traducir() {
	const idiomaDesdeValor = idiomaDesde.value
	const idiomaHastaValor = idiomaHasta.value
	const traducirValor = textoDesde.value


	if(idiomaDesdeValor != "" && idiomaHastaValor !="" && traducirValor != ""){
		const encodedParams = new URLSearchParams();
		encodedParams.append("source_language", idiomaDesdeValor);
		encodedParams.append("target_language", idiomaHastaValor);
		encodedParams.append("text", traducirValor);

		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-RapidAPI-Key': '36da985f0bmsh1dfd70afbf899dcp1b558ejsnc51a4984864b',
				'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
			},
			body: encodedParams
		};



		fetch('https://text-translator2.p.rapidapi.com/translate', options)
			.then(response => response.json())
			.then(response =>  hastaTexto.innerText = response.data.translatedText)
			.catch(err => console.error(err));
	}

	

	
}



