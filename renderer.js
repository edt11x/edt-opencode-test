const canvas = document.getElementById('starfield')
const ctx = canvas.getContext('2d')

let width, height
let centerX, centerY
let stars = []
const numStars = 200
const speed = 2
const focalLength = 200

class Star {
  constructor() {
    this.hue = Math.random() * 360
    this.reset()
  }

  reset() {
    this.x = (Math.random() - 0.5) * width * 2
    this.y = (Math.random() - 0.5) * height * 2
    this.z = Math.random() * 1000 + 500
    this.pz = this.z
  }

  update() {
    this.z -= speed

    if (this.z < 1) {
      this.reset()
    }
  }

  draw() {
    const sx = (this.x / this.z) * focalLength + centerX
    const sy = (this.y / this.z) * focalLength + centerY

    const px = (this.x / this.pz) * focalLength + centerX
    const py = (this.y / this.pz) * focalLength + centerY

    this.pz = this.z

    if (sx < 0 || sx > width || sy < 0 || sy > height) {
      return
    }

    const brightness = 1 - this.z / 1000
    const size = (1 - this.z / 1000) * 16  // Thicker trails

    ctx.strokeStyle = `hsl(${this.hue}, 100%, ${Math.floor(brightness * 50 + 50)}%)`
    ctx.lineWidth = size
    ctx.beginPath()
    ctx.moveTo(px, py)
    ctx.lineTo(sx, sy)
    ctx.stroke()
  }
}

function resize() {
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
  centerX = width / 2
  centerY = height / 2
}

function init() {
  resize()
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star())
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.06)'
  ctx.fillRect(0, 0, width, height)

  stars.forEach(star => {
    star.update()
    star.draw()
  })

  requestAnimationFrame(animate)
}

window.addEventListener('resize', resize)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.close()
  }
})
init()
animate()
