let submitBtn = document.getElementById("submit-btn")

let generategif = () => {
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";

    //get search value(default=>laugh)
    let q = document.getElementById("search-box").value;


    //we need 10 gifs to displayed in result

    let gifCount = 12;

    //API URL =
    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;

    document.querySelector(".wrapper").innerHTML = "";

    //make a call to api
    fetch(finalURL)
        .then((resp) => resp.json())
        .then((info) => {

            console.log(info.data)

            //all gifs
            let gifsData = info.data;
            gifsData.forEach((gif) => {

                //generate cards for every gif

                let container = document.createElement("div");
                container.classList.add("container");
                let iframe = document.createElement("img");
                console.log(gif);

                iframe.setAttribute("src", gif.images.downsized_medium.url);

                iframe.onload = () => {
                    gifCount--;
                    if (gifCount == 0) {
                        //If all gifs have loader than hide loader and display gifs UI
                        loader.style.display = "none"

                        document.querySelector(".wrapper").style.display = "grid";
                    }
                };
                container.append(iframe);



                let copyBtn = document.createElement("button");
                copyBtn.innerText = "copy Link";

                copyBtn.onclick = () => {
                    let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;

                    //copy text inside the text field
                    navigator.clipboard.writeText(copyLink).then(() => {
                        alert("GIF copied to clipboard");
                    }).catch(() => {
                        alert("GIF Copied to clipboard");
                        let hiddenInput = document.createElement("input");
                        hiddenInput.setAttribute("type", "text");
                        document.body.appendChild(hiddenInput);
                        hiddenInput.value = copyLink;
                        //Select input
                        hiddenInput.select();
                        //copy the value
                        document.execCommand("copy");
                        //remove the input
                        document.body.removeChild(hiddenInput);
                    });

                }
                container.append(copyBtn)
                document.querySelector(".wrapper").append(container);
            });
        });


}
//Generate Gifs on screen load or when user clicks on submit

submitBtn.addEventListener("click", generategif)
window.addEventListener("load", generategif);