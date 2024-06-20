import commonAPI from "./commonAPI";
import serverURL from "./serverURL";

export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

export const loginAPI = async (reqBody)=>{ 
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

export const addProjectAPI = async (reqBody,reqHeader)=>{ 
    return await commonAPI("POST",`${serverURL}/project/add`,reqBody,reqHeader)
}

export const getHomeProjectAPI = async ()=>{ 
    return await commonAPI("GET",`${serverURL}/home-projects`,"")
}

export const getAllProjectAPI = async (searchKey,reqHeader)=>{ 
    return await commonAPI("GET",`${serverURL}/all-projects?search=${searchKey}`,"",reqHeader)
}
export const getUserProjectAPI = async (reqHeader)=>{ 
    return await commonAPI("GET",`${serverURL}/user-projects`,"",reqHeader)
}

export const editProjectAPI = async (pid,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/project/${pid}/edit`,reqBody,reqHeader)
}


export const removeProjectAPI = async (pid,reqHeader)=>{
    return await commonAPI("DELETE",`${serverURL}/project/${pid}/remove`,{},reqHeader)
}

export const editUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/user/edit`,reqBody,reqHeader)
}

