import { useState } from "react";
import classes from "./Seats.module.css";

function Seats(props) {
  var i = 0;
  var seatsArray = props.seatsArray;
  const [update, setUpdate] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCol, setSelectedCol] = useState(null);
  function selectSeat(rowIndex, colIndex) {
    if(seatsArray[rowIndex][colIndex] === 1) return;

    if(seatsArray[rowIndex][colIndex] === 2){
        seatsArray[rowIndex][colIndex] = 0;
        setSelectedCol(null);
        setSelectedRow(null);

    }
    else {
        seatsArray[rowIndex][colIndex] = 2;
        if(selectedRow != null){
            seatsArray[selectedRow][selectedCol] = 0;
        }
        setSelectedRow(rowIndex);
        setSelectedCol(colIndex);
    }

    setUpdate(!update);
    props.setSeatsArray(seatsArray);
  }

  function getClass(seat) {
    switch (seat) {
        case 0:             
            return classes.empty;
        case 1:
            return classes.reserved;
        case 2:
            return classes.selected;
        default:
            return classes.empty;
    }
  }
  return (
    <div className={classes.seats}>
      {seatsArray &&
        seatsArray.map((row, rowIndex) => {
          return (
            <div key={`${rowIndex} ${i++}`} className={`flex`}>
              {row.map((seat, colIndex) => {
                return (
                  <div
                    key={`${rowIndex}x${colIndex}`}
                    className={`${(update || !update) && getClass(seat)} ${
                      classes.seat
                    }`}
                    onClick={() => selectSeat(rowIndex, colIndex)}
                  >
                    {`${rowIndex}x${colIndex}`}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default Seats;
