import { useState } from "react";
import  mediaUpload  from "../utils/mediaUpload.jsx";

export default function TestPage() {

    // const [count, setCount] = useState(150);
    // const [status, setStatus] = useState("online");
    // console.log(count);

    const [file, setFile] = useState(null);

    async function uploadImage() {

        const link = await mediaUpload(file);
        console.log(link);


    }

    return (
        // <div className="w-full h-full flex justify-center items-center">
        //     <div className="w-[500px] h-[500px] bg-amber-100 text-white flex justify-center flex-col items-center gap-[25px]">
        //         <div className="flex justify-center items-center gap-[20px]">
        //             <button onClick={
        //                 () => {
        //                     console.log("Decrement button clicked");
        //                     setCount(count - 1);
        //                 }
        //             } className="w-[100px] bg-accent h-[40px] rounded-lg">
        //                 -
        //             </button>
        //             <span className="text-5xl text-accent">
        //                 {count}
        //             </span>
        //             <button onClick={
        //                 () => {
        //                     console.log("Increment Button clicked");
        //                     setCount(count + 1);
        //                 }
        //             } className="w-[100px] bg-accent h-[40px] rounded-lg">
        //                 +
        //             </button>
        //         </div>
        //         <div className="flex flex-col justify-center items-center gap-[20px]">
        //             <span className="text-5xl text-accent">
        //                 {status}
        //             </span>
        //             <div className="flex flex-row gap-[20px]">
        //                 <button onClick={() => setStatus("online") } className="w-[100px] bg-accent h-[40px] rounded-lg">
        //                     online
        //                 </button>
        //                 <button onClick={() => setStatus("offline") } className="w-[100px] bg-accent h-[40px] rounded-lg">
        //                     offline
        //                 </button>
        //                 <button onClick={() => setStatus("busy") } className="w-[100px] bg-accent h-[40px] rounded-lg">
        //                     busy
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="w-full h-full flex justify-center items-center">
            <input type="file" onChange={
                (e) => {
                    setFile(e.target.files[0]);
                    console.log(e.target.files[0]);
                }
            } />
            <button onClick={uploadImage} className="w-[100px] bg-accent h-[40px] rounded-lg">
                Upload
            </button>
        </div>
    );
}