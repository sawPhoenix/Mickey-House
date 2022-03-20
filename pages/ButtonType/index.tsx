import React from 'react';
import './index.css';
const ButtonType: React.FC = () => {
  return (
    <div>
      {/* <!-- 霓虹效果 --> */}
      <div className="box black">
        <button className="btn one">Hover me</button>
        <button className="btn two">Hover me</button>
        <button className="btn three">Hover me</button>
      </div>
      {/* <!-- 边框效果 --> */}
      <div className="box">
        <button className="draw-btn">Hover me</button>
      </div>
      {/* <!-- 圆角效果 --> */}
      <div className="box">
        <button id="border-btn-btn">Hover me</button>
      </div>
      {/* <!-- 冰冻效果 --> */}
      <div className="box">
        <button className="green frozen">Hover me</button>
        <button className="purple frozen">Hover me</button>
      </div>
      {/* <!-- 镜面效果 --> */}
      <div className="box black">
        <button className="shiny-btn"><span className="shiny-span">Hover me</span></button>
      </div>
      {/* <!-- 加载效果 --> */}
      <div className="box">
        <button className="loading_btn"><span>Hover me</span></button>
      </div>
      {/* <!-- 赛博朋克 --> */}
      <div className="box yellow">
        <button className="cyberpunk_btn"><span>Hover me</span></button>
      </div>
      {/* <!-- 旋转关闭 --> */}
      <div className="box">
        <div className="rotate_close">
          <div className="close_icon"></div>
        </div>
      </div>
    </div>
  )
}

export default ButtonType