import React, { Component } from 'react'
import './style.scss'
export class Footer extends Component {
    render() {
        return (
           <footer>
              <div className='footer_top'>
              <div className='container'>
                 
                 <div className='row'>
                     <div className='col-3'>
                         <h1 className='heading'>
                         Về chúng tôi
                         </h1>
                         <div className='items'>
                             <p>Giới Thiệu VeXeRe.com</p>
                             <p>Tuyển dụng</p>
                             <p>Tin tức</p>
                             <p>Liên hệ</p>
                             <p>Chắp Cánh Ước Mơ</p>
                         </div>
                     </div>
                     <div className='col-3'>
                         <h1 className='heading'>
                         Hỗ trợ
                         </h1>
                         <div className='items'>
                             <p>Hướng dẫn thanh toán</p>
                             <p>Quy chế vexere.com</p>
                             <p>Câu hỏi thường gặp</p>
                             <p>Phần mềm hãng xe</p>
                           
                         </div>
                     </div>
                     <div className='col-3'>
                         <h1 className='heading'>
                         Chứng nhận
                         </h1>
                         <div className='items'>
                             <img src='https://storage.googleapis.com/fe-production/images/Home/certificate1.png' />
                             <img src='https://storage.googleapis.com/fe-production/images/Home/certificate3.png' />
                           
                         </div>
                     </div>
                     <div className='col-3'>
                         <h1 className='heading'>
                         Tải ứng dụng VeXeRe
                         </h1>
                         <div className='items'>
                             <img src='https://storage.googleapis.com/fe-production/images/landingpagetet2018/AP-icon.png?v=2' />
                             <img src='https://storage.googleapis.com/fe-production/images/landingpagetet2018/GP-icon.png?v=2' />
                           
                         </div>
                     </div>

                 </div>

           

               
                </div>
              </div>
        <div className='footer_bottom'>
            <div className='container'>
                <h3>Công ty cổ phần Vexere</h3>
                <p>Địa chỉ đăng ký kinh doanh: 8C Chữ Đồng Tử, Phường 7, Quận Tân Bình, Thành Phố Hồ Chí Minh, Việt Nam</p>
                <p>Địa chỉ: Lầu 8,9, Tòa nhà CirCO, 222 Điện Biên Phủ, Quận 3, TP. Hồ Chí Minh, Việt Nam</p>
                <p>Giấy chứng nhận ĐKKD số 0312387105 do Sở KH và ĐT TP. Hồ Chí Minh cấp lần đầu ngày 25/7/2013</p>
                <p>Bản quyền © 2019 thuộc về VeXeRe.Com</p>

            </div>

        </div>
           </footer>
        )
    }
}

export default Footer
