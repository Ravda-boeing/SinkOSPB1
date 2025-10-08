    const image = document.getElementById("boot-image");
    const text = document.getElementById("boot-text");
    const sound = document.getElementById("startupSound");
window.onload = () => {
  const audio = document.getElementById('boot-audio');
  audio.play(); // Start from 00:00 in your shortened file
  setTimeout(() => {
    audio.pause();
    document.body.innerHTML = '<h2>Welcome to Sink OS</h2>';
  }, 30000); // Play for 30 seconds
};