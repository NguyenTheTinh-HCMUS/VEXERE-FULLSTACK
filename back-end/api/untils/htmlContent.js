module.exports=(data)=>{
    return `
    <h4>VeXeRe.com xin chào ${data.thongTin.hoTen}</h4>
    <div style="margin-left: 2rem;">
        <p style="
    margin-bottom: 1rem;
">Chúc mừng quý khách đã đặt vé thành công tại VeXeRe.com !</p>
        <p style="
    margin-bottom: 1rem;
">
            <strong>Chuyến Xe</strong> : ${data.di} --&gt; ${data.den}
        </p>
        <p style="
    margin-bottom: 1rem;
">
            <strong>Đầu bến</strong> : ${new Date(data.ngayDi).toLocaleString()} ${data.dauBen}-${data.di}
        </p>
        <p style="
    margin-bottom: 1rem;
">
            <strong>Cuối bến</strong> : ${new Date(data.ngayDen).toLocaleString()} ${data.cuoiBen}-${data.den}
        </p>
        <p style="
    margin-bottom: 1rem;
">
            <strong>Ghế</strong> : ${data.ds_ghe.join(' , ')}
        </p>
        <p style="
    margin-bottom: 1rem;
">
            <strong>Trạm đón</strong> : ${data.tram.ten} - ${data.tram.diaChi}<strong style="
            margin-right: 1rem;
            margin-left: 1rem;
        ">Số điện thoại
            </strong>${data.tram.dienThoai}
        </p>
        <p style="
    margin-bottom: 1rem;
    text-decoration: underline;
">
            Quý khách vui lòng đến trước thời gian xuất phát 30 phút !
        </p>
        <p style="
    color: red;
    margin-left: 5rem;
    margin-bottom: 1rem;
">Chúc quý khách thượng lộ bình an !!!!</p>
    `
}