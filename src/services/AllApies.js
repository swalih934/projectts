import base_url from "./base_url";
import commonApi from "./commonApi";

export const  addProjectApi=async(data)=>{
    return await commonApi(`${base_url}/addproject`,"POST","",data)

}

export const getProjectApi=async()=>{
    return await commonApi(`${base_url}/getprojects`,"GET","","")
}

export const deleteProjectApi=async(id)=>{
    return await commonApi(`${base_url}/deletepro/${id}`,"DELETE","",{})
}
export const editProjectApi=async(id,data)=>{
    return await commonApi(`${base_url}/updatepro/${id}`,"PUT","",data)
}


export const toggleTaskApi = async (id) => {
  return await commonApi(`${base_url}/toggle/${id}`, "PATCH");
};
