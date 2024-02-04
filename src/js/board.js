
class Board {
    constructor (collumn, row, data = []) {
        this.row = row
        this.collumn = collumn
        this.size = 100
        this.spacing = 20
        this.data = data
        this.hovering = false
        this.hovered = {x:0,y:0}

        if(data.length == 0) {
            for(let i=0; i<boardSize; i++) {
                let push = []
                for(let j=0; j<boardSize; j++){
                    push.push(0)
                }
                this.data.push(push)
            } 
        }
    }  

    draw() {
        let digestedCollumn = this.spacing + this.collumn * (this.size + this.spacing)
        let digestedRow = (canvas.height / 2 - this.size / 2 ) - this.row * (this.size + this.spacing)

        if(MOUSE_POSITION.x > digestedCollumn && MOUSE_POSITION.x < (digestedCollumn + this.size) && MOUSE_POSITION.y > digestedRow && MOUSE_POSITION.y < (digestedRow + this.size)) {
            this.hovering = true;
        } else {
            this.hovering = false;
        }

        ctx.fillStyle = '#f0d9b5'
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000'


    
        ctx.translate(digestedCollumn, digestedRow)
        ctx.fillRect(0, 0, this.size, this.size)
        ctx.strokeRect(0, 0, this.size, this.size)

        ctx.beginPath()
        let sides = this.size / (boardSize + 2);
        let gridSize = (this.size - sides * 2) / (boardSize - 1);
        for(let i = 0; i < boardSize - 1; i++) {
            for(let j = 0; j < boardSize - 1; j++) {
                ctx.lineTo(sides + j * gridSize, sides + i * gridSize)
                ctx.moveTo(sides + (j + 1) * gridSize, sides + (i + 1) * gridSize)
            }
        }

        ctx.strokeRect(sides, sides, gridSize * (boardSize - 1), gridSize * (boardSize - 1))
        ctx.stroke()
        ctx.closePath()

        for(let i = 0; i < this.data.length; i++) {
            for(let j = 0; j < this.data[i].length; j++) {
                if(this.hovering) {
                    if(
                        MOUSE_POSITION.x > (digestedCollumn + sides + i * gridSize - (gridSize / 2 - 1)) &&
                        MOUSE_POSITION.x < (digestedCollumn + sides + i * gridSize + (gridSize / 2 - 1)) &&
                        MOUSE_POSITION.y > (digestedRow + sides + j * gridSize - (gridSize / 2 - 1)) &&
                        MOUSE_POSITION.y < (digestedRow + sides + j * gridSize + (gridSize / 2 - 1))
                    ) {
                        this.hovered = {x: j, y:i}
                    }
                }
                if(this.data[i][j] != 0) {
                    ctx.beginPath()
                    ctx.fillStyle = (this.data[i][j] % 2 == 0) ? '#fff' : '#000'
                    ctx.arc(sides + j * gridSize, sides + i * gridSize, gridSize / 2 - 1, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.closePath()
                } else {
                    if(this.hovered.x == i && this.hovered.y == j && this.hovering) {
                        let newData = JSON.stringify(this.data)
                        newData = JSON.parse(newData);
                        newData[i][j] = (present == 1) ? 2 : 1;
                        resetCheckBoard();
                        clearTaken(newData)

                        if(invalidMove(newData, i, j) == 1 && !invalidBoard(newData, backup)) {
                            ctx.beginPath()
                            ctx.fillStyle = (present == 2)?'#00000080':'#FFFFFF80'
                            ctx.arc(sides + j * gridSize, sides + i * gridSize, gridSize / 2 - 1, 0, Math.PI * 2)
                            ctx.fill()
                            ctx.closePath()
                            if(MOUSE_DOWN) {
                                copyBoard(backup, this.data);
                                let new_data = JSON.stringify(this.data)
                                new_data = JSON.parse(new_data)
                                if(!triggered) {
                                    present = (present == 1) ? 2 : 1
                                }
                                new_data[i][j] = present
                                newBoard(this.row, this.collumn, new_data)
                                triggered = true;
                            } else {
                                triggered = false;
                            }
                        } else {
                            ctx.beginPath()
                            ctx.fillStyle = '#ff000080'
                            ctx.arc(sides + j * gridSize, sides + i * gridSize, gridSize / 2 - 1, 0, Math.PI * 2)
                            ctx.fill()
                            ctx.closePath()

                        }
                    }
                }
            }
        }

    }
}