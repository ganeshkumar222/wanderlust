import axios from 'axios'

const AxiosService = axios.create({
    baseURL:"http://localhost:8000/",
    headers:{
        "Content-Type":"application/json",
    }
})
AxiosService.interceptors.request.use((config)=>{
   
    let token = sessionStorage.getItem("token")
    console.log(token)
    if(config.authenticate && token){
        console.log("inside authnrticate")
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},(error)=>{
    return Promise.reject(error)
})

export default AxiosService