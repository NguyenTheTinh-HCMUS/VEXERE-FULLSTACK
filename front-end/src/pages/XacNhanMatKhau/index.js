import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import {POST_KIEMTRAHANTOKEN,POST_THAYDOIMATKHAU} from '../../constants/config.api'
import shortid from 'shortid'
import '../../components/scss/index.scss'
import CustomizedSnackbars from '../../components/snackbars/index'

export default function XacNhanMatKhau(props) {
    const [matKhau, setMatKhau] = useState('')
    const [xacNhanMK, setxacNhanMK] = useState('')
    const [snackBar, setsnackBar] = useState(false)
  
    useEffect(() => {
     let token=props.match.params.token
        token=token.split("'a'").join('.')

        Axios({
            method: 'POST',
            url: POST_KIEMTRAHANTOKEN            ,
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(a=>{}).catch(err=>{
            props.history.push(`/${shortid.generate()}`)
        })

    }, [])
    const handleOnSubmit=(e)=>{
        e.preventDefault()
        if(matKhau===xacNhanMK){
            let token=props.match.params.token
            token=token.split("'a'").join('.')
            Axios({
                method:'POST',
                url: POST_THAYDOIMATKHAU,
                data: {
                    matKhau: matKhau
                },
                headers :{
                    Authorization: `Bearer ${token}`
                }
    
            }).then(a=>{
                setsnackBar(true)
                setTimeout(() => {
                    props.history.push('/auth/login')
                }, 2000);
                
              }).catch(err=>{
                    props.history.push(`/${shortid.generate()}`)
                    
                    })
        }
  
    }
    return (
        <div className='container'>
            <h1 className='text-center mt-5'>ĐẶT LẠI MẬT KHẨU</h1>
              <form onSubmit={handleOnSubmit}>
        <div className="form-group">
        <label htmlFor="exampleInputPassword1">Mật Khẩu</label>
          <input type="password" className="form-control outline" id="exampleInputPassword1" placeholder="Nhập mật khẩu" value={matKhau} 
          onChange={(e)=>setMatKhau(e.target.value)}
          />
        
        </div>
        <div className="form-group">
          <label htmlFor="xacnhamatkhau">Xác Nhận Mật khẩu</label>
          <input type="password" className="form-control outline" id="xacnhamatkhau" placeholder="Xác nhận mật khẩu" value={xacNhanMK}
          onChange={(e)=>{
             
              setxacNhanMK(e.target.value)
            
           
             
            }}
           
          />
            {matKhau!=='' && matKhau!==xacNhanMK && <small id="emailHelp" className="form-text text-danger">Xác nhận chưa khớp</small>}
        </div>
       
        <button type="submit" className="btn btn-primary outline" disabled={(matKhau!=='' && matKhau===xacNhanMK) ? false: true}>Submit</button>
      </form>
      <CustomizedSnackbars open={snackBar} 
      onClose={()=>setsnackBar(false)}
      severity='success'
      message="Mật khẩu đổi thành công"
      />
    
        </div>
      )
}

