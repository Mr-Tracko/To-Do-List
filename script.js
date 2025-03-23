const inputbox = document.getElementById("input-box");
const tasks = document.getElementById("tasks");
const button = document.querySelectorAll("button");
const main = document.querySelector(".todo");

// Base height for the container
const baseHeight = 200; // px
const itemHeight = 60;  // px per task item

// Initialize li_count based on existing items
let li_count = tasks.getElementsByTagName("li").length;

button.forEach(function (button) {
    button.addEventListener('click', function (e) {
        if (inputbox.value === '') {
            alert('Please Add Some Task');
        }
        else {
            let li = document.createElement('li');
            li.innerHTML = inputbox.value;
            tasks.appendChild(li);
            li_count++;

            let span = document.createElement("span");
            span.innerHTML = "DELETE";
            li.appendChild(span);
            updateContainerHeight();
            saveData();
        }
        inputbox.value = "";
    });
});

tasks.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        li_count--;
        updateContainerHeight();
        saveData();
    }
}, false);

function updateContainerHeight() {
    // Adjust height based on the number of items
    // Base height + height for each item
    const newHeight = baseHeight + (li_count * itemHeight);
    main.style.height = newHeight + 'px';
    console.log("Current height:", main.style.height, "Li count:", li_count);
}

function saveData() {
    localStorage.setItem("data", tasks.innerHTML);
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        tasks.innerHTML = savedData;
        // Re-count the list items after loading from storage
        li_count = tasks.getElementsByTagName("li").length;
        updateContainerHeight();
    } else {
        tasks.innerHTML = "";
        li_count = 0;
        updateContainerHeight();
    }
}

// Initialize the task list and update height
showTask();