const d = document,
	$shows = d.getElementById("shows"),
	$template = d.getElementById("show-template").contentEditable,
	$fragment = d.createDocumentFragment();

d.addEventListener("keypress", async (e) => {
	if (e.target.matches("#search")) {
		if (e.key === "Enter") {
			try {
				$shows.innerHTML = `<img class="loader" src="../assets/loader.svg" alt="Loading...">`;
				let showSearch = e.target.value.toLowerCase(),
					api = `https://api.tvmaze.com/search/shows?q=${showSearch}`,
					res = await fetch(api),
					json = await res.json();

				if (!res.ok) {
					throw {
						status: res.status,
						statusText: res.statusText,
					};
				}

				if (json.length === 0) {
					$shows.innerHTML = `<h2>No results...</h2>`;
				} else {
				}
			} catch (error) {
				let message = error.statusText || "An error occurred!";
				$shows.innerHTML = `<p>Error: ${error.status}: ${message}</p>`;
			}
		}
	}
});
