function getGithubData(uri){
	fetch(uri)
		.then(response => {
			return response.json();
		})
		.then(data =>{
			let counter = document.getElementsByClassName("odometer")[0];
			counter.innerHTML = data.public_repos
		})
}

function setOdometerValue(){
	setTimeout(getGithubData('https://api.github.com/users/loghinalexandru'), 1000);
}

window.onload = setOdometerValue();