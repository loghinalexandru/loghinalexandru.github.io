function getGithubData(uri){
	fetch(uri)
		.then(response => {
			return response.json();
		})
		.then(data =>{
			console.log(data.public_repos);
		})
}

window.onload = () => {
	getGithubData('https://api.github.com/users/loghinalexandru');
}

