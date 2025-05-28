// Clock and Greeting
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;

    const greeting = document.getElementById('greeting');
    if (hours >= 5 && hours < 12) {
        greeting.textContent = 'Good Morning, My Bestie Adityam!';
    } else if (hours >= 12 && hours < 17) {
        greeting.textContent = 'Good Afternoon, My Bestie Adityam!';
    } else if (hours >= 17 && hours < 21) {
        greeting.textContent = 'Good Evening, My Bestie Adityam!';
    } else {
        greeting.textContent = 'Good Night, My Bestie Adityam!';
    }
}
setInterval(updateTime, 1000);
updateTime();

// Canvas for Cute Drawings
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

const drawings = [];
function createDrawing() {
    const types = ['heart', 'star'];
    const type = types[Math.floor(Math.random() * types.length)];
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 20 + 10;
    const speed = Math.random() * 2 + 1;
    drawings.push({ x, y, size, type, speed });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawings.forEach(d => {
        ctx.fillStyle = d.type === 'heart' ? '#ff69b4' : '#ffd700';
        if (d.type === 'heart') {
            ctx.beginPath();
            const scale = d.size / 20;
            ctx.moveTo(d.x, d.y - 5 * scale);
            ctx.bezierCurveTo(d.x - 10 * scale, d.y - 15 * scale, d.x - 20 * scale, d.y, d.x, d.y + 15 * scale);
            ctx.bezierCurveTo(d.x + 20 * scale, d.y, d.x + 10 * scale, d.y - 15 * scale, d.x, d.y - 5 * scale);
            ctx.fill();
        } else {
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                ctx.lineTo(
                    d.x + d.size * Math.cos((18 + i * 72) * Math.PI / 180),
                    d.y + d.size * Math.sin((18 + i * 72) * Math.PI / 180)
                );
                ctx.lineTo(
                    d.x + (d.size / 2) * Math.cos((54 + i * 72) * Math.PI / 180),
                    d.y + (d.size / 2) * Math.sin((54 + i * 72) * Math.PI / 180)
                );
            }
            ctx.closePath();
            ctx.fill();
        }
        d.y += d.speed;
        if (d.y > canvas.height + d.size) {
            d.y = -d.size;
            d.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(draw);
}

for (let i = 0; i < 20; i++) createDrawing();
draw();