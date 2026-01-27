import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigate, useParams } from "react-router";
import { AddWorld, GetWorldById, UpdateWorld } from '../../endpoints/Worlds';


function NewOrEditWorld({editing}) {
    const navigate = useNavigate({});
    const {id: worldId} = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [errText, setErrText] = useState("");

    useEffect(() => {
        if (!worldId) return;
        const fetchData = async () => {
            const preexistingData = await GetWorldById(worldId)

            setTitle(preexistingData.title);
            setDescription(preexistingData.description);
            setContent(preexistingData.content);
        };
        if(worldId) fetchData();
    }, []);

    useEffect(() => {
        const UpdateText = async () => {
            setErrText("")
        }
        UpdateText()
    }, [title, description, content]);

    async function HandleSubmit() {
        if (title === "") {
        setErrText("Title cannot be empty.");
        return;
        }
        if (description === "") {
        setErrText("description cannot be empty.");
        return;
        }
        if (content === "") {
        setErrText("content cannot be empty.");
        return;
        }
    
        if (editing && !worldId) {
            console.error("Missing taskId");
            return;
        }

        if (editing) {
            await UpdateWorld(worldId, title, description, content);
        } else {
            await AddWorld(title, description, content);
        }
    
        navigate("/worldbuilding-collection");
    }

    return (
        <>
            <Header/>
            <div className='w-full h-auto px-[50px]'>
                <div className='mb-[20px] w-full'>
                    <p className='text-black dark:text-white'>Title</p>
                    <input
                    placeholder='Title...'
                    value={title}
                    className='w-full h-[40px] border-2 rounded-[15px] p-[10px] border-[#D0D0D0] dark:border-black bg-[#F4F4F4] dark:bg-[#292929] text-black dark:text-white'
                    type="text" 
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='mb-[20px]'>
                    <p className='text-black dark:text-white'>Description</p>
                    <textarea
                    placeholder='Description...'
                    value={description}
                    className='w-full min-h-[50px] border-2 rounded-[15px] p-[10px] border-[#D0D0D0] dark:border-black bg-[#F4F4F4] dark:bg-[#292929] text-black dark:text-white'
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='mb-[20px]'>
                    <p className='text-black dark:text-white'>Content</p>
                    <textarea
                    placeholder='Content...'
                    value={content}
                    className='w-full min-h-[100px] border-2 rounded-[15px] p-[10px] border-[#D0D0D0] dark:border-black bg-[#F4F4F4] dark:bg-[#292929] text-black dark:text-white'
                    onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <p className='text-[#DF121B]'>{errText}</p>
                <div className="flex flex-col md:flex-row md:w-[400px] justify-between">
                    <button
                    className="w-[150px] h-[40px] border-2 rounded-[15px] border-[#D0D0D0] dark:border-black bg-white dark:bg-[#171717] text-black dark:text-white"
                    onClick={() => {editing ? navigate(`/world/${worldId}`) : navigate("/worldbuilding-collection")}}
                    >Cancel</button>
                    <button
                    className="w-[150px] h-[40px] rounded-[15px] mt-[20px] md:mt-[0] text-white bg-[#0096FF] dark:bg-[#0065AD]"
                    onClick={() => HandleSubmit()}
                    >Submit</button>
                </div>
            </div>
        </>

    )
}
export default NewOrEditWorld
