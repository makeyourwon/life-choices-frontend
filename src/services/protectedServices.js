
import * as tokenService from './tokenService'
import axios from 'axios'

// const baseUrl = `http://localhost:3000`
const baseUrl = `https://lifechoices-a9061aaee4a7.herokuapp.com`

async function getUserProfile(){
    try {
        const res = await axios.get(`${baseUrl}/profiles`, {
        headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
        return await res.json()
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error){
            throw Error(error.response.data.error)
            }
    }
}

async function singleProfile(){
    try{
        const user = tokenService.getProfileFromToken()
        const res = await axios.get(`${baseUrl}/profiles/${user}`,{headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
        //console.log(res.json(), 'res')
        return res.data
    }catch{
        throw Error
    }
}

async function getPosts(){
    try {
        const res = await axios.get(`${baseUrl}/posts`,{
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
            return res.data
    } catch (error) {
        throw Error   
    }
}

async function updatePost(id, updateInfo){
    try {
        const res = await axios.put(`${baseUrl}/posts/${id}`,updateInfo, {
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
            return res
    } catch (error) {
        throw Error(error)        
    }
}

async function getSinglePost(id) {
    try {
        const res = await axios.get(`${baseUrl}/posts/${id}`, {
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }
        })

        return res.data.post
    } catch (error) {
        // console.error("Error in getSinglePost:", error)
        throw error
    }
}

async function updatePostChoice(id, choiceField, username) {
    const update = {
        $push: { [choiceField]: username }
    };
    try {
        const res = await axios.put(`${baseUrl}/posts/${id}`, update, {
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }
        });
        return res.data.post;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Server responded with an error:", error.response.status, error.response.data);
            throw new Error(`Server Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received from server:", error.request);
            throw new Error("No response received from server.");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", error.message);
            throw new Error(`Error in request setup: ${error.message}`);
        }
    }   
    // } catch (error) {
    //     console.error("Error updating post choice:", error);
    //     throw error;
    // }
}

async function getMultiplePosts(arr){
    try {
        const requests = arr.map(id=>{
            return axios.get(`${baseUrl}/posts/${id}`, {
                headers: { Authorization: `Bearer ${tokenService.getToken()}` }
            }
        )})

        const responses = await Promise.all(requests);

        return responses.map(res => res.data.post)
    } catch (error) {
        console.error("Error in getMultiplePosts:", error);
        throw error;}
}

async function createPost(updateInfo){
    try {
        const res = await axios.post(`${baseUrl}/posts`,updateInfo,{
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
            return res
        
    } catch (error) {
        throw Error(error)
    }
}

async function deletePost(id){
    try {
        const res = await axios.delete(`${baseUrl}/posts/${id}`, {
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }
        })

    } catch (error) {
        throw Error (error)
    }
}


async function addCommentToId(comment, username, postId){
    // console.log(comment, postId)
    try{
        const res = await axios.post(`${baseUrl}/comments`, {
            comment: comment,
            username: username,
            postId: postId },
            { 
                headers: { Authorization: `Bearer ${tokenService.getToken()}` }
            })
        
        return res 
    }catch (error){
        throw Error(error)
    }

}
    
    
        

async function updatePost(id, updateInfo){
    try {
        const res = await axios.put(`${baseUrl}/posts/${id}`,updateInfo,{
            headers: { Authorization: `Bearer ${tokenService.getToken()}` }})
            return res

    } catch (error) {
        throw Error(error)
    }
}


async function getCommentsfromPostId(postId){
    // try{
    //     const res = await axios.post(`${baseUrl}/posts/${postId}`)

    //     const requests = arr.map(id=>{
    //         return axios.get(`${baseUrl}/posts/${id}`, {
    //             headers: { Authorization: `Bearer ${tokenService.getToken()}` }
    //         })
    //     })
    //     const responses = await Promise.all(requests);
    //     console.log(`all comments for this post:`, responses)
        
    //     return responses.map(res=>res.data.post)
    //      } catch (error) {
    //         console.error("Error in getCommentsfromPostId:", error);
    //         throw error;}

        
    // axios call to look through all Profiles and see if they have all comments with this post 
    // maybe do a promise.all to tie it all together. output as an array of comments
    // 
}


export{
    getUserProfile,
    createPost,
    getPosts,
    getSinglePost,
    singleProfile,
    updatePost,
    deletePost,
    getMultiplePosts,
    addCommentToId,
    getCommentsfromPostId,
    updatePostChoice,
}