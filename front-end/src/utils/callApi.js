import Axios from 'axios'

export const callAPIWithFileData=(method,url,data=null)=>{
    const object={
        method,
        url,
        data,
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return Axios(object)

}













const callApI=(method,url,data=null)=>{
    const object={
        method,
        url,
        data
    }
    return Axios(object)

}
export default callApI


