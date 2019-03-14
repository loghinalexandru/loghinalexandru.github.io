let caption = document.getElementById("githubCaption");

function isInViewport(element) {
	var rect = element.getBoundingClientRect();
	var html = document.documentElement;
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || html.clientHeight) &&
		rect.right <= (window.innerWidth || html.clientWidth)
	);
}

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

function renderData(){
	if(isInViewport(caption)){
		getGithubData('https://api.github.com/users/loghinalexandru');
	}
}

window.addEventListener("scroll" , renderData);