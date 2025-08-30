// Select buttons
const buttons = document.querySelectorAll(".Daily, .Weekly, .Monthly");
const dailyBtn = document.querySelector(".Daily");
const weeklyBtn = document.querySelector(".Weekly");
const monthlyBtn = document.querySelector(".Monthly");
const boxes = document.querySelectorAll(".box");

// Function to load JSON data
async function loadData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("HTTP error " + response.status);

    const data = await response.json();
    // Default view = weekly
    setActive(weeklyBtn);
    updateUI(data, "weekly");

    // Add event listeners for buttons
    dailyBtn.addEventListener("click", () => {
      setActive(dailyBtn);
      updateUI(data, "daily");
    });
    weeklyBtn.addEventListener("click", () => {
      setActive(weeklyBtn);
      updateUI(data, "weekly");
    });
    monthlyBtn.addEventListener("click", () => {
      setActive(monthlyBtn);
      updateUI(data, "monthly");
    });

  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

// Function to update UI
function updateUI(data, timeframe) {
  data.forEach((activity, index) => {
    const box = boxes[index];
    const current = activity.timeframes[timeframe].current;
    const previous = activity.timeframes[timeframe].previous;

    box.querySelector(".time span").textContent = `${current}hrs`;

    let label = "";
    if (timeframe === "daily") label = "Yesterday";
    if (timeframe === "weekly") label = "Last Week";
    if (timeframe === "monthly") label = "Last Month";

    box.querySelector(".week").textContent = `${label} - ${previous}hrs`;
  });
}

// Function to set active button
function setActive(activeBtn) {
  buttons.forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

loadData();
