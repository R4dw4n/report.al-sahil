import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Table = (props) => {

    useEffect(() => {
        console.log(props.data?.grid)
        console.log(props.dataFunctions, "ttt")
    }, [props])
    return (
        <div >
            <table className='flex justify-center m-auto  ' >
                {props.data?.grid.map((oneGrid, i) => {
                    console.log(oneGrid.insideContent?.footer)
                    return (
                        <div key={i} className='flex-1'>
                            <tr className='border border-b-[2px] h-20 flex items-center justify-center border-gray-200' style={oneGrid.insideContent.header.style}>
                                <th className='p-4 text-center' >{oneGrid.insideContent.header.text}</th>
                            </tr>
                            {props.dataSource.map((item, i) => {
                                return (
                                    <tr key={i} className='border flex items-center justify-center  border-gray-200 h-20' style={oneGrid.insideContent?.value.style}>
                                        <td className='p-4 text-center ' >{item[oneGrid.insideContent?.value?.fieldValue]}</td>
                                    </tr>
                                );
                            })}
                            {props.dataFunctions?.map((item, ind) => {
                                console.log(item, "item");
                                return (
                                    < tr key={i} className='border border-t-[2px] border-gray-200 h-20 flex items-center justify-center '>
                                        <td className="  p-1 flex-1 h-full w-[30%] text-center flex-col gap-1 justify-center items-center border-r border-gray-200  " style={oneGrid.insideContent?.footer && oneGrid.insideContent?.footer[ind]?.style} >
                                            <h3 className="pt-[8px] " >{item[oneGrid.insideContent?.value?.fieldValue]} </h3>
                                        </td>
                                    </tr>
                                );
                            })}
                        </div>
                    );
                })}

            </table >

        </div >
    )
}

export default Table
