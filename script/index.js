const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => displayIssue(data.data));
};

const displayIssue = (issues) => {
  const IssueCard = document.getElementById("Issue-card");
  IssueCard.innerHTML = "";

  issues.forEach(issue => {

    const div = document.createElement("div");
    div.classList = "shadow-xl rounded-xl border-t-4 border-green-500 p-5 bg-white";

    div.innerHTML = `
    
      <div class="flex justify-between items-center mb-3">
        <div class="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
          <i class="fa-solid fa-circle text-green-500"></i>
        </div>

        <span class="bg-red-100 text-red-500 px-4 py-1 rounded-full font-semibold">
          ${issue.priority || "HIGH"}
        </span>
      </div>

      <h2 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
        ${issue.title}
      </h2>

      <p class="text-gray-500 mb-4 line-clamp-2">
        ${issue.description}
      </p>

      <div class="flex gap-3 mb-4">
        <span class="border border-red-300 text-red-500 px-4 py-1 rounded-full ">
          BUG
        </span>

        <span class="px-3 py-1 border border-yellow-400 text-yellow-500 rounded-full text-sm ">
          HELP WANTED
        </span>
      </div>

      <hr class="mb-3">

      <div class="grid text-gray-500 text-sm">
        <span>#${issue.id} by ${issue.author || "john_doe"}</span>
        <span>${issue.date || "1/15/2024"}</span>
      </div>
    
    `;

    IssueCard.appendChild(div);
  });
};


const buttons = document.querySelectorAll(".filter-btn");

function setActive(buttonId){
  document.getElementById("all-btn").className = "btn btn-soft btn-primary";
  document.getElementById("open-btn").className = "btn btn-soft btn-primary";
  document.getElementById("closed-btn").className = "btn btn-soft btn-primary";

  document.getElementById(buttonId).className = "btn btn-primary";
}

document.getElementById("all-btn").addEventListener("click", () => {
  setActive("all-btn");
  loadIssues();
});

loadIssues();