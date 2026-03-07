const cardContainer = document.getElementById("all-card")

async function allIssuess (){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data);
    displayIssuess(data.data)


}

function displayIssuess(issues){
    issues.forEach(issu => {
        console.log(issu);

        const card = document.createElement("div")
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
        // <div class="card bg-base-100 shadow border-t-4 border-green-500  h-full">
        //         <div class="card-body p-4">

        //             <div class="flex justify-between items-center">
        //                 <img src="./assets/Open-Status.png" alt="">
        //                 <span class="badge badge-error">HIGH</span>
        //             </div>

        //             <h3 class="font-semibold text-[16px] mt-2">
        //                 Fix navigation menu on mobile devices
        //             </h3>

        //             <p class="text-xs text-gray-500">
        //                 fixed nevigration menu in mobile device
        //             </p>

        //             <div class="flex gap-2 mt-2">
        //                 <span class="badge badge-error badge-outline">
        //                     <i class="fa-solid fa-bug"></i> BUG
        //                 </span>

        //                 <span class="badge badge-warning badge-outline">
        //                     <i class="fa-regular fa-life-ring"></i> HELP WANTED
        //                 </span>
        //             </div>

        //             <div class="text-xs text-gray-400 mt-3">
        //                 <p>#1 by john_doe</p>
        //                 <p>1/15/2024</p>
        //             </div>
        //         </div>
        //     </div> 
        
        
        // `
        cardContainer.appendChild(card)
    });
}

allIssuess();