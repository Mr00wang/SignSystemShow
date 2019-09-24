import React, {Component, MouseEvent as ev} from 'react';
import {Button, Drawer,Icon} from "antd";
import './place.less'
import Content from "./content";
export default class Place extends Component{
    constructor (props) {
        super(props);
        this.seat = React.createRef()
    }
    state = {
        visible: false,
        data: [],
    };

    showDrawer = () => {
        console.log("调用");
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    pageY;

    mousePosition = (e) => {
        if(e.pageX || this.pageY){  //ff,chrome等浏览器
            //返回一个多值类型
            return{x:e.pageX ,y:e.pageY};
        }else{
            return{  //ie浏览器
                x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y:ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        }
    };


    render() {
        return (
            <div className='place'>
                <Button type="primary" onMouseOver={this.showDrawer} >
                    座 位 分 布
                </Button>
                <Drawer
                    // bodyStyle={{backgroundColor:'red'}}
                    title={
                        <div style={{textAlign:'center'}}>
                            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" style={{width:20,height:20}}/>
                            &nbsp;&nbsp;
                            <span style={{fontSize:30}}>座 位 分 布</span>
                            &nbsp;&nbsp;
                            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                        </div>

                    }
                    //width={450}
                    placement="top"
                    height='480px'
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                   // style={{ position: 'absolute'}}
                >
                    <Content key={Math.random()}  ref={this.seat}/>
                </Drawer>
            </div>
        );
    }
}