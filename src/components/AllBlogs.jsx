import { useEffect } from "react"
import { useState } from "react"
import { getAllBlogs } from "../services/allBlogs"
import { BlogPost } from "./BlogPost"
import "./blogs.css"
import { NavBar } from "./NavBar"

export const AllBlogs = () => { 
    const [allBlogs, setAllBlogs] = useState([])

    useEffect(() => {
        getAllBlogs().then((blogsArray) => {
            setAllBlogs(blogsArray)
        })
    }, [])

    return (
        <div className="all-posts-container">
            <div>
               <NavBar />
            </div>
            <div className="header-choices">
                <div className="search-bar">
                    <input className="header_choices" type="text" placeholder="Search For Post..."></input>
                </div>
                <div className="topic-choice">
                    <select name="topics" className="header_choices">
                        <option value="">Choose Topic</option>
                        {[...new Set(allBlogs.map(blog => blog.topic.name))].map(topicName =>  {
                            return (<option value={topicName}>{topicName}</option>)
                    })}
                    </select>
                </div>
            </div>
            <div className="posts-container">
                {allBlogs.map((blog) => {
                    return(
                    <BlogPost blog={blog}/>
                    )
                })
                
                }
            </div>
        </div>
    )
}