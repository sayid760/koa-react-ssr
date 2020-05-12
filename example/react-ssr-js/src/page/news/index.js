import React, { Component } from 'react';
import './index.less'

const mockData = {
  1: `aaaaaaaaaaaaaaaaaaaaaaa`,
  2: `bbbbbbbbbbbbbbbbbbbbbbb`,
  3: `ccccccccccccccccccccccc`,
  4: `ddddddddddddddddddddddd`,
  5: `eeeeeeeeeeeeeeeeeeeeeee`
}

class News extends Component {
  constructor (props) {
    super(props);
  }
  static getInitialProps = (ctx) => {
    const newsId = __isBrowser__ ? ctx.match.params.id : ctx.params.id
    return Promise.resolve({
      newsDetail: mockData[newsId]
    })
  }
  goback = () => {
    window.history.go(-1)
  }
  render () {
    return (
      <div>
        <button onClick={this.goback} style={{marginTop:'20px'}}>返回</button>
        <div className='news-container' >
          {this.props.newsDetail}
        </div>
      </div>
    )
  }
}

export default News
