import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {                         // Declaring a functional component Square  // render (){} only in class component      
  function handleClick(){
    console.log(props.index);
    props.onClick();
  }
  return (                                        // returns ( what to render ) 
    <button className="square"                  // button is defined with className ="square" & onclick event that calls this.prop.onClick() and Displays props.value on btn
      onClick={() => handleClick()}>
      {props.value}
    </button>
  );

}                                                       // Square Component ends here

class Board extends React.Component {                 // Board Component Starts here
  renderSquare(i) {                                   // renderSquare() will render a single square component
    return (
      <Square
        index={
          i
        }
        value={
          this.props.squares[i]
        }                           // passes 2 props : Value as squares[i] & onclick
        onClick={
          () => this.props.onClick(i)
        }
      />
    );
  }

  render() {
    const title = "Tic-Tac-Toe";
    return (                                                            // returns 3 rows with 3 squareComponent in each row by calling renderSquare(i)
      <div className="board">
        <div className="title"><h3>{title}</h3></div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}                                                 // Board component ends here

class Game extends React.Component {              // Game component 
  constructor(props) {
    super(props);
    this.state = {                                // state has array of object ; and in that obj there
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = (this.state.xIsNext ? 'X' : 'O');
    }
    return (                                      // renders <Board/>
      <div className="game">
        <div className="game-board">
          < Board
            squares={
              current.squares
            }
            onClick={
              (i) => this.handleClick(i)
            }
          />
        </div>
        <div className="game-info">
          <div><h2> Next player: {status} </h2></div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}                                                 // End of Game component

function calculateWinner(squares) {
  const lines = [                                 // conditions to check if someone won or not
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
