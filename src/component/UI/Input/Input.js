import classes  from './Input.module.css';
import React from 'react'
import Aux from '../../../hoc/Auxiliary';
import DatePicker from 'react-datepicker';
import * as DatePickerCSS from 'react-datepicker/dist/react-datepicker.css'
const inputField=(props)=>
{
    let inputfield=null;
    const CSSClass=[classes.InputElement,props.cssFile]
    const touched=props.istouched
    const valid=props.isValid

    if(touched && !valid)
    {
        CSSClass.push(classes.InvalidElement)
    }

    
   

    switch(props.typeOfField)
    {
        case('input'):
        
             inputfield=<input className={CSSClass.join(' ')} {...props.configureFile} value={props.value} onChange={props.changed}/>
            break;
        case('TextArea'):
            inputfield=<input className={CSSClass.join(' ')} {...props.configureFile} value={props.value}  onChange={props.changed}/>
            break;
        case('password'):
            inputfield=<input className={CSSClass.join(' ')} {...props.configureFile} value={props.value}  onChange={props.changed}/>
            break;
        case('Date'):
           // inputfield=<DatePicker selected={"1999-09-25"} onChange={date=>props.changed(date)} dateFormat='yyyy-MM-dd'/>  
         
           inputfield=<input className={CSSClass.join(' ')} {...props.configureFile} value={props.value}  onChange={props.changed}/>
   
            
            break;
        case('Radio'):
            const radioList=props.configureFile.Wraper
            inputfield=[]
            console.log("d")
            //inputfield.push(<input className={CSSClass.join(' ')} name={radioList.name} value={radioList.value[0]}/>
            for(let keys=0 ;keys<3;keys++)
            {
            inputfield.push(<div><input type="radio" name={radioList.name} value={radioList.value[keys]} onChange={props.changed}/>{radioList.display[keys]}<br/></div>)
            }
            inputfield=<div style={{display:"flex",justifyContent:"space-around",height:"100%",width:"100%"}}>
                <Aux>{inputfield}</Aux>
            </div>
            break;
        case('Select'):
      
            inputfield= (<select
                className={CSSClass.join(' ')}
            
            onChange={props.changed}>

            {props.configureFile.options.map(option => {
              
               return (<option key={option.name} value={option.name}>
                    {option.name}
                </option>)
                })}
                
        </select>)
            break;
        default:
            inputfield = <input
            className={CSSClass.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
    }

    return inputfield
}

export default inputField