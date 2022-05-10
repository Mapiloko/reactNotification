import React, { useEffect, useState } from 'react'
import { w3cwebsocket } from 'websocket';

export default function Homepage() {

    const client = new w3cwebsocket('wss://demos.mphalane.co.ls/ws/chat/')
    const [item, setItem] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(()=> {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
          } else {
            Notification.requestPermission();
          }

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(JSON.parse(message.data))
            setItem(dataFromServer)
            setLoaded(true)
        }
        
        if(loaded)
            {showNotification(item)}
    },[item])

    const showNotification = (itm) => {
        var options = {
            title: itm.senderName,
            body: itm.message,
            icon: "icon.png",
            dir: "ltr"
          };
    var notification = new Notification(itm.senderName, options);
    }

  return (
    <>
      <div>
        <button disabled={!loaded} style={{backgroundColor : !loaded && "#B2BABB"}} onClick={()=>showNotification(item)}>
          <p style={{color : !loaded ? "#B2BABB" : "black"}}>Click to show notification</p>
        </button>
      </div>
    </>
  )
}