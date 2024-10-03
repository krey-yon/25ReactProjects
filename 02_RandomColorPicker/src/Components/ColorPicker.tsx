import React from 'react'

const ColorPicker = () => {

    const [color, setColor] = React.useState<string>('#000000')
    const [typeOfColor, setTypeOfColor] = React.useState<string>("hex")

    const randomColorUtility = (length : number) => {
        return Math.floor(Math.random() * length)
    }

    const handleHexColor = () => {
        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
        let hexColor = '#' 
        
        for (let i = 0; i < 6; i++) {
            hexColor += hex[randomColorUtility(hex.length)]
        }   
        setColor(hexColor)
    }

    const handleRGBcolor = () => {
        const rgbColor = `rgb(${randomColorUtility(255)}, ${randomColorUtility(255)}, ${randomColorUtility(255)})`
        setColor(rgbColor)
    }

  return (
    <div style={
        {
            backgroundColor: color,
            height: "90vh",
            width: "90vw",
        }
    }>
        <button onClick={() => setTypeOfColor("hex")} >Create Hex Color</button>
        <button onClick={() => setTypeOfColor("rgb")} >Create RGB Color</button>
        <button onClick={typeOfColor === "hex" ? handleHexColor : handleRGBcolor} >Generate Random Color</button>
        <h1 style={{color: "white"}}>{color}</h1>   
    </div>
  )
}

export default ColorPicker