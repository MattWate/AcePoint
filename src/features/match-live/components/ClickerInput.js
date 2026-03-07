const handleKeyDown = (e) => {
  // DIAGNOSTIC: Open your mobile browser's console or use an alert to see the key
  console.log("Key pressed:", e.key); 
  
  // Prevent default behavior (like scrolling or volume UI if possible)
  if (["Enter", " ", "ArrowUp", "ArrowDown", "VolumeUp", "VolumeDown"].includes(e.key)) {
    e.preventDefault();
  }

  clickCount++;
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    // Standard mapping: Single = Team A, Double = Team B, Triple = Undo
    if (clickCount === 1) onAction('POINT_A');
    else if (clickCount === 2) onAction('POINT_B');
    else if (clickCount === 3) onAction('UNDO');
    
    clickCount = 0;
  }, 300);
};
