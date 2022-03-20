import React, { useState, useEffect } from "react";
import { Data2021 } from './node/data';
import Button from "../../components/PublicComponents/Button";
import Normal from './model/Normal';
const Daily: React.FC = () => {
  
  const [index, setIndex] = useState(Data2021().length - 1)
  const [state, setState] = useState({
    list: Data2021(),
    now:  Data2021()[index]
  })
  useEffect(() => {
    setState({
      ...state,
      now:state.list[index]
    })
  },[index])
  
  return (
    <div>
      <Normal 
        data={state.now}
      />
      <Button 
      disabled={index === 0}
      onClick={() => { if (index > 0) {
        setIndex(index -1)
      }}}>上一篇</Button>
      <Button 
      disabled={index === state.list.length - 1}
      onClick={() => {setIndex(index + 1)}}
      >下一篇</Button>
    </div>
  )
}
export default Daily