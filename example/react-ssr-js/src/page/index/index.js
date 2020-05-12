import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './index.less'
import axios from 'axios'

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
        Text: null
    }
  }
  static getInitialProps = async (ctx) => {
    // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
    return  process.env.NODE_ENV === 'development' ? (await axios.get('http://localhost:8000/api/getIndexData')).data : null
  }
  handleDynamicImport () {
    import('./test.js').then((Text) => {
        this.setState({
            Text: Text.default.msg
        })
    })
  }
  render () {
    const { Text } = this.state;
    return (
      <div className='normal'>
         { Text ?  this.state.Text : null}
          <button onClick={this.handleDynamicImport.bind(this)} style={{marginTop:'20px'}}>点击</button>
            <ul className='list'>
              {
                this.props.news && this.props.news.map(item => (
                  <li key={item.id}>
                    <div>文章标题: {item.title}</div>
                    <div className='toDetail'><Link to={`/news/${item.id}`}>点击查看详情</Link></div>
                  </li>
                ))
              }
            </ul>
      </div>
    )
  }
}

export default Home