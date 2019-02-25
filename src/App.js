import React from 'react';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count: 0,
            mainArr: Array(9).fill(null),
            winner: 'X',
            gamer: 'X',
            text: 'Сейчас ходит'
        }

        this.getCell = this.getCell.bind(this)
        this.setCell = this.setCell.bind(this)
        this.win = this.win.bind(this)
    }
    win(){
        let winArr = [
            [3, 4, 5],
            [6, 7, 8],
            [2, 4, 6],
            [0, 1, 2],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8]
        ]
        for(const position of winArr){
            const [a, b, c] = [...position]
            if(this.state.mainArr[a] === this.state.mainArr[b] && this.state.mainArr[b] === this.state.mainArr[c] && this.state.mainArr[c] !== null ){
                this.setState(() => {
                    return {
                        text: 'Победитель',
                        gamer: this.state.gamer
                    }
                })
                document.querySelector('section').style.pointerEvents = 'none'
            }

        }

    }
    setCell(index){
        let gamer
        const winner = this.state.count % 2? '0' : 'X'
        winner === 'X'? gamer = '0' : gamer = 'X'
        if(this.state.mainArr[index] === null){
            let mainArr = this.state.mainArr
            mainArr[index] = winner
            this.setState(() => {
                return {
                    mainArr: mainArr,
                    count: this.state.count + 1,
                    winner: winner,
                    gamer: gamer
                }
            })
            console.log(this.state)
        }
        function friend(number) {
            return number !== null
        }
        if(this.state.mainArr.every(friend)){
            this.setState(() => {
                return {
                    text: 'Победила дружба',
                    gamer: null
                }
            })
        }
        this.win()

    }

    getCell(index){
        return <span onClick={() => this.setCell(index)}>{this.state.mainArr[index]}</span>
    }
    reset(){
        document.querySelector('section').style.pointerEvents = 'auto'
        this.setState(() => {
            return {
                count: 0,
                mainArr: Array(9).fill(null),
                winner: 'X',
                text: 'Сейчас ходит',
                gamer: 'X'
            }
        })

    }
    render(){
        return (
            <div>
                <h1>{this.state.text} {this.state.gamer}</h1>
                <section>
                    <div className="row">
                        {this.getCell(0)}
                        {this.getCell(1)}
                        {this.getCell(2)}
                    </div>
                    <div className="row">
                        {this.getCell(3)}
                        {this.getCell(4)}
                        {this.getCell(5)}
                    </div>
                     <div className="row">
                        {this.getCell(6)}
                        {this.getCell(7)}
                        {this.getCell(8)}
                    </div>
                </section>
                <button onClick={() => this.reset()}>Новая Игра</button>
            </div>
        )
    }
}
export default App