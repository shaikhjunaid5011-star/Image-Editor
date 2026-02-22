let filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "" },
    invert: { value: 0, min: 0, max: 100, unit: "%" },
};

const imageCanvas = document.querySelector("canvas");
const imageInput = document.querySelector("#img-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetButton = document.querySelector(".reset-btn");
const downloadButton = document.querySelector(".download-btn");
let file = null;
let image = null;



function createFilterElements(name, value, min, max, unit) {

    const div = document.createElement("div");
    div.classList.add("filter");

    
    const infoBox = document.createElement("div");
    infoBox.classList.add("dtl-box");
    const filterName = document.createElement("p");
    filterName.classList.add("name");
    filterName.classList.add("com-sele");
    filterName.textContent = name;
    const filterValue = document.createElement("p");
    filterValue.classList.add("value");
    filterValue.classList.add("com-sele");


    
    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    div.appendChild(infoBox);
    div.appendChild(input);
    infoBox.appendChild(filterName);
    infoBox.appendChild(filterValue);
    filterValue.textContent = input.value;

    input.addEventListener("input", (e)=> {
        filterValue.textContent = input.value;
        filters[name].value = input.value;
        applyFilters()
    })

    return div;
}

const filterContainer = document.querySelector(".filters");



function createFilters() {

Object.keys(filters).forEach(filter => {
    const filterElement = createFilterElements(
        filter,
        filters[filter].value,
        filters[filter].min,
        filters[filter].max,
        filters[filter].unit
    );

    filterContainer.appendChild(filterElement);
});

};

createFilters();



imageInput.addEventListener("change", (dets)=> {
    file = dets.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder")
    imagePlaceholder.style.display = "none";
    imageCanvas.style.display = "block";



    img = new Image()
    img.src = URL.createObjectURL(file)


    img.onload = () => {

        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0 ,0);
    }
});

function applyFilters() {

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter =
        `brightness(${filters.brightness.value}%) ` +
        `contrast(${filters.contrast.value}%) ` +
        `saturate(${filters.saturation.value}%) ` +
        `hue-rotate(${filters.hueRotation.value}deg) ` +
        `blur(${filters.blur.value}px) ` +
        `grayscale(${filters.grayscale.value}%) ` +
        `sepia(${filters.sepia.value}%) ` +
        `opacity(${filters.opacity.value}%) ` +
        `invert(${filters.invert.value}%)`.trim()

    canvasCtx.drawImage(image, 0 ,0);
};


resetButton.addEventListener("click", () => {
    filters = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturation: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "" },
    invert: { value: 0, min: 0, max: 100, unit: "%" },
};
applyFilters()
filterContainer.innerHTML = "";
createFilters()
});

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

