const WSS_URL = `ws://www.api.jzbl.com/api/chatd2d`
let Socket = ''
let setIntervalWesocketPush = null
var ping= "token:"
import Vue from "vue"
/**建立连接 */
function createSocket(token) {
    ping += token
    if (!Socket) {
        console.log('建立websocket连接')
        Socket = new WebSocket(WSS_URL)
        Socket.onopen = onopenWS
        Socket.onmessage = onmessageWS
        Socket.onerror = onerrorWS
        Socket.onclose = oncloseWS
    } else {
        console.log('websocket已连接')
    }
  }
/**打开WS之后发送心跳 */
function onopenWS() {
    sendPing() //发送心跳
}
/**连接失败重连 */
function onerrorWS() {
    clearInterval(setIntervalWesocketPush)
    Socket.close()
    createSocket() //重连
}
/**WS数据接收统一处理 */
function onmessageWS(e) {
    Vue.$emit("onmessageWS", e.data)
    // window.dispatchEvent(new CustomEvent('onmessageWS', {
    //   detail: {
    //     data: e
    //   }
    // }))
}
/**发送数据
 * @param eventType
 */
function sendWSPush(eventTypeArr) {
    if (Socket !== null && Socket.readyState === 3) {
        Socket.close()
        createSocket() //重连
    } else if (Socket.readyState === 1) {
        Socket.send(JSON.stringify(eventTypeArr))
    } else if (Socket.readyState === 0) {
        setTimeout(() => {
            Socket.send(JSON.stringify(eventTypeArr))
        }, 3000)
    }
}
/**关闭WS */
function oncloseWS() {
    clearInterval(setIntervalWesocketPush)
    console.log('websocket已断开')
}
  /**发送心跳 */
function sendPing() {
    Socket.send(ping)
    setIntervalWesocketPush = setInterval(() => {
        Socket.send(ping)
    }, 5000)
}

const websockets={
    install (Vue, options) {
        Vue.prototype.createSocket = createSocket
        Vue.prototype.onmessageWS = onmessageWS
        Vue.prototype.sendWSPush = sendWSPush
        
    }
}
export {websockets}
