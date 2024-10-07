import MenuList from "./MenuList";
import { useState } from "react";
import "./style.css";

interface MenuItemProps {
    item: {
        label: string;
        children?: MenuItemProps['item'][];
    };
}

export default function MenuItem ({item}: MenuItemProps){

    const [displayChildren, setDisplayChildren] = useState<{ [key: string]: boolean }>({});

    function handleChildrenToggle(label){
        setDisplayChildren({
            ...displayChildren,
            [label] : !displayChildren[label]
        })
    }

    console.log(displayChildren);

    return (
        <>
        <li>
        <div style={{display: "flex"}}>
            <p>{ item.label }</p>
            {
                item && item.children && item.children.length > 0 ?
                <span onClick={() => handleChildrenToggle(item.label)} >
                    {
                        displayChildren[item.label] ? '-' : '+'
                    }
                </span>
                : null
            }
        </div>    
        {
            item && item.children && item.children.length > 0 && displayChildren[item.label] ?
            <MenuList list={item.children} />
            : null
        }
        </li>
        </>
    )
}