import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Circle(props) {
  if (!props.isDisabled) {
    return (      
      <button
        className={"circle " + props.value}
        onClick={props.onClick}
      >
      </button>
    )
  }
  return (      
    <button
      disabled
      className={"circle " + props.value}
      onClick={props.onClick}
    >
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: [...Array(35)].map(_=>({value: null, isDisabled: true})).concat(
        [...Array(7)].map(_=>({value: null, isDisabled: false}))
      ),
      redIsNext: true,
    };
  }

  handleClick(i) {
    let circles = this.state.circles.slice();

    if (calculateWinner(circles)) {
      return;
    }
        
    let circle = circles[i];
    circle.value = this.state.redIsNext ? 'red' : 'green';
    circle.isDisabled = true;

    if (circles.filter((e) => e.isDisabled).length === 42 && i > 6)
    {
      const innerRow = rows.filter((e) => e.includes(i - 7))[0];    
      innerRow.forEach((e) => circles[e].isDisabled = false);
    }

    this.setState({
      circles: circles,
      redIsNext: !this.state.redIsNext,
    })
  }

  renderSquare(i) {
    return (
      <Circle 
        value={this.state.circles[i].value}
        isDisabled={this.state.circles[i].isDisabled} 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.circles);    
    let status;

    if (winner) {
      status = 'Winner: ' + winner;    
    } else {      
      status = 'Next player: ' + (this.state.redIsNext ? 'red' : 'green');    
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
        </div>
        <div className="board-row">
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
        </div>
        <div className="board-row">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
        </div>
        <div className="board-row">
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
        </div>
        <div className="board-row">
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

const rows = [
  [0,1,2,3,4,5,6],
  [7,8,9,10,11,12,13],
  [14,15,16,17,18,19,20],
  [21,22,23,24,25,26,27],
  [28,29,30,31,32,33,34],
  [35,36,37,38,39,40,41]
];


function calculateWinner(rows) {
  for (let i = 41; i > 20; i--) {
    if ((i + 1) % 7 === 0 || (i + 1) % 7 > 3) {
      if (rows[i].value === rows[i - 7].value &&
          rows[i].value === rows[i - 7 - 7].value && 
          rows[i].value === rows[i - 7 - 7 - 7].value
      ) {
        return rows[i].value;     
      } 
      
      if (rows[i].value === rows[i - 8].value &&
          rows[i].value === rows[i - 8 - 8].value && 
          rows[i].value === rows[i - 8 - 8 - 8].value
      ) {
        return rows[i].value;        
      }

      if (rows[i].value === rows[i - 1].value &&
          rows[i].value === rows[i - 1 - 1].value && 
          rows[i].value === rows[i - 1 - 1 - 1].value
      ) {
        return rows[i].value;        
      }      
    } else {
      if (rows[i].value === rows[i - 7].value &&
        rows[i].value === rows[i - 7 - 7].value && 
        rows[i].value === rows[i - 7 - 7 - 7].value
      ) {
        return rows[i].value;     
      } 
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
