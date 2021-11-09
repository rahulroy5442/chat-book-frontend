import React, { Component } from 'react'

import Aux from '../Auxiliary'
const Errorhandler=(WrrapedComponent,axios)=>{
    

    return(
        class extends Component{
            state={
                error:null
            }
            componentWillMount(){
            
              this.reqInterceptor=  axios.interceptors.request.use(req => {
                    this.setState({error: null});
                    
                    return req;
                });
               this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                  
                    this.setState({error: error.response.data.error});
                });
            }
            componentWillUnmount() {
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }
    
            changeErrorStatus=()=>{
                this.setState({error:null})
            }
            render(){
        
                return(
                    <Aux>
                        
                            {this.state.error?this.state.error.message:null}              
                        

                        <WrrapedComponent {...this.props}/>
                    </Aux>
                )
            }
        }
    )
}

export default Errorhandler;