function updateTime() {
  var currentTime = new Date().toLocaleString();
  var timeText = document.querySelector("#timeElement");
  timeText.innerHTML = currentTime;
}

setInterval(updateTime, 1000);

function dragElement(element) {
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;
  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeScreen = document.querySelector("#welcome")

function closeWindow(element) {
  element.style.display = "none"
}

var welcomeScreenClose = document.querySelector("#welcomeclose")

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

var topBar = document.querySelector("#top")

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

var welcomeScreenOpen = document.querySelector("#welcomeopen")

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
}

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleIconTap(element, window) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}

var biggestIndex = 1;

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

function makeClosable(elementName) {
  var screen = document.querySelector("#" + elementName)
  var closeButton = document.querySelector("#" + elementName + "close")
  closeButton.addEventListener("click", () => closeWindow(screen));
}

function initializeIcon(name) {
  var icon = document.querySelector("#" + name + "Icon")
  var screen = document.querySelector("#" + name)
  icon.addEventListener("click", () => handleIconTap(icon, screen));
}

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  makeClosable(elementName)
  dragElement(screen)
  if(elementName != "welcome") {
    initializeIcon(elementName)
  }
}

initializeWindow("welcome")
initializeWindow("photo")



for (let i = 0; i < content.length; i++) {
  addToSideBar(i)
}