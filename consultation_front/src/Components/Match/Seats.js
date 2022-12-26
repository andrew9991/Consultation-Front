import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import classes from "./Seats.module.css";

function Seats(props) {
  var i = 0;
  const [update, setUpdate] = useState(true);
  const [mouseDown, setMouseDown] = useState(0);
  const userContext = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
    // console.log(props.seatsArray);
    document.body.onmousedown = function() { 
    setMouseDown(mouseDown + 1);
    }
    document.body.onmouseup = function() {
    setMouseDown(mouseDown - 1);
    }
    
    // useEffect(() => {

    //     if(seatsArray.length === 0) return;
    //     // const stadium = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]; 
    //     const start = parseInt(seatsArray.length / 2 - 2);
    //     console.log(start);
        // for (var j = start ; j < start + 6; j++) {
        //     const middleIndex = Math.ceil(seatsArray[j].length / 2);
        //     console.log(seatsArray[8]);
        //     const firstHalf = seatsArray[j].splice(0, middleIndex);   
        //     const secondHalf = seatsArray[j].splice(-middleIndex);
            // console.log(firstHalf, secondHalf);
        //  }
    // }, [seatsArray]);
  function selectSeat(rowIndex, colIndex) {
    if(!userContext.isLoggedIn || user.type !== 2) return;
    
    switch (props.seatsArray[rowIndex][colIndex]) {
        case 1:
            return;
        case 2:
            props.seatsArray[rowIndex][colIndex] = 0;
            break;
        case 3:
            props.seatsArray[rowIndex][colIndex] = 4;
            break;
        case 4:
            props.seatsArray[rowIndex][colIndex] = 3;
            break;
        default:
            props.seatsArray[rowIndex][colIndex] = 2;
            break;
    }
    
    setUpdate(!update);
    props.setSeatsArray((prev) => {
        return [...prev];
    });
  }

  function selectHoveredSeats(rowIndex, colIndex) {
    //check if mouse is clicked
    if(mouseDown === 0) return;
    selectSeat(rowIndex, colIndex);
  }

  function getClass(seat) {
    switch (seat) {
        case 0:             
            return classes.empty;
        case 1:
            return classes.reserved;
        case 2:
            return classes.selected;
        case 3:
            return classes.youReserved;
        case 4:
            return classes.cancelReservation;
        default:
            return classes.empty;
    }
  }
  return (
    <div className={classes.seats}>
      {props.seatsArray &&
        props.seatsArray.map((row, rowIndex) => {
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
                    onMouseOver={() => selectHoveredSeats(rowIndex, colIndex)}
                  >
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
