const menuBar = document.querySelector(".menu");
const navMenu = document.querySelector("nav")

// open and close menu tab
menuBar.addEventListener("click", () => {
    navMenu.classList.toggle("show")
})

// close menu tab when dummy url are clicked 
document.querySelectorAll("li").forEach(btn => {
    btn.addEventListener("click", () => {
        navMenu.className = '';
    })
})




const inputLink = document.querySelector("#input_link");
const shortenBtn = document.querySelector("#shorten_btn");
const shortenLinks = document.querySelector(".shortened_link_container");
const copyBtn = document.querySelector(".copy_btn");
const short_link = document.querySelector(".short_link")
const clearLinkBtn = document.querySelector(".clearBtn")

//listen for click event on the shorten butoton
shortenBtn.addEventListener("click", async(btn) => {


    // prevent default from submit behaviour
    btn.preventDefault();

    // if the input is empty and add show error message
    if (inputLink.value.trim() === "") {
        inputLink.classList.add("error")
        document.querySelector(".error_text").style.display = "block"

        //otherwise remove any error message
    } else {
        inputLink.classList.remove("error")
        document.querySelector(".error_text").style.display = "none";
        clearLinkBtn.classList.add('show')

        //then make the api call 
        apiCall()

    }


})

//making api call (post request)
const apiCall = () => {

    //made use of proxy to avoid cors error
    fetch("https://corsproxy.io/?https://cleanuri.com/api/v1/shorten", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: inputLink.value
            }),
        })
        .then(response => response.json())
        .then(data => {
            //on getting response data run the function to paste the new link
            pasteNewLink(data.result_url)
        })
}


const pasteNewLink = (e) => {

    //dynamically add the output text elements
    const textToOutput = ` <div class="shortened_link">
<p class="long_link"> ${inputLink.value} </p>
<p class="shortLink">${e}</p>
<button onclick = "copyToClipboard()" class = "copy_btn">Copy</button>
</div>
`
        // append any addition request made
    shortenLinks.innerHTML += textToOutput

    const saveLinks = shortenLinks.innerHTML;

    //save the content generated to the local storage memory 
    localStorage.setItem('keyName', saveLinks)


}

// automatically reload the content on the local memory
shortenLinks.innerHTML = localStorage.getItem("keyName")

//show the button to clear all link generated if there are generated links
if (shortenLinks.innerHTML !== '') {
    clearLinkBtn.classList.add('show')
}

//  function to clear the local storage memory and update the ui
const clearMemory = () => {
    localStorage.clear();
    shortenLinks.innerHTML = localStorage.getItem("keyName")
    clearLinkBtn.classList.remove('show')
}


//function to copy generated link
const copyToClipboard = () => {

    //check the button being clicked and get the content of tag before it 
    const newLink = event.target.previousElementSibling.textContent;

    //copy the content gotten to teh clipboard
    navigator.clipboard.writeText(newLink);

    //alert user that the link has been copied to the clipboard
    alert(newLink + " copied to clipboard")
}