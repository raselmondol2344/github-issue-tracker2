 let issueAllCard = [];
 const countIssue = document.getElementById("issue-count")
 

const cardContainer = document.getElementById("all-card")

async function allIssuess (){
    const res = await fetch("https://corsproxy.io/?"+encodeURIComponent("https://phi-lab-server.vercel.app/api/v1/lab/issues"));
    const data = await res.json();
    // console.log(data);
    issueAllCard = data.data
    displayIssuess(data.data)

};
// console.log(issueAllCard);
  // modal funconality 
  const cardDetails = async (id) => {
  const url = "https://corsproxy.io/?"+encodeURIComponent(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  // console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayModal(details.data);
}


const displayModal = (issues) =>{
  console.log(issues);

  const modalBox = document.getElementById("modal_Details");
  modalBox.innerHTML = `
  <div class="card ">
  <h2 class="flex  justify-start text-2xl font-bold mb-5">${issues.title}</h2>
  <div class="cradit grid  grid-cols-3  items-center ">
    <button class="btn bg-green-300 max-w-25 border-none ">${issues.status}</button>
    <p>${issues.author}</p>
    <p class="mr-10">${issues.createdAt.split("T")[0]}</p>
  </div>
   
  <div class="bug_help mt-10 space-x-5">
   <button class="bg-yellow-100 p-1 rounded-sm">${issues.labels[0]}</button>
   <button class ="bg-yellow-100 p-1 rounded-sm">${issues.labels[1]}</button>
    
  </div>

  <p class="py-5 text-[#64748B]">${issues.description}</p>

  <div class="box grid grid-cols-2 w-11/12 mx-auto bg-[#1f293714] p-5 rounded-sm">

  <div class="inline-block">
  <p class="text-[#64748B]">assign:</p>
  <p>${issues.assignee}</p>
  </div>

  <div>
  <p class ="text-[#64748B]">pioroty:</p>
  <p>${issues.priority}</p>
  </div>
    
    
  </div>


</div>
  
   
  
  
  `
  document.getElementById("show_modal").showModal();

}

function displayIssuess(issues){


  cardContainer.innerHTML ="";
  countIssue.innerText = issues.length;
  
    issues.forEach(issu => {
        // console.log(issu);

        const card = document.createElement("div")
        // daynamic card 
        card.innerHTML = ` <div onclick="cardDetails(${issu.id})" class="card h-full bg-base-100 shadow border-t-4 ${issu.status==="open"? "border-green-500": "border-violet-500"} ">

  <div class="card-body p-4">

    <div class="flex justify-between items-center">

        <img src="${
        issu.priority === 'high' || issu.priority === 'medium'
        ? './assets/Open-Status.png'
        : './assets/Close.png'
        }" alt="">
 

      <span class="badge uppercase rounded-full ${issu.priority==='high'? "bg-[#feecec] text-red-500" : issu.priority==='low'? "bg-[#9CA3AF] text-slate-200" : "bg-[#fff6d1] text-amber-500"}  ">
        ${issu.priority}
      </span>

    </div>


    <h3 class="font-semibold text-[16px] mt-2">
      ${issu.title}
    </h3>


    <p class="text-xs text-gray-500">
      ${issu.description}
    </p>


    <div class="flex gap-2 mt-2">

      ${
        issu.labels.includes("bug")
          ? `<span class="badge badge-error badge-outline">
               <i class="fa-solid fa-bug"></i> BUG
             </span>`
          : ""
      }

      ${
        issu.labels.includes("help wanted")
          ? `<span class="badge badge-warning badge-outline text-[13px]">
               <i class="fa-regular fa-life-ring"></i> HELP WANTED
             </span>`
          : ""
      }
      ${
        issu.labels.includes("good first issue")
          ? `<span class="badge badge-warning badge-outline uppercase text-[10px] font-bold">
               <i class="fa-regular fa-life-ring"></i>good first issue
             </span>`
          : ""
      }
      ${
        issu.labels.includes("enhancement")
          ? `<span class="badge badge-warning badge-outline uppercase text-[13px]">
               <i class="fa-regular fa-star"></i>enhancement
             </span>`
          : ""
      }
      ${
        issu.labels.includes("documentation")
          ? `<span class="badge badge-warning badge-outline uppercase text-[13px]">
               <i class="fa-regular fa-star"></i>documentation
             </span>`
          : ""
      }

    </div>
 
     
    <div class="text-xs text-gray-400 mt-3  border-t border-gray-200  pt-3  ">

      <p>#${issu.id} by ${issu.author}</p>

      <p>${new Date(issu.createdAt).toLocaleDateString()}</p>

    </div>

  </div>

</div>

    `;
        cardContainer.appendChild(card)
    });
}

allIssuess();


// search bar funconality 
 const search = document.getElementById("btnSearch").addEventListener("click", ()=>{
    const input = document.getElementById("searchFild");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    // fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    fetch("https://corsproxy.io/?"+encodeURIComponent(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`))
    .then(res => res.json())
    .then((data) =>{
        console.log(data);
        const searchCard = data.data;
         cardContainer.innerHTML = ""; 
        displayIssuess(searchCard);

    } 
        

    );
    
    
});

// filter btn display show in toggle
function filterIssues(status) {
    if (status === "all") {
            displayIssuess(issueAllCard);
        }

        if (status === "open") {

            const openIssues = issueAllCard.filter(issue => issue.status === "open");
            displayIssuess(openIssues);

        }

        if (status === "closed") {
            const closedIssues =issueAllCard.filter(issue => issue.status === "closed");
           displayIssuess(closedIssues);
        }



    }

    filterIssues("all");
    




