import React from 'react'
const checkValidity =( value, rules,keys ) =>{
    let isValid = true;
    
    if ( !rules ) {
        return true;
    }
    let error='';
    
    if ( rules.required ) {
      
        isValid = value.trim() !== '' && isValid;
        
        
            if(keys==="password" && !isValid)
            {
                if(value==='')
                {
                    error="*Please provide password"
                }
            
            }
            else if(keys==="Email")
            {
                if(value==='')
                {
                    error="*Email Field Cannot be Empty"
                }
            
            }
            else if(keys==="FirstName" && !isValid)
            {
                if(value==='')
                {
                    error="*First name cannot be empty"
                }
            }
            else if(keys==="DateOfBirth" && !isValid)
            {
                if(value==='')
                {
                    error="*Please provide DOB"
                }
            }
            else if(keys==="Gender" && !isValid)
            {
                if(value==='')
                {
                    
                    error="*Please Select Gender"
                }
            }
        
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
        
        isValid = pattern.test( value ) && isValid
        if(!pattern.test(value) && value!=='')
        {
            error="*Please Enter Correct Email Format"
        }
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return [isValid,error];
}

export default checkValidity