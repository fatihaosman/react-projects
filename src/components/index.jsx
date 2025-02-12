// single selection
//multiple selection
import './style.css'
import data from './data';
import { useState } from "react";

export default function Accordian() {
  const [selected, setSelected] = useState(null);  {/*we started with this because we wanted like when the stareacte of some thing is this then take action like display something */}
  const[enableMultiSelection,setEnableMultiSelection] = useState(false) ;
  const [multiple,setMultiple] = useState ([]); /*storing selected questions */

  function handleSingleSelection(getCurrentId){
  //  console.log(getCurrentId);

   setSelected(getCurrentId === selected ? null : getCurrentId) ; {/*to enable closing of the button when clicked again*/}

  }
  function handleMultiSelection(getCurrentId){
    let copyMultiple = [...multiple]; /*WE WANT TO STORE the selected questions,   so we are storing in a variable from an array*/
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId)     /*cheking the current id selected  and if it was already selected before */


    /*here we are cheking  if the question selected is in multiple-meaning it was selected b4-if it wasnt push it to multiple if it was slice it off */
    if(findIndexOfCurrentId === -1)  copyMultiple.push(getCurrentId)
      else copyMultiple.splice(findIndexOfCurrentId, 1) /* remove only one id */

    setMultiple(copyMultiple);
  }

  return (
    <div className="wrapper">
      <button onClick={()=> setEnableMultiSelection(!enableMultiSelection)}>Enable multiSelection</button>
      {/*If enableMultiSelection is true, it renders the <div>Multi-selection enabled</div>.
         If enableMultiSelection is false, nothing is rendered. 
         enableMultiSelection is a boolean expression it start as false whne button is clicked it becomes true enabling the message to be displayed
       */}
      {enableMultiSelection && <div className='message'>Multi-selection enabled</div>}
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">{/*THIS CONTAINS ALL THE WORDS-LIKE FROM DATA ARRAY ID LETS SAY 1 */}
              <div onClick={ enableMultiSelection ? ()=> handleMultiSelection(dataItem.id) :  ()=> handleSingleSelection(dataItem.id)} className="title">  {/*THIS NOW IS JUST FOR THE TITLE  */}
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {
                /*so when a question is selected or it isnt in the multiple selected then display answer or add it to multiple*/
                // selected == dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                // <div className='content'>{dataItem.answer}</div>
                // :null
                  enableMultiSelection
                    ? multiple.indexOf(dataItem.id) !== -1 &&(
                      <div className='content'>{dataItem.answer}</div>
                    )
                    : selected == dataItem.id &&(
                      <div className='content'>{dataItem.answer}</div>
                    )
                
      
                /*
                If multi-selection is enabled, it only checks multiple, ignoring selected.
                If multi-selection is disabled, it only checks selected, ignoring multiple.
                The && operator short-circuits, meaning:

                  If the left-hand side is true, the right-hand side executes and returns.
                  If the left-hand side is false, the right-hand side does not execute.
                 */
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
