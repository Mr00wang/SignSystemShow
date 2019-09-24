import React,{Component} from 'react';
import './inform.less'
import {reqGetInform} from "../../api";
import {message} from "antd";
import storageUtils from "../../utils/storageUtils";
export default class Inform extends Component{
    state = {
        inform:[{}],
    }
    componentDidMount() {
       this.getInform()
    }

    getInform = async () => {

        const request = await reqGetInform(storageUtils.getPlace());
        if(request.error_code === 17){
            const inform = request.data
            this.setState({
                inform:inform
            })

        }else{
            message.error(request.msg);
        }
    }
    render() {
        const {inform} = this.state;
        const html = inform[0].content;
        return(
            <div className='inform'>
                <h1>公 告</h1>
                <div className='inform-content'>
                    <span dangerouslySetInnerHTML={{__html: html}} style={{padding:10,margin:20}}></span>
                    {/*<span > <h1 style={{padding:10,size:20}}>339公告好好学习天天向上</h1> </span>*/}
                </div>

            </div>
        )
    }
}