// single selection
//multiple selection
import './style.css'
import data from './data';
import { useState } from "react";

export default function Accordian() {
  const [selected, setSelected] = useState(null);  {/*we started with this because we wanted like when the stste of some thing is this then take action like display something */}
  const[enableMultiSelection,setEnableMultiSelection] = useState(false) ;
  const [multiple,setMultiple] = useState ([]);

  function handleSingleSelection(getCurrentId){
  //  console.log(getCurrentId);

   setSelected(getCurrentId === selected ? null : getCurrentId) ; {/*to enable closing of the button when clicked again*/}

  }
  function handleMultiSelection(getCurrentId){
    let copyMultiple = [...multiple]; /*WE WANT TO STORE -BUT WHY WRE WE COPYING MULTIPLE*/
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId)
    if(findIndexOfCurrentId === -1)  copyMultiple.push(getCurrentId)
      else copyMultiple.splice(findIndexOfCurrentId, 1)

    setMultiple(copyMultiple);
  }

  return (
    <div className="wrapper">
      <button onClick={()=> setEnableMultiSelection(!enableMultiSelection)}>Enable multiSelection</button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">{/*THIS CONTAINS ALL THE WORDS-LIKE FROM DATA ARRAY ID LETS SAY 1 */}
              <div onClick={ enableMultiSelection ? ()=> handleMultiSelection(dataItem.id) :  ()=> handleSingleSelection(dataItem.id)} className="title">  {/*THIS NOW IS JUST FOR THE TITLE  */}
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {
                selected == dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                <div className='content'>{dataItem.answer}</div>
                :null
              }
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}
