function gettext(id) {
  let gettext = document.getElementById(id).innerText;
  return gettext;
}

function getInNumber(id) {
  const convertNumber = parseInt(document.getElementById(id).innerText);
  return convertNumber;
}

function getId(id) {
  let getid = document.getElementById(id);
  return getid;
}
const historyItems = document.getElementById("history-section");

let historyArray = [];
document.getElementById("clear-btn").addEventListener("click", function () {
  historyArray = [];
  historyItems.innerText = "";
});

getId("main-content")
.addEventListener("click",function(event){
if(event.target.closest(".btn-circle ")){
  //heart count section
let count=getInNumber("heart-count")
count++
getId("heart-count" ).innerText=count
}
// Copy Section
  if (event.target.closest(".copy-btn")) {
    let serviceCard = event.target.closest(".start-card");
    let number = serviceCard.querySelector(".hot-line").innerText;
    let title = serviceCard.querySelector(".card-title").innerText;

    navigator.clipboard
      .writeText(number)
      .then(() => {
        let copyCount = parseInt(
          document.getElementById("copyCount").innerText
        );
        copyCount++;
        document.getElementById("copyCount").innerText = copyCount;

        alert(`
            ${title} is ${number}. Copied!
            `);
      })
      .catch((err) => {
        alert("Failed to copy: " + err);
      });
  }
  //calling section
if(event.target.closest(".call-btn")){
 let availablecoin = parseInt(
      document.getElementById("main-coin").innerText
    );
    if(availablecoin>=20){
        let cardstart=event.target.closest(".start-card")
        let number=cardstart.querySelector(".hot-line").innerText
        let title=cardstart.querySelector(".card-title").innerText
       alert(`
           Calling ${title} is ${number} Using 20 Coin...
            `);
   // Call History Section
      historyItems.innerText = "";
      let data = {
        cardTitle: title,
        cardNumber: number,
        date: new Date().toLocaleTimeString(),
      };
      historyArray.unshift(data);
      for (const history of historyArray) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `
            <div
              class="flex items-center justify-between bg-[#FAFAFA] p-4 rounded-lg mb-2"
            >
              <div class="title">
                <h1 class="font-bold">${history.cardTitle}</h1>
                <h3 class="font-light">${history.cardNumber}</h3>
              </div>
              <div class="time">
                <p class="font-bold">${history.date}</p>
              </div>
            </div>
            `;
        historyItems.appendChild(newDiv);
      }

      // Decressing Coin
      let decress = availablecoin - 20;
      document.getElementById("main-coin").innerText = decress;
    } else {
      alert("Not Enough Coin.Minimum 20 Coin Need to call...");
      return;
    }
  }
})