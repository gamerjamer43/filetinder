// global states
let profiles = [];
let currentIndex = 0;
let isAnimating = false;

// fetch and render initial cards. hit the server then resolve it into actual profile data
fetch('/profiles')
  .then(res => res.json())
  .then(data => {
    profiles = data;
    renderCards();
  });

// create and render the initial card stack
function renderCards() {
  // find the container and clear it
  const container = document.getElementById('card-container');
  container.innerHTML = '';

  // iterate through profiles
  profiles.slice(currentIndex).forEach(profile => {
    // create card element
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url(${profile.image})`;
    card.dataset.id = profile.id;

    // add profile info
    const info = document.createElement('div');
    info.className = 'card-info';
    info.innerHTML = `
      <h2>${profile.name}</h2>
      <p>${profile.description}</p>
    `;
    card.appendChild(info);

    // add action labels
    ['check', 'dislike'].forEach(action => {
      const label = document.createElement('div');
      label.className = `label ${action}`;
      label.textContent = action === 'check' ? '✅' : '❌';
      card.appendChild(label);
    });

    // add swipe listeners
    addSwipeListeners(card);
    container.appendChild(card);
  });
}

// drag gesture handling
function addSwipeListeners(card) {
  // store global variables for drag state
  let startX, isDragging = false;
  
  // reset card state
  const onMouseDown = e => { 
    if (isAnimating) return;
    e.preventDefault();
    startX = e.clientX;
    isDragging = true;
    card.style.transition = 'none';
  };

  // handle mouse move
  const onMouseMove = e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    card.style.transform = `translateX(${dx}px) rotate(${dx * 0.06}deg)`;
    showLabel(card, dx);
  };

  // handle mouse up
  const onMouseUp = e => {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform 0.4s ease-out';
    const dx = e.clientX - startX;

    if (dx > 120) swipeAction(card, 'check');
    else if (dx < -120) swipeAction(card, 'dislike');
    else {
      card.style.transform = '';
      resetLabels(card);
    }
  };

  card.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

// visual feedback during drag
function showLabel(card, dx) {
  if (dx > 0) {
    card.classList.add('like');
    card.classList.remove('dislike');
  } else if (dx < 0) {
    card.classList.add('dislike');
    card.classList.remove('like');
  }
  
  const maxDrag = 400;
  const boundedDx = Math.min(Math.max(dx, -maxDrag), maxDrag);
  const rotation = boundedDx * 0.1125;
  const scale = Math.min(Math.abs(boundedDx) / 500 + 1, 1.2);
  
  card.style.transform = `translateX(${boundedDx}px) rotate(${rotation}deg) scale(${scale})`;
}

// reset labels and transform
function resetLabels(card) {
  card.classList.remove('like', 'dislike');
  card.style.transform = '';
}


// handle swipe animation and api call
function swipeAction(card, action) {
  // make sure it's not animating already
  if (isAnimating) return;
  isAnimating = true;
  
  // remove existing swipe classes, mark as processing
  const id = card.dataset.id;
  const dir = action === 'check' ? 1 : -1;
  card.classList.add('processing');
  
  // reset current transform to avoid transition issues
  const currentTransform = card.style.transform;
  card.style.transition = 'none';
  void card.offsetWidth;
  
  // apply swipe effect
  card.classList.add(dir > 0 ? 'swipe-right' : 'swipe-left');
  card.style.setProperty('--current-transform', currentTransform);

  // call api to handle swipe
  fetch('/swipe', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id, action: action })
  });
  
  // prevent rapid-fire swipes
  setTimeout(() => {
    currentIndex++;
    renderCards();
    isAnimating = false;
  }, 600);
}