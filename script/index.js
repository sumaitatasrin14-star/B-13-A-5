let allIssues = [];

const issueCount = document.getElementById("issue-count");
const IssueCard = document.getElementById("Issue-card");

// Fetch all issues
const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      allIssues = data.data;
      displayIssue(allIssues);
      updateCount(allIssues.length);
    });
};

// Display issues
const displayIssue = (issues) => {
  IssueCard.innerHTML = "";

  issues.forEach(issue => {
    const div = document.createElement("div");

    // Dynamic border color: green for open, purple for closed
    const borderColor = issue.status === "open" ? "border-t-4 border-green-500" : "border-t-4 border-purple-500";
    div.className = `shadow-xl rounded-xl p-5 bg-white ${borderColor}`;

    div.innerHTML = `
    <div onclick="my_modal_5.showModal()">
      <div class="flex justify-between items-center mb-3">
        <div class="w-10 h-10 flex items-center justify-center ${issue.status === "open" ? "bg-green-100" : "bg-purple-100"} rounded-full">
          <i class="fa-solid fa-circle ${issue.status === "open" ? "text-green-500" : "text-purple-500"}"></i>
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
        <span class="border border-red-300 text-red-500 px-4 py-1 rounded-full">
          BUG
        </span>
        <span class="px-3 py-1 border border-yellow-400 text-yellow-500 rounded-full text-sm">
          HELP WANTED
        </span>
      </div>

      <hr class="mb-3">

      <div class="grid text-gray-500 text-sm">
        <span>#${issue.id} by ${issue.author || "john_doe"}</span>
        <span>${issue.date || "1/15/2024"}</span>
      </div>
      </div>
    `;

    IssueCard.appendChild(div);
  });
};

// Update issue count
const updateCount = (count) => {
  issueCount.innerText = `${count} Issues`;
};

// Active button logic
function setActive(buttonId){
  document.getElementById("all-btn").className = "btn btn-soft btn-primary filter-btn";
  document.getElementById("open-btn").className = "btn btn-soft btn-primary filter-btn";
  document.getElementById("closed-btn").className = "btn btn-soft btn-primary filter-btn";

  document.getElementById(buttonId).className = "btn btn-primary filter-btn";
}

// Filter All
document.getElementById("all-btn").addEventListener("click", () => {
  setActive("all-btn");
  displayIssue(allIssues);
  updateCount(allIssues.length);
});

// Filter Open
document.getElementById("open-btn").addEventListener("click", () => {
  setActive("open-btn");
  const openIssues = allIssues.filter(issue => issue.status === "open");
  displayIssue(openIssues);
  updateCount(openIssues.length);
});

// Filter Closed
document.getElementById("closed-btn").addEventListener("click", () => {
  setActive("closed-btn");
  const closedIssues = allIssues.filter(issue => issue.status === "closed");
  displayIssue(closedIssues);
  updateCount(closedIssues.length);
});

// Load issues on page load
loadIssues();