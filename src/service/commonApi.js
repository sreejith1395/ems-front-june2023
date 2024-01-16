import axios from "axios";

export const commonApi= async(method,url,data,header)=>{
    let config={
        method,
        url,
        data,
        headers:header?header:{"content-type":"application/json"}

    }

   return  await axios(config).then((data)=>{
        return data
    }).catch((err)=>{
        return err
    })
}

