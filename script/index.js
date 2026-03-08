let allIssues = [];

const issueCount = document.getElementById("issue-count");
const IssueCard = document.getElementById("Issue-card");

// ================= SPINNER =================
const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");

  if (status) {
    spinner.classList.remove("hidden");
    IssueCard.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    IssueCard.classList.remove("hidden");
  }
};

// ================= LOAD ALL ISSUES =================
const loadIssues = async () => {
  manageSpinner(true);

  try {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allIssues = data.data;
    displayIssue(allIssues);
    updateCount(allIssues.length);
  } catch (error) {
    console.log(error);
  }

  manageSpinner(false);
};

// ================= LOAD ISSUE DETAIL =================
const loadIssueDetail = async (id) => {
  const detailBox = document.getElementById("detail-contain");

  // Spinner inside modal
  detailBox.innerHTML = `
    <div class="flex justify-center py-10">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>
  `;

  document.getElementById("my_modal_5").showModal();

  try {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const details = await res.json();

    displayIssueDetails(details.data);
  } catch (error) {
    console.log(error);
  }
};

// ================= DISPLAY ISSUE DETAILS =================
const displayIssueDetails = (issue) => {
  const detailBox = document.getElementById("detail-contain");

  const formattedDate = issue.createdAt ? new Date(issue.createdAt).toLocaleDateString("en-GB") : "N/A";

  detailBox.innerHTML = `
  <div class="p-6 bg-white rounded-lg shadow-md max-w-xl">

    <h2 class="text-2xl font-bold mb-4">${issue.title}</h2>

    <div class="flex flex-col gap-4 mb-6">

      <p class="text-gray-700">
        <span class="inline-block rounded-full ${
          issue.status === "open" ? "bg-green-500" : "bg-purple-500"
        } text-white px-3 py-1 text-sm font-semibold mr-2">
          ${issue.status}
        </span>

        <i class="fa-solid fa-circle text-gray-400 text-xs mr-2"></i>

        Opened by <strong>${issue.author || "Unknown"}</strong>

        <i class="fa-solid fa-circle text-gray-400 text-xs mx-2"></i>

        ${issue.date || "N/A"}
      </p>

      <p class="text-gray-600">
        ${issue.description}
      </p>

      <div class="flex gap-3">
        <span class="border border-red-300 text-red-500 px-4 py-1 rounded-full text-sm font-semibold">
          BUG
        </span>

        <span class="border border-yellow-400 text-yellow-500 px-3 py-1 rounded-full text-sm font-semibold">
          HELP WANTED
        </span>
      </div>

    </div>

    <div class="grid grid-cols-2 gap-4 bg-gray-100 rounded-md p-4 mb-6 text-gray-700">

      <div>
        <p class="text-sm font-medium">Assignee:</p>
        <h4 class="font-semibold">${issue.author || "Unassigned"}</h4>
      </div>

      <div>
        <p class="text-sm font-medium">Priority:</p>
        <span class="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${issue.priority || "HIGH"}
        </span>
      </div>

    </div>

  </div>
  `;
};

// ================= DISPLAY ISSUES =================
const displayIssue = (issues) => {
  IssueCard.innerHTML = "";

  issues.forEach(issue => {
    const div = document.createElement("div");

    const borderColor =
      issue.status === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500";

    div.className = `shadow-xl rounded-xl p-5 bg-white ${borderColor}`;

    const formattedDate = issue.createdAt ? new Date(issue.createdAt).toLocaleDateString("en-GB") : "N/A";

    div.innerHTML = `
      <div class="flex justify-between items-center mb-3">
        <div class="w-10 h-10 flex items-center justify-center ${
          issue.status === "open" ? "bg-green-100" : "bg-purple-100"
        } rounded-full">
          <i class="fa-solid fa-circle ${
            issue.status === "open" ? "text-green-500" : "text-purple-500"
          }"></i>
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
        <span>#${issue.id} by ${issue.author }</span>
        <span>${formattedDate}</span>
      </div>
    `;

    div.addEventListener("click", () => {
      loadIssueDetail(issue.id);
    });

    IssueCard.appendChild(div);
  });

  manageSpinner(false);
};

// ================= UPDATE ISSUE COUNT =================
const updateCount = (count) => {
  issueCount.innerText = `${count} Issues`;
};

// ================= ACTIVE BUTTON STYLE =================
function setActive(buttonId) {
  document.getElementById("all-btn").className = "btn btn-soft btn-primary filter-btn";
  document.getElementById("open-btn").className = "btn btn-soft btn-primary filter-btn";
  document.getElementById("closed-btn").className = "btn btn-soft btn-primary filter-btn";

  document.getElementById(buttonId).className = "btn btn-primary filter-btn";
}

// ================= FILTER BUTTONS WITH SPINNER =================
function filterIssues(status) {
  manageSpinner(true);
  setTimeout(() => {
    let filtered;
    if (status === "all") filtered = allIssues;
    else filtered = allIssues.filter(issue => issue.status === status);

    displayIssue(filtered);
    updateCount(filtered.length);
    manageSpinner(false);
  }, 300);
}

document.getElementById("all-btn").addEventListener("click", () => {
  setActive("all-btn");
  filterIssues("all");
});

document.getElementById("open-btn").addEventListener("click", () => {
  setActive("open-btn");
  filterIssues("open");
});

document.getElementById("closed-btn").addEventListener("click", () => {
  setActive("closed-btn");
  filterIssues("closed");
});

// ================= INITIAL LOAD =================
loadIssues();