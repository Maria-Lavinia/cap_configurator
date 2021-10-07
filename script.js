"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach(option => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // TODO: Toggle feature in "model"
  features[feature] = !features[feature];

  
  // TODO: More code
  
  if (features[feature]) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);
    // If feature is (now) turned on:
    // - mark target as chosen (add class "chosen")
    target.classList.add("chosen");
    
    // - un-hide the feature-layer(s) in the #product-preview;
    document.querySelector(`img[data-feature=${feature}]`).classList.remove("hide");
    
    
    // - create featureElement and append to #selected ul
    const featureElement = createFeatureElement(feature);
    document.querySelector("#selected ul").append(featureElement);
    // - create FLIP-animation to animate featureElement from img in target, to
    //   its intended position. Do it with normal animation or transition class!
    
    
    
    const start = target.getBoundingClientRect();
    const end = featureElement.getBoundingClientRect();
    
    const deltaX = start.x - end.x + "px";
    const deltaY = start.y - end.y + "px";
    
    featureElement.style.setProperty("deltaX", deltaX);
    featureElement.style.setProperty("deltay", deltaY);
    
    featureElement.classList =".animate-feature-out";
    
    // Else - if the feature (became) turned off:
  } else { 
    // feature removed
    // - no longer mark target as chosen
    target.classList.remove("chosen");
    console.log(`Feature ${feature} is turned off!`);
    
    // - hide the feature-layer(s) in the #product-preview
    document
    .querySelector(`img[data-feature=${feature}]`)
    .classList.add("hide");
    // TODO: More code
    
  }
  // - find the existing featureElement in #selected ul
  
  const existingFeatureElement = document.querySelector(
    `#selected ul li[data-feature=${feature}]`
    );
  
    
    const start = target.getBoundingClientRect();
    
    // 2. last img: find the end position (getBoundingClientRect)
    const end = existingFeatureElement.getBoundingClientRect();
    
    // 3. invert: translate the element to the start-position
    const deltaX = start.x - end.x + "px";
    const deltaY = start.y - end.y + "px";
    
    existingFeatureElement.style.setProperty("--deltaX", deltaX);
    existingFeatureElement.style.setProperty("--deltaY", deltaY);
    
    // its intended position. Do it with normal animation or transition class!
    existingFeatureElement.classList = "animate-feature-in";
  }
  
  
  
  // - when animation is complete, remove featureElement from the DOM
  existingFeatureElement.addEventListener("animationend", () => {
    existingFeatureElement.remove();
  });
  // Create featureElement to be appended to #selected ul - could have used a <template> instead
  function createFeatureElement(feature) {
    const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}