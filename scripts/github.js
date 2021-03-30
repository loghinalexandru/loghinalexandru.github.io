function setOdometerValue(id, value){
	let counter = document.getElementById(id);
	counter.innerHTML = value;
}

async function loadData(){
	let projectsCount = await getKey('projects', getGithubProjectCount)
	let commitsCount = await getKey('commit', getGithubCommitCount)

	console.log(projectsCount)
	console.log(commitsCount)


	setTimeout(() => setOdometerValue("projects", projectsCount), 200);
	setTimeout(() => setOdometerValue("commits",commitsCount), 200);
}

async function getApiData(uri) {
	let data = await fetch(uri);
	return data.json();
}

async function getKey(key, asyncDelegate){
	let value = sessionStorage.getItem(key)

	if(value === null){
		value = await asyncDelegate();
		sessionStorage.setItem(key, value)
	}

	return value
}

async function getGithubProjectCount() {
	const uri = 'https://api.github.com/users/loghinalexandru'
	data = await getApiData(uri)

	return data.public_repos;
}

async function getGithubCommitCount() {
	const projectList = ["Procedural-Generation", "GenerativeAdversarialNetworks", "Life-Itself"]
	let commitCount = 0;

	for (project of projectList) {
		let data = await getApiData('https://api.github.com/repos/loghinalexandru/' + project + '/stats/contributors');
		commitCount += data[0].total;
	}

	return commitCount;
}

window.odometerOptions = {
	auto: false,
	duration: 10000,
};

window.onload = loadData();