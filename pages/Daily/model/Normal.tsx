import React, { useState } from "react";
const Normal = ({data}:any) => {
  
  return (
    <div style={{backgroundColor: '#fff', opacity: 0.5 }} >
      <div>
        <h2> {data.title} </h2>
        <div>{data.date}</div>
        {data.content.map((item: string) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  )
}
export default Normal