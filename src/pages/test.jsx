export default function TestPage() {

    let count = 10;

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[500px] h-[500px] bg-amber-100 text-white flex justify-center items-center gap-[25px]">                
                <button onClick={
                    () => {
                        console.log("Decrement button clicked");
                        count = count - 1;
                        console.log(count);
                    }
                } className="w-[100px] bg-accent h-[40px] rounded-lg">
                    -
                </button>
                <span className="text-5xl text-accent">
                    {count} c
                </span>
                <button onClick={
                    () => {
                        console.log("Increment Button clicked");
                        count = count + 1;
                        console.log(count);
                    }
                } className="w-[100px] bg-accent h-[40px] rounded-lg">
                    +
                </button>
            </div>
        </div>
    );
}