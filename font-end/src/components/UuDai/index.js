import React, { Component } from "react";
import './style.scss'
class UuDai extends Component {
  render() {
    return (
      <div className="uudai" id="uudai">
        <div className="container">
          <h2>Ưu điểm nổi bật</h2>
          <div className="silde row">
            <div className="col-4">
                <img src='https://static.vexere.com/production/banners/330/banner-home.png'  />
            </div>
            <div className="col-4">
            <img src='https://static.vexere.com/blog/uploads/2020/03/gps-750x440.png'  />

            </div>
            <div className="col-4">
            <img src='https://static.vexere.com/production/banners/330/banner-trang-chu-(1).png'  />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UuDai;
