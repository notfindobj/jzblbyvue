const WSS_URL = `ws://www.api.jzbl.com/api/chatd2d`
let Socket = ''
let setIntervalWesocketPush = null
var ping= "token:"
export default {
    install (Vue, options) {
      Vue.prototype.$createSocket = createSocket(token),
      Vue.prototype.$onopenWS = onopenWS(),
      Vue.prototype.$onmessageWS = onmessageWS(e),
      Vue.prototype.$sendWSPush = sendWSPush(eventTypeArr)
    }
  }

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
    window.dispatchEvent(new CustomEvent('onmessageWS', {
      detail: {
        data: e
      }
    }))
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
export function oncloseWS() {
    clearInterval(setIntervalWesocketPush)
    console.log('websocket已断开')
}
  /**发送心跳 */
export function sendPing() {
    Socket.send(ping)
    setIntervalWesocketPush = setInterval(() => {
        Socket.send(ping)
    }, 5000)
}