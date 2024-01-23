import { useState, useEffect } from "react";

const searchForm = (props ) => {
    const [formData, setFormData] = useState({
        search:''
    })

    const handleChange = e =>{
        setFormData({...formData, [e.target.name] : e.target.value})

    }
    console.log(formData)

    







    return(
        <>
        <form className="search-form">
        <input 
        name="search"
        type="text"
        value={formData.search}
        onchange={handleChange}
        />
        </form>
        
        </>
    )
}