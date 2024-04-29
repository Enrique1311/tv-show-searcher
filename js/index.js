const d = document,
	$shows = d.getElementById("shows"),
	$template = d.getElementById("show-template").content,
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
					$shows.innerHTML = "";
					json.forEach((el) => {
						$template.querySelector(".show-description h3").textContent =
							el.show.name;
						$template.querySelector("img").src = el.show.image.medium
							? el.show.image.medium
							: "../assets/without-image.jpg";

						$template.querySelector(".show-description div").innerHTML = el.show
							.summary
							? el.show.summary
							: "Without Decription...";
						$template.querySelector("a").href = el.show.url ? el.show.url : "#";
						$template.querySelector("a").target = el.show.url
							? "_blank"
							: "_self";
						$template.querySelector("a").textContent = el.show.url
							? "Show more..."
							: "";

						let $clone = d.importNode($template, true);
						$fragment.appendChild($clone);
					});

					$shows.innerHTML = "";
					$shows.appendChild($fragment);
				}
			} catch (error) {
				let message = error.statusText || "An error occurred!";
				$shows.innerHTML = `<p>Error: ${error.status}: ${message}</p>`;
			}
		}
	}
});
