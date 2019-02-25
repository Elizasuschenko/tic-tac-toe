import React from 'react';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count: 0,
            mainArr: Array(9).fill(null),
            winner: '0',
            gamer: 'X',
            gameOver: false,
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
            [2, 5, 8],
            [0, 3, 6]
        ]
        for(const position of winArr){
            const [a, b, c] = [...position]
            const {mainArr} = this.state
            if(mainArr[a] === mainArr[b]
                && mainArr[b] === mainArr[c]
                && mainArr[c] !== null ){
                this.setState(() => {
                    return {
                        text: 'Победитель',
                        gamer: this.state.winner,
                        gameOver: true
                    }
                })

            }

        }
        function friend(number) {
            return number !== null
        }
        if(this.state.mainArr.every(friend)){
            this.setState(() => {
                return {
                    text: 'Победила дружба',
                    gamer: null,
                    gameOver: true
                }
            })
        }
    }
    setCell(index){
        if(this.state.gameOver === true){
            return
        }
        let gamer = this.state.winner
        const winner = this.state.count % 2? '0' : 'X'
        if (this.state.mainArr[index]) { return }
        let mainArr = [...this.state.mainArr]
            mainArr[index] = winner
            this.setState(() => {
                return {
                    mainArr: mainArr,
                    count: this.state.count + 1,
                    winner: winner,
                    gamer: gamer
                }
            }, () => this.win())
            console.log(this.state)
    }

    getCell(index){
        const { mainArr } = this.state;
        return (<React.Fragment>  {mainArr.map((cell, index) => (
                <span
                    keys={index}
                    onClick={() => this.setCell(index)}
                >
                    {this.state.mainArr[index]}
                </span>
            )
        )

        } </React.Fragment>)

    }
    reset(){
        document.querySelector('section').style.pointerEvents = 'auto'
        this.setState(() => {
            return {
                count: 0,
                mainArr: Array(9).fill(null),
                winner: 'X',
                text: 'Сейчас ходит',
                gamer: 'X',
                gameOver: false
            }
        })

    }
    render(){
        return (
            <div>
                <h1>{this.state.text} {this.state.gamer}</h1>
                <section>
                        {this.getCell()}
                </section>
                <button onClick={() => this.reset()}>Новая Игра</button>
            </div>
        )
    }
}
export default App