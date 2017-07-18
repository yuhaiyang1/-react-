import React, { Component } from 'react';
import {render} from 'react-dom';
 class Page extends Component {
  constructor(props) {
    super(props);
    this.state ={
      current: 1,
      value : '',
      len: 5
    }

  }
  //点击跳转
  handClick(num){
    this.setState({current:  num})
  }

  handChange(e){
    this.setState({value: Number(e.target.value)})
  }
  selectChange(e){
    this.setState({len: Number(e.target.value)})
  }
  //下一页
  goNext(){
    let cur = this.state.current;
    if(cur<this.props.total){
      this.setState({current: cur+1});
    }
  }
  //上一页
  goPrev(){
    let cur =this.state.current;
    if(cur>1){
      this.setState({current: cur-1})
    }
  }
  //输入跳转
  goPage(){
    var val = this.state.value;
       if(!/^[1-9]\d*$/.test(val)){
           alert('页码只能输入大于1的正整数');
       }else if(parseInt(val) > parseInt(this.props.total)){
           alert('没有这么多页');
       }else{
           this.setState({current : val});
       }
  }
  render() {
        let total = this.props.total;
        let cur = this.state.current;
        let items = [];
        let begin;
        if(total > 5){
            if(cur >= (total-2)){
                begin = total - 4;
            }else if(cur <= 3){
                begin = 1;
            }else{
                begin = cur - 2;
            }
        }else{
            this.state.len = total;
            begin = 1;
        }
        for(let i = 0; i < this.state.len; i ++){
            let cur = this.state.current;
            let showI = begin + i;
            if(cur == showI){
                items.push({num : showI, cur : true});
            }else{
                items.push({num : showI, cur : false});
            }

        }
        return  <div className="ui-pagnation">
                    <a className={this.state.current == 1? 'prev disable' : 'prev'} onClick={this.goPrev.bind(this)}></a>
                    <span className="pagnation-cols">
                        {
                            items.map((item)=>{
                                console.log(item);
                                return <a onClick={this.handClick.bind(this,item.num)} className={item.cur? 'num current' : 'num'}>{item.num}</a>
                            })
                        }
                    </span>
                    <a className={this.state.current == this.props.total? 'next disable' : 'next'} onClick={this.goNext.bind(this)}></a>
                    <div className="fl">
                        共
                        <span className="num-total">{total}</span>
                        页，到第
                        <input type="text" value={this.state.value} onChange={this.handChange.bind(this)} />
                        页
                    </div>
                    <select value={this.state.len+''} onChange={this.selectChange.bind(this)}>
                      <option value='5'>5条/页</option>
                      <option value='10'>10条/页</option>
                      <option value='15'>15条/页</option>
                    </select>
                    <a onClick={this.goPage.bind(this)} className="page-go">跳转</a>
                </div>
  }
}

render(<Page total='100'/>,document.getElementById('main'));
