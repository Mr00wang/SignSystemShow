import React,{Component} from "react";
import {reqGetRecord} from "../../api";
import {message, Table} from "antd";
import storageUtils from "../../utils/storageUtils";
import './record.less'
export class Record extends Component {
    state = {
      records:[],
    };
    /*
    初始化Table所有列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                width:20,
                title: '姓名',
                dataIndex: 'memberName', //显示数据对应的属性名
            },
            {
                width:100,
                title: '签到时间',
                dataIndex: 'getIntoTime',
                /*defaultSortOrder: 'descend',
                sorter: (a, b) => a.place - b.place,*/
            },
            {
                width:20,
                title: '累计时间',
                dataIndex:'totalTime',
            },

        ]
    };

    /*
    为第一次render()准备数据
     */
    componentWillMount() {
        this.initColumns()
    }
    getRecord = async () => {
        const result = await reqGetRecord(storageUtils.getPlace());
        const records = result.data;
        console.log(records);
        if(result.error_code === 57){
            this.setState({
                records:records
            })
        }else{
            message.error("记录获取失败")
        }
    };

    componentDidMount() {
        this.getRecord()
    }

    render() {
        const {records} = this.state;
        return(
            <div className='record'>
                <h1>签到记录</h1>
                <Table
                    bordered={true}
                    rowKey='id'
                    dataSource={records}
                    columns={this.columns}
                    pagination={false}
                />


            </div>

        )
    }
}

