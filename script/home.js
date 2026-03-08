const cardContainer = document.getElementById("all-card")

async function allIssuess (){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data);
    displayIssuess(data.data)


}

function displayIssuess(issues){
    issues.forEach(issu => {
        // console.log(issu);

        const card = document.createElement("div")
        // daynamic card 
        card.innerHTML = `


        <div onclick="fetchSingleIssue(${issu.id})" class="card h-full bg-base-100 shadow border-t-4 ${issu.status==="open"? "border-green-500": "border-violet-500"} ">

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
