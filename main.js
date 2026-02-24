let jobs = [
  { id: 1, 
    title: "Mobile First Corp", 
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide. ",
    status: "not-applied" 
  },
  { id: 2, 
    title: "WebFlow Agency", 
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends. ",
    status: "not-applied" 
  },

  { id: 3, 
    title: "DataViz Solutions", 
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description: " ",
    status: "not-applied" 
  },
  { id: 4, 
    title: "CloudFirst Inc", 
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    status: "not-applied" 
  },
  { id: 5, 
    title: "Innovation Labs", 
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
    status: "not-applied" 
  },       
  { id: 6, 
    title: "MegaCorp Solutions", 
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
    status: "not-applied" 
  },
  { id: 7, 
    title: "StartupXYZ", 
    position: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
    status: "not-applied" 
  },
  { id: 8, 
    title: "TechCorp Industries", 
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
    status: "not-applied" 
  },
];

let currentFilter = "all";

//Show Available job update result.
function updateResult() {
  const total = jobs.length;
  const filteredCount = currentFilter === "all" ? total : jobs.filter((j) => j.status === currentFilter).length;

  const resultDiv = document.getElementById("result");

  if (currentFilter === "all") {
    resultDiv.innerHTML = `${total} jobs`;
  } else {
    resultDiv.innerHTML = `${filteredCount} of ${total} jobs`;
  }
// Shows job count in hte header
document.getElementById("allCount").innerHTML = jobs.length;
document.getElementById("interviewCount").innerHTML = jobs.filter((j) => j.status === "interview").length;
document.getElementById("rejectedCount").innerHTML = jobs.filter((j) => j.status === "reject").length;
}




function renderJobs() {
  const list = document.getElementById("job-list");
  list.innerHTML = "";

  const filtered = currentFilter === "all" ? jobs : jobs.filter((job) => job.status === currentFilter);

  // if no jobs avaiable
  if (filtered.length === 0) {
    list.innerHTML = `
    <div class="section">
        <div class="frame flex items-center justify-center flex-col h-[300px]">
          <p class="text-6xl text-[#7DA8FF]">
            <i class="fa-regular fa-file-lines"></i>
          </p>
          <h2 class="h2">No jobs available</h2>
          <p class="title">Check back soon for new job opportunities</p>
        </div>
      </div>    
    `;
    updateResult();
    return;
  }

  filtered.forEach((job) => {
    const div = document.createElement("div");
    div.className = "job";

    // Status Text
    let statusText = "";

    if (job.status === "interview") {
      statusText = `<div class="text-green-900 bg-green-200 mb-5 flex justify-center items-center h-[40px] w-[120px]"><p class="">Interviewed</p></div>`;
    }
    if (job.status === "reject") {
      statusText = `<div class="text-red-900 bg-red-200 mb-5 flex justify-center items-center h-[40px] w-[120px]"><p class="">Rejected</p></div>`;
    }
    if (job.status === "not-applied"){
      statusText = `<div class="text-gray-900 bg-gray-200 mb-5 flex justify-center items-center h-[40px] w-[120px]"><p class="">NOT APPLIED</p></div>`;
    }

    div.innerHTML = `
    
    <div class="frame">
          <div class="flex justify-between items-center">
            <div>
              <h2>${job.title}</h2>
              <p class="title">${job.position}</p>
            </div>
            <div>

              <button class="btn-delete h-10 w-10 rounded-full border border-gray-400 text-gray-400 cursor-pointer" onclick="deleteJob(${job.id})"> <i class="fa-regular fa-trash-can"></i></button>

            </div>
          </div>
          
          <p class="job-time tracking-wide">${job.location} &nbsp; .${job.type}. &nbsp; ${job.salary}</p>

          <button class="status-btn">${statusText}</button>

          <div class="job-discription">${job.description} </div>
          <div class="flex gap-2">
            <button class="btn-interview interview rounded-sm" onclick="changeStatus(${job.id}, 'interview')">Interview</button>
            <button class="btn-reject rejected rounded-sm" onclick="changeStatus(${job.id}, 'reject')">Reject</button>
          </div>
        </div>
      `;

    list.appendChild(div);
  });

  updateResult();
}

//Show active filter button
function filterJobs(type) {
  currentFilter = type;

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(`btn-${type}`).classList.add("active");

  renderJobs();
}

//show status when click on interview or reject button
function changeStatus(id, newStatus) {
  const job = jobs.find((j) => j.id === id);
  if (job) {
    job.status = newStatus;
    renderJobs();
  }
}

function deleteJob(id) {
  jobs = jobs.filter((j) => j.id !== id);
  renderJobs();
}

renderJobs();
