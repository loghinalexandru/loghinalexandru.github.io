let caption = document.getElementById("githubCaption");

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

window.odometerOptions = {
	auto: false,
	duration: 3000,
};

getGithubData('https://api.github.com/users/loghinalexandru');
