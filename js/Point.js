class Point {
    constructor({
        x: x,
        y: y,
        size: size,
        color: color,
        mixMode: mixMode,
    }) {
        this.x = x
        this.y = y
        this.size = size
        this.color = color
        this.mixMode = mixMode
        this.createElement()
    }

    createElement() {
        let point = document.createElement("div")
        this.addClasses(point)
        document.querySelector("body").appendChild(point)
    }

    addClasses(point) {
        point.classList.add("point")
        point.style.top = `${this.y}px`
        point.style.left = `${this.x}px`
        point.style.backgroundColor = this.color
        point.style.height = point.style.width = `${this.size}px`
        if (this.mixMode) point.style.mixBlendMode = this.mixMode
    }

    static move(min, max) {
        const points = document.querySelectorAll(".point")
        let offset = 0;
        points.forEach((point) => {
            offset = Math.random() * (max - min) + min
            point.style.top = `${parseInt(point.style.top, 10) + offset}px`
            point.style.left = `${parseInt(point.style.left, 10) + offset}px`
        })
        requestAnimationFrame(() => {Point.move(-15, 15)})
    }

    static deleteElements(maxCount) {
        if (document.querySelector("body").childElementCount >= maxCount) {
            document.querySelector(".point").remove()
        }
    }

}

export default Point;